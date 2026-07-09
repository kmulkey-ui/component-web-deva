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
  uniform float uIntensity;
  varying vec2 vUv;

  float rand(vec2 co) {
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
  }
  float rand(float x) {
    return fract(sin(x * 127.1) * 43758.5453);
  }

  void main() {
    vec2 uv = vUv;
    float t  = uTime;
    float intensity = uIntensity;

    // ── Continuous slow wave distortion ──────────────────
    float wave = sin(uv.y * 18.0 + t * 1.2) * 0.004 * intensity;
    vec2 uvW = uv;
    uvW.x += wave;

    // ── Glitch bursts (frequent) ─────────────────────────
    float burst1 = step(0.7, rand(vec2(floor(t * 5.0),  0.0)));  // 30% chance
    float burst2 = step(0.6, rand(vec2(floor(t * 2.5),  9.0)));  // 40% chance

    // ── Scanline row displacement ─────────────────────────
    float rowCoarse = floor(uv.y * 40.0);
    float rowFine   = floor(uv.y * 120.0);

    float coarseShift = (rand(vec2(rowCoarse, floor(t * 8.0))) - 0.5)
                        * 0.22 * burst1 * intensity;
    float fineShift   = (rand(vec2(rowFine,   floor(t * 20.0))) - 0.5)
                        * 0.08 * burst2 * intensity;

    vec2 uvD = uvW;
    uvD.x += coarseShift + fineShift;
    uvD.x  = fract(uvD.x); // wrap so we don't read outside 0-1

    // ── Block displacement ────────────────────────────────
    float blockRow  = floor(uv.y / 0.07);
    float blockRand = rand(vec2(blockRow, floor(t * 12.0)));
    if (blockRand > 0.75) {
      uvD.x = fract(uvD.x + (rand(vec2(blockRow, t * 0.3)) - 0.5) * 0.4 * intensity);
    }

    // ── Chromatic aberration ─────────────────────────────
    float ca  = 0.018 * burst1 * intensity + 0.006 * intensity;

    // ── Digital grid ─────────────────────────────────────
    vec2 gridUv  = fract(uvD * 28.0);
    float gridX  = smoothstep(0.88, 1.0, gridUv.x);
    float gridY  = smoothstep(0.88, 1.0, gridUv.y);
    float grid   = max(gridX, gridY);

    // ── CRT scanlines ─────────────────────────────────────
    float crt    = sin(uv.y * 350.0) * 0.5 + 0.5;
    float crtDim = mix(0.78, 1.0, crt);

    // ── Base color with grid ──────────────────────────────
    vec3 bg  = vec3(0.03, 0.03, 0.04);
    vec3 col = mix(bg, vec3(0.11, 0.11, 0.16), grid * 0.7);

    // ── Glitch color lines — palette colors ───────────────
    // Gold lines
    float goldA = step(0.88, rand(vec2(floor(uvD.y * 60.0),        floor(t * 8.0))));
    float goldB = step(0.92, rand(vec2(floor(uvD.y * 60.0) + 33.0, floor(t * 4.0))));
    // Violet lines
    float violA = step(0.88, rand(vec2(floor(uvD.y * 50.0) + 11.0, floor(t * 8.0))));
    // Cyan lines
    float cyanA = step(0.90, rand(vec2(floor(uvD.y * 55.0) + 22.0, floor(t * 8.0))));

    col += vec3(0.23, 0.51, 0.97) * goldA  * burst1 * 1.1 * intensity; // blue
    col += vec3(0.02, 0.71, 0.83) * goldB  * burst2 * 0.9 * intensity; // cyan
    col += vec3(0.06, 0.73, 0.51) * violA  * burst1 * 1.0 * intensity; // teal
    col += vec3(0.23, 0.51, 0.97) * cyanA  * burst2 * 0.8 * intensity; // blue

    // ── RGB channel split ─────────────────────────────────
    float noiseR = rand(vec2(floor((uvD.y + ca)  * 120.0), floor(t * 22.0)));
    float noiseB = rand(vec2(floor((uvD.y - ca)  * 120.0), floor(t * 22.0)));
    col.r += (noiseR - 0.5) * 0.12 * burst1 * intensity;
    col.b += (noiseB - 0.5) * 0.12 * burst1 * intensity;

    // ── Always-on subtle flicker ──────────────────────────
    float flicker = rand(vec2(floor(uv.y * 80.0), floor(t * 30.0)));
    col += vec3(0.0, 0.03, 0.05) * step(0.97, flicker) * intensity;

    // ── Noise grain ───────────────────────────────────────
    float grain = rand(uvD + fract(t * 0.11)) * 0.09 - 0.045;
    col += grain * intensity;

    // ── Vignette ──────────────────────────────────────────
    vec2 vig = uv * 2.0 - 1.0;
    col *= 1.0 - dot(vig, vig) * 0.38;

    col *= crtDim;
    col  = clamp(col, 0.0, 1.0);

    gl_FragColor = vec4(col, 1.0);
  }
`

export default function GlitchBackground({ intensity = 1.0 }) {
  const canvasRef = useRef(null)
  const rafRef    = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new Renderer({ canvas, alpha: false, antialias: false })
    const gl = renderer.gl
    gl.clearColor(0.03, 0.03, 0.04, 1)

    const geometry = new Triangle(gl)
    const program  = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime:      { value: 0 },
        uIntensity: { value: intensity },
      },
    })
    const mesh = new Mesh(gl, { geometry, program })

    const resize = () => {
      const parent = canvas.parentElement
      const w = parent ? parent.clientWidth  : window.innerWidth
      const h = parent ? parent.clientHeight : window.innerHeight
      renderer.setSize(w, h)
    }
    const ro = new ResizeObserver(resize)
    ro.observe(canvas.parentElement || document.body)
    resize()

    const t0 = performance.now()
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate)
      program.uniforms.uTime.value = (performance.now() - t0) / 1000
      renderer.render({ scene: mesh })
    }
    animate()

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [intensity])

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
