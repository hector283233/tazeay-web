import { Link, useParams } from 'react-router-dom'
import { tr } from '@/lib/tr'

export default function DeptChip({ dept, product, className = '' }) {
  const { lang } = useParams()
  const category = dept.categories.find((c) => c.key === product.cat)
  return (
    <Link to={`/${lang}/departments/${dept.slug}`}
      className={`inline-flex items-center gap-2 rounded-full py-1.5 pl-2.5 pr-3.5 text-sm text-[#0D1B13] ${className}`}
      style={{ background: dept.soft }}>
      <span className="size-2 rounded-full" style={{ background: dept.tint }} />
      {tr(dept.name, lang)}{category ? ` · ${tr(category.name, lang)}` : ''}
    </Link>
  )
}
