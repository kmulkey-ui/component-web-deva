"use client";
import { useEffect, useRef } from 'react'

export default function NeonRGBText({ text = 'Matt Chapin', font = '900 140px "Bebas Neue", serif' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl')
    if (!gl) return

    const vs = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vs, `
      attribute vec2 position;
      uniform float uAspect;
      varying vec2 vUv;
      void main() {
        vUv = vec2(position.x * 0.5 + 0.5, 1.0 - (position.y * 0.5 + 0.5));
        vec2 pos = position;
        pos.y *= 0.28;
        pos.x *= min(1.0, 1.0 / uAspect);
        gl_Position = vec4(pos, 0.0, 1.0);
      }
    `)
    gl.compileShader(vs)

    const fs = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fs, `
      precision mediump float;
      uniform sampler2D uTexture;
      uniform vec2 uOffset;
      uniform vec3 uColor;
      varying vec2 vUv;
      void main() {
        vec2 uv = vUv + vec2(uOffset.x, -uOffset.y);
        vec4 t = texture2D(uTexture, uv);
        gl_FragColor = vec4(uColor * t.a * 1.6, t.a);
      }
    `)
    gl.compileShader(fs)

    const prog = gl.createProgram()
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const verts = new Float32Array([-1,-1, 1,-1, -1,1, 1,1])
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW)
    const posLoc = gl.getAttribLocation(prog, 'position')
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    // Build text texture
    const tc = document.createElement('canvas')
    const tx = tc.getContext('2d')
    tc.width = 1024; tc.height = 256
    tx.clearRect(0, 0, tc.width, tc.height)
    tx.fillStyle = '#ffffff'
    tx.font = font
    tx.textAlign = 'center'
    tx.textBaseline = 'middle'
    tx.fillText(text, tc.width / 2, tc.height / 2)

    const tex = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, tex)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, tc)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

    const uTex    = gl.getUniformLocation(prog, 'uTexture')
    const uOffset = gl.getUniformLocation(prog, 'uOffset')
    const uColor  = gl.getUniformLocation(prog, 'uColor')
    const uAspect = gl.getUniformLocation(prog, 'uAspect')

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE)

    const render = () => {
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      const off = 0.005
      const channels = [
        { color: [1, 0.15, 0.3],  offset: [ off,  0   ] },  // red-pink
        { color: [0.3, 0.7,  1],  offset: [ 0,    0   ] },  // blue (center)
        { color: [0.5, 0.9,  1],  offset: [-off,  0   ] },  // cyan
      ]
      channels.forEach(({ color, offset }) => {
        gl.uniform2fv(uOffset, offset)
        gl.uniform3fv(uColor, color)
        gl.uniform1i(uTex, 0)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      })
    }

    const resize = () => {
      canvas.width  = canvas.parentElement?.clientWidth  || window.innerWidth
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform1f(uAspect, canvas.width / canvas.height)
      render()
    }

    resize()
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      gl.deleteProgram(prog)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.deleteBuffer(buf)
      gl.deleteTexture(tex)
    }
  }, [text, font])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  )
}
