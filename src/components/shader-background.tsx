"use client";
import { useEffect, useRef } from 'react'
import { Renderer, Program, Mesh, Triangle } from 'ogl'

const vertex = /* glsl */`
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`

const fragment = /* glsl */`
  precision highp float;
  uniform float uTime;
  varying vec2 vUv;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.12;

    float n1 = snoise(vec3(uv * 1.8, t));
    float n2 = snoise(vec3(uv * 2.8 + 1.7, t * 0.7));
    float n3 = snoise(vec3(uv * 1.2 - 0.6, t * 1.3));

    float noise = (n1 * 0.5 + n2 * 0.3 + n3 * 0.2) * 0.5 + 0.5;

    // Color palette: deep black, blue, cyan, teal/green
    vec3 dark    = vec3(0.929, 0.910, 0.875);
    vec3 blue    = vec3(0.231, 0.510, 0.965);
    vec3 cyan    = vec3(0.024, 0.714, 0.831);
    vec3 teal    = vec3(0.063, 0.725, 0.506);

    vec3 col = dark;
    col = mix(col, blue * 0.65, smoothstep(0.28, 0.65, noise) * 0.95);
    col = mix(col, cyan * 0.50, smoothstep(0.50, 0.82, n2 * 0.5 + 0.5) * 0.85);
    col = mix(col, teal * 0.38, smoothstep(0.55, 0.88, n3 * 0.5 + 0.5) * 0.70);
    col = mix(dark, col, 0.45);

    gl_FragColor = vec4(col, 1.0);
  }
`

export default function ShaderBackground() {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new Renderer({ canvas, alpha: false, antialias: false })
    const gl = renderer.gl
    gl.clearColor(0.929, 0.910, 0.875, 1)

    const geometry = new Triangle(gl)
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
      },
    })
    const mesh = new Mesh(gl, { geometry, program })

    const resize = () => {
      // Use the parent element's size; fall back to window dimensions.
      // Reading offsetWidth/Height of the canvas itself can return 0 before
      // the browser has finished laying out position:absolute elements.
      const parent = canvas.parentElement
      const w = parent ? parent.clientWidth  : window.innerWidth
      const h = parent ? parent.clientHeight : window.innerHeight
      renderer.setSize(w, h)
    }

    // ResizeObserver fires reliably after layout, even on first paint
    const ro = new ResizeObserver(resize)
    ro.observe(canvas.parentElement || document.body)
    resize() // also call once immediately in case it's already laid out

    const startTime = performance.now()
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate)
      program.uniforms.uTime.value = (performance.now() - startTime) / 1000
      renderer.render({ scene: mesh })
    }
    animate()

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
      }}
    />
  )
}
