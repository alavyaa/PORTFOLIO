// src/hooks/useScrollSpeed.js
import { useState, useEffect, useRef } from 'react'

export function useScrollSpeed() {
  const [speed, setSpeed] = useState(0)
  const lastScrollY = useRef(0)
  const lastTime = useRef(Date.now())
  const rafId = useRef(null)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        rafId.current = requestAnimationFrame(() => {
          const now = Date.now()
          const dt = now - lastTime.current
          const dy = Math.abs(window.scrollY - lastScrollY.current)
          const currentSpeed = dt > 0 ? dy / dt : 0

          setSpeed(currentSpeed)
          lastScrollY.current = window.scrollY
          lastTime.current = now
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  return speed
}