import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Reveal from '@/components/ui/Reveal'
import SectionHead from '@/components/ui/SectionHead'
import { latestNews } from '@/data/home'
import { tr } from '@/lib/tr'
import { Icon } from '@/icons'

export default function LatestNews() {
  const { t } = useTranslation()
  const { lang } = useParams()
  const base = `/${lang}`

  return (
    <Reveal as="section" aria-labelledby="h-news" className="mt-24">
      <SectionHead id="h-news" title={t('home.newsTitle')}
        right={
          <Link to={`${base}/news`} className="group inline-flex min-h-11 items-center gap-2 text-[15px] font-medium">
            {t('home.allNews')}
            <Icon name="arrow" className="size-[18px] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.8} />
          </Link>
        } />
      <div className="border-t border-line">
        {latestNews.map((n) => (
          <Link key={n.slug} to={`${base}/news/${n.slug}`}
            className="row-hover group flex flex-wrap items-center gap-7 rounded-3xl border-b border-line py-6">
            <span className="w-44 text-sm text-muted">{tr(n.date, lang)}</span>
            <span className="flex-[1_1_360px] font-display text-[22px] font-medium tracking-[-0.02em]">{tr(n.title, lang)}</span>
            <span className="rounded-full border border-line px-3.5 py-1.5 text-[13px]">{tr(n.tag, lang)}</span>
            <span className="flex size-12 items-center justify-center rounded-full border border-line bg-surface transition duration-300 group-hover:rotate-45 group-hover:bg-[#C8F169] group-hover:text-[#0D1B13]">
              <Icon name="arrow" className="size-[18px]" strokeWidth={1.8} />
            </span>
          </Link>
        ))}
      </div>
    </Reveal>
  )
}