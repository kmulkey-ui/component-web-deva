'use client'

import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'

export const BackgroundGradientAnimation = ({
  firstColor = '197, 1, 225',
  secondColor = '154, 38, 248',
  thirdColor = '101, 100, 254',
  fourthColor = '43, 151, 250',
  fifthColor = '46, 249, 160',
  pointerColor = '248, 45, 152',
  size = '50%',
  blendingValue = 'hard-light',
  children,
  className,
  interactive = true,
  containerClassName,
}: {
  firstColor?: string
  secondColor?: string
  thirdColor?: string
  fourthColor?: string
  fifthColor?: string
  pointerColor?: string
  size?: string
  blendingValue?: string
  children?: React.ReactNode
  className?: string
  interactive?: boolean
  containerClassName?: string
}) => {
  const interactiveRef = useRef<HTMLDivElement>(null)
  const curXRef = useRef(0)
  const curYRef = useRef(0)
  const tgXRef = useRef(0)
  const tgYRef = useRef(0)
  const animationFrameRef = useRef<number | null>(null)
  const [isSafari, setIsSafari] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    el.style.setProperty('--first-color', firstColor)
    el.style.setProperty('--second-color', secondColor)
    el.style.setProperty('--third-color', thirdColor)
    el.style.setProperty('--fourth-color', fourthColor)
    el.style.setProperty('--fifth-color', fifthColor)
    el.style.setProperty('--pointer-color', pointerColor)
    el.style.setProperty('--size', size)
    el.style.setProperty('--blending-value', blendingValue)
    el.style.setProperty('--gradient-background-start', '#0b0b1a')
    el.style.setProperty('--gradient-background-end', '#110b22')
  }, [firstColor, secondColor, thirdColor, fourthColor, fifthColor, pointerColor, size, blendingValue])

  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent))
  }, [])

  useEffect(() => {
    if (!interactive) return

    function animateMovement() {
      if (!interactiveRef.current) {
        animationFrameRef.current = requestAnimationFrame(animateMovement)
        return
      }
      curXRef.current = curXRef.current + (tgXRef.current - curXRef.current) / 20
      curYRef.current = curYRef.current + (tgYRef.current - curYRef.current) / 20
      interactiveRef.current.style.transform = `translate(${Math.round(curXRef.current)}px, ${Math.round(curYRef.current)}px)`
      animationFrameRef.current = requestAnimationFrame(animateMovement)
    }

    animationFrameRef.current = requestAnimationFrame(animateMovement)
    return () => {
      if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current)
    }
  }, [interactive])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    tgXRef.current = event.clientX - rect.left
    tgYRef.current = event.clientY - rect.top
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={classNames(
        'relative overflow-hidden bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]',
        containerClassName,
      )}
    >
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div className={classNames('relative z-10', className)}>{children}</div>

      <div
        className={classNames(
          'absolute inset-0 gradients-container blur-lg',
          isSafari ? 'blur-2xl' : '[filter:url(#blurMe)_blur(40px)]',
        )}
      >
        <div className="absolute [background:radial-gradient(circle_at_center,_rgb(var(--first-color))_0,_rgb(var(--first-color))_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] [transform-origin:center_center] animate-gradient-first opacity-100" />
        <div className="absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] [transform-origin:calc(50%-400px)] animate-gradient-second opacity-100" />
        <div className="absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] [transform-origin:calc(50%+400px)] animate-gradient-third opacity-100" />
        <div className="absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.8)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] [transform-origin:calc(50%-200px)] animate-gradient-fourth opacity-70" />
        <div className="absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.8)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] [transform-origin:calc(50%-800px)_calc(50%+800px)] animate-gradient-fifth opacity-100" />

        {interactive && (
          <div
            ref={interactiveRef}
            className="absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-full h-full -top-1/2 -left-1/2 opacity-70"
          />
        )}
      </div>
    </div>
  )
}
