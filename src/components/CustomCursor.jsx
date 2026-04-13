// src/components/CustomCursor.jsx — COMPLETE REBUILT
import React, { useEffect, useState, useRef, useCallback } from 'react'

// ═══════════════════════════════════════════════
// CHANGE THIS to switch cursor style:
// 'crosshair' | 'runeCircle' | 'lotusSpark' | 'goldTrail'
// ═══════════════════════════════════════════════
const CURSOR_STYLE = 'crosshair'

// ── Option A: TVA Golden Crosshair ──────────────
function CrosshairCursor({ isClicking }) {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 80)
    return () => clearInterval(id)
  }, [])

  const outerRotation = tick * 3

  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      style={{
        transform: `scale(${isClicking ? 0.85 : 1})`,
        transition: 'transform 0.15s ease',
        filter: 'drop-shadow(0 0 6px rgba(212,175,55,0.8))',
      }}
    >
      {/* Rotating outer ring with gaps */}
      <g
        style={{
          transform: `rotate(${outerRotation}deg)`,
          transformOrigin: '22px 22px',
        }}
      >
        {/* 4 arcs making a dashed ring */}
        <circle
          cx="22"
          cy="22"
          r="18"
          stroke="#d4af37"
          strokeWidth="1"
          strokeDasharray="10 18"
          strokeLinecap="round"
          opacity="0.7"
        />
      </g>

      {/* Static inner ring */}
      <circle
        cx="22"
        cy="22"
        r="10"
        stroke="#d4af37"
        strokeWidth="0.8"
        opacity="0.4"
      />

      {/* 4 crosshair lines with gap in center */}
      {/* Top */}
      <line x1="22" y1="4" x2="22" y2="14" stroke="#d4af37" strokeWidth="1.2" strokeLinecap="round" />
      {/* Bottom */}
      <line x1="22" y1="30" x2="22" y2="40" stroke="#d4af37" strokeWidth="1.2" strokeLinecap="round" />
      {/* Left */}
      <line x1="4" y1="22" x2="14" y2="22" stroke="#d4af37" strokeWidth="1.2" strokeLinecap="round" />
      {/* Right */}
      <line x1="30" y1="22" x2="40" y2="22" stroke="#d4af37" strokeWidth="1.2" strokeLinecap="round" />

      {/* Center dot */}
      <circle
        cx="22"
        cy="22"
        r={isClicking ? 3 : 2}
        fill="#d4af37"
        style={{ transition: 'r 0.1s ease' }}
      />

      {/* 4 corner ticks */}
      <line x1="14" y1="14" x2="16" y2="16" stroke="#d4af37" strokeWidth="1" opacity="0.5" />
      <line x1="30" y1="14" x2="28" y2="16" stroke="#d4af37" strokeWidth="1" opacity="0.5" />
      <line x1="14" y1="30" x2="16" y2="28" stroke="#d4af37" strokeWidth="1" opacity="0.5" />
      <line x1="30" y1="30" x2="28" y2="28" stroke="#d4af37" strokeWidth="1" opacity="0.5" />
    </svg>
  )
}

// ── Option B: Rune Circle ────────────────────────
function RuneCircleCursor({ isClicking }) {
  const [angle, setAngle] = useState(0)

  useEffect(() => {
    let id
    const animate = () => {
      setAngle((a) => (a + 1.2) % 360)
      id = requestAnimationFrame(animate)
    }
    id = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(id)
  }, [])

  const runes = ['ᚠ', 'ᚢ', 'ᚦ', 'ᛟ']
  const radius = 14

  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: 44,
        height: 44,
        transform: `scale(${isClicking ? 0.85 : 1})`,
        transition: 'transform 0.15s ease',
      }}
    >
      {/* Orbiting rune characters */}
      {runes.map((rune, i) => {
        const a = ((angle + i * 90) * Math.PI) / 180
        const x = 22 + Math.cos(a) * radius
        const y = 22 + Math.sin(a) * radius
        return (
          <span
            key={i}
            className="absolute font-cinzel text-[8px] font-bold text-lotus-gold"
            style={{
              left: x,
              top: y,
              transform: 'translate(-50%, -50%)',
              opacity: 0.7 + Math.sin(a) * 0.3,
              textShadow: '0 0 6px rgba(212,175,55,0.8)',
            }}
          >
            {rune}
          </span>
        )
      })}

      {/* Inner glow ring */}
      <svg
        className="absolute inset-0"
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
      >
        <circle
          cx="22"
          cy="22"
          r="8"
          stroke="#d4af37"
          strokeWidth="0.8"
          opacity="0.4"
          strokeDasharray="4 4"
        />
      </svg>

      {/* Center gem */}
      <div
        className="relative z-10 rounded-full bg-lotus-gold"
        style={{
          width: isClicking ? 7 : 5,
          height: isClicking ? 7 : 5,
          boxShadow: '0 0 10px rgba(212,175,55,0.9)',
          transition: 'all 0.1s ease',
        }}
      />
    </div>
  )
}

// ── Option C: Teal Lotus Spark ───────────────────
function LotusSparkCursor({ isClicking }) {
  const [pulse, setPulse] = useState(0)

  useEffect(() => {
    let id
    let start = null
    const animate = (timestamp) => {
      if (!start) start = timestamp
      const elapsed = (timestamp - start) / 1000
      setPulse(elapsed)
      id = requestAnimationFrame(animate)
    }
    id = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(id)
  }, [])

  const glowIntensity = 0.6 + Math.sin(pulse * 2) * 0.4
  const outerScale = 1 + Math.sin(pulse * 1.5) * 0.15

  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: 40,
        height: 40,
        transform: `scale(${isClicking ? 0.8 : 1})`,
        transition: 'transform 0.12s ease',
      }}
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        style={{
          filter: `drop-shadow(0 0 ${4 + glowIntensity * 6}px rgba(0,229,255,${glowIntensity}))`,
          transform: `scale(${outerScale})`,
          transition: 'transform 0.05s ease',
        }}
      >
        {/* Lotus petals — 6 petals rotated */}
        {[0, 60, 120, 180, 240, 300].map((rot, i) => (
          <g
            key={i}
            style={{
              transform: `rotate(${rot}deg)`,
              transformOrigin: '20px 20px',
            }}
          >
            <path
              d="M20 20 C20 20 18 14 20 10 C22 14 20 20 20 20"
              fill="none"
              stroke={i % 2 === 0 ? '#00e5ff' : '#d4af37'}
              strokeWidth="1"
              opacity={0.7 + Math.sin(pulse * 2 + i) * 0.3}
              strokeLinecap="round"
            />
          </g>
        ))}

        {/* Center */}
        <circle
          cx="20"
          cy="20"
          r={isClicking ? 3.5 : 2.5}
          fill="#00e5ff"
          opacity={glowIntensity}
          style={{ transition: 'r 0.1s ease' }}
        />

        {/* Outer pulse ring */}
        <circle
          cx="20"
          cy="20"
          r={14 * outerScale}
          stroke="#00e5ff"
          strokeWidth="0.5"
          opacity={0.2}
        />
      </svg>
    </div>
  )
}

// ── Option D: Minimal Gold Dot + Ghost Trail ─────
function GoldTrailCursor({ isClicking, position, trail }) {
  return (
    <>
      {/* Ghost trail dots */}
      {trail.map((pos, i) => {
        const age = trail.length - i
        const opacity = (1 - age / trail.length) * 0.4
        const size = 3 + (1 - age / trail.length) * 5

        return (
          <div
            key={i}
            className="pointer-events-none fixed rounded-full"
            style={{
              width: size,
              height: size,
              left: pos.x,
              top: pos.y,
              transform: 'translate(-50%, -50%)',
              background:
                i % 2 === 0
                  ? `rgba(212,175,55,${opacity})`
                  : `rgba(0,229,255,${opacity * 0.6})`,
              boxShadow:
                i === trail.length - 1
                  ? `0 0 8px rgba(212,175,55,${opacity * 2})`
                  : 'none',
              zIndex: 99998,
            }}
          />
        )
      })}

      {/* Main dot */}
      <div
        style={{
          width: isClicking ? 10 : 7,
          height: isClicking ? 10 : 7,
          borderRadius: '50%',
          background: '#d4af37',
          boxShadow: `0 0 ${isClicking ? 16 : 10}px rgba(212,175,55,0.9), 0 0 ${isClicking ? 30 : 20}px rgba(212,175,55,0.4)`,
          transition: 'width 0.1s ease, height 0.1s ease, box-shadow 0.1s ease',
        }}
      />
    </>
  )
}

// ── Hover Cursor (White Lotus — used by ALL styles) ──
function HoverLotus() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      style={{
        filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.6))',
      }}
    >
      {/* Main upright petal */}
      <path
        d="M18 6 C18 6 15 13 15 17 C15 21 18 24 18 24 C18 24 21 21 21 17 C21 13 18 6 18 6Z"
        stroke="white"
        strokeWidth="1"
        fill="rgba(255,255,255,0.1)"
        strokeLinejoin="round"
      />
      {/* Left petal */}
      <path
        d="M18 24 C18 24 11 22 8 18 C10 14 16 13 18 14 C18 14 18 19 18 24Z"
        stroke="white"
        strokeWidth="1"
        fill="rgba(255,255,255,0.07)"
        opacity="0.8"
        strokeLinejoin="round"
      />
      {/* Right petal */}
      <path
        d="M18 24 C18 24 25 22 28 18 C26 14 20 13 18 14 C18 14 18 19 18 24Z"
        stroke="white"
        strokeWidth="1"
        fill="rgba(255,255,255,0.07)"
        opacity="0.8"
        strokeLinejoin="round"
      />
      {/* Left-back petal */}
      <path
        d="M18 6 C18 6 10 9 7 14 C7 14 11 18 15 17 C15 17 17 11 18 6Z"
        stroke="white"
        strokeWidth="0.8"
        fill="rgba(255,255,255,0.04)"
        opacity="0.5"
        strokeLinejoin="round"
      />
      {/* Right-back petal */}
      <path
        d="M18 6 C18 6 26 9 29 14 C29 14 25 18 21 17 C21 17 19 11 18 6Z"
        stroke="white"
        strokeWidth="0.8"
        fill="rgba(255,255,255,0.04)"
        opacity="0.5"
        strokeLinejoin="round"
      />
      {/* Center stamen */}
      <circle cx="18" cy="17" r="2" fill="white" opacity="0.9" />
      <circle cx="18" cy="17" r="3.5" stroke="white" strokeWidth="0.5" opacity="0.3" />
    </svg>
  )
}

// ═══════════════════════════════════════════════════
// MAIN CURSOR COMPONENT
// ═══════════════════════════════════════════════════
export default function CustomCursor() {
  const positionRef = useRef({ x: -100, y: -100 })
  const targetRef = useRef({ x: -100, y: -100 })
  const [renderPos, setRenderPos] = useState({ x: -100, y: -100 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  // For gold trail option
  const [trail, setTrail] = useState([])
  const trailRef = useRef([])
  const MAX_TRAIL = 8

  const rafRef = useRef(null)

  // Pure rAF loop — zero React re-renders during move
  useEffect(() => {
    const lerp = (a, b, t) => a + (b - a) * t

    // Lerp factor — higher = snappier, lower = more lag feel
    // 0.12 feels smooth without feeling sluggish
    const LERP = 0.12

    const loop = () => {
      positionRef.current.x = lerp(positionRef.current.x, targetRef.current.x, LERP)
      positionRef.current.y = lerp(positionRef.current.y, targetRef.current.y, LERP)

      setRenderPos({
        x: positionRef.current.x,
        y: positionRef.current.y,
      })

      // Update trail for gold trail cursor
      if (CURSOR_STYLE === 'goldTrail') {
        trailRef.current = [
          { x: positionRef.current.x, y: positionRef.current.y },
          ...trailRef.current,
        ].slice(0, MAX_TRAIL)
        setTrail([...trailRef.current])
      }

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  // Mouse event listeners
  useEffect(() => {
    const onMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
    }

    const isInteractive = (el) => {
      if (!el) return false
      return (
        el.tagName === 'A' ||
        el.tagName === 'BUTTON' ||
        el.tagName === 'INPUT' ||
        el.tagName === 'TEXTAREA' ||
        el.tagName === 'SELECT' ||
        el.dataset?.cursorHover !== undefined ||
        el.closest('a') ||
        el.closest('button') ||
        el.closest('[data-cursor-hover]')
      )
    }

    const onOver = (e) => {
      if (isInteractive(e.target)) setIsHovering(true)
    }

    const onOut = (e) => {
      if (!isInteractive(e.relatedTarget)) setIsHovering(false)
    }

    const onDown = () => setIsClicking(true)
    const onUp = () => setIsClicking(false)

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
    }
  }, [])

  // Render the correct default cursor
  const renderDefaultCursor = () => {
    switch (CURSOR_STYLE) {
      case 'crosshair':
        return <CrosshairCursor isClicking={isClicking} />
      case 'runeCircle':
        return <RuneCircleCursor isClicking={isClicking} />
      case 'lotusSpark':
        return <LotusSparkCursor isClicking={isClicking} />
      case 'goldTrail':
        return (
          <GoldTrailCursor
            isClicking={isClicking}
            position={renderPos}
            trail={trail}
          />
        )
      default:
        return <CrosshairCursor isClicking={isClicking} />
    }
  }

  return (
    <>
      {/* For goldTrail: trail dots are rendered inside GoldTrailCursor
          and positioned absolutely — they need their own fixed wrapper */}
      {CURSOR_STYLE === 'goldTrail' &&
        trail.map((pos, i) => {
          const age = i / MAX_TRAIL
          const size = 7 - age * 5
          return (
            <div
              key={i}
              className="pointer-events-none fixed z-[99998] rounded-full"
              style={{
                width: Math.max(size, 1),
                height: Math.max(size, 1),
                left: pos.x,
                top: pos.y,
                transform: 'translate(-50%, -50%)',
                background:
                  i % 2 === 0
                    ? `rgba(212,175,55,${0.5 - age * 0.45})`
                    : `rgba(0,229,255,${0.3 - age * 0.25})`,
                boxShadow:
                  i === 0
                    ? '0 0 8px rgba(212,175,55,0.5)'
                    : 'none',
              }}
            />
          )
        })}

      {/* Main cursor wrapper */}
      <div
        className="pointer-events-none fixed left-0 top-0 z-[99999]"
        style={{
          transform: `translate(${renderPos.x}px, ${renderPos.y}px) translate(-50%, -50%)`,
          willChange: 'transform',
        }}
      >
        {isHovering ? (
          // Hover state: white lotus for ALL cursor styles
          <div
            style={{
              transform: 'scale(1)',
              animation: 'none',
            }}
          >
            <HoverLotus />
          </div>
        ) : (
          // Default state: whichever style is selected
          renderDefaultCursor()
        )}
      </div>
    </>
  )
}