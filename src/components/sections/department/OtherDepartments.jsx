import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Reveal from '@/components/ui/Reveal'
import { departments } from '@/data/departments'
import { tr } from '@/lib/tr'
import { Icon } from '@/icons'

export default function OtherDepartments({ current }) {
  const { t } = useTranslation()
  const { lang } = useParams()
  const base = `/${lang}`

  return (
    <Reveal as="section" aria-labelledby="h-other" className="mt-32">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <h2 id="h-other" className="font-display text-[clamp(28px,3.5vw,40px)] font-medium tracking-[-0.04em]">{t('dept.others')}</h2>
        <Link to={`${base}/departments`} className="group inline-flex min-h-11 items-center gap-2 text-[15px] font-medium">
          {t('home.allDepts')}
          <Icon name="arrow" className="size-[18px] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.8} />
        </Link>
      </div>
      <div className="-mx-6 flex snap-x snap-mandatory gap-3.5 overflow-x-auto px-6 pb-4 pt-2">
        {departments.filter((d) => d.slug !== current).map((d) => (
          <Link key={d.slug} to={`${base}/departments/${d.slug}`}
            className="tilt flex h-[250px] w-[230px] shrink-0 snap-start flex-col justify-between rounded-[28px] p-5 text-[#0D1B13]"
            style={{ background: d.soft }}>
            <span className="font-display text-lg font-medium leading-tight tracking-[-0.02em]">{tr(d.name, lang)}</span>
            <Icon name={d.icon} strokeWidth={1.1} className="tilt-icon size-20 self-end" style={{ color: d.tint }} />
          </Link>
        ))}
      </div>
    </Reveal>
  )
}