import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Photo from '@/components/ui/Photo'
import { productPhoto } from '@/data/images'
import { tr } from '@/lib/tr'
import { weight } from '@/lib/format'
import { Icon } from '@/icons'
import { useProductDisplay } from '@/hooks/useProductDisplay'
import { useQuickView } from '@/hooks/useQuickView'

export default function ProductCard({ product, dept }) {
  const { t } = useTranslation()
  const { lang } = useParams()
  const category = dept.categories.find((c) => c.key === product.cat)
  const { quickViewFor } = useProductDisplay()
  const { open } = useQuickView()

  // plain click opens the quick view; Ctrl/⌘-click or "off" in the admin opens the full page
  const onClick = (e) => {
    if (quickViewFor(dept) === 'off' || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    open(product)
  }

  return (
    <Link to={`/${lang}/departments/${product.dept}/${product.slug}`} onClick={onClick} className="group flex flex-col gap-3.5">
      <div className="relative aspect-[1/1.08] overflow-hidden rounded-[28px] bg-surface transition-all duration-500 ease-brand group-hover:-translate-y-1.5 group-hover:rounded-[40px] group-hover:shadow-[0_24px_48px_rgba(13,27,19,0.12)]">
        <Photo id={productPhoto(product)} w={600} className="transition-transform duration-[900ms] ease-brand group-hover:scale-110">
          <span className="absolute inset-0 flex items-center justify-center">
            <Icon name={dept.icon} strokeWidth={0.9} className="size-20" style={{ color: dept.tint }} />
          </span>
        </Photo>
        <span className="absolute left-3.5 top-3.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#0D1B13]">
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