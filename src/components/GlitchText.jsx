// src/components/GlitchText.jsx
import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

const VARIANTS = [
  { font: 'Cinzel', size: '5rem', weight: 900, style: 'normal' },
  { font: 'Georgia', size: '4rem', weight: 400, style: 'italic' },
  { font: 'Courier New', size: '3.5rem', weight: 700, style: 'normal' },
  { font: 'Impact', size: '4.5rem', weight: 400, style: 'normal' },
  { font: 'Times New Roman', size: '4rem', weight: 700, style: 'italic' },
  { font: 'Arial Black', size: '3rem', weight: 900, style: 'normal' },
  { font: 'Cinzel', size: '4rem', weight: 400, style: 'normal' },
]

export default function GlitchText({ text, className = '' }) {
  const [currentVariant, setCurrentVariant] = useState(0)
  const [isGlitching, setIsGlitching] = useState(true)
  const [finalReveal, setFinalReveal] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    let count = 0
    const maxGlitches = 12

    intervalRef.current = setInterval(() => {
      count++
      setCurrentVariant(Math.floor(Math.random() * VARIANTS.length))

      if (count >= maxGlitches) {
        clearInterval(intervalRef.current)
        setIsGlitching(false)
        setFinalReveal(true)
      }
    }, 120)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const variant = VARIANTS[currentVariant]

  if (finalReveal) {
    return (
      <motion.h1
        className={`font-cinzel text-lotus-gold ${className}`}
        initial={{ opacity: 0, scale: 1.2, filter: 'blur(8px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        style={{ fontSize: 'clamp(2rem, 6vw, 5rem)', fontWeight: 700 }}
      >
        {text}
      </motion.h1>
    )
  }

  return (
    <motion.h1
      className={className}
      style={{
        fontFamily: variant.font,
        fontSize: variant.size,
        fontWeight: variant.weight,
        fontStyle: variant.style,
        color: '#d4af37',
        opacity: isGlitching ? 0.7 : 1,
        filter: isGlitching ? `hue-rotate(${Math.random() * 360}deg)` : 'none',
        textShadow: isGlitching
          ? `${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 rgba(0,229,255,0.5), ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 rgba(212,175,55,0.5)`
          : 'none',
        transition: 'all 0.05s',
      }}
    >
      {text.split('').map((char, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            transform: isGlitching
              ? `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`
              : 'none',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </motion.h1>
  )
}