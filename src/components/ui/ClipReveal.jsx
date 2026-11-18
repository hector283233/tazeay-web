import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

export default function ClipReveal({ className = '', style, children }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <motion.div ref={ref} style={style}
      initial={{ clipPath: 'inset(14% 14% 14% 14% round 48px)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 36px)' }}
      viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
      className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="absolute inset-x-0 -inset-y-[50px]">{children}</motion.div>
    </motion.div>
  )
}