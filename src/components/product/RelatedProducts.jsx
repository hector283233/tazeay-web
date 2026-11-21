import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Reveal from '@/components/ui/Reveal'
import ProductCard from '@/components/cards/ProductCard'
import { Icon } from '@/icons'

export default function RelatedProducts({ dept, products }) {
  const { t } = useTranslation()
  const { lang } = useParams()
  if (!products.length) return null
  return (
    <Reveal as="section" aria-labelledby="h-rel" className="mt-32">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <h2 id="h-rel" className="font-display text-[clamp(30px,3.6vw,44px)] font-medium tracking-[-0.045em]">{t('product.related')}</h2>
        <Link to={`/${lang}/departments/${dept.slug}`} className="group inline-flex min-h-11 items-center gap-2 text-[15px] font-medium">
          {t('product.allDept')}
          <Icon name="arrow" className="size-[18px] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.8} />
        </Link>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-5">
        {products.map((p) => <ProductCard key={p.slug} product={p} dept={dept} />)}
      </div>
    </Reveal>
  )
}
