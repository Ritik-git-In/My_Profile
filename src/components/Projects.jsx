import { motion } from 'framer-motion'
import { projects } from '../data'

const reveal = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export default function Projects() {
  return (
    <section id="projects" className="section">
      <motion.div className="sec-label" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <span>02</span> Selected Work
      </motion.div>

      <div className="work-list">
        {projects.map((p) => (
          <motion.a
            key={p.no}
            href={p.link}
            target="_blank"
            rel="noopener"
            className="work"
            data-cursor
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            whileHover={{ scale: 0.992 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <div className="work-main">
              <span className="work-no">{p.no}</span>
              <div>
                <h3>
                  {p.title}
                  {p.company && <span className="work-badge">{p.company}</span>}
                </h3>
                <p>{p.desc}</p>
              </div>
            </div>
            <div className="work-meta">
              <div className="work-tags">
                {p.tags.map((t) => <span key={t}>{t}</span>)}
              </div>
              <span className="work-action">{p.live ? 'Visit Live' : 'View Code'} <i>↗</i></span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
