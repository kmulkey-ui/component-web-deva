"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

const VERT = `
  attribute vec4 position;
  void main() { gl_Position = position; }
`

const FRAG = `
  precision mediump float;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_intensity;

  vec3 hash3(vec2 p) {
    vec3 q = vec3(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)),dot(p,vec2(419.2,371.9)));
    return fract(sin(q)*43758.5453);
  }
  float noise(vec2 p) {
    vec2 i=floor(p),f=fract(p);
    vec2 u=f*f*f*(f*(f*6.0-15.0)+10.0);
    return mix(mix(dot(hash3(i+vec2(0,0)).xy,f-vec2(0,0)),dot(hash3(i+vec2(1,0)).xy,f-vec2(1,0)),u.x),
               mix(dot(hash3(i+vec2(0,1)).xy,f-vec2(0,1)),dot(hash3(i+vec2(1,1)).xy,f-vec2(1,1)),u.x),u.y);
  }
  float fbm(vec2 p,int o){
    float v=0.,a=1.,fr=0.25;
    for(int i=0;i<10;i++){if(i>=o)break;v+=a*noise(p*fr);a*=0.52;fr*=1.13;}
    return v;
  }
  float voronoi(vec2 p){
    vec2 n=floor(p),f=fract(p);float md=50.;
    for(int i=-2;i<=2;i++)for(int j=-2;j<=2;j++){
      vec2 g=vec2(i,j),o=hash3(n+g).xy;
      o=0.5+0.41*sin(u_time*1.5+6.28*o);
      vec2 r=g+o-f;float d=dot(r,r);md=min(md,d);}
    return sqrt(md);
  }
  float plasma(vec2 p,float t){
    return (sin(p.x*8.+t*2.)+sin(p.y*8.+t*1.7)+sin((p.x+p.y)*6.+t*1.3)+sin(sqrt(p.x*p.x+p.y*p.y)*8.+t*2.3))*0.5;
  }
  vec2 curl(vec2 p,float t){
    float e=0.5;
    return vec2((fbm(p+vec2(0,e),6)-fbm(p-vec2(0,e),6))/(2.*e),(fbm(p-vec2(e,0),6)-fbm(p+vec2(e,0),6))/(2.*e));
  }
  float grain(vec2 uv,float t){
    return fract(sin(dot(uv*t,vec2(12.9898,78.233)))*43758.5453);
  }

  void main(){
    vec2 uv=gl_FragCoord.xy/u_resolution.xy;
    vec2 st=(uv-0.5)*2.; st.x*=u_resolution.x/u_resolution.y;
    float t=u_time*0.25;

    vec2 cf=curl(st*2.,t)*0.6, ff=st+cf;
    float d1=fbm(ff*1.5+t*1.2,8)*0.4, d2=fbm(ff*2.3-t*0.8,6)*0.3;
    float d3=fbm(ff*3.1+t*1.8,4)*0.2, d4=fbm(ff*4.7-t*1.1,3)*0.15;
    float cells=smoothstep(0.1,0.7,voronoi(ff*2.5+t*0.5));
    float plas=plasma(ff+vec2(d1,d2),t*1.5)*0.2;
    float td=d1+d2+d3+d4+plas;

    float s1=smoothstep(0.3,0.7,sin((st.x+td)*15.+t*3.)*0.5+0.5);
    float s2=smoothstep(0.2,0.8,sin((st.x+td*0.7)*25.-t*2.)*0.5+0.5);
    float s3=smoothstep(0.4,0.6,sin((st.x+td*1.3)*35.+t*4.)*0.5+0.5);
    float cs=s1*0.6+s2*0.4+s3*0.5;

    float sh1=smoothstep(0.,1.,1.-abs(st.x+td*0.6));
    float sh2=smoothstep(0.1,0.9,1.-abs(st.x+td*0.4+sin(st.y*3.+t)*0.15));
    float sh3=smoothstep(0.2,0.8,1.-abs(st.x+td*0.8+cos(st.y*2.-t)*0.1));
    float fs=max(sh1*0.8,max(sh2*0.6,sh3*0.4));

    vec3 c1=vec3(1.,.1,.6),c2=vec3(1.,.3,.1),c3=vec3(.9,.1,1.),
         c4=vec3(.1,.5,1.),c5=vec3(.1,1.,.9),c6=vec3(.3,.1,.9),c7=vec3(1.,.8,.1);
    float g=1.-uv.y;
    float cn=fbm(ff*3.+t*0.5,4)*0.5+0.5, cs2=sin(t*1.5+st.y*2.)*0.5+0.5;
    vec3 fc;
    fc=mix(c6,c7,smoothstep(0.,.15,g));fc=mix(fc,c5,smoothstep(.15,.3,g));
    fc=mix(fc,c4,smoothstep(.3,.5,g));fc=mix(fc,c3,smoothstep(.5,.7,g));
    fc=mix(fc,c2,smoothstep(.7,.85,g));fc=mix(fc,c1,smoothstep(.85,1.,g));
    fc=mix(fc,c1,cn*0.82); fc=mix(fc,c5,cs2*0.5);

    vec3 ac=fc;
    ac.r=mix(fc.r,c1.r,length(cf*0.02)*2.);
    ac.b=mix(fc.b,c4.b,length(cf*0.02)*1.5);
    ac.g=mix(fc.g,c5.g,length(cf*0.02)*1.2);

    float p1=smoothstep(.3,.7,sin(t*3.+st.y*6.)*.5+.5),
          p2=smoothstep(.3,.7,sin(t*4.5-st.y*8.)*.5+.5);
    float ep=smoothstep(.3,.7,p1*p2);
    float intensity=fs*cs*(1.+ep*0.4)*(1.+cells*0.2)*u_intensity;

    vec2 mouse=u_mouse/u_resolution.xy; mouse=(mouse-0.5)*2.; mouse.x*=u_resolution.x/u_resolution.y;
    float mi=smoothstep(0.,1.,max(0.,1.-length(st-mouse)*0.6));
    intensity+=mi*0.6;

    vec3 result=mix(ac,c1,0.3)*intensity;
    result+=smoothstep(0.4,1.,intensity)*0.54*fc;
    result=pow(result,vec3(0.85));
    result=mix(result,result*result,0.2);
    float vign=smoothstep(0.2,1.,1.-length(uv-0.5)*0.85);
    result=mix(vec3(0.,0.,0.),result,smoothstep(0.,0.4,intensity))*vign;
    result=mix(vec3(dot(result,vec3(0.299,0.587,0.114))),result,1.3);
    result+=(grain(uv,t*0.5)*2.-1.)*0.11;
    result+=sin(uv.y*u_resolution.y*2.)*0.04;

    gl_FragColor=vec4(result,intensity*0.9+0.05);
  }
`

interface Props {
  className?: string
}

export function RevolutionShader({ className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const glRef = useRef<WebGLRenderingContext | null>(null)
  const programRef = useRef<WebGLProgram | null>(null)
  const bufferRef = useRef<WebGLBuffer | null>(null)
  const uniformsRef = useRef({
    pos: 0,
    time: null as WebGLUniformLocation | null,
    res: null as WebGLUniformLocation | null,
    mouse: null as WebGLUniformLocation | null,
    intensity: null as WebGLUniformLocation | null,
  })
  const startRef = useRef(Date.now())
  const [globalIntensity, setGlobalIntensity] = useState(1.0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false })
    if (!gl) return
    glRef.current = gl

    function makeShader(type: number, src: string) {
      const s = gl!.createShader(type)!
      gl!.shaderSource(s, src)
      gl!.compileShader(s)
      return s
    }

    const prog = gl.createProgram()!
    gl.attachShader(prog, makeShader(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, makeShader(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    programRef.current = prog

    const buf = gl.createBuffer()!
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW)
    bufferRef.current = buf

    uniformsRef.current = {
      pos: gl.getAttribLocation(prog, "position"),
      time: gl.getUniformLocation(prog, "u_time"),
      res: gl.getUniformLocation(prog, "u_resolution"),
      mouse: gl.getUniformLocation(prog, "u_mouse"),
      intensity: gl.getUniformLocation(prog, "u_intensity"),
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect()
      canvas!.width = rect.width * window.devicePixelRatio
      canvas!.height = rect.height * window.devicePixelRatio
      gl!.viewport(0, 0, canvas!.width, canvas!.height)
    }
    const ro = new ResizeObserver(resize)
    ro.observe(canvas.parentElement ?? canvas)
    resize()

    const onMove = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect()
      mouseRef.current.x = (e.clientX - rect.left) * window.devicePixelRatio
      mouseRef.current.y = (rect.height - (e.clientY - rect.top)) * window.devicePixelRatio
      gsap.to({ v: globalIntensity }, { v: 1.15, duration: 0.3, ease: "power2.out", onUpdate: function() { setGlobalIntensity(this.targets()[0].v) } })
      gsap.to({ v: 1.15 }, { v: 1.0, duration: 1.0, delay: 0.1, ease: "power2.out", onUpdate: function() { setGlobalIntensity(this.targets()[0].v) } })
    }
    canvas.addEventListener("mousemove", onMove)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      canvas.removeEventListener("mousemove", onMove)
    }
  }, [])

  useEffect(() => {
    const gl = glRef.current
    const prog = programRef.current
    const buf = bufferRef.current
    const u = uniformsRef.current
    if (!gl || !prog || !buf) return

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE)

    function frame() {
      const t = (Date.now() - startRef.current) * 0.001
      gl!.useProgram(prog)
      gl!.bindBuffer(gl!.ARRAY_BUFFER, buf)
      gl!.enableVertexAttribArray(u.pos)
      gl!.vertexAttribPointer(u.pos, 2, gl!.FLOAT, false, 0, 0)
      gl!.uniform1f(u.time, t)
      gl!.uniform2f(u.res, gl!.canvas.width, gl!.canvas.height)
      gl!.uniform2f(u.mouse, mouseRef.current.x, mouseRef.current.y)
      gl!.uniform1f(u.intensity, globalIntensity)
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4)
      rafRef.current = requestAnimationFrame(frame)
    }
    rafRef.current = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(rafRef.current)
  }, [globalIntensity])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ mixBlendMode: "screen" }}
    />
  )
}
