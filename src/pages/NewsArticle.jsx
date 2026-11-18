import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { useNews, useNewsItem } from '@/api/hooks'
import WordReveal from '@/components/ui/WordReveal'
import ClipReveal from '@/components/ui/ClipReveal'
import PageLoader from '@/components/ui/PageLoader'
import Reveal from '@/components/ui/Reveal'
import HeroBackground from '@/components/sections/HeroBackground'
import NotFound from '@/pages/NotFound'
import { tr } from '@/lib/tr'
import { Icon } from '@/icons'

export default function NewsArticle() {
  const { t } = useTranslation()
  const { lang, newsSlug } = useParams()
  const base = `/${lang}`
  const { data: item, isLoading } = useNewsItem(newsSlug)
  const { data: all = [] } = useNews()

  if (isLoading) return <PageLoader />
  if (!item) return <NotFound />
  const others = all.filter((n) => n.slug !== item.slug).slice(0, 3)

  return (
    <main className="mx-auto max-w-[1320px] px-6">
      <article className="mx-auto mt-14 max-w-[860px]">
        <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}>
          <Link to={`${base}/news`} className="group inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-ink">
            <Icon name="chevron" strokeWidth={2} className="size-4 rotate-90 transition-transform group-hover:-translate-x-1" />
            {t('news.back')}
          </Link>
        </motion.div>
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
          className="mt-8 flex flex-wrap items-center gap-2 text-sm text-muted">
          <span className="rounded-full bg-surface px-3 py-1.5 font-medium text-ink">{t(`news.tags.${item.tag}`)}</span>
          {tr(item.date, lang)}
        </motion.span>
        <h1 className="mt-5 font-display text-[clamp(36px,5vw,60px)] font-medium leading-[1.02] tracking-[-0.05em]">
          <WordReveal text={tr(item.title, lang)} delay={0.2} step={0.06} />
        </h1>
      </article>

      <ClipReveal className="mx-auto mt-12 aspect-[21/9] min-h-[260px] max-w-[1100px]">
        <HeroBackground />
      </ClipReveal>

      <Reveal className="mx-auto mt-14 max-w-[720px] space-y-6 text-lg leading-[1.75]">
        <p className="text-xl font-medium leading-relaxed">{tr(item.excerpt, lang)}</p>
        {item.body.map((p, i) => <p key={i} className="text-ink/85">{tr(p, lang)}</p>)}
      </Reveal>

      {others.length > 0 && (
        <Reveal as="section" aria-labelledby="h-other" className="mt-28">
          <h2 id="h-other" className="mb-6 font-display text-[clamp(28px,3.4vw,40px)] font-medium tracking-[-0.04em]">{t('news.other')}</h2>
          <div className="border-t border-line">
            {others.map((n) => (
              <Link key={n.slug} to={`${base}/news/${n.slug}`}
                className="row-hover group flex flex-wrap items-center gap-7 rounded-3xl border-b border-line py-6">
                <span className="w-44 text-sm text-muted">{tr(n.date, lang)}</span>
                <span className="flex-[1_1_320px] font-display text-[22px] font-medium tracking-[-0.02em]">{tr(n.title, lang)}</span>
                <span className="flex size-12 items-center justify-center rounded-full border border-line bg-surface transition duration-300 group-hover:rotate-45 group-hover:bg-[#C8F169] group-hover:text-[#0D1B13]">
                  <Icon name="arrow" className="size-[18px]" strokeWidth={1.8} />
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      )}
    </main>
  )
}