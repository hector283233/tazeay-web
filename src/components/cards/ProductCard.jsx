import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { tr } from '@/lib/tr'
import { weight } from '@/lib/format'
import { Icon } from '@/icons'

export default function ProductCard({ product, dept }) {
  const { t } = useTranslation()
  const { lang } = useParams()
  const category = dept.categories.find((c) => c.key === product.cat)

  return (
    <Link to={`/${lang}/departments/${product.dept}/${product.slug}`} className="group flex flex-col gap-3.5">
      <div className="relative flex aspect-[1/1.08] items-center justify-center rounded-[28px] bg-surface transition-all duration-500 ease-brand group-hover:-translate-y-1.5 group-hover:rounded-[40px] group-hover:shadow-[0_24px_48px_rgba(13,27,19,0.12)]">
        <Icon name={dept.icon} strokeWidth={0.9} style={{ color: dept.tint }}
          className="size-20 transition-transform duration-700 ease-brand group-hover:-rotate-6 group-hover:scale-115" />
        <span className="absolute left-3.5 top-3.5 rounded-full bg-bg px-3 py-1.5 text-xs font-semibold">
          {product.isNew ? t('product.new') : t('product.halal')}
        </span>
        <span className="absolute bottom-3.5 right-3.5 flex size-[46px] scale-50 items-center justify-center rounded-full bg-[#C8F169] text-[#0D1B13] opacity-0 transition duration-300 ease-brand group-hover:scale-100 group-hover:opacity-100">
          <Icon name="arrow" className="size-[18px]" strokeWidth={2} />
        </span>
      </div>
      <div className="px-1.5">
        <p className="text-[13px] text-muted">{tr(category?.name, lang)}</p>
        <h3 className="mt-1 text-lg font-medium leading-snug transition-colors group-hover:text-primary">{tr(product.name, lang)}</h3>
        {product.weights.length > 0 && (
          <p className="mt-1.5 text-sm text-muted">{product.weights.map((w) => weight(w, t)).join(' · ')}</p>
        )}
      </div>
    </Link>
  )
}