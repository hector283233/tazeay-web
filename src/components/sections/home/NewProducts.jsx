import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Reveal from '@/components/ui/Reveal'
import SectionHead from '@/components/ui/SectionHead'
import { newProducts } from '@/data/home'
import { tr } from '@/lib/tr'
import { Icon } from '@/icons'

export default function NewProducts() {
  const { t } = useTranslation()
  const { lang } = useParams()

  return (
    <Reveal as="section" aria-labelledby="h-new" className="mt-32">
      <SectionHead id="h-new" eyebrow={t('home.newEyebrow')} dot="bg-[#C8102E]" title={t('home.newTitle')} />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
        {newProducts.map((p, i) => (
          <Link key={p.slug} to={`/${lang}/departments/chocolate/${p.slug}`}
            className="tilt flex min-h-[440px] flex-col justify-between overflow-hidden rounded-[32px] p-6 text-[#0D1B13]"
            style={{ background: p.bg }}>
            <span className="flex items-center justify-between">
              <span className="rounded-full bg-[#C8F169] px-3.5 py-1.5 text-xs font-semibold">{t('home.newBadge')}</span>
              <span className="text-[13px] text-[#3E4A42]">{tr(p.dept, lang)}</span>
            </span>
            <span className="animate-floaty self-center" style={{ animationDelay: `${i * 0.6}s` }}>
              <Icon name={p.icon} strokeWidth={0.7} className="tilt-icon size-[170px]" style={{ color: p.tint }} />
            </span>
            <span className="flex items-end justify-between">
              <span className="font-display text-3xl font-medium tracking-[-0.03em]">{p.name}</span>
              <span className="flex size-12 items-center justify-center rounded-full bg-[#0D1B13] text-white">
                <Icon name="arrow" className="size-5" strokeWidth={1.8} />
              </span>
            </span>
          </Link>
        ))}
      </div>
    </Reveal>
  )
}