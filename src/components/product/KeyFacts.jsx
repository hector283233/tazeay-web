import { useParams } from 'react-router-dom'
import { tr } from '@/lib/tr'
import { keyFacts } from '@/lib/attributes'

const number = (it, lang) => {
  if (typeof it.value === 'number') return it.value.toLocaleString(lang === 'en' ? 'en-US' : 'ru-RU')
  return typeof it.value === 'object' ? tr(it.value, lang) : it.value
}

// The few most important values as tiles: big (gallery page) or small (quick view)
export default function KeyFacts({ groups, size = 'lg', limit = 4, className = '' }) {
  const { lang } = useParams()
  const facts = keyFacts(groups, limit)
  if (!facts.length) return null
  const big = size === 'lg'
  return (
    <div className={`grid gap-3 ${big ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-3'} ${className}`}>
      {facts.map((it) => (
        <div key={it.key}
          className={big ? 'tilt rounded-[28px] bg-surface px-6 pb-5 pt-6' : 'rounded-[20px] bg-bg px-4 py-3.5'}>
          <p className={`font-display font-medium leading-none tracking-[-0.04em] ${big ? 'text-[clamp(32px,3.4vw,44px)]' : 'text-[22px]'}`}>
            {number(it, lang)}
            {it.unit && <span className={`ml-1.5 text-muted ${big ? 'text-lg' : 'text-sm'}`}>{tr(it.unit, lang)}</span>}
          </p>
          <p className={`text-muted ${big ? 'mt-3 text-sm' : 'mt-1 text-[13px]'}`}>{tr(it.name, lang)}</p>
        </div>
      ))}
    </div>
  )
}
