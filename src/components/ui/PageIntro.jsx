import { motion } from 'motion/react'
import WordReveal from '@/components/ui/WordReveal'

export default function PageIntro({ eyebrow, title, accent, text, children }) {
  return (
    <section className="mt-20 flex flex-wrap items-end justify-between gap-10">
      <div>
        <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted">
          <span className="animate-pulse-dot size-2 rounded-full bg-primary" />{eyebrow}
        </motion.span>
        <h1 className="mt-5 max-w-[880px] font-display text-[clamp(52px,8vw,96px)] font-medium leading-[0.98] tracking-[-0.055em]">
          <WordReveal text={title} delay={0.15} className="block" />
          {accent && <WordReveal text={accent} delay={0.4} className="block" wordClassName="text-primary" />}
        </h1>
      </div>
      {(text || children) && (
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="max-w-[420px]">
          {text && <p className="text-lg leading-relaxed text-muted">{text}</p>}
          {children}
        </motion.div>
      )}
    </section>
  )
}