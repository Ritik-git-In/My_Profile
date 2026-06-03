import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { profile, typedRoles } from '../data'
import Magnetic from './Magnetic'

const headline = [
  { t: 'I build' },
  { t: 'intelligent,', serif: true },
  { t: 'agentic AI' },
  { t: 'systems.' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}
const word = {
  hidden: { y: '110%' },
  show: { y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
}
const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut', delay: 0.9 + i * 0.12 } }),
}

function Typed() {
  const [text, setText] = useState('')
  const [i, setI] = useState(0)
  const [del, setDel] = useState(false)

  useEffect(() => {
    const cur = typedRoles[i]
    let delay = del ? 35 : 70
    if (!del && text === cur) delay = 1800
    else if (del && text === '') { delay = 350 }

    const id = setTimeout(() => {
      if (!del && text === cur) setDel(true)
      else if (del && text === '') { setDel(false); setI((i + 1) % typedRoles.length) }
      else setText(del ? cur.substring(0, text.length - 1) : cur.substring(0, text.length + 1))
    }, delay)
    return () => clearTimeout(id)
  }, [text, del, i])

  return <>{text}<span className="caret">|</span></>
}

export default function Hero() {
  return (
    <section id="hero" className="hero">
      {/* Photo + animated orb */}
      <div className="hero-visual">
        <motion.div
          className="orb-glow"
          animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="avatar-ring"
          animate={{ rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="avatar-photo"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src="/profile.jpg" alt="Ritik Sharma" onError={(e) => { e.currentTarget.style.display = 'none' }} />
          <span className="avatar-fallback">R</span>
        </motion.div>
      </div>

      <motion.p className="eyebrow" variants={fade} custom={0} initial="hidden" animate="show">
        <span className="dot" /> AI Engineer · Builder · Available for work
      </motion.p>

      <motion.h1 className="headline" variants={container} initial="hidden" animate="show">
        {headline.map((w, idx) => (
          <span className="mask" key={idx}>
            <motion.span className={w.serif ? 'serif word' : 'word'} variants={word}>
              {w.t}
            </motion.span>
          </span>
        ))}
      </motion.h1>

      <motion.p className="hero-typed" variants={fade} custom={1} initial="hidden" animate="show">
        <Typed />
      </motion.p>

      <motion.p className="hero-desc" variants={fade} custom={2} initial="hidden" animate="show">
        I'm <strong>{profile.name}</strong> — an AI Engineer & CS student. I build autonomous agents,
        automation pipelines and intelligent workflow systems. Currently an AI Engineering Intern
        @ <strong>DigiRocket Technologies</strong>.
      </motion.p>

      <motion.div className="hero-btns" variants={fade} custom={3} initial="hidden" animate="show">
        <Magnetic href="#projects" className="btn btn-primary" data-cursor>View Work</Magnetic>
        <Magnetic href={profile.github} target="_blank" rel="noopener" className="btn btn-ghost" data-cursor>GitHub →</Magnetic>
      </motion.div>

      <motion.a
        href="#about" className="hero-cue" data-cursor
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7, duration: 0.8 }}
      >
        <span>Scroll to explore</span>
        <motion.i animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>↓</motion.i>
      </motion.a>
    </section>
  )
}
