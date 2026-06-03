import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [hover, setHover] = useState(false)
  const [enabled, setEnabled] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.6 })
  const gx = useSpring(x, { stiffness: 120, damping: 25, mass: 0.5 })
  const gy = useSpring(y, { stiffness: 120, damping: 25, mass: 0.5 })

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine) return
    setEnabled(true)
    document.body.classList.add('has-cursor')

    const move = (e) => { x.set(e.clientX); y.set(e.clientY) }
    const over = (e) => {
      if (e.target.closest('[data-cursor]')) setHover(true)
    }
    const out = (e) => {
      if (e.target.closest('[data-cursor]')) setHover(false)
    }
    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout', out)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseout', out)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      <motion.div className="spotlight" style={{ x: gx, y: gy }} />
      <motion.div
        className="cursor-ring"
        style={{ x: sx, y: sy }}
        animate={{ scale: hover ? 2.2 : 1, opacity: hover ? 0.5 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      />
      <motion.div className="cursor-dot" style={{ x, y }} />
    </>
  )
}
