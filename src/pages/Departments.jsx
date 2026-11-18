import { useSeo } from '@/hooks/useSeo'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'motion/react'
import { useDepartments } from '@/api/hooks'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import WordReveal from '@/components/ui/WordReveal'
import PageLoader from '@/components/ui/PageLoader'
import { tr } from '@/lib/tr'
import { Icon } from '@/icons'

export default function Departments() {
  const { t } = useTranslation()
  const { lang } = useParams()
  const base = `/${lang}`
  const { data = [], isLoading } = useDepartments()
  const [q, setQ] = useState('')
  useSeo(t('seo.departments.t'), t('seo.departments.d'))

  const s = q.trim().toLowerCase()
  const list = data.filter((d) => !s ||
    [tr(d.name, lang), ...d.categories.map((c) => tr(c.name, lang))].some((x) => x.toLowerCase().includes(s)))

  return (
    <main className="mx-auto max-w-[1320px] px-6">
      <section className="mt-20 flex flex-wrap items-end justify-between gap-8">
        <div>
          <Breadcrumbs items={[{ label: t('nav.home'), to: base }, { label: t('nav.departments') }]} />
          <h1 className="mt-5 font-display text-[clamp(52px,8vw,96px)] font-medium leading-[0.98] tracking-[-0.055em]">
            <WordReveal text={t('depts.title')} delay={0.15} />
            <motion.span initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 260, damping: 14 }}
              className="ml-2 inline-flex h-11 min-w-16 items-center justify-center rounded-full bg-[#C8F169] px-3.5 align-top font-body text-xl font-semibold tracking-normal text-[#0D1B13]">
              {data.length}
            </motion.span>
          </h1>
        </div>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="flex max-w-[400px] flex-col gap-4">
          <p className="text-[17px] leading-relaxed text-muted">{t('depts.text')}</p>
          <form role="search" onSubmit={(e) => e.preventDefault()}
            className="flex h-14 items-center gap-2.5 rounded-full border border-line bg-surface pl-5 pr-2">
            <Icon name="search" className="size-5 text-muted" />
            <label htmlFor="dq" className="sr-only">{t('depts.search')}</label>
            <input id="dq" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('depts.search')}
              className="flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-muted" />
            <button type="submit" className="btn-shine h-[42px] rounded-full bg-ink px-[18px] text-sm font-medium text-bg">{t('depts.find')}</button>
          </form>
        </motion.div>
      </section>

      {isLoading ? <PageLoader /> : (
        <motion.section layout aria-label={t('nav.departments')}
          className="mt-16 grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-4">
          <AnimatePresence mode="popLayout">
            {list.map((d, i) => (
              <motion.div key={d.slug} layout initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.6, delay: 0.3 + i * 0.04, ease: [0.2, 0.8, 0.2, 1] }}>
                <Link to={`${base}/departments/${d.slug}`}
                  className="tilt flex h-full min-h-[330px] flex-col justify-between gap-5 overflow-hidden rounded-[32px] p-6 text-[#0D1B13]"
                  style={{ background: d.soft }}>
                  <span className="flex items-start justify-between gap-3">
                    <span className="font-display text-2xl font-medium leading-[1.1] tracking-[-0.03em]">{tr(d.name, lang)}</span>
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white">
                      <Icon name="arrow" className="size-[18px]" strokeWidth={1.8} />
                    </span>
                  </span>
                  <Icon name={d.icon} strokeWidth={0.9} className="tilt-icon -my-2 size-[110px] self-end" style={{ color: d.tint }} />
                  <span className="flex flex-wrap gap-1.5">
                    {d.categories.map((c) => (
                      <span key={c.key} className="rounded-full bg-white/75 px-3 py-1.5 text-[13px] font-medium">{tr(c.name, lang)}</span>
                    ))}
                  </span>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>

          {list.length === 0 && (
            <p className="col-span-full rounded-[28px] bg-surface p-10 text-center text-muted">{t('depts.none')}</p>
          )}

          <motion.div layout className="sm:col-span-2">
            <Link to={`${base}/contacts`}
              className="tilt group relative flex h-full min-h-[330px] flex-col justify-between overflow-hidden rounded-[32px] bg-[#0D1B13] p-8 text-[#EEF2EA]">
              <span aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-[radial-gradient(circle,rgba(200,241,105,0.3),transparent_70%)] transition-transform duration-700 group-hover:scale-125" />
              <span className="relative text-[13px] font-medium uppercase tracking-[0.1em] text-[#C8F169]">{t('depts.ctaEyebrow')}</span>
              <span className="relative max-w-[460px] font-display text-[clamp(28px,3vw,36px)] font-medium leading-[1.08] tracking-[-0.04em]">{t('depts.ctaTitle')}</span>
              <span className="relative inline-flex h-[52px] items-center gap-2.5 self-start rounded-full bg-[#C8F169] pl-[22px] pr-2 text-[15px] font-semibold text-[#0D1B13]">
                {t('depts.ctaBtn')}
                <span className="flex size-9 items-center justify-center rounded-full bg-[#0D1B13] text-[#C8F169]">
                  <Icon name="arrow" className="size-4" strokeWidth={2} />
                </span>
              </span>
            </Link>
          </motion.div>
        </motion.section>
      )}
    </main>
  )
}