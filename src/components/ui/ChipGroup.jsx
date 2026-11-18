import { useId } from 'react'
import { motion } from 'motion/react'

export default function ChipGroup({ label, options, value, onChange }) {
  const id = useId()
  return (
    <div role="group" aria-label={label} className="inline-flex flex-wrap gap-1.5 rounded-full border border-line bg-surface p-1.5">
      {options.map((o) => {
        const active = o.value === value
        return (
          <button key={o.value} type="button" aria-pressed={active} onClick={() => onChange(o.value)}
            className={`relative h-11 rounded-full px-5 text-[15px] font-medium transition-colors ${active ? 'text-[#C8F169]' : 'text-ink hover:bg-bg'}`}>
            {active && (
              <motion.span layoutId={`chip-${id}`} className="absolute inset-0 rounded-full bg-[#0D1B13]"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }} />
            )}
            <span className="relative">{o.label}</span>
          </button>
        )
      })}
    </div>
  )
}