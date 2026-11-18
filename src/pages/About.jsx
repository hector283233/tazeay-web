import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import PageIntro from '@/components/ui/PageIntro'
import ClipReveal from '@/components/ui/ClipReveal'
import Counter from '@/components/ui/Counter'
import Reveal from '@/components/ui/Reveal'
import HeroBackground from '@/components/sections/HeroBackground'
import { factories, certificates } from '@/data/content'
import { tr } from '@/lib/tr'
import { Icon } from '@/icons'

const statCards = [
  { key: 'products', value: 200, suffix: '+', box: 'bg-[#C8F169] text-[#0D1B13]', label: 'text-[#0D1B13]' },
  { key: 'factories', value: 5, box: 'bg-surface text-ink', label: 'text-muted' },
  { key: 'jobs', value: 1705, box: 'bg-[#0D1B13] text-[#C8F169]', label: 'text-[#C9D3C6]' },
]
const principleKeys = ['raw', 'new', 'pack', 'team']

export default function About() {
  const { t } = useTranslation()
  const { lang } = useParams()

  return (
    <main className="mx-auto max-w-[1320px] px-6">
      <PageIntro eyebrow={t('about.eyebrow')} title={t('about.title1')} accent={t('about.title2')} text={t('about.text')} />

      <ClipReveal className="mt-16 aspect-[21/8.5] min-h-[260px]">
        <HeroBackground />
        <span className="absolute bottom-[74px] left-6 rounded-full bg-white px-3.5 py-2 text-[13px] text-[#0D1B13]">{t('about.photo')}</span>
      </ClipReveal>

      <Reveal as="section" aria-label={t('home.statsEyebrow')} className="mt-24 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
        {statCards.map((s) => (
          <div key={s.key} className={`tilt rounded-[32px] p-8 ${s.box}`}>
            <Counter to={s.value} suffix={s.suffix} className="block font-display text-[clamp(52px,6vw,72px)] font-medium leading-none tracking-[-0.05em]" />
            <div className={`mt-3.5 text-base ${s.label}`}>{t(`home.stats.${s.key}`)}</div>
          </div>
        ))}
      </Reveal>

      <Reveal as="section" id="factories" aria-labelledby="h-fc" className="mt-32 scroll-mt-28">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 id="h-fc" className="font-display text-[clamp(36px,4.5vw,56px)] font-medium leading-none tracking-[-0.045em]">{t('about.factoriesTitle')}</h2>
          <p className="max-w-[360px] text-[17px] text-muted">{t('about.factoriesText')}</p>
        </div>
        <ol className="border-t border-line">
          {factories.map((f, i) => (
            <motion.li key={f.key} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="row-hover group flex flex-wrap items-center gap-7 rounded-3xl border-b border-line py-7">
              <span className="w-14 font-display text-lg font-medium text-primary">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="flex-[1_1_320px] font-display text-[26px] font-medium tracking-[-0.03em]">{tr(f.name, lang)}</h3>
              <span className="text-[15px] text-muted">{tr(f.info, lang)}</span>
              <span className="flex size-12 items-center justify-center rounded-full border border-line bg-surface transition duration-300 group-hover:rotate-45 group-hover:bg-[#C8F169] group-hover:text-[#0D1B13]">
                <Icon name="arrow" className="size-[18px]" strokeWidth={1.8} />
              </span>
            </motion.li>
          ))}
        </ol>
      </Reveal>

      <Reveal as="section" id="certificates" aria-labelledby="h-cert" className="mt-32">
        <h2 id="h-cert" className="mb-9 font-display text-[clamp(36px,4.5vw,56px)] font-medium leading-none tracking-[-0.045em]">{t('about.certTitle')}</h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-5">
          {certificates.map((c) => (
            <a key={c.key} href="#" aria-label={`${tr(c.name, lang)} — ${t('about.certOpen')}`}
              className="tilt flex flex-col gap-4 rounded-[30px] bg-surface p-3.5 pb-5">
              <span aria-hidden="true" className="flex aspect-[3/4] items-center justify-center rounded-[20px] border border-dashed border-line bg-bg">
                <Icon name="check" strokeWidth={1.1} className="tilt-icon size-14 text-primary" />
              </span>
              <span className="flex items-center justify-between px-1.5">
                <span className="font-medium">{tr(c.name, lang)}</span>
                <Icon name="arrow" className="size-[18px]" strokeWidth={1.8} />
              </span>
            </a>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" aria-labelledby="h-pr"
        className="relative mt-32 overflow-hidden rounded-[40px] bg-[#0D1B13] px-8 py-16 text-[#EEF2EA] md:px-14 md:py-[72px]">
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -right-32 size-[460px] rounded-full bg-[radial-gradient(circle,rgba(200,241,105,0.22),transparent_70%)]" />
        <h2 id="h-pr" className="relative mb-12 font-display text-[clamp(34px,4.2vw,52px)] font-medium leading-none tracking-[-0.045em]">{t('about.principlesTitle')}</h2>
        <div className="relative grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
          {principleKeys.map((k, i) => (
            <div key={k} className="tilt flex min-h-[260px] flex-col justify-between rounded-[28px] border border-[#23362A] bg-[#16291E] p-7">
              <span className="font-display text-[44px] font-medium tracking-[-0.05em] text-[#C8F169]">{String(i + 1).padStart(2, '0')}</span>
              <span>
                <h3 className="font-display text-[22px] font-medium tracking-[-0.02em]">{t(`home.principles.${k}.t`)}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-[#C9D3C6]">{t(`home.principles.${k}.d`)}</p>
              </span>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="mt-24 flex flex-wrap items-center justify-between gap-6">
        <h2 className="font-display text-[clamp(30px,3.6vw,44px)] font-medium tracking-[-0.045em]">{t('about.galleryCta')}</h2>
        <Link to={`/${lang}/gallery`}
          className="btn-shine inline-flex h-[58px] items-center gap-3 rounded-full bg-ink pl-[26px] pr-2.5 text-base font-medium text-bg">
          {t('about.galleryBtn')}
          <span className="flex size-10 items-center justify-center rounded-full bg-[#C8F169] text-[#0D1B13]">
            <Icon name="arrow" className="size-[17px]" strokeWidth={2} />
          </span>
        </Link>
      </Reveal>
    </main>
  )
}