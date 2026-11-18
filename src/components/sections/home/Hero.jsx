import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import Header from '@/components/layout/Header'
import HeroBackground from '@/components/sections/HeroBackground'
import WordReveal from '@/components/ui/WordReveal'
import Counter from '@/components/ui/Counter'
import SpinBadge from '@/components/ui/SpinBadge'
import { departments } from '@/data/departments'
import { tr } from '@/lib/tr'
import { Icon } from '@/icons'

const ease = [0.2, 0.8, 0.2, 1]
const rise = (delay) => ({
  initial: { opacity: 0, y: 32 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay, ease },
})

export default function Hero() {
  const { t } = useTranslation()
  const { lang } = useParams()
  const base = `/${lang}`
  const avatars = [departments[0], departments[2], departments[7]]

  return (
    <div className="p-3.5">
      <section aria-label={t('home.heroLabel')}
        className="relative mx-auto flex min-h-[680px] md:min-h-[860px] max-w-[1412px] flex-col overflow-hidden rounded-[40px] bg-[#5A8A3E]">
        <HeroBackground />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#08140c]/20 via-[#08140c]/10 to-[#08140c]/50" />
        <Header variant="hero" />

        <div className="relative mt-14 px-6 text-center text-white">
          <motion.span {...rise(0.2)}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/15 py-2 pl-2.5 pr-4 text-sm backdrop-blur-md">
            <span className="animate-pulse-dot size-2.5 rounded-full bg-[#C8F169]" />
            {t('home.pill')}
          </motion.span>
          <h1 className="mt-6 font-display text-[clamp(44px,6vw,78px)] font-medium leading-[1.04] tracking-[-0.045em]">
            <WordReveal text={t('home.title1')} delay={0.9} className="block" />
            <WordReveal text={t('home.title2')} delay={1.15} className="block" wordClassName="text-[#C8F169]" />
          </h1>
        </div>

        <div className="relative mt-auto flex flex-wrap items-stretch gap-6 px-4 pb-4 pt-10 sm:px-7 sm:pb-7">
          {/* left: text + suppliers card */}
          <div className="flex flex-[1_1_330px] flex-col justify-between gap-10">
            <motion.p {...rise(0.65)} className="max-w-[300px] text-base leading-relaxed text-white">
              {t('home.lead')}
            </motion.p>
            <motion.div {...rise(0.8)} className="relative max-w-[400px] rounded-[30px] bg-surface p-6 text-ink">
              <SpinBadge to={`${base}/departments`} label={t('home.catalog')} text={t('home.badge')}
                className="absolute -right-2 -top-10 sm:-right-6" />
              <h2 className="max-w-[260px] font-display text-[19px] font-medium uppercase leading-tight tracking-tight">
                {t('home.suppliersTitle')}
              </h2>
              <p className="mt-3 text-sm leading-normal text-muted">{t('home.suppliersText')}</p>
              <div className="mt-5 flex items-end gap-3.5">
                <div>
                  <Counter to={200} suffix="+" delay={1}
                    className="block font-display text-[42px] font-medium leading-none tracking-[-0.04em]" />
                  <span className="mt-1.5 block text-[13px] text-muted">{t('home.productTypes')}</span>
                </div>
                <div aria-hidden="true" className="ml-auto flex">
                  {avatars.map((d, i) => (
                    <span key={d.slug}
                      className="animate-floaty -ml-3 flex size-11 items-center justify-center rounded-full border-[3px] border-surface first:ml-0"
                      style={{ background: d.soft, color: d.tint, animationDelay: `${i * 0.4}s` }}>
                      <Icon name={d.icon} className="size-5" strokeWidth={1.6} />
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* right: glass panel with 8 department tiles */}
          <motion.div {...rise(0.5)}
            className="flex flex-[1.6_1_560px] flex-col gap-2.5 self-end rounded-[30px] border border-white/30 bg-white/15 p-3 backdrop-blur-xl">
            <div className="flex items-center justify-between px-2 pt-1 text-white">
              <span className="text-sm font-medium">{t('home.ourDepts')}</span>
              <Link to={`${base}/departments`} className="group inline-flex min-h-10 items-center gap-1.5 text-sm font-medium text-white">
                {t('home.allN')}
                <Icon name="arrow" strokeWidth={2} className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {departments.slice(0, 8).map((d, i) => (
                <motion.div key={d.slug} {...rise(1.1 + i * 0.07)}>
                  <Link to={`${base}/departments/${d.slug}`}
                    className="group relative flex aspect-[1.12/1] flex-col justify-between rounded-[20px] bg-white/15 px-3.5 py-3 text-white transition duration-500 ease-brand hover:-translate-y-1 hover:bg-white/30">
                    <span className="pr-6 text-sm font-medium leading-tight">{tr(d.name, lang)}</span>
                    <Icon name="arrow" strokeWidth={2}
                      className="absolute right-3 top-3 size-[18px] -translate-x-1.5 translate-y-1.5 text-[#C8F169] opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                    <Icon name={d.icon} strokeWidth={1.3}
                      className="size-9 self-end transition-transform duration-500 ease-brand group-hover:-rotate-8 group-hover:scale-115" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}