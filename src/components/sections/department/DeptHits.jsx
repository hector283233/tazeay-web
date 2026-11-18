import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Reveal from '@/components/ui/Reveal'
import SectionHead from '@/components/ui/SectionHead'
import { tr } from '@/lib/tr'
import { weight } from '@/lib/format'
import { Icon } from '@/icons'

export default function DeptHits({ dept, products }) {
  const { t } = useTranslation()
  const { lang } = useParams()
  if (!products.length) return null

  const styles = [
    { bg: dept.tint, fg: '#FFFFFF', ic: '#FFFFFF', btn: 'bg-[#C8F169] text-[#0D1B13]' },
    { bg: dept.soft, fg: '#0D1B13', ic: dept.tint, btn: 'bg-[#0D1B13] text-white' },
    { bg: '#FFFFFF', fg: '#0D1B13', ic: dept.tint, btn: 'bg-[#0D1B13] text-white' },
  ]

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
        {products.map((p, i) => {
          const s = styles[i % 3]
          const cat = dept.categories.find((c) => c.key === p.cat)
          return (
            <Link key={p.slug} to={`/${lang}/departments/${dept.slug}/${p.slug}`}
              className="tilt flex min-h-[440px] flex-col justify-between overflow-hidden rounded-[32px] p-6"
              style={{ background: s.bg, color: s.fg }}>
              <span className="flex items-center justify-between">
                <span className="rounded-full bg-[#C8F169] px-3.5 py-1.5 text-xs font-semibold text-[#0D1B13]">
                  {p.isNew ? t('product.new') : t('dept.hit')}
                </span>
                <span className="text-[13px] opacity-80">{tr(cat?.name, lang)}</span>
              </span>
              <span className="animate-floaty self-center" style={{ animationDelay: `${i * 0.6}s` }}>
                <Icon name={dept.icon} strokeWidth={0.7} className="tilt-icon size-[170px]" style={{ color: s.ic }} />
              </span>
              <span className="flex items-end justify-between gap-3">
                <span>
                  <span className="block font-display text-[26px] font-medium leading-tight tracking-[-0.03em]">{tr(p.name, lang)}</span>
                  {p.weights.length > 0 && <span className="mt-1.5 block text-sm opacity-80">{weight(p.weights[0], t)}</span>}
                </span>
                <span className={`flex size-12 shrink-0 items-center justify-center rounded-full ${s.btn}`}>
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