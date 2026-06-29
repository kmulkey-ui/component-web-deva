(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,19116,e=>{"use strict";var t=e.i(23817),n=e.i(63351);e.s(["HoverButton",0,({children:e,onClick:o,className:r="",disabled:l=!1,glowColor:s="#00ffc3",backgroundColor:a="#111827",textColor:i="#ffffff",hoverTextColor:c="#67e8f9"})=>{let u=(0,n.useRef)(null),[d,f]=(0,n.useState)({x:50,y:50}),[p,x]=(0,n.useState)(!1);return(0,t.jsxs)("button",{ref:u,onClick:o,disabled:l,onMouseMove:e=>{if(u.current){let t=u.current.getBoundingClientRect();f({x:e.clientX-t.left,y:e.clientY-t.top})}},onMouseEnter:()=>{x(!0)},onMouseLeave:()=>{x(!1)},className:`
        relative inline-block px-8 py-4 border-none 
        cursor-pointer overflow-hidden transition-colors duration-300 
        text-xl rounded-lg z-10 font-sans
        ${l?"opacity-50 cursor-not-allowed":""}
        ${r}
      `,style:{backgroundColor:a,color:p?c:i},children:[(0,t.jsx)("div",{className:`
          absolute w-[200px] h-[200px] rounded-full opacity-50 pointer-events-none 
          transition-transform duration-400 ease-out -translate-x-1/2 -translate-y-1/2
          ${p?"scale-120":"scale-0"}
        `,style:{left:`${d.x}px`,top:`${d.y}px`,background:`radial-gradient(circle, ${s} 10%, transparent 70%)`,zIndex:0}}),(0,t.jsx)("span",{className:"relative z-10",children:e})]})}])},55677,e=>{e.n(e.i(19116))}]);