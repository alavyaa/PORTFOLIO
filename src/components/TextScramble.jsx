// src/components/TextScramble.jsx
import React, { useEffect, useState, useRef } from 'react'
import { useInView } from '../hooks/useInView'

const RUNES = 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛈᛇᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟᚪᚫᚣᛝᛡᛠ'

export default function TextScramble({
  text,
  className = '',
  as: Tag = 'h2',
  delay = 0,
  speed = 40,
  triggerOnView = true,
}) {
  const [displayText, setDisplayText] = useState(text)
  const [ref, isInView] = useInView({ once: true, threshold: 0.5 })
  const hasScrambled = useRef(false)

  useEffect(() => {
    if (triggerOnView && !isInView) return
    if (hasScrambled.current) return
    hasScrambled.current = true

    let iteration = 0
    const maxIterations = text.length * 4

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' '
              if (index < Math.floor(iteration / 4)) return text[index]
              return RUNES[Math.floor(Math.random() * RUNES.length)]
            })
            .join('')
        )

        iteration++
        if (iteration > maxIterations) {
          clearInterval(interval)
          setDisplayText(text)
        }
      }, speed)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timeout)
  }, [isInView, text, delay, speed, triggerOnView])

  return (
    <Tag ref={ref} className={className}>
      {displayText}
    </Tag>
  )
}