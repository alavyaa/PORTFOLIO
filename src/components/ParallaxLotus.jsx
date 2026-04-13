// src/components/ParallaxLotus.jsx — FIXED
import React, { useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

function FloatingLotusElement({ style, speed, size, opacity }) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 5000], [0, speed * 500])
  const rotate = useTransform(scrollY, [0, 5000], [0, speed * 180])

  return (
    <motion.div
      className="fixed" // NOT pointer-events-none anymore — but positioned behind content via z-index
      style={{
        ...style,
        y,
        rotate,
        zIndex: 0, // ← KEY FIX: Behind everything
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        style={{ opacity }}
      >
        <path
          d="M20 4C20 4 26 14 26 20C26 26 20 32 20 32C20 32 14 26 14 20C14 20 4 20 4 20Z"
          stroke="#d4af37"
          strokeWidth="0.5"
          fill="none"
          opacity="0.3"
        />
      </svg>
    </motion.div>
  )
}

export default function ParallaxLotus() {
  const elements = useMemo(
    () => [
      { style: { left: '5%', top: '15%' }, speed: -0.8, size: 40, opacity: 0.15 },
      { style: { right: '8%', top: '25%' }, speed: -1.2, size: 30, opacity: 0.1 },
      { style: { left: '15%', top: '45%' }, speed: -0.5, size: 50, opacity: 0.08 },
      { style: { right: '20%', top: '55%' }, speed: -1.5, size: 35, opacity: 0.12 },
      { style: { left: '80%', top: '70%' }, speed: -0.3, size: 45, opacity: 0.06 },
    ],
    []
  )

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      {elements.map((el, i) => (
        <FloatingLotusElement key={i} {...el} />
      ))}
    </div>
  )
}