// src/components/TemporalShred.jsx — FIXED
import React, { useEffect, useRef } from 'react'
import { useScrollSpeed } from '../hooks/useScrollSpeed'

export default function TemporalShred() {
  const speed = useScrollSpeed()
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    let animFrameId
    const render = () => {
      if (speed < 3) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        animFrameId = requestAnimationFrame(render)
        return
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const intensity = Math.min(speed / 15, 0.8)

      for (let i = 0; i < 5 + intensity * 8; i++) {
        const y = Math.random() * canvas.height
        const h = 1 + Math.random() * 3 * intensity
        const offset = (Math.random() - 0.5) * 15 * intensity

        ctx.fillStyle = `rgba(0, 229, 255, ${0.02 * intensity})`
        ctx.fillRect(offset, y, canvas.width, h)
      }

      animFrameId = requestAnimationFrame(render)
    }

    animFrameId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animFrameId)
    }
  }, [speed])

  return (
    // KEY FIXES: pointer-events-none AND z-index below content
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[5]"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}