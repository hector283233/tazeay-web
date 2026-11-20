import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Reveal from '@/components/ui/Reveal'
import SectionHead from '@/components/ui/SectionHead'
import Photo from '@/components/ui/Photo'
import { productPhoto } from '@/data/images'
import { tr } from '@/lib/tr'
import { weight } from '@/lib/format'
import { Icon } from '@/icons'

export default function DeptHits({ dept, products }) {
  const { t } = useTranslation()
  const { lang } = useParams()
  if (!products.length) return null

  return (
    <Reveal as="section" aria-labelledby="h-hits" className="mt-28">
      <SectionHead id="h-hits" eyebrow={t('dept.hitsEyebrow')} title={t('dept.hitsTitle')}
        right={
          <a href="#catalog" className="group inline-flex min-h-11 items-center gap-2 text-[15px] font-medium">
            {t('dept.fullCatalog')}
            <Icon name="arrow" className="size-[18px] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.8} />
          </a>
        } />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
        {products.map((p) => {
          const cat = dept.categories.find((c) => c.key === p.cat)
          return (
            <Link key={p.slug} to={`/${lang}/departments/${dept.slug}/${p.slug}`}
              className="tilt group relative flex min-h-[440px] flex-col justify-between overflow-hidden rounded-[32px] p-6 text-white"
              style={{ background: dept.tint }}>
              <Photo id={productPhoto(p)} w={800} className="transition-transform duration-[900ms] ease-brand group-hover:scale-110" />
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/30" />
              <span className="relative flex items-center justify-between">
                <span className="rounded-full bg-[#C8F169] px-3.5 py-1.5 text-xs font-semibold text-[#0D1B13]">
                  {p.isNew ? t('product.new') : t('dept.hit')}
                </span>
                <span className="rounded-full bg-black/30 px-3 py-1.5 text-[13px] backdrop-blur">{tr(cat?.name, lang)}</span>
              </span>
              <span className="relative flex items-end justify-between gap-3">
                <span>
                  <span className="block font-display text-[26px] font-medium leading-tight tracking-[-0.03em]">{tr(p.name, lang)}</span>
                  {p.weights.length > 0 && <span className="mt-1.5 block text-sm text-white/85">{weight(p.weights[0], t)}</span>}
                </span>
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white text-[#0D1B13] transition-transform duration-300 group-hover:rotate-45">
                  <Icon name="arrow" className="size-5" strokeWidth={1.8} />
                </span>
              </span>
            </Link>
          )
        })}
      </div>
    </Reveal>
  )
}