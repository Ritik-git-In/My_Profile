import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { certificates } from '../data'

const reveal = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 } }),
}

export default function Certificates() {
  const [active, setActive] = useState(null)

  return (
    <section id="certificates" className="section">
      <motion.div className="sec-label" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <span>04</span> Certificates
      </motion.div>

      <div className="cert-grid">
        {certificates.map((c, i) => (
          <motion.button
            type="button"
            className="cert-card"
            key={c.title}
            data-cursor
            variants={reveal}
            custom={i}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            onClick={() => setActive(c)}
          >
            <div className="cert-img">
              <img src={c.img} alt={c.title} loading="lazy" onError={(e) => { e.currentTarget.parentElement.classList.add('no-img') }} />
              <span className="cert-view">⤢ View certificate</span>
            </div>
            <div className="cert-info">
              <h4>{c.title}</h4>
              <p>{c.issuer}</p>
              <span className="cert-meta">{c.year} · {c.note}</span>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="lightbox"
            onClick={() => setActive(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.img
              src={active.img}
              alt={active.title}
              className="lightbox-img"
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 220, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
            />
            <button className="lightbox-close" onClick={() => setActive(null)} aria-label="Close" data-cursor>✕</button>
            <span className="lightbox-cap">{active.title} — {active.issuer}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
