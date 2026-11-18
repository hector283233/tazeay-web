import { motion } from 'motion/react'

export default function WordReveal({ text, delay = 0, step = 0.1, className = '', wordClassName = '' }) {
  return (
    <span className={className}>
      {text.split(' ').map((w, i) => (
        <span key={i} className="mr-[0.24em] inline-block overflow-hidden pb-[0.1em] align-bottom">
          <motion.span className={`inline-block origin-bottom-left ${wordClassName}`}
            initial={{ y: '115%', rotate: 4 }} animate={{ y: 0, rotate: 0 }}
            transition={{ duration: 1.05, delay: delay + i * step, ease: [0.2, 0.8, 0.2, 1] }}>
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  )
}