import { motion } from 'framer-motion'
import { profile } from '../data'
import Magnetic from './Magnetic'

const reveal = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 } }),
}

export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <motion.div className="sec-label" variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <span>05</span> Contact
      </motion.div>

      <motion.h2 className="contact-title" variants={reveal} custom={1} initial="hidden" whileInView="show" viewport={{ once: true }}>
        Let's build something <span className="serif">intelligent</span> together.
      </motion.h2>

      <motion.div
        variants={reveal} custom={2} initial="hidden" whileInView="show" viewport={{ once: true }}
        style={{ display: 'inline-block' }}
      >
        <Magnetic className="contact-mail" href={`mailto:${profile.email}`} data-cursor>
          {profile.email}
        </Magnetic>
      </motion.div>

      <motion.div className="contact-links" variants={reveal} custom={3} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <a href={profile.github} target="_blank" rel="noopener" data-cursor>GitHub</a>
        <a href={profile.linkedin} target="_blank" rel="noopener" data-cursor>LinkedIn</a>
        <a href={`tel:${profile.phoneRaw}`} data-cursor>{profile.phone}</a>
      </motion.div>
    </section>
  )
}
