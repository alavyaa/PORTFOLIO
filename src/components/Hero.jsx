// src/components/Hero.jsx
import React from 'react'
import { motion } from 'framer-motion'
import LotusScene from './LotusScene'
import GlitchText from './GlitchText'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-lotus-charcoal via-lotus-charcoal to-lotus-green-dark" />

      {/* 3D Lotus Scene */}
      <LotusScene />

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mb-4"
        >
          <span className="font-body text-sm tracking-[0.5em] text-lotus-teal/80 uppercase">
            A Portfolio Experience
          </span>
        </motion.div>

        <GlitchText
          text="ALAVYA BAJPAI"
          className="leading-tight tracking-[0.15em]"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="mt-2 flex flex-col items-center gap-3"
        >
          <p className="max-w-md font-body text-base font-light text-black/80 md:text-lg drop-shadow-[0_0_12px_rgba(0,0,0,0.9)]">
            Engineered with intent. Designed to leave an impression.
          </p>
          
          <motion.div
            className="mt-4 h-[1px] w-32 bg-gradient-to-r from-transparent via-lotus-gold to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 3, duration: 1 }}
          />
        </motion.div>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
          className="mt-8"
          data-cursor-hover
        >
          <motion.div
            className="flex flex-col items-center gap-2 text-lotus-gold/60"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="font-body text-xs tracking-[0.3em] uppercase">
              Enter the Timeline
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M10 3v14M5 12l5 5 5-5" />
            </svg>
          </motion.div>
        </motion.a>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-lotus-charcoal to-transparent" />
    </section>
  )
}