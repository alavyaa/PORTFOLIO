// src/components/Contact.jsx — COMPLETE with Social Links Panel
import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextScramble from './TextScramble'

gsap.registerPlugin(ScrollTrigger)

// Social links data — UPDATE THESE WITH YOUR URLS
const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/alavyaa',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    label: 'Source Archives',
    description: 'Code repositories & open-source contributions',
    color: '#ffffff',
    glowColor: 'rgba(255, 255, 255, 0.15)',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/alavya-bajpai-71a72936a/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    label: 'Professional Nexus',
    description: 'Career timeline & professional network',
    color: '#0077b5',
    glowColor: 'rgba(0, 119, 181, 0.2)',
  },
  {
    name: 'Email',
    url: 'mailto:bajpaialavya@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 4L12 13 2 4" />
      </svg>
    ),
    label: 'Direct Channel',
    description: 'Traditional communication pathway',
    color: '#d4af37',
    glowColor: 'rgba(212, 175, 55, 0.2)',
  },
]

function SocialCard({ social, index }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 * index, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex items-center gap-4 rounded-xl border border-lotus-green/30 bg-lotus-charcoal/40 p-4 backdrop-blur-sm transition-all duration-500 hover:border-opacity-60 hover:bg-lotus-green-dark/30"
      style={{
        borderColor: isHovered ? `${social.color}40` : undefined,
        boxShadow: isHovered ? `0 0 25px ${social.glowColor}` : 'none',
        pointerEvents: 'auto',
        cursor: 'pointer',
      }}
      data-cursor-hover
    >
      {/* Icon container */}
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-all duration-500"
        style={{
          borderColor: isHovered ? `${social.color}60` : 'rgba(6, 57, 44, 0.4)',
          backgroundColor: isHovered ? `${social.color}15` : 'rgba(6, 57, 44, 0.2)',
          color: isHovered ? social.color : 'rgba(240, 240, 240, 0.5)',
        }}
      >
        {social.icon}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span
            className="font-cinzel text-xs font-semibold tracking-wider transition-colors duration-300"
            style={{ color: isHovered ? social.color : 'rgba(240, 240, 240, 0.8)' }}
          >
            {social.label}
          </span>
          {/* Arrow that slides in on hover */}
          <motion.svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke={social.color}
            strokeWidth="1.5"
            initial={{ opacity: 0, x: -5 }}
            animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -5 }}
            transition={{ duration: 0.3 }}
          >
            <path d="M1 6h10M7 2l4 4-4 4" />
          </motion.svg>
        </div>
        <p className="mt-0.5 font-body text-[11px] leading-tight text-lotus-white/30 transition-colors duration-300 group-hover:text-lotus-white/50">
          {social.description}
        </p>
      </div>

      {/* Hover glow background */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(ellipse at 20% 50%, ${social.glowColor} 0%, transparent 70%)`,
        }}
      />
    </motion.a>
  )
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', message: '' })
  const [status, setStatus] = useState('idle')
  const [focusedField, setFocusedField] = useState(null)
  const containerRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.message.trim()) return

    setStatus('sending')

    try {
      const response = await fetch('https://formspree.io/f/xrerggnr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          message: formData.message,
          _subject: `[The Pruned Lotus] Message from ${formData.name}`,
        }),
      })

      if (response.ok) {
        setStatus('sent')
        setFormData({ name: '', message: '' })
        setTimeout(() => setStatus('idle'), 6000)
      } else {
        throw new Error('Failed')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-element',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="contact"
      className="relative min-h-screen px-6 py-32"
      style={{ position: 'relative', zIndex: 10 }}
    >
      <div className="mx-auto max-w-6xl" ref={containerRef}>
        {/* Section Header */}
        <div className="mb-16 text-center">
          <TextScramble
            text="STEALTH CONTACT"
            className="font-cinzel text-4xl font-bold tracking-[0.3em] text-lotus-gold md:text-5xl"
            delay={200}
          />
          <motion.p
            className="mt-4 font-body text-sm tracking-widest text-lotus-white/40"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            CHOOSE YOUR PATH ACROSS THE TIMELINE
          </motion.p>
          <motion.div
            className="mx-auto mt-4 h-[1px] w-24 bg-gradient-to-r from-transparent via-lotus-gold to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>

        {/* ═══════ TWO-COLUMN LAYOUT ═══════ */}
        <div className="grid gap-8 lg:grid-cols-5">
          {/* ── LEFT: Contact Form (3 cols) ── */}
          <div className="contact-element lg:col-span-3">
            <div
              className="relative overflow-hidden rounded-2xl border border-lotus-green/30 bg-lotus-green-dark/40 p-8 backdrop-blur-md md:p-10"
              style={{
                position: 'relative',
                zIndex: 20,
                pointerEvents: 'auto',
              }}
            >
              {/* Corner decorations */}
              <div className="absolute left-3 top-3 h-4 w-4 border-l border-t border-lotus-gold/30" />
              <div className="absolute right-3 top-3 h-4 w-4 border-r border-t border-lotus-gold/30" />
              <div className="absolute bottom-3 left-3 h-4 w-4 border-b border-l border-lotus-gold/30" />
              <div className="absolute bottom-3 right-3 h-4 w-4 border-b border-r border-lotus-gold/30" />

              {/* Header bar */}
              <div className="mb-8 flex items-center gap-3 border-b border-lotus-green/20 pb-4">
                <div className="relative h-2 w-2">
                  <div className="absolute inset-0 rounded-full bg-lotus-gold" />
                  <div className="absolute inset-0 animate-ping rounded-full bg-lotus-gold opacity-40" />
                </div>
                <span className="font-cinzel text-xs tracking-[0.3em] text-lotus-gold/60">
                  SECURE TRANSMISSION
                </span>
                <div className="ml-auto flex gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-lotus-teal/40" />
                  <div className="h-1.5 w-1.5 rounded-full bg-lotus-gold/40" />
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500/40" />
                </div>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
                style={{ position: 'relative', zIndex: 25 }}
              >
                {/* Identity Field */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block font-cinzel text-sm tracking-[0.2em] text-lotus-gold/80"
                  >
                    Identity
                  </label>
                  <div className="relative">
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      autoComplete="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full rounded-lg border border-lotus-green/40 bg-lotus-charcoal/80 px-4 py-3.5 font-body text-sm text-lotus-white outline-none transition-all duration-300 placeholder:text-lotus-white/20 focus:border-lotus-gold/60 focus:bg-lotus-charcoal/90 focus:shadow-[0_0_20px_rgba(212,175,55,0.1)]"
                      placeholder="Reveal your identity..."
                      style={{
                        position: 'relative',
                        zIndex: 30,
                        cursor: 'text',
                        pointerEvents: 'auto',
                      }}
                    />
                    {focusedField === 'name' && (
                      <motion.div
                        className="absolute inset-0 -z-10 rounded-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(212,175,55,0.1), rgba(0,229,255,0.1))',
                          filter: 'blur(8px)',
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block font-cinzel text-sm tracking-[0.2em] text-lotus-gold/80"
                  >
                    The Message
                  </label>
                  <div className="relative">
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full resize-none rounded-lg border border-lotus-green/40 bg-lotus-charcoal/80 px-4 py-3.5 font-body text-sm leading-relaxed text-lotus-white outline-none transition-all duration-300 placeholder:text-lotus-white/20 focus:border-lotus-gold/60 focus:bg-lotus-charcoal/90 focus:shadow-[0_0_20px_rgba(212,175,55,0.1)]"
                      placeholder="Inscribe your message across the timeline..."
                      style={{
                        position: 'relative',
                        zIndex: 30,
                        cursor: 'text',
                        pointerEvents: 'auto',
                      }}
                    />
                    {focusedField === 'message' && (
                      <motion.div
                        className="absolute inset-0 -z-10 rounded-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(212,175,55,0.1), rgba(0,229,255,0.1))',
                          filter: 'blur(8px)',
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* Character count */}
                <div className="flex justify-between">
                  <span className="font-body text-xs text-lotus-white/20">
                    {formData.message.length > 0
                      ? `${formData.message.length} characters inscribed`
                      : 'Awaiting transmission...'}
                  </span>
                  <span className="font-body text-xs text-lotus-teal/30">ENCRYPTED</span>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <motion.button
                    type="submit"
                    disabled={
                      status === 'sending' ||
                      !formData.name.trim() ||
                      !formData.message.trim()
                    }
                    className="group relative w-full overflow-hidden rounded-lg border-2 border-lotus-gold bg-transparent px-8 py-4 font-cinzel text-sm font-semibold tracking-[0.3em] text-lotus-gold transition-all duration-500 hover:bg-lotus-gold/10 hover:shadow-glow-gold disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:shadow-none"
                    whileHover={{ scale: status === 'sending' ? 1 : 1.01 }}
                    whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}
                    data-cursor-hover
                    style={{
                      position: 'relative',
                      zIndex: 30,
                      pointerEvents: 'auto',
                      cursor: 'pointer',
                    }}
                  >
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-lotus-gold/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                    {status === 'sending' && (
                      <motion.div
                        className="absolute left-4 top-1/2 -translate-y-1/2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="#d4af37"
                          strokeWidth="2"
                        >
                          <circle cx="8" cy="8" r="6" opacity="0.3" />
                          <path d="M8 2a6 6 0 0 1 6 6" strokeLinecap="round" />
                        </svg>
                      </motion.div>
                    )}

                    <span className="relative z-10">
                      {status === 'idle' && '⟁ CAST MESSAGE ⟁'}
                      {status === 'sending' && 'TRANSMITTING...'}
                      {status === 'sent' && '✦ MESSAGE CAST ✦'}
                      {status === 'error' && '✗ RETRY ✗'}
                    </span>
                  </motion.button>
                </div>
              </form>

              {/* Success Animation */}
              <AnimatePresence>
                {status === 'sent' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ type: 'spring', damping: 15 }}
                    className="relative mt-6 overflow-hidden rounded-xl border border-lotus-teal/30 bg-gradient-to-r from-lotus-teal/10 to-lotus-green/10 p-5 text-center"
                  >
                    <motion.div
                      initial={{ rotate: -180, scale: 0 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{ type: 'spring', damping: 8, delay: 0.2 }}
                      className="mb-2 text-3xl"
                    >
                      ✦
                    </motion.div>
                    <p className="font-cinzel text-sm tracking-wider text-lotus-teal">
                      Message cast across the timeline
                    </p>
                    <p className="mt-1 font-body text-xs text-lotus-white/40">
                      Response arriving through the sacred channel
                    </p>

                    {/* Particle burst */}
                    <div className="pointer-events-none absolute inset-0">
                      {[...Array(16)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full"
                          style={{
                            backgroundColor: i % 2 === 0 ? '#d4af37' : '#00e5ff',
                          }}
                          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                          animate={{
                            x: Math.cos((i / 16) * Math.PI * 2) * 80,
                            y: Math.sin((i / 16) * Math.PI * 2) * 80,
                            opacity: 0,
                            scale: 0,
                          }}
                          transition={{ duration: 1, delay: i * 0.03, ease: 'easeOut' }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error */}
              <AnimatePresence>
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-center"
                  >
                    <p className="font-body text-sm text-red-400">
                      Timeline disrupted. Check connection and retry.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ── RIGHT: Alternate Channels Panel (2 cols) ── */}
          <div className="lg:col-span-2">
            <div className="contact-element">
              {/* Panel header */}
              <div className="mb-6 flex items-center gap-3">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-lotus-gold/30" />
                <span className="font-cinzel text-xs tracking-[0.3em] text-lotus-gold/50">
                  ALTERNATE CHANNELS
                </span>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-lotus-gold/30" />
              </div>

              {/* Subtitle */}
              <motion.p
                className="mb-6 text-center font-body text-xs leading-relaxed text-lotus-white/30"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Reach through other branches of the timeline
              </motion.p>

              {/* Social Links Stack */}
              <div className="space-y-3">
                {socialLinks.map((social, index) => (
                  <SocialCard key={social.name} social={social} index={index} />
                ))}
              </div>

              {/* Bottom decoration */}
              <motion.div
                className="mt-8 flex flex-col items-center gap-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
              >
                {/* Lotus ornament */}
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  className="text-lotus-gold/20"
                >
                  <path
                    d="M16 4C16 4 20 10 20 14C20 18 16 22 16 22C16 22 12 18 12 14C12 10 16 4 16 4Z"
                    stroke="currentColor"
                    strokeWidth="0.8"
                    fill="none"
                  />
                  <path
                    d="M8 16C8 16 12 12 16 12C20 12 24 16 24 16C24 16 20 20 16 20C12 20 8 16 8 16Z"
                    stroke="currentColor"
                    strokeWidth="0.8"
                    fill="none"
                  />
                  <circle cx="16" cy="14" r="1.5" fill="currentColor" opacity="0.5" />
                </svg>

                <p className="font-body text-[10px] text-lotus-white/15">
                  All channels monitored across timelines
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom privacy note */}
        <motion.div
          className="contact-element mt-10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
        >
          <p className="font-body text-xs text-lotus-white/20">
            ⟁ Transmissions encrypted via Formspree · No personal data exposed ⟁
          </p>
        </motion.div>
      </div>
    </section>
  )
}