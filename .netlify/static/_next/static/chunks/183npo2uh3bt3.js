(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,83114,r=>{"use strict";var e=r.i(23817);let a={primary:"#584827",secondary:"#c7a03c",accent:"#f9de90"};r.s(["BorderRotate",0,({children:r,className:o="",animationMode:t="auto-rotate",animationSpeed:n=5,gradientColors:d=a,backgroundColor:i="#2d230f",borderWidth:c=2,borderRadius:s=20,style:g={},...b})=>{let p={"--gradient-primary":d.primary,"--gradient-secondary":d.secondary,"--gradient-accent":d.accent,"--bg-color":i,"--border-width":`${c}px`,"--border-radius":`${s}px`,"--animation-duration":`${n}s`,border:`${c}px solid transparent`,borderRadius:`${s}px`,backgroundImage:`
      linear-gradient(${i}, ${i}),
      conic-gradient(
        from var(--gradient-angle, 0deg),
        ${d.primary} 0%,
        ${d.secondary} 37%,
        ${d.accent} 30%,
        ${d.secondary} 33%,
        ${d.primary} 40%,
        ${d.primary} 50%,
        ${d.secondary} 77%,
        ${d.accent} 80%,
        ${d.secondary} 83%,
        ${d.primary} 90%
      )
    `,backgroundClip:"padding-box, border-box",backgroundOrigin:"padding-box, border-box",...g};return(0,e.jsx)("div",{className:`gradient-border-component ${(()=>{switch(t){case"auto-rotate":return"gradient-border-auto";case"rotate-on-hover":return"gradient-border-hover";case"stop-rotate-on-hover":return"gradient-border-stop-hover";default:return""}})()} ${o}`,style:p,...b,children:r})}])},42911,r=>{r.n(r.i(83114))}]);