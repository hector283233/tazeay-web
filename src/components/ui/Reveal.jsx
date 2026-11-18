import { motion } from 'motion/react'

export default function Reveal({ as = 'div', delay = 0, y = 32, className = '', children, ...rest }) {
  const M = motion[as]
  return (
    <M initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, delay, ease: [0.2, 0.8, 0.2, 1] }} className={className} {...rest}>
      {children}
    </M>
  )
}