import { useId } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { Icon } from '@/icons'

export default function SpinBadge({ to, label, text, className = '' }) {
  const id = 'c' + useId().replace(/:/g, '')
  return (
    <motion.div className={className} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: 'spring', stiffness: 220, damping: 14 }}>
      <Link to={to} aria-label={label}
        className="group relative flex size-[104px] items-center justify-center rounded-full bg-[#C8F169] text-[#0D1B13] shadow-[0_0_0_6px_rgba(255,255,255,0.35)]">
        <svg aria-hidden="true" viewBox="0 0 100 100" className="animate-spin-slow absolute inset-0 size-full">
          <defs><path id={id} d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" /></defs>
          <text fontSize="9.2" fontWeight="600" letterSpacing="2.2" fill="currentColor">
            <textPath href={`#${id}`}>{text}</textPath>
          </text>
        </svg>
        <Icon name="arrow" strokeWidth={1.8} className="size-[26px] transition-transform duration-300 group-hover:rotate-45" />
      </Link>
    </motion.div>
  )
}