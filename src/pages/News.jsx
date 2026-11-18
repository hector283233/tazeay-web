import { useSeo } from '@/hooks/useSeo'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'motion/react'
import { useNews } from '@/api/hooks'
import PageIntro from '@/components/ui/PageIntro'
import ChipGroup from '@/components/ui/ChipGroup'
import ClipReveal from '@/components/ui/ClipReveal'
import PageLoader from '@/components/ui/PageLoader'
import Reveal from '@/components/ui/Reveal'
import HeroBackground from '@/components/sections/HeroBackground'
import { tr } from '@/lib/tr'
import { Icon } from '@/icons'

export default function News() {
  const { t } = useTranslation()
  const { lang } = useParams()
  const base = `/${lang}`
  const { data = [], isLoading } = useNews()
  const [tag, setTag] = useState('all')
  const [shown, setShown] = useState(5)
  useSeo(t('seo.news.t'), t('seo.news.d'))

  if (isLoading) return <PageLoader />
  const [featured, ...rest] = data
  const filtered = tag === 'all' ? rest : rest.filter((n) => n.tag === tag)
  const list = filtered.slice(0, shown)
  const options = [
    { value: 'all', label: t('news.allTopics') },
    ...['exhibition', 'products', 'company'].map((k) => ({ value: k, label: t(`news.tags.${k}`) })),
  ]

  return (
    <main className="mx-auto max-w-[1320px] px-6">
      <PageIntro eyebrow={t('news.eyebrow')} title={t('news.title')} />

      {featured && (
        <motion.article initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.9 }}
          className="mt-12 flex flex-wrap items-stretch gap-3.5">
          <ClipReveal className="min-h-[420px] flex-[1.3_1_520px]">
            <HeroBackground />
            <span className="absolute left-5 top-[70px] rounded-full bg-[#C8F169] px-3.5 py-1.5 text-[13px] font-semibold text-[#0D1B13]">{t('news.featured')}</span>
          </ClipReveal>
          <div className="flex flex-[1_1_380px] flex-col justify-between gap-7 rounded-[36px] bg-surface p-10">
            <div>
              <span className="flex flex-wrap items-center gap-2 text-sm text-muted">
                <span className="rounded-full bg-bg px-3 py-1.5 font-medium text-ink">{t(`news.tags.${featured.tag}`)}</span>
                {tr(featured.date, lang)}
              </span>
              <h2 className="mt-5 font-display text-[clamp(28px,3vw,36px)] font-medium leading-[1.1] tracking-[-0.04em]">{tr(featured.title, lang)}</h2>
              <p className="mt-4 text-[17px] leading-relaxed text-muted">{tr(featured.excerpt, lang)}</p>
            </div>
            <Link to={`${base}/news/${featured.slug}`}
              className="btn-shine inline-flex h-[54px] items-center gap-3 self-start rounded-full bg-ink pl-6 pr-2.5 text-[15px] font-medium text-bg">
              {t('news.read')}
              <span className="flex size-9 items-center justify-center rounded-full bg-[#C8F169] text-[#0D1B13]">
                <Icon name="arrow" className="size-4" strokeWidth={2} />
              </span>
            </Link>
          </div>
        </motion.article>
      )}

      <Reveal as="section" aria-labelledby="h-all" className="mt-24">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 id="h-all" className="font-display text-[clamp(28px,3.4vw,40px)] font-medium tracking-[-0.04em]">{t('news.all')}</h2>
          <ChipGroup label={t('news.topics')} options={options} value={tag} onChange={(v) => { setTag(v); setShown(5) }} />
        </div>

        {list.length === 0 ? (
          <p className="rounded-[28px] bg-surface p-10 text-center text-muted">{t('news.none')}</p>
        ) : (
          <div className="border-t border-line">
            <AnimatePresence mode="popLayout">
              {list.map((n, i) => (
                <motion.div key={n.slug} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }} transition={{ delay: i * 0.05 }}>
                  <Link to={`${base}/news/${n.slug}`}
                    className="row-hover group flex flex-wrap items-center gap-7 rounded-3xl border-b border-line py-6">
                    <span aria-hidden="true" className="h-[84px] w-[120px] rounded-[18px] bg-[#DCE9CF] transition-transform duration-500 group-hover:scale-105" />
                    <span className="w-44 text-sm text-muted">{tr(n.date, lang)}</span>
                    <span className="flex-[1_1_320px] font-display text-[22px] font-medium tracking-[-0.02em]">{tr(n.title, lang)}</span>
                    <span className="rounded-full border border-line px-3.5 py-1.5 text-[13px]">{t(`news.tags.${n.tag}`)}</span>
                    <span className="flex size-12 items-center justify-center rounded-full border border-line bg-surface transition duration-300 group-hover:rotate-45 group-hover:bg-[#C8F169] group-hover:text-[#0D1B13]">
                      <Icon name="arrow" className="size-[18px]" strokeWidth={1.8} />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {filtered.length > shown && (
          <div className="mt-10 flex justify-center">
            <button type="button" onClick={() => setShown((s) => s + 5)}
              className="btn-shine h-[52px] rounded-full border border-line bg-surface px-7 text-[15px] font-medium">
              {t('news.more')}
            </button>
          </div>
        )}
      </Reveal>
    </main>
  )
}