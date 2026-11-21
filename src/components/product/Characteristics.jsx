import { useParams } from 'react-router-dom'
import { tr } from '@/lib/tr'
import { formatValue } from '@/lib/attributes'

// Grouped characteristics table (data from admin → Характеристики)
export default function Characteristics({ groups = [], className = '', boxed = true }) {
  const { lang } = useParams()
  if (!groups.length) return null
  return (
    <div className={`${boxed ? 'rounded-[28px] bg-surface px-6 pb-3 pt-1' : ''} ${className}`}>
      {groups.map((g) => (
        <section key={g.key} aria-label={tr(g.name, lang)}>
          <h3 className="mb-1 mt-5 text-xs font-semibold uppercase tracking-[0.08em] text-muted">{tr(g.name, lang)}</h3>
          <dl>
            {g.items.map((it, i) => (
              <div key={it.key}
                className={`flex justify-between gap-4 py-3.5 text-[15px] ${i < g.items.length - 1 ? 'border-b border-line' : ''}`}>
                <dt className="text-muted">{tr(it.name, lang)}</dt>
                <dd className="text-right font-medium">{formatValue(it, lang)}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  )
}
