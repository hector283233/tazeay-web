import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import Header from '@/components/layout/Header'
import HeroBackground from '@/components/sections/HeroBackground'
import WordReveal from '@/components/ui/WordReveal'
import SpinBadge from '@/components/ui/SpinBadge'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { heroPalette } from '@/lib/color'
import { tr } from '@/lib/tr'
import { Icon } from '@/icons'

const ease = [0.2, 0.8, 0.2, 1]
const rise = (delay) => ({ initial: { opacity: 0, y: 32 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay, ease } })

export default function DeptHero({ dept, products, onPick }) {
  const { t } = useTranslation()
  const { lang } = useParams()
  const base = `/${lang}`
  const name = tr(dept.name, lang)
  const palette = heroPalette(dept.tint)

  return (
    <div className="p-3.5">
      <section aria-label={name} style={{ background: dept.tint }}
        className="relative mx-auto flex min-h-[820px] max-w-[1412px] flex-col overflow-hidden rounded-[40px]">
        <HeroBackground sky={palette.sky} hills={palette.hills} />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/50" />
        <Header variant="hero" />

        <div className="relative mt-12 px-6 text-center text-white">
          <motion.div {...rise(0.1)} className="flex justify-center">
            <Breadcrumbs light items={[
              { label: t('nav.home'), to: base },
              { label: t('nav.departments'), to: `${base}/departments` },
              { label: name },
            ]} />
          </motion.div>
          <h1 className="mt-6 font-display text-[clamp(44px,6.5vw,84px)] font-medium leading-[1.04] tracking-[-0.045em]">
            <WordReveal text={name} delay={0.3} />
          </h1>
          <motion.p {...rise(0.55)} className="mx-auto mt-4 max-w-[540px] text-lg leading-relaxed text-white/90">
            {tr(dept.tagline, lang)}
          </motion.p>
        </div>

        <div className="relative mt-auto flex flex-wrap items-end gap-6 px-7 pb-7 pt-10">
          <motion.div {...rise(0.7)} className="relative flex max-w-[400px] flex-[1_1_330px] flex-col gap-3.5 rounded-[30px] bg-surface p-6 text-ink">
            <SpinBadge to={`${base}/contacts`} label={t('dept.write')} text={t('dept.badge')} className="absolute -right-5 -top-9" />
            <span className="inline-flex items-center gap-2 text-[13px] text-muted">
              <span className="animate-pulse-dot size-2 rounded-full bg-primary" />{t('dept.contact')}
            </span>
            <span className="font-display text-2xl font-medium tracking-[-0.03em]">{dept.phone ?? 'info@tazeay.com'}</span>
            <div className="mt-1.5 flex items-end justify-between gap-3">
              <div>
                <div className="font-display text-[42px] font-medium leading-none tracking-[-0.04em]">{dept.categories.length}</div>
                <div className="mt-1.5 text-[13px] text-muted">{t('dept.categories')}</div>
              </div>
              <Link to={`${base}/contacts`}
                className="btn-shine inline-flex h-12 items-center gap-2 rounded-full bg-ink pl-5 pr-2 text-[15px] font-medium text-bg">
                {t('dept.write')}
                <span className="flex size-[34px] items-center justify-center rounded-full bg-[#C8F169] text-[#0D1B13]">
                  <Icon name="arrow" className="size-[15px]" strokeWidth={2} />
                </span>
              </Link>
            </div>
          </motion.div>

          <motion.div {...rise(0.5)} className="flex-[1.6_1_560px] rounded-[30px] border border-white/30 bg-white/15 p-3 backdrop-blur-xl">
            <div className="px-2 pb-2.5 pt-1 text-sm font-medium text-white">{t('dept.catTiles')}</div>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {dept.categories.map((c, i) => {
                const count = products.filter((p) => p.cat === c.key).length
                return (
                  <motion.button key={c.key} type="button" onClick={() => onPick(c.key)} {...rise(0.8 + i * 0.08)}
                    className="group relative flex aspect-square flex-col justify-between rounded-[20px] bg-white/15 p-3.5 text-left text-white transition duration-500 ease-brand hover:-translate-y-1 hover:bg-white/30">
                    <span className="pr-6 text-[15px] font-medium">{tr(c.name, lang)}</span>
                    <Icon name="arrow" strokeWidth={2}
                      className="absolute right-3 top-3 size-[18px] -translate-x-1.5 translate-y-1.5 text-[#C8F169] opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                    <span className="flex items-end justify-between">
                      <span className="text-[13px] opacity-85">{t('dept.items', { count })}</span>
                      <Icon name={dept.icon} strokeWidth={1.3}
                        className="size-[38px] transition-transform duration-500 ease-brand group-hover:-rotate-8 group-hover:scale-115" />
                    </span>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}