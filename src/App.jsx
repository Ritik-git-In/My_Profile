import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Certificates from './components/Certificates'
import Contact from './components/Contact'

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader onDone={() => setLoading(false)} />}
      </AnimatePresence>

      <Cursor />
      <ScrollProgress />

      <div className="bg-dots" />
      <div className="bg-grain" />

      {!loading && (
        <>
          <Navbar />
          <main>
            <Hero />
            <Marquee />
            <About />
            <Projects />
            <Skills />
            <Certificates />
            <Contact />
          </main>
          <footer className="footer">
            <span>© {new Date().getFullYear()} Ritik Sharma</span>
            <span>Designed &amp; built with care</span>
          </footer>
        </>
      )}
    </>
  )
}
