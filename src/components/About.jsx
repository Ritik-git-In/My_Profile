import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { stats, timeline } from '../data'

const reveal = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 } }),
}

function Counter({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    let cur = 0
    const step = Math.max(1, Math.ceil(value / 30))
    const id = setInterval(() => {
      cur += step
      if (cur >= value) { cur = value; clearInterval(id) }
      setN(cur)
    }, 35)
    return () => clearInterval(id)
  }, [inView, value])

  return <span ref={ref} className="num">{n}{suffix}</span>
}

export default function About() {
  return (
    <section id="about" className="section">
      <motion.div className="sec-label" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <span>01</span> About
      </motion.div>

      <div className="about">
        <motion.h2 className="big-text" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}>
          From web design to <span className="serif">agentic AI</span> — a CS student turning
          ideas into <span className="serif">intelligent</span> systems.
        </motion.h2>

        <motion.div className="about-side" variants={reveal} custom={1} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <p>
            Aspiring AI Engineer & B.Tech CSE student at Mewar University. LangChain, LangGraph
            aur MCP se autonomous agents banata hoon, aur n8n se workflows automate karta hoon.
          </p>
          <div className="about-now">
            <span className="dot" />
            <div>
              <strong>AI Engineer Intern</strong>
              <br /><small>@ DigiRocket Technologies · Jan–Jul 2026</small>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="stats">
        {stats.map((s, i) => (
          <motion.div
            className="stat" key={i} data-cursor
            variants={reveal} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {s.static ? <span className="num">{s.static}</span> : <Counter value={s.value} suffix={s.suffix} />}
            <small>{s.label}</small>
          </motion.div>
        ))}
      </div>

      <div className="timeline">
        {timeline.map((t, i) => (
          <motion.div
            className="tl" key={i}
            variants={reveal} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            <span className="tl-year">{t.year}</span>
            <div className="tl-body">
              <h4>{t.title}</h4>
              <p>{t.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
