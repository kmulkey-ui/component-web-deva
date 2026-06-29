(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,68880,e=>{"use strict";var s=e.i(23817),t=e.i(63351);e.s(["WaitlistHero",0,()=>{let[e,a]=(0,t.useState)(""),[l,i]=(0,t.useState)("idle"),r=(0,t.useRef)(null),o="#ffffff",n="#09090b";return(0,s.jsxs)("div",{className:"w-full min-h-screen bg-black flex items-center justify-center",children:[(0,s.jsx)("style",{children:`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 60s linear infinite;
        }
        @keyframes spin-slow-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 60s linear infinite;
        }
        @keyframes bounce-in {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-bounce-in {
          animation: bounce-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        @keyframes success-pulse {
          0% { transform: scale(0.5); opacity: 0; }
          50% { transform: scale(1.1); }
          70% { transform: scale(0.95); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes success-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.4); }
          50% { box-shadow: 0 0 60px rgba(16, 185, 129, 0.8), 0 0 100px rgba(16, 185, 129, 0.4); }
        }
        @keyframes checkmark-draw {
          0% { stroke-dashoffset: 24; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes celebration-ring {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
        }
        .animate-success-pulse {
          animation: success-pulse 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        .animate-success-glow {
          animation: success-glow 2s ease-in-out infinite;
        }
        .animate-checkmark {
          stroke-dasharray: 24;
          stroke-dashoffset: 24;
          animation: checkmark-draw 0.4s ease-out 0.3s forwards;
        }
        .animate-ring {
          animation: celebration-ring 0.8s ease-out forwards;
        }
      `}),(0,s.jsxs)("div",{className:"relative w-full h-screen overflow-hidden shadow-2xl",style:{backgroundColor:n,fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'},children:[(0,s.jsxs)("div",{className:"absolute inset-0 w-full h-full pointer-events-none",style:{perspective:"1200px",transform:"perspective(1200px) rotateX(15deg)",transformOrigin:"center bottom",opacity:1},children:[(0,s.jsx)("div",{className:"absolute inset-0 animate-spin-slow",children:(0,s.jsx)("div",{className:"absolute top-1/2 left-1/2",style:{width:"2000px",height:"2000px",transform:"translate(-50%, -50%) rotate(279.05deg)",zIndex:0},children:(0,s.jsx)("img",{src:"https://framerusercontent.com/images/oqZEqzDEgSLygmUDuZAYNh2XQ9U.png?scale-down-to=2048",alt:"",className:"w-full h-full object-cover opacity-50"})})}),(0,s.jsx)("div",{className:"absolute inset-0 animate-spin-slow-reverse",children:(0,s.jsx)("div",{className:"absolute top-1/2 left-1/2",style:{width:"1000px",height:"1000px",transform:"translate(-50%, -50%) rotate(304.42deg)",zIndex:1},children:(0,s.jsx)("img",{src:"https://framerusercontent.com/images/UbucGYsHDAUHfaGZNjwyCzViw8.png?scale-down-to=1024",alt:"",className:"w-full h-full object-cover opacity-60"})})}),(0,s.jsx)("div",{className:"absolute inset-0 animate-spin-slow",children:(0,s.jsx)("div",{className:"absolute top-1/2 left-1/2",style:{width:"800px",height:"800px",transform:"translate(-50%, -50%) rotate(48.33deg)",zIndex:2},children:(0,s.jsx)("img",{src:"https://framerusercontent.com/images/Ans5PAxtJfg3CwxlrPMSshx2Pqc.png",alt:"App Icon",className:"w-full h-full object-cover opacity-80"})})})]}),(0,s.jsx)("div",{className:"absolute inset-0 z-10 pointer-events-none",style:{background:`linear-gradient(to top, ${n} 10%, rgba(9, 9, 11, 0.8) 40%, transparent 100%)`}}),(0,s.jsxs)("div",{className:"relative z-20 w-full h-full flex flex-col items-center justify-end pb-24 gap-6",children:[(0,s.jsx)("div",{className:"w-16 h-16 rounded-2xl shadow-lg overflow-hidden mb-2 ring-1 ring-white/10",children:(0,s.jsx)("img",{src:"https://images.unsplash.com/photo-1684369175833-4b445ad6bfb5?q=80&w=1696&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",alt:"App Icon",className:"w-full h-full object-cover"})}),(0,s.jsx)("h1",{className:"text-5xl md:text-6xl font-bold text-center tracking-tight",style:{color:o},children:"Take a screenshot."}),(0,s.jsx)("p",{className:"text-lg font-medium",style:{color:"#94a3b8"},children:"Save anything with a screenshot."}),(0,s.jsxs)("div",{className:"w-full max-w-md px-4 mt-4 h-[60px] relative perspective-1000",children:[(0,s.jsx)("canvas",{ref:r,className:"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none z-50"}),(0,s.jsxs)("div",{className:`absolute inset-0 flex items-center justify-center rounded-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${"success"===l?"opacity-100 scale-100 rotate-x-0 animate-success-pulse animate-success-glow":"opacity-0 scale-95 -rotate-x-90 pointer-events-none"}`,style:{backgroundColor:"#10b981"},children:["success"===l&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("div",{className:"absolute top-1/2 left-1/2 w-full h-full rounded-full border-2 border-emerald-400 animate-ring",style:{animationDelay:"0s"}}),(0,s.jsx)("div",{className:"absolute top-1/2 left-1/2 w-full h-full rounded-full border-2 border-emerald-300 animate-ring",style:{animationDelay:"0.15s"}}),(0,s.jsx)("div",{className:"absolute top-1/2 left-1/2 w-full h-full rounded-full border-2 border-emerald-200 animate-ring",style:{animationDelay:"0.3s"}})]}),(0,s.jsxs)("div",{className:`flex items-center gap-2 text-white font-semibold text-lg ${"success"===l?"animate-bounce-in":""}`,children:[(0,s.jsx)("div",{className:"bg-white/20 p-1 rounded-full",children:(0,s.jsx)("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,s.jsx)("path",{className:"success"===l?"animate-checkmark":"",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:3,d:"M5 13l4 4L19 7"})})}),(0,s.jsx)("span",{children:"You're on the list!"})]})]}),(0,s.jsxs)("form",{onSubmit:s=>{s.preventDefault(),e&&(i("loading"),setTimeout(()=>{i("success"),a(""),(()=>{let e=r.current;if(!e)return;let s=e.getContext("2d"),t=[],a=["#0079da","#10b981","#fbbf24","#f472b6","#fff"];e.width=e.offsetWidth,e.height=e.offsetHeight;let l=()=>({x:e.width/2,y:e.height/2,vx:(Math.random()-.5)*12,vy:(Math.random()-2)*10,life:100,color:a[Math.floor(Math.random()*a.length)],size:4*Math.random()+2});for(let e=0;e<50;e++)t.push(l());let i=()=>{if(0===t.length)return void s.clearRect(0,0,e.width,e.height);s.clearRect(0,0,e.width,e.height);for(let e=0;e<t.length;e++){let a=t[e];a.x+=a.vx,a.y+=a.vy,a.vy+=.5,a.life-=2,s.fillStyle=a.color,s.globalAlpha=Math.max(0,a.life/100),s.beginPath(),s.arc(a.x,a.y,a.size,0,2*Math.PI),s.fill(),a.life<=0&&(t.splice(e,1),e--)}requestAnimationFrame(i)};i()})()},1500))},className:`relative w-full h-full group transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${"success"===l?"opacity-0 scale-95 rotate-x-90 pointer-events-none":"opacity-100 scale-100 rotate-x-0"}`,children:[(0,s.jsx)("input",{type:"email",required:!0,placeholder:"name@email.com",value:e,disabled:"loading"===l,onChange:e=>a(e.target.value),className:"w-full h-[60px] pl-6 pr-[150px] rounded-full outline-none transition-all duration-200 placeholder-zinc-500 disabled:opacity-70 disabled:cursor-not-allowed",style:{backgroundColor:"#27272a",color:o,boxShadow:"inset 0 0 0 1px rgba(255, 255, 255, 0.1)"}}),(0,s.jsx)("div",{className:"absolute top-[6px] right-[6px] bottom-[6px]",children:(0,s.jsx)("button",{type:"submit",disabled:"loading"===l,className:"h-full px-6 rounded-full font-medium text-white transition-all active:scale-95 hover:brightness-110 disabled:hover:brightness-100 disabled:active:scale-100 disabled:cursor-wait flex items-center justify-center min-w-[130px]",style:{backgroundColor:"#0079da"},children:"loading"===l?(0,s.jsxs)("svg",{className:"animate-spin h-5 w-5 text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[(0,s.jsx)("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),(0,s.jsx)("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}):"Join waitlist"})})]})]})]})]})]})}])},13771,e=>{e.n(e.i(68880))}]);