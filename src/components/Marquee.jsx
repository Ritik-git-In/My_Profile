import { motion } from 'framer-motion'

const items = [
  'LangChain', 'LangGraph', 'OpenAI', 'n8n', 'Python', 'RAG',
  'MCP', 'FastAPI', 'Prompt Engineering', 'Next.js', 'React', 'AI Agents',
]

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden>
      <motion.div
        className="marquee-track"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
      >
        {[...items, ...items].map((t, i) => (
          <span key={i}>{t}<i>✦</i></span>
        ))}
      </motion.div>
    </div>
  )
}
