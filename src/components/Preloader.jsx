import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data'

export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let n = 0
    const id = setInterval(() => {
      n += Math.floor(Math.random() * 8) + 3
      if (n >= 100) { n = 100; clearInterval(id) }
      setCount(n)
    }, 90)
    const done = setTimeout(onDone, 1900)
    return () => { clearInterval(id); clearTimeout(done) }
  }, [onDone])

  return (
    <motion.div
      className="preloader"
      initial={{ opacity: 1 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="pre-row">
        <motion.span
          className="pre-name"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {profile.name}
        </motion.span>
        <span className="pre-count">{count}</span>
      </div>
      <div className="pre-bar">
        <motion.i
          initial={{ scaleX: 0 }}
          animate={{ scaleX: count / 100 }}
          transition={{ ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  )
}
