// src/App.jsx — COMPLETE with new loading screen
import React, { useEffect, useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Timeline from './components/Timeline'
import Multiverse from './components/Multiverse'
import Contact from './components/Contact'
import ParallaxLotus from './components/ParallaxLotus'
import TemporalShred from './components/TemporalShred'

const RUNES = 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛈᛇᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟᚪᚫᚣᛝᛡᛠ'

// ── Utility: scramble text through runes ─────────────────────
function useRuneScramble(finalText, speed = 45) {
  const [display, setDisplay] = useState('')

  useEffect(() => {
    let iteration = 0
    const max = finalText.length * 4

    const id = setInterval(() => {
      setDisplay(
        finalText
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (i < Math.floor(iteration / 4)) return finalText[i]
            return RUNES[Math.floor(Math.random() * RUNES.length)]
          })
          .join('')
      )
      iteration++
      if (iteration > max) {
        clearInterval(id)
        setDisplay(finalText)
      }
    }, speed)

    return () => clearInterval(id)
  }, [finalText, speed])

  return display
}

// ── Animated counter ─────────────────────────────────────────
function useCounter(target, duration = 2400) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [target, duration])

  return count
}

// ── Single orbital ring ──────────────────────────────────────
function OrbitalRing({ radius, duration, reverse, color, opacity, thickness = 1 }) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 rounded-full"
      style={{
        width: radius * 2,
        height: radius * 2,
        marginLeft: -radius,
        marginTop: -radius,
        border: `${thickness}px solid ${color}`,
        opacity,
        boxShadow: `0 0 12px ${color}, inset 0 0 12px ${color}`,
      }}
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    >
      {/* Bright node on the ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: thickness === 1 ? 4 : 6,
          height: thickness === 1 ? 4 : 6,
          background: color,
          top: -((thickness === 1 ? 4 : 6) / 2),
          left: '50%',
          marginLeft: -((thickness === 1 ? 4 : 6) / 2),
          boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
        }}
      />
    </motion.div>
  )
}

// ── Central lotus symbol ─────────────────────────────────────
function CentralLotus({ phase }) {
  const petalAngles = [0, 60, 120, 180, 240, 300]

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      {/* Petals */}
      {petalAngles.map((angle, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: 3,
            height: 28,
            left: '50%',
            top: '50%',
            marginLeft: -1.5,
            marginTop: -28,
            transformOrigin: 'bottom center',
            transform: `rotate(${angle}deg)`,
          }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{
            scaleY: phase >= 1 ? 1 : 0,
            opacity: phase >= 1 ? [0.5, 1, 0.5] : 0,
          }}
          transition={{
            scaleY: { delay: i * 0.08, duration: 0.5, ease: 'backOut' },
            opacity: {
              delay: i * 0.08 + 0.5,
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse',
            },
          }}
        >
          <div
            className="h-full w-full rounded-full"
            style={{
              background: `linear-gradient(to top, transparent, ${
                i % 2 === 0 ? '#d4af37' : '#00e5ff'
              })`,
              boxShadow: `0 0 8px ${i % 2 === 0 ? '#d4af37' : '#00e5ff'}`,
            }}
          />
        </motion.div>
      ))}

      {/* Center jewel */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ width: 12, height: 12 }}
        initial={{ scale: 0 }}
        animate={
          phase >= 1
            ? {
                scale: [1, 1.3, 1],
                boxShadow: [
                  '0 0 10px #d4af37, 0 0 20px #d4af37',
                  '0 0 20px #d4af37, 0 0 40px #d4af37, 0 0 60px rgba(212,175,55,0.4)',
                  '0 0 10px #d4af37, 0 0 20px #d4af37',
                ],
                background: ['#d4af37', '#f5e17a', '#d4af37'],
              }
            : { scale: 0 }
        }
        transition={{
          scale: { delay: 0.3, duration: 0.5, ease: 'backOut' },
          boxShadow: { duration: 2, repeat: Infinity },
          background: { duration: 2, repeat: Infinity },
        }}
      />
    </div>
  )
}

// ── Glitching TVA-style data lines ───────────────────────────
function DataLines({ visible }) {
  const lines = [
    'TIMELINE VARIANT: α-7734',
    'NEXUS EVENT DETECTED',
    'TEMPORAL SIGNATURE: PRUNED',
    'SACRED TIMELINE: RESTORED',
    'IDENTITY CONFIRMED',
    'CLEARANCE: ANALYST TIER',
  ]

  return (
    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 px-8">
      {/* Left column */}
      <div className="absolute left-8 top-0 -translate-y-1/2 space-y-2">
        {lines.slice(0, 3).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 + i * 0.15, duration: 0.4 }}
            className="font-mono text-[9px] tracking-[0.2em]"
            style={{ color: 'rgba(0,229,255,0.4)' }}
          >
            {line}
          </motion.div>
        ))}
      </div>

      {/* Right column */}
      <div className="absolute right-8 top-0 -translate-y-1/2 space-y-2 text-right">
        {lines.slice(3).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 + i * 0.15, duration: 0.4 }}
            className="font-mono text-[9px] tracking-[0.2em]"
            style={{ color: 'rgba(212,175,55,0.35)' }}
          >
            {line}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ── Scanlines overlay ────────────────────────────────────────
function Scanlines() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        background: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0,0,0,0.06) 2px,
          rgba(0,0,0,0.06) 4px
        )`,
        zIndex: 10,
      }}
    />
  )
}

// ── Corner brackets (TVA terminal UI) ───────────────────────
function CornerBrackets({ visible }) {
  const corners = [
    { top: 24, left: 24, rotate: 0 },
    { top: 24, right: 24, rotate: 90 },
    { bottom: 24, right: 24, rotate: 180 },
    { bottom: 24, left: 24, rotate: 270 },
  ]

  return (
    <>
      {corners.map((style, i) => (
        <motion.div
          key={i}
          className="absolute h-8 w-8"
          style={{
            ...style,
            borderTop: i === 0 || i === 3 ? '1px solid rgba(212,175,55,0.5)' : 'none',
            borderBottom: i === 1 || i === 2 ? '1px solid rgba(212,175,55,0.5)' : 'none',
            borderLeft: i === 0 || i === 2 ? '1px solid rgba(212,175,55,0.5)' : 'none',
            borderRight: i === 1 || i === 3 ? '1px solid rgba(212,175,55,0.5)' : 'none',
          }}
          initial={{ opacity: 0, scale: 1.5 }}
          animate={visible ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: i * 0.1, duration: 0.4, ease: 'backOut' }}
        />
      ))}
    </>
  )
}

// ── THE LOADING SCREEN ───────────────────────────────────────
function LoadingScreen() {
  const [phase, setPhase] = useState(0)
  // 0 = boot  |  1 = portal forming  |  2 = identity  |  3 = ready
  const [progress, setProgress] = useState(0)

  const nameText = useRuneScramble(
    phase >= 2 ? 'ALAVYA BAJPAI' : '',
    40
  )
  const taglineText = useRuneScramble(
    phase >= 2 ? 'MASTER OF ORDERED CHAOS' : '',
    55
  )
  const percentage = useCounter(100, 2400)

  // Phase sequencing
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 2000),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  // Progress bar
  useEffect(() => {
    const start = Date.now()
    const duration = 2600
    const tick = () => {
      const pct = Math.min(((Date.now() - start) / duration) * 100, 100)
      setProgress(pct)
      if (pct < 100) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [])

  return (
    <motion.div
      key="loader"
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ background: '#080808' }}
      exit={{
        opacity: 0,
        scale: 1.08,
        filter: 'blur(16px) brightness(2)',
      }}
      transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
    >
      <Scanlines />

      {/* ── Background radial ambient ── */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(6,57,44,0.4) 0%, transparent 70%)',
        }}
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* ── Gold burst behind portal ── */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 280,
          height: 280,
          background:
            'radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* ── Corner brackets ── */}
      <CornerBrackets visible={phase >= 1} />

      {/* ── Side data lines ── */}
      <DataLines visible={phase >= 2} />

      {/* ── Orbital rings ── */}
      <AnimatePresence>
        {phase >= 1 && (
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'backOut' }}
          >
            <OrbitalRing
              radius={70}
              duration={6}
              reverse={false}
              color="rgba(212,175,55,0.7)"
              opacity={1}
              thickness={1}
            />
            <OrbitalRing
              radius={100}
              duration={10}
              reverse={true}
              color="rgba(0,229,255,0.5)"
              opacity={1}
              thickness={1}
            />
            <OrbitalRing
              radius={130}
              duration={14}
              reverse={false}
              color="rgba(212,175,55,0.3)"
              opacity={1}
              thickness={1}
            />
            <OrbitalRing
              radius={158}
              duration={18}
              reverse={true}
              color="rgba(0,229,255,0.2)"
              opacity={1}
              thickness={1}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Central lotus ── */}
      <CentralLotus phase={phase} />

      {/* ── Main text block ── */}
      <div className="relative z-20 flex flex-col items-center gap-5 text-center">
        {/* Name — only shows in phase 2+ */}
        <AnimatePresence>
          {phase >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col items-center gap-2"
              style={{ marginTop: 220 }}
            >
              {/* TVA label */}
              <div
                className="mb-1 font-mono text-[9px] tracking-[0.6em] uppercase"
                style={{ color: 'rgba(0,229,255,0.5)' }}
              >
                ⟁ TIME VARIANCE AUTHORITY ⟁
              </div>

              {/* Name */}
              <h1
                className="font-cinzel text-3xl font-bold tracking-[0.35em] md:text-4xl"
                style={{
                  color: '#d4af37',
                  textShadow:
                    '0 0 20px rgba(212,175,55,0.7), 0 0 50px rgba(212,175,55,0.3)',
                  minWidth: '14ch',
                }}
              >
                {nameText}
              </h1>

              {/* Divider */}
              <motion.div
                className="my-1 h-[1px] w-48"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, #d4af37, transparent)',
                  boxShadow: '0 0 8px rgba(212,175,55,0.5)',
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              />

              {/* Tagline */}
              <p
                className="font-cinzel text-xs tracking-[0.25em]"
                style={{
                  color: 'rgba(0,229,255,0.7)',
                  textShadow: '0 0 12px rgba(0,229,255,0.4)',
                  minWidth: '22ch',
                }}
              >
                {taglineText}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress section — always visible */}
        <motion.div
          className="flex flex-col items-center gap-3"
          style={{ marginTop: phase >= 2 ? 24 : 220 }}
          animate={{ marginTop: phase >= 2 ? 24 : 220 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Status text */}
          <motion.div
            className="font-mono text-[10px] tracking-[0.4em]"
            style={{ color: 'rgba(212,175,55,0.5)' }}
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {phase === 0 && 'INITIALIZING SYSTEMS...'}
            {phase === 1 && 'OPENING TEMPORAL PORTAL...'}
            {phase === 2 && 'IDENTITY VERIFICATION...'}
            {phase === 3 && 'TIMELINE ACCESS GRANTED'}
          </motion.div>

          {/* Progress bar */}
          <div
            className="relative overflow-hidden rounded-full"
            style={{
              width: 220,
              height: 3,
              background: 'rgba(6,57,44,0.5)',
              boxShadow: 'inset 0 0 8px rgba(0,0,0,0.8)',
            }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #06392c, #d4af37, #00e5ff)',
                boxShadow: '0 0 10px rgba(212,175,55,0.6)',
              }}
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
            {/* Shimmer sweep */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              }}
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Percentage + label row */}
          <div className="flex items-center gap-4">
            <span
              className="font-mono text-[10px] tabular-nums"
              style={{ color: 'rgba(212,175,55,0.45)' }}
            >
              {percentage}%
            </span>
            <div
              className="h-[1px] w-8"
              style={{ background: 'rgba(212,175,55,0.2)' }}
            />
            <span
              className="font-mono text-[10px] tracking-[0.3em]"
              style={{ color: 'rgba(0,229,255,0.35)' }}
            >
              TVA
            </span>
          </div>
        </motion.div>
      </div>

      {/* ── Bottom ticker ── */}
      <motion.div
        className="absolute bottom-6 left-0 right-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <motion.div
          className="flex gap-12 whitespace-nowrap font-mono text-[8px] tracking-[0.3em]"
          style={{ color: 'rgba(212,175,55,0.25)' }}
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          {[...Array(6)].map((_, i) => (
            <span key={i}>
              ⟁ TIMELINE SECURED &nbsp;&nbsp; NEXUS EVENT: CONTAINED &nbsp;&nbsp;
              VARIANT: PRUNED &nbsp;&nbsp; SACRED TIMELINE: PROTECTED &nbsp;&nbsp;
              TEMPORAL CHARGE: ACTIVE &nbsp;&nbsp; REALITY INDEX: STABLE
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Top ticker ── */}
      <motion.div
        className="absolute top-6 left-0 right-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <motion.div
          className="flex gap-12 whitespace-nowrap font-mono text-[8px] tracking-[0.3em]"
          style={{ color: 'rgba(0,229,255,0.2)' }}
          animate={{ x: ['-50%', '0%'] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        >
          {[...Array(6)].map((_, i) => (
            <span key={i}>
              ⟁ TVA CLEARANCE ACTIVE &nbsp;&nbsp; TEMPORAL AURA DETECTED &nbsp;&nbsp;
              BRANCH TIMELINE: PRUNED &nbsp;&nbsp; INFINITY STONES: LOCATED &nbsp;&nbsp;
              LOOM STATUS: OPERATIONAL &nbsp;&nbsp; ALL VARIANTS: MONITORED
            </span>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// ── Main App ─────────────────────────────────────────────────
function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <CustomCursor />
      <TemporalShred />
      <ParallaxLotus />

      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loader" />
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative z-10"
          >
            <Navbar />

            <main className="relative">
              <Hero />

              <div className="relative z-10 mx-auto max-w-4xl px-6">
                <div className="h-[1px] bg-gradient-to-r from-transparent via-lotus-green/30 to-transparent" />
              </div>

              <About />

              <div className="relative z-10 mx-auto max-w-4xl px-6">
                <div className="h-[1px] bg-gradient-to-r from-transparent via-lotus-gold/20 to-transparent" />
              </div>

              <Timeline />

              <div className="relative z-10 mx-auto max-w-4xl px-6">
                <div className="h-[1px] bg-gradient-to-r from-transparent via-lotus-teal/20 to-transparent" />
              </div>

              <Multiverse />

              <div className="relative z-10 mx-auto max-w-4xl px-6">
                <div className="h-[1px] bg-gradient-to-r from-transparent via-lotus-green/30 to-transparent" />
              </div>

              <Contact />
            </main>

            {/* ── Footer ── */}
            <footer className="relative z-10 border-t border-lotus-green/20 bg-lotus-charcoal/50 py-10 backdrop-blur-sm">
              <div className="mx-auto max-w-6xl px-6">
                <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
                  <div className="text-center md:text-left">
                    <a
                      href="#hero"
                      className="font-cinzel text-sm tracking-[0.3em] text-lotus-gold/60 transition-colors hover:text-lotus-gold"
                      data-cursor-hover
                    >
                      ⟁ ALAVYA BAJPAI ⟁
                    </a>
                    <p className="mt-1 font-body text-xs text-lotus-white/20">
                      Forged in Ordered Chaos
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-6">
                    {[
                      { label: 'Arrival', href: '#hero' },
                      { label: 'Veil', href: '#about' },
                      { label: 'Timeline', href: '#timeline' },
                      { label: 'Multiverse', href: '#multiverse' },
                      { label: 'Contact', href: '#contact' },
                    ].map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="glow-line relative font-body text-xs text-lotus-white/30 transition-colors hover:text-lotus-gold"
                        data-cursor-hover
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>

                  <div className="text-center md:text-right">
                    <p className="font-body text-xs text-lotus-white/20">
                      © {new Date().getFullYear()} All timelines reserved.
                    </p>
                    <p className="mt-1 font-body text-[10px] text-lotus-white/10">
                      What you saw was only one version.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
                  <motion.div
                    className="h-[1px] w-32 bg-gradient-to-r from-transparent via-lotus-gold/20 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5 }}
                  />
                </div>
              </div>
            </footer>

            <ScrollToTop />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ── Scroll to top button ─────────────────────────────────────
function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-[50] flex h-12 w-12 items-center justify-center rounded-full border border-lotus-gold/40 bg-lotus-charcoal/80 text-lotus-gold backdrop-blur-sm transition-all hover:border-lotus-gold hover:bg-lotus-green-dark"
          style={{
            boxShadow: '0 0 15px rgba(212,175,55,0.25)',
          }}
          data-cursor-hover
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 13V3M3 7l5-5 5 5" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default App