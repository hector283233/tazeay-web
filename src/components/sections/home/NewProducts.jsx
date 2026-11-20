import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Reveal from '@/components/ui/Reveal'
import SectionHead from '@/components/ui/SectionHead'
import Photo from '@/components/ui/Photo'
import { newProducts } from '@/data/home'
import { newProductPhotos } from '@/data/images'
import { tr } from '@/lib/tr'
import { Icon } from '@/icons'

export default function NewProducts() {
  const { t } = useTranslation()
  const { lang } = useParams()

  return (
    <Reveal as="section" aria-labelledby="h-new" className="mt-32">
      <SectionHead id="h-new" eyebrow={t('home.newEyebrow')} dot="bg-[#C8102E]" title={t('home.newTitle')} />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
        {newProducts.map((p) => (
          <Link key={p.slug} to={`/${lang}/departments/chocolate/${p.slug}`}
            className="tilt group relative flex min-h-[440px] flex-col justify-between overflow-hidden rounded-[32px] p-6 text-white"
            style={{ background: p.tint }}>
            <Photo id={newProductPhotos[p.slug]} w={800} className="transition-transform duration-[900ms] ease-brand group-hover:scale-110" />
            <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/30" />
            <span className="relative flex items-center justify-between">
              <span className="rounded-full bg-[#C8F169] px-3.5 py-1.5 text-xs font-semibold text-[#0D1B13]">{t('home.newBadge')}</span>
              <span className="rounded-full bg-black/30 px-3 py-1.5 text-[13px] backdrop-blur">{tr(p.dept, lang)}</span>
            </span>
            <span className="relative flex items-end justify-between">
              <span className="font-display text-3xl font-medium tracking-[-0.03em]">{p.name}</span>
              <span className="flex size-12 items-center justify-center rounded-full bg-white text-[#0D1B13] transition-transform duration-300 group-hover:rotate-45">
                <Icon name="arrow" className="size-5" strokeWidth={1.8} />
              </span>
            </span>
          </Link>
        ))}
      </div>
    </Reveal>
  )
}