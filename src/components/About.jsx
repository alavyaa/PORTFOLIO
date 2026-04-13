// src/components/About.jsx
import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextScramble from './TextScramble'
import { useInView } from '../hooks/useInView'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)
  const [contentRef, contentInView] = useInView({ once: true })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-reveal',
        { opacity: 0, y: 60, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen px-6 py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <TextScramble
            text="THE VEIL"
            className="font-cinzel text-4xl font-bold tracking-[0.3em] text-lotus-gold md:text-5xl"
            delay={200}
          />
          <motion.div
            className="mx-auto mt-4 h-[1px] w-24 bg-gradient-to-r from-transparent via-lotus-teal to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>

        <div
          ref={contentRef}
          className="grid items-center gap-16 md:grid-cols-2"
        >
          {/* Profile Image - Hexagonal Mask with Illusion Effect */}
          <div className="about-reveal flex justify-center">
            <div
              className="profile-container group relative h-80 w-80"
              data-cursor-hover
            >
              {/* Hex border glow */}
              <div className="hexagon-mask absolute inset-[-4px] bg-gradient-to-br from-lotus-gold via-lotus-teal to-lotus-gold opacity-60 transition-opacity duration-500 group-hover:opacity-100" />
              
              {/* Primary image */}
              <div className="hexagon-mask relative h-full w-full overflow-hidden">
                <div
                  className="profile-primary absolute inset-0 bg-lotus-green transition-all duration-700"
                  style={{
                    backgroundImage: 'url("/images/profile.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                
                {/* Secondary (illusion) image */}
                <div
                  className="profile-secondary absolute inset-0 bg-lotus-green-dark opacity-0 transition-all duration-700"
                  style={{
                    backgroundImage: 'url("/images/profile-alt.jpeg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(2px)',
                  }}
                />
                
                {/* Green smoke overlay */}
                <div className="smoke-overlay">
                  {/* Animated smoke particles */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        width: 40 + Math.random() * 60,
                        height: 40 + Math.random() * 60,
                        left: `${Math.random() * 80 + 10}%`,
                        top: `${Math.random() * 80 + 10}%`,
                        background: `radial-gradient(circle, rgba(6,57,44,${0.3 + Math.random() * 0.3}) 0%, transparent 70%)`,
                      }}
                      animate={{
                        x: [0, Math.random() * 30 - 15, 0],
                        y: [0, Math.random() * 30 - 15, 0],
                        scale: [0.8, 1.2, 0.8],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* TVA-inspired corner marks */}
              <div className="absolute -left-2 -top-2 h-4 w-4 border-l-2 border-t-2 border-lotus-gold opacity-50" />
              <div className="absolute -right-2 -top-2 h-4 w-4 border-r-2 border-t-2 border-lotus-gold opacity-50" />
              <div className="absolute -bottom-2 -left-2 h-4 w-4 border-b-2 border-l-2 border-lotus-gold opacity-50" />
              <div className="absolute -bottom-2 -right-2 h-4 w-4 border-b-2 border-r-2 border-lotus-gold opacity-50" />
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-6">
            <div className="about-reveal">
              <h3 className="font-cinzel text-2xl font-semibold text-lotus-white">
                Master of <span className="text-gradient-teal">Illusions</span>
              </h3>
            </div>
            <div className="about-reveal">
              <p className="font-body text-base leading-relaxed text-lotus-white/70">
                A developer who thrives in the space between order and chaos.
                Like the branches of a pruned lotus, every line of code is intentional
                 shaped by precision, driven by creativity, and tempered by
                an understanding that the best solutions emerge from elegant complexity.
              </p>
            </div>
            <div className="about-reveal">
              <p className="font-body text-base leading-relaxed text-lotus-white/60">
                Specializing in crafting immersive digital experiences that blur the
                line between reality and illusion. Every project is a new timeline,
                every feature a nexus event.
              </p>
            </div>
            <div className="about-reveal flex flex-wrap gap-3 pt-4">
              {['HTML', 'CSS', 'Java', 'C', 'Python' , 'SQL', 'Communication', 'Team Leadership', 'Problem Solving', 'Adaptability'].map(
                (tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-lotus-green/50 bg-lotus-green/20 px-4 py-1.5 font-body text-xs tracking-wider text-lotus-teal"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}