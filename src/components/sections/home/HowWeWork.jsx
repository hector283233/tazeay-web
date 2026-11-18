import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { principles } from '@/data/home'
import { Icon } from '@/icons'

export default function HowWeWork() {
  const { t } = useTranslation()
  const { lang } = useParams()

  return (
    <section aria-labelledby="h-how" className="mt-32 flex flex-wrap items-start gap-12">
      <div className="flex-[1_1_340px] md:sticky md:top-28">
        <span className="inline-flex items-center gap-2 text-sm font-medium text-muted">
          <span className="size-2 rounded-full bg-primary" />{t('home.howEyebrow')}
        </span>
        <h2 id="h-how" className="mt-3 font-display text-[clamp(36px,4.5vw,56px)] font-medium leading-none tracking-[-0.045em]">
          {t('home.howTitle')}
        </h2>
        <p className="mt-5 max-w-[400px] text-[17px] leading-relaxed text-muted">{t('home.howText')}</p>
        <Link to={`/${lang}/about`}
          className="btn-shine mt-7 inline-flex h-[54px] items-center gap-2.5 rounded-full bg-ink pl-6 pr-2.5 text-[15px] font-medium text-bg">
          {t('home.aboutMore')}
          <span className="flex size-9 items-center justify-center rounded-full bg-[#C8F169] text-[#0D1B13]">
            <Icon name="arrow" className="size-4" strokeWidth={2} />
          </span>
        </Link>
      </div>

      <div className="flex flex-[1.3_1_520px] flex-col gap-5 pb-10">
        {principles.map((p, i) => (
          <article key={p.key}
            className="sticky flex min-h-[280px] flex-col justify-between gap-8 rounded-[32px] border p-9 shadow-[0_-10px_40px_rgba(13,27,19,0.06)]"
            style={{ top: 110 + i * 24, background: p.bg, color: p.fg, borderColor: p.line }}>
            <span className="flex items-start justify-between">
              <span className="font-display text-6xl font-medium leading-[0.9] tracking-[-0.05em]">{p.n}</span>
              <Icon name={p.icon} strokeWidth={1.3} className="size-11" />
            </span>
            <span>
              <h3 className="font-display text-[28px] font-medium tracking-[-0.03em]">{t(`home.principles.${p.key}.t`)}</h3>
              <p className="mt-2.5 max-w-[440px] text-base leading-relaxed opacity-80">{t(`home.principles.${p.key}.d`)}</p>
            </span>
          </article>
        ))}
      </div>
    </section>
  )
}