// src/components/Timeline.jsx
import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextScramble from './TextScramble'

gsap.registerPlugin(ScrollTrigger)

const timelineData = [
  {
    year: '2026',
    title: 'Claude Code in Action',
    institution: 'Anthropic',
    description: 'Learned to effectively use Claude for real-world coding tasks, including context management, structured prompting, and integrating AI into development workflows.',
    type: 'certification',
    icon: '📜',
  },
  {
    year: '2024',
    title: 'Senior Secondary Education',
    institution: 'Cambridge Convent School',
    description: 'A phase that shaped discipline, logic, and the foundation for everything that followed.',
    type: 'education',
    icon: '🎓',
  },
  {
    year: '2025',
    title: 'Introduction To Generative AI Studio',
    institution: 'Google Cloud',
    description: 'Developed a foundational understanding of generative AI, including prompt engineering and practical applications using Google Cloud tools.',
    type: 'certification',
    icon: '📜',
  },
  {
    year: '2025 - 2029',
    title: 'Bachelor of Technology in Computer Science [Pursuing]',
    institution: 'CGC University, Jhanjeri',
    description: 'Currently pursuing a Bachelor of Technology degree in Computer Science with a focus on artificial intelligence and data science.',
    type: 'education',
    icon: '🎓',
  },
  {
    year: '2025',
    title: 'LLM Prompting',
    institution: 'Gemini',
    description: 'Developed skills in prompt engineering with Gemini, focusing on controlling LLM behavior, improving response quality, and generating context-aware outputs.',
    type: 'certification',
    icon: '📜',
  },
]

function TimelineNode({ item, index }) {
  const nodeRef = useRef(null)
  const isLeft = index % 2 === 0

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Glow burst on the node dot
      gsap.fromTo(
        nodeRef.current.querySelector('.node-dot'),
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: nodeRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Glow burst ring
      gsap.fromTo(
        nodeRef.current.querySelector('.node-glow'),
        { scale: 0, opacity: 0.8 },
        {
          scale: 3,
          opacity: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: nodeRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Content card snap-in
      gsap.fromTo(
        nodeRef.current.querySelector('.node-content'),
        {
          opacity: 0,
          x: isLeft ? -80 : 80,
          rotateY: isLeft ? -15 : 15,
        },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: nodeRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, nodeRef)

    return () => ctx.revert()
  }, [isLeft])

  return (
    <div ref={nodeRef} className="relative flex items-center justify-center py-8">
      {/* Node dot */}
      <div className="absolute left-1/2 z-20 -translate-x-1/2">
        <div className="node-dot relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-lotus-gold bg-lotus-charcoal shadow-glow-gold">
          <span className="text-lg">{item.icon}</span>
        </div>
        <div className="node-glow absolute inset-0 rounded-full border border-lotus-gold" />
      </div>

      {/* Content card */}
      <div
        className={`node-content perspective-1000 w-full max-w-md ${
          isLeft ? 'mr-auto pr-16 text-right md:pr-24' : 'ml-auto pl-16 text-left md:pl-24'
        }`}
      >
        <div className="glass-card glass-card-hover p-6 transition-all duration-300">
          <span className="font-cinzel text-xs tracking-[0.3em] text-lotus-gold">
            ⟁ {item.year}
          </span>
          <h4 className="mt-2 font-cinzel text-lg font-semibold text-lotus-white">
            {item.title}
          </h4>
          <p className="mt-1 font-body text-sm text-lotus-teal/80">
            {item.institution}
          </p>
          <p className="mt-3 font-body text-sm leading-relaxed text-lotus-white/60">
            {item.description}
          </p>
          <div
            className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-medium tracking-wider ${
              item.type === 'education'
                ? 'bg-lotus-green/30 text-lotus-teal'
                : 'bg-lotus-gold/20 text-lotus-gold'
            }`}
          >
            {item.type === 'education' ? 'EDUCATION' : 'CERTIFICATION'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Timeline() {
  const lineRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: lineRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1,
          },
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="timeline" className="relative min-h-screen px-6 py-32">
      <div className="mx-auto max-w-4xl">
        <div className="mb-20 text-center">
          <TextScramble
            text="THE TIMELINE"
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
            NEXUS EVENTS ALONG THE SACRED TIMELINE
          </motion.p>
          <motion.div
            className="mx-auto mt-4 h-[1px] w-24 bg-gradient-to-r from-transparent via-lotus-gold to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>

        <div className="relative">
          {/* Glowing golden timeline line */}
          <div
            ref={lineRef}
            className="absolute left-1/2 top-0 h-full w-[2px] origin-top -translate-x-1/2"
            style={{
              background:
                'linear-gradient(to bottom, transparent, #d4af37 10%, #d4af37 90%, transparent)',
              boxShadow: '0 0 10px rgba(212, 175, 55, 0.4), 0 0 20px rgba(212, 175, 55, 0.2)',
            }}
          />

          {/* Timeline nodes */}
          {timelineData.map((item, index) => (
            <TimelineNode key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
