import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data'

const links = [
  { id: 'about', no: '01', label: 'About' },
  { id: 'projects', no: '02', label: 'Work' },
  { id: 'achievements', no: '03', label: 'Skills' },
  { id: 'certificates', no: '04', label: 'Certificates' },
  { id: 'contact', no: '05', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
    >
      <a href="#hero" className="logo" data-cursor>{profile.name}</a>

      <nav className={`nav-links ${open ? 'open' : ''}`}>
        {links.map((l) => (
          <a key={l.id} href={`#${l.id}`} data-cursor onClick={() => setOpen(false)}>
            <span>{l.no}</span> {l.label}
          </a>
        ))}
      </nav>

      <button
        className={`menu-btn ${open ? 'open' : ''}`}
        aria-label="Menu"
        onClick={() => setOpen(!open)}
      >
        <span /><span />
      </button>
    </motion.header>
  )
}
