"use client"

import { useRef, useEffect } from "react"

interface ShaderProps {
  flowSpeed?: number
  colorIntensity?: number
  noiseLayers?: number
  mouseInfluence?: number
  className?: string
}

export default function AuroraShader({
  flowSpeed = 0.4,
  colorIntensity = 1.2,
  noiseLayers = 4.0,
  mouseInfluence = 0.3,
  className = "",
}: ShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePos = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext("webgl")
    if (!gl) return

    const vertSrc = `
      attribute vec2 aPosition;
      void main() { gl_Position = vec4(aPosition, 0.0, 1.0); }
    `
    const fragSrc = `
      precision highp float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform vec2 iMouse;
      uniform float uFlowSpeed;
      uniform float uColorIntensity;
      uniform float uNoiseLayers;
      uniform float uMouseInfluence;
      #define MARCH_STEPS 32
      mat2 rot(float a){ float s=sin(a),c=cos(a); return mat2(c,-s,s,c); }
      float hash(vec2 p){ p=fract(p*vec2(123.34,456.21)); p+=dot(p,p+45.32); return fract(p.x*p.y); }
      float fbm(vec3 p){
        float f=0.,amp=0.5;
        for(int i=0;i<8;i++){
          if(float(i)>=uNoiseLayers)break;
          f+=amp*hash(p.xy); p*=2.; amp*=0.5;
        }
        return f;
      }
      float map(vec3 p){
        vec3 q=p;
        q.z+=iTime*uFlowSpeed;
        vec2 mouse=(iMouse.xy/iResolution.xy-0.5)*2.;
        q.xy+=mouse*uMouseInfluence;
        float f=fbm(q*2.);
        f*=sin(p.y*2.+iTime)*0.5+0.5;
        return clamp(f,0.,1.);
      }
      void main(){
        vec2 uv=(gl_FragCoord.xy-0.5*iResolution.xy)/iResolution.y;
        vec3 ro=vec3(0,-1,0), rd=normalize(vec3(uv,1.));
        vec3 col=vec3(0); float t=0.;
        for(int i=0;i<MARCH_STEPS;i++){
          vec3 p=ro+rd*t;
          float density=map(p);
          if(density>0.){
            vec3 aurora=0.5+0.5*cos(iTime*0.5+p.y*2.+vec3(0,2,4));
            col+=aurora*density*0.1*uColorIntensity;
          }
          t+=0.1;
        }
        gl_FragColor=vec4(col,1.);
      }
    `

    const compile = (src: string, type: number) => {
      const s = gl.createShader(type)
      if (!s) return null
      gl.shaderSource(s, src); gl.compileShader(s)
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { gl.deleteShader(s); return null }
      return s
    }

    const vert = compile(vertSrc, gl.VERTEX_SHADER)
    const frag = compile(fragSrc, gl.FRAGMENT_SHADER)
    if (!vert || !frag) return

    const prog = gl.createProgram()!
    gl.attachShader(prog, vert); gl.attachShader(prog, frag); gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(prog, "aPosition")
    gl.enableVertexAttribArray(aPos); gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uRes   = gl.getUniformLocation(prog, "iResolution")
    const uTime  = gl.getUniformLocation(prog, "iTime")
    const uMouse = gl.getUniformLocation(prog, "iMouse")
    const uFlow  = gl.getUniformLocation(prog, "uFlowSpeed")
    const uColor = gl.getUniformLocation(prog, "uColorIntensity")
    const uNoise = gl.getUniformLocation(prog, "uNoiseLayers")
    const uMInf  = gl.getUniformLocation(prog, "uMouseInfluence")

    const start = performance.now()
    let rafId: number

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mousePos.current = { x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height }
    }
    window.addEventListener("mousemove", onMove)

    const resize = () => {
      canvas.width = canvas.clientWidth; canvas.height = canvas.clientHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uRes, canvas.width, canvas.height)
    }
    window.addEventListener("resize", resize); resize()

    const loop = () => {
      if (!gl || gl.isContextLost()) return
      gl.uniform1f(uTime, (performance.now() - start) / 1000)
      gl.uniform2f(uMouse, mousePos.current.x * canvas.width, (1 - mousePos.current.y) * canvas.height)
      gl.uniform1f(uFlow, flowSpeed); gl.uniform1f(uColor, colorIntensity)
      gl.uniform1f(uNoise, noiseLayers); gl.uniform1f(uMInf, mouseInfluence)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      rafId = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMove)
      if (!gl.isContextLost()) { gl.deleteProgram(prog); gl.deleteBuffer(buf) }
    }
  }, [flowSpeed, colorIntensity, noiseLayers, mouseInfluence])

  return <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full ${className}`} />
}
