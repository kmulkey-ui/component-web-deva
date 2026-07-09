"use client";
import { useEffect, useRef, useCallback } from 'react'

// ── WebGL shaders ──────────────────────────────────────────────
const VS = `
  precision mediump float;
  attribute vec2 a_position;
  attribute float a_size;
  attribute float a_opacity;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  varying float v_opacity;
  varying vec2 v_position;
  void main() {
    vec2 position = (a_position / u_resolution) * 2.0 - 1.0;
    position.y *= -1.0;
    gl_Position = vec4(position, 0.0, 1.0);
    gl_PointSize = a_size;
    v_opacity = a_opacity;
    v_position = a_position;
  }
`

const FS = `
  precision mediump float;
  uniform vec2 u_mouse;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec3 u_primaryColor;
  uniform vec3 u_secondaryColor;
  uniform vec3 u_accentColor;
  uniform vec3 u_glowColor;
  uniform vec3 u_coreColor;
  varying float v_opacity;
  varying vec2 v_position;
  void main() {
    vec2 coord = gl_PointCoord - 0.5;
    float dist = length(coord);
    if (dist > 0.5) discard;
    float innerGlow = 1.0 - smoothstep(0.0, 0.2, dist);
    float outerGlow = 1.0 - smoothstep(0.2, 0.5, dist);
    float glow = pow(innerGlow, 3.0) + pow(outerGlow, 1.5) * 0.6;
    float mouseDist = distance(v_position, u_mouse);
    float mouseGlow = 1.0 / (1.0 + mouseDist * 0.008);
    float mouseIntensity = smoothstep(300.0, 0.0, mouseDist);
    float timeWave = sin(u_time * 0.0008) * 0.5 + 0.5;
    float posGrad = (v_position.x / u_resolution.x + v_position.y / u_resolution.y) * 0.5;
    vec3 base = mix(u_primaryColor, u_secondaryColor, timeWave);
    base = mix(base, u_accentColor, posGrad * 0.3);
    vec3 color = mix(base, u_coreColor, innerGlow * 0.8);
    color = mix(color, u_glowColor, mouseGlow * mouseIntensity * 0.6);
    float bloom = glow * (1.0 + mouseGlow * 0.8);
    float alpha = bloom * v_opacity * (0.9 + mouseIntensity * 0.4);
    gl_FragColor = vec4(color, alpha);
  }
`

// Post-process: bloom + film grain + chromatic aberration
const POST_VS = `
  attribute vec2 a_position;
  varying vec2 v_texCoord;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texCoord = (a_position + 1.0) * 0.5;
  }
`
const POST_FS = `
  precision mediump float;
  uniform sampler2D u_texture;
  uniform vec2 u_texelSize;
  uniform float u_time;
  uniform vec2 u_resolution;
  varying vec2 v_texCoord;
  float random(vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123); }
  void main() {
    vec4 color = texture2D(u_texture, v_texCoord);
    vec4 bloom = vec4(0.0);
    float totalWeight = 0.0;
    for (int i = -4; i <= 4; i++) {
      for (int j = -4; j <= 4; j++) {
        vec2 offset = vec2(float(i), float(j)) * u_texelSize * 2.5;
        vec4 s = texture2D(u_texture, v_texCoord + offset);
        float w = exp(-float(i*i + j*j) * 0.2);
        bloom += s * w; totalWeight += w;
      }
    }
    bloom /= totalWeight;
    vec4 brightPass = max(color - 0.4, 0.0) * 3.0;
    bloom = bloom + brightPass * 0.9;
    float grain = pow(random(v_texCoord + u_time * 0.001), 1.5) * 0.1;
    vec2 center = v_texCoord - 0.5;
    float aberration = length(center) * 0.015;
    vec4 r = texture2D(u_texture, v_texCoord + center * aberration * vec2(1.0, 0.0));
    vec4 g = texture2D(u_texture, v_texCoord);
    vec4 b = texture2D(u_texture, v_texCoord - center * aberration * vec2(0.0, 1.0));
    vec4 aberrated = vec4(r.r, g.g, b.b, g.a);
    float vignette = smoothstep(0.3, 1.0, 1.0 - length(center) * 0.8);
    vec4 final = aberrated + bloom * 0.6;
    final.rgb += grain;
    final.rgb *= vignette;
    final.rgb = pow(final.rgb, vec3(0.9));
    final.rgb = mix(final.rgb, final.rgb * vec3(1.1, 0.95, 1.05), 0.3);
    gl_FragColor = final;
  }
`

function makeShader(gl, type, src) {
  const s = gl.createShader(type)
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error('Shader error:', gl.getShaderInfoLog(s))
    gl.deleteShader(s); return null
  }
  return s
}

function makeProgram(gl, vs, fs) {
  const p = gl.createProgram()
  gl.attachShader(p, vs); gl.attachShader(p, fs)
  gl.linkProgram(p)
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    console.error('Program error:', gl.getProgramInfoLog(p))
    gl.deleteProgram(p); return null
  }
  return p
}

export default function ParticleText({
  text          = 'MATT CHAPIN',
  particleSize  = 0.05,
  animationSpeed = 1.5,
  mouseForce    = 250,
  interactionMode = 'repel',
  fontFamily    = "'Bebas Neue', sans-serif",
  primaryColor  = [0.23, 0.51, 0.96],   // #3B82F6 blue
  secondaryColor = [0.55, 0.36, 0.96],  // #8B5CF6 violet
  accentColor   = [0.04, 0.71, 0.83],   // #06B6D4 cyan
  glowColor     = [0.93, 0.91, 0.87],   // #EDE8DF warm
  coreColor     = [1.0, 1.0, 1.0],
}) {
  const containerRef  = useRef(null)
  const canvasRef     = useRef(null)   // hidden text-sampling canvas
  const webglRef      = useRef(null)   // visible WebGL canvas
  const particlesRef  = useRef([])
  const mouseRef      = useRef({ x: 0, y: 0 })
  const rafRef        = useRef(null)
  const glRef         = useRef(null)
  const programRef    = useRef(null)
  const postProgramRef = useRef(null)
  const fbRef         = useRef(null)
  const texRef        = useRef(null)
  const bufsRef       = useRef({ pos: null, size: null, opacity: null })

  const getSize = () => {
    const el = containerRef.current
    return el ? { w: el.clientWidth, h: el.clientHeight } : { w: window.innerWidth, h: window.innerHeight }
  }

  const buildParticles = useCallback(() => {
    const { w, h } = getSize()
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width  = w
    canvas.height = h

    const fs = Math.min(160, w / (text.includes(' ') ? 5.5 : 4))
    ctx.font = `bold ${fs}px ${fontFamily}`
    ctx.textAlign    = 'center'
    ctx.textBaseline = 'middle'

    const tw = ctx.measureText(text).width
    const tmp = document.createElement('canvas')
    const tc  = tmp.getContext('2d')
    tmp.width  = tw + 100
    tmp.height = fs + 60
    tc.font = ctx.font
    tc.fillStyle = '#FFFFFF'
    tc.textAlign    = 'center'
    tc.textBaseline = 'middle'
    tc.fillText(text, tmp.width / 2, tmp.height / 2)

    const imgData = tc.getImageData(0, 0, tmp.width, tmp.height)
    const data    = imgData.data
    const cx = w / 2, cy = h / 2

    const pts = []
    const step = 2
    for (let y = 0; y < tmp.height; y += step) {
      for (let x = 0; x < tmp.width; x += step) {
        if (data[(y * tmp.width + x) * 4 + 3] > 128) {
          const px = cx + x - tmp.width / 2
          const py = cy + y - tmp.height / 2
          pts.push({
            x: px + (Math.random() - 0.5) * 120,
            y: py + (Math.random() - 0.5) * 120,
            targetX: px, targetY: py,
            vx: 0, vy: 0,
            size: particleSize + Math.random() * 3,
            opacity: Math.random() * 0.4 + 0.6,
            life: 1,
            isExplosion: false,
          })
        }
      }
    }
    particlesRef.current = pts
  }, [text, particleSize, fontFamily])

  const initGL = useCallback(() => {
    const canvas = webglRef.current
    if (!canvas) return false
    const { w, h } = getSize()
    canvas.width = w; canvas.height = h

    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false, antialias: true })
    if (!gl) return false
    glRef.current = gl

    const vs1 = makeShader(gl, gl.VERTEX_SHADER,   VS)
    const fs1 = makeShader(gl, gl.FRAGMENT_SHADER,  FS)
    if (!vs1 || !fs1) return false
    programRef.current = makeProgram(gl, vs1, fs1)

    const vs2 = makeShader(gl, gl.VERTEX_SHADER,   POST_VS)
    const fs2 = makeShader(gl, gl.FRAGMENT_SHADER,  POST_FS)
    if (!vs2 || !fs2) return false
    postProgramRef.current = makeProgram(gl, vs2, fs2)

    // Framebuffer + texture
    const fb  = gl.createFramebuffer()
    const tex = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, tex)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb)
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0)
    fbRef.current  = fb
    texRef.current = tex

    bufsRef.current = { pos: gl.createBuffer(), size: gl.createBuffer(), opacity: gl.createBuffer() }
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    return true
  }, [])

  const renderGL = useCallback((t) => {
    const gl = glRef.current
    const prog = programRef.current
    const postProg = postProgramRef.current
    const canvas = webglRef.current
    const pts = particlesRef.current
    if (!gl || !prog || !postProg || !canvas || !pts.length) return

    const { w, h } = getSize()

    // Pass 1 — particles → framebuffer
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbRef.current)
    gl.viewport(0, 0, w, h)
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.useProgram(prog)

    const ul = n => gl.getUniformLocation(prog, n)
    gl.uniform2f(ul('u_resolution'), w, h)
    gl.uniform2f(ul('u_mouse'), mouseRef.current.x, mouseRef.current.y)
    gl.uniform1f(ul('u_time'), t)
    gl.uniform3fv(ul('u_primaryColor'),   primaryColor)
    gl.uniform3fv(ul('u_secondaryColor'), secondaryColor)
    gl.uniform3fv(ul('u_accentColor'),    accentColor)
    gl.uniform3fv(ul('u_glowColor'),      glowColor)
    gl.uniform3fv(ul('u_coreColor'),      coreColor)

    const posArr  = new Float32Array(pts.length * 2)
    const sizeArr = new Float32Array(pts.length)
    const opArr   = new Float32Array(pts.length)
    pts.forEach((p, i) => {
      posArr[i*2]   = p.x; posArr[i*2+1] = p.y
      sizeArr[i]    = p.size * 7
      opArr[i]      = p.opacity
    })

    const setAttr = (bufKey, attrName, data, n) => {
      const loc = gl.getAttribLocation(prog, attrName)
      gl.bindBuffer(gl.ARRAY_BUFFER, bufsRef.current[bufKey])
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW)
      gl.enableVertexAttribArray(loc)
      gl.vertexAttribPointer(loc, n, gl.FLOAT, false, 0, 0)
    }
    setAttr('pos',    'a_position', posArr,  2)
    setAttr('size',   'a_size',     sizeArr, 1)
    setAttr('opacity','a_opacity',  opArr,   1)
    gl.drawArrays(gl.POINTS, 0, pts.length)

    // Pass 2 — post-process → screen
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    gl.viewport(0, 0, w, h)
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.useProgram(postProg)

    const quad = new Float32Array([-1,-1, 1,-1, -1,1, 1,1])
    const qBuf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, qBuf)
    gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW)
    const pLoc = gl.getAttribLocation(postProg, 'a_position')
    gl.enableVertexAttribArray(pLoc)
    gl.vertexAttribPointer(pLoc, 2, gl.FLOAT, false, 0, 0)

    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, texRef.current)
    const ul2 = n => gl.getUniformLocation(postProg, n)
    gl.uniform1i(ul2('u_texture'),     0)
    gl.uniform2f(ul2('u_texelSize'),   1/w, 1/h)
    gl.uniform1f(ul2('u_time'),        t)
    gl.uniform2f(ul2('u_resolution'),  w, h)

    gl.disable(gl.BLEND)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    gl.enable(gl.BLEND)
    gl.deleteBuffer(qBuf)
  }, [primaryColor, secondaryColor, accentColor, glowColor, coreColor])

  const stepParticle = useCallback((p) => {
    if (p.isExplosion) {
      p.x += p.vx; p.y += p.vy
      p.vx *= 0.96; p.vy *= 0.96
      p.life -= 0.025
      p.opacity = Math.max(0, p.life)
      return
    }
    const { x: mx, y: my } = mouseRef.current
    const dx = mx - p.x, dy = my - p.y
    const d2 = dx*dx + dy*dy
    if (d2 < mouseForce * mouseForce) {
      const d = Math.sqrt(d2)
      const f = (mouseForce - d) / mouseForce
      const a = Math.atan2(dy, dx)
      const dir = interactionMode === 'attract' ? 1 : -1
      p.vx += Math.cos(a) * f * 3 * dir
      p.vy += Math.sin(a) * f * 3 * dir
    }
    p.vx += (p.targetX - p.x) * 0.04 * animationSpeed
    p.vy += (p.targetY - p.y) * 0.04 * animationSpeed
    p.vx *= 0.94; p.vy *= 0.94
    p.x += p.vx;  p.y += p.vy
  }, [mouseForce, animationSpeed, interactionMode])

  // Click explosion
  const handleClick = useCallback((e) => {
    const rect = webglRef.current.getBoundingClientRect()
    const mx = e.clientX - rect.left
    const my = e.clientY - rect.top
    for (let i = 0; i < 100; i++) {
      const angle = (Math.PI * 2 * i) / 100
      const vel   = 4 + Math.random() * 50
      particlesRef.current.push({
        x: mx, y: my, targetX: mx, targetY: my,
        vx: Math.cos(angle) * vel, vy: Math.sin(angle) * vel,
        size: particleSize * 0.4, opacity: 1, life: 1, isExplosion: true,
      })
    }
    particlesRef.current.forEach(p => {
      if (p.isExplosion) return
      const dx = p.x - mx, dy = p.y - my
      const d = Math.sqrt(dx*dx + dy*dy)
      if (d < 120) {
        const f = (120 - d) / 120
        const a = Math.atan2(dy, dx)
        p.vx += Math.cos(a) * f * 90
        p.vy += Math.sin(a) * f * 90
      }
    })
  }, [particleSize])

  const handleMouseMove = useCallback((e) => {
    const rect = webglRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }, [])

  // Init
  useEffect(() => {
    if (!initGL()) return
    buildParticles()

    let t = 0
    const loop = (now) => {
      t = now
      particlesRef.current = particlesRef.current.filter(p => {
        stepParticle(p)
        return !p.isExplosion || p.life > 0
      })
      renderGL(t)
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    const onResize = () => {
      const { w, h } = getSize()
      const gl = glRef.current
      const canvas = webglRef.current
      if (!canvas || !gl) return
      canvas.width = w; canvas.height = h
      gl.viewport(0, 0, w, h)
      if (texRef.current) {
        gl.bindTexture(gl.TEXTURE_2D, texRef.current)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
      }
      buildParticles()
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
    }
  }, [initGL, buildParticles, stepParticle, renderGL])

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Hidden canvas for text pixel sampling */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {/* WebGL particle canvas */}
      <canvas
        ref={webglRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: 'crosshair' }}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
      />
    </div>
  )
}
