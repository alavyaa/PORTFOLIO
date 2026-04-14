// src/components/Multiverse.jsx
import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextScramble from './TextScramble'

gsap.registerPlugin(ScrollTrigger)

const skillsData = [
  { name: 'HTML', level: 95, category: 'Frontend' },
  { name: 'CSS', level: 87, category: 'Frontend' },
  { name: 'Java', level: 82, category: 'Language' },
  { name: 'C', level: 88, category: 'Language' },
  { name: 'Python', level: 92, category: 'Language' },
  { name: 'SQL', level: 95, category: 'Database' },
]

const projectsData = [
  {
    title: 'Debug Race',
    description:
      'A real-time multiplayer coding game that transforms debugging and problem-solving into an esports-style racing experience, where players compete by solving challenges to gain speed and outperform opponents.',
    tech: ['React', 'Phaser.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'Socket.io', 'MongoDB', 'OpenAI API'],
    image: 'temporal',
    link: 'https://debug-race-ztam.onrender.com/',
  },
  {
    title: 'Kart Racing Game',
    description:
      'Developed a real-time multiplayer kart racing game featuring interactive gameplay, smooth controls, and synchronized game state, enabling players to compete in dynamic racing environments.',
    tech: ['React', 'JavaScript (Canvas)', 'Node.js', 'Express.js', 'Socket.io'],
    image: 'nexus',
    link: 'https://kart-racing-game-1.onrender.com/',
  },
]

function TiltCard({ children, className = '' }) {
  const cardRef = useRef(null)
  const [transform, setTransform] = useState(
    'perspective(1000px) rotateX(0deg) rotateY(0deg)'
  )
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -10
    const rotateY = ((x - centerX) / centerX) * 10

    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    )
    setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 })
  }

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)')
    setGlowPos({ x: 50, y: 50 })
  }

  return (
    <div
      ref={cardRef}
      className={`preserve-3d transition-transform duration-200 ease-out ${className}`}
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor-hover
    >
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(0, 229, 255, 0.15) 0%, transparent 60%)`,
        }}
      />
      {children}
    </div>
  )
}

function LotusIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="lotus-icon opacity-0 transition-all duration-500 scale-0">
      <path d="M14 2C14 2 18 8 18 12C18 16 14 20 14 20C14 20 10 16 10 12C10 8 14 2 14 2Z" fill="white" opacity="0.8"/>
      <path d="M6 14C6 14 10 10 14 10C18 10 22 14 22 14C22 14 18 18 14 18C10 18 6 14 6 14Z" fill="white" opacity="0.5"/>
      <circle cx="14" cy="12" r="2" fill="#d4af37" />
    </svg>
  )
}

function ProjectCard({ project, index }) {
  const colors = ['#06392c', '#042a20', '#0a4d3a', '#063828']

  return (
    <TiltCard>
      <div className="bloom-lotus glass-card glass-card-hover group relative overflow-hidden rounded-2xl p-6 transition-all duration-500">

        {/* FIXED ONLY THIS */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            boxShadow: 'inset 0 0 40px rgba(0, 229, 255, 0.1), 0 0 40px rgba(0, 229, 255, 0.1)',
          }}
        />

        <div
          className="mb-4 h-40 rounded-xl transition-transform duration-500 group-hover:scale-[1.02]"
          style={{
            background: `linear-gradient(135deg, ${colors[index % 4]}, ${colors[(index + 1) % 4]})`,
          }}
        >
          <div className="flex h-full items-center justify-center">
            <motion.div className="font-cinzel text-3xl font-bold text-lotus-gold/20">
              {String(index + 1).padStart(2, '0')}
            </motion.div>
          </div>
        </div>

        <h4 className="font-cinzel text-lg font-semibold text-lotus-white">
          {project.title}
        </h4>

        <p className="mt-2 font-body text-sm leading-relaxed text-lotus-white/60">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="rounded-full border border-lotus-teal/30 bg-lotus-teal/10 px-3 py-1 font-body text-xs text-lotus-teal/80">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-20 font-body text-sm text-lotus-gold transition-colors hover:text-lotus-gold-light"
          >
            Explore Timeline →
          </a>
          <LotusIcon />
        </div>
      </div>
    </TiltCard>
  )
}

export default function Multiverse() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.skill-bar-fill',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 80%',
          },
        }
      )

      gsap.fromTo(
        '.project-card',
        { opacity: 0, y: 60, rotateX: -10 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 80%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="multiverse" ref={sectionRef} className="relative min-h-screen px-6 py-32">
      <div className="mx-auto max-w-6xl">

        <div className="projects-grid">
          <div className="grid gap-6 md:grid-cols-2">
            {projectsData.map((project, index) => (
              <div key={project.title} className="project-card">
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
