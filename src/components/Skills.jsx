import { motion } from 'framer-motion'
import { skills, achievements } from '../data'

const reveal = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 } }),
}

export default function Skills() {
  return (
    <section id="achievements" className="section">
      <motion.div className="sec-label" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <span>03</span> Skills & Achievements
      </motion.div>

      <div className="ach-grid">
        <div className="skills">
          {skills.map((s, i) => (
            <motion.div
              className="skill" key={s.name} data-cursor
              variants={reveal} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}
            >
              <div className="skill-top">
                <span>{s.name}</span>
                <span>{s.level}</span>
              </div>
              <div className="bar">
                <motion.i
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: s.level / 100 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 + i * 0.08 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="achievements">
          {achievements.map((a, i) => (
            <motion.div
              className="ach" key={a.title} data-cursor
              variants={reveal} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}
              whileHover={{ x: 8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <span className="ach-icon">{a.icon}</span>
              <div>
                <h4>{a.title}</h4>
                <p>{a.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
