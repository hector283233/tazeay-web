import { Link } from 'react-router-dom'

export default function Breadcrumbs({ items, light = false, className = '' }) {
  const box = light
    ? 'rounded-full border border-white/25 bg-white/15 px-4 py-2 text-white backdrop-blur-md'
    : 'text-muted'
  return (
    <nav aria-label="breadcrumb" className={`inline-flex flex-wrap items-center gap-2 text-sm ${box} ${className}`}>
      {items.map((it, i) => (
        <span key={i} className="inline-flex items-center gap-2">
          {i > 0 && <span aria-hidden="true">/</span>}
          {it.to
            ? <Link to={it.to} className={light ? 'text-white hover:text-[#C8F169]' : 'text-muted hover:text-ink'}>{it.label}</Link>
            : <span aria-current="page" className={light ? 'text-[#C8F169]' : 'text-ink'}>{it.label}</span>}
        </span>
      ))}
    </nav>
  )
}