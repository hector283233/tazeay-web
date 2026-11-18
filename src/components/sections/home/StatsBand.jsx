import { useTranslation } from 'react-i18next'
import Reveal from '@/components/ui/Reveal'
import Counter from '@/components/ui/Counter'
import { stats } from '@/data/home'

export default function StatsBand() {
  const { t } = useTranslation()
  return (
    <Reveal as="section" aria-label={t('home.statsEyebrow')}
      className="relative mt-32 flex flex-wrap items-center gap-12 overflow-hidden rounded-[40px] bg-[#0D1B13] px-8 py-16 text-[#EEF2EA] md:px-14 md:py-[72px]">
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-36 size-[460px] rounded-full bg-[radial-gradient(circle,rgba(200,241,105,0.2),transparent_70%)]" />
      <div className="relative flex-[1_1_340px]">
        <span className="text-[13px] font-medium uppercase tracking-[0.1em] text-[#C8F169]">{t('home.statsEyebrow')}</span>
        <h2 className="mt-4 font-display text-[clamp(32px,3.6vw,46px)] font-medium leading-[1.05] tracking-[-0.04em]">
          {t('home.statsTitle')}
        </h2>
        <p className="mt-5 max-w-[420px] text-[17px] leading-relaxed text-[#A7B3A9]">{t('home.statsText')}</p>
      </div>
      <div className="relative grid flex-[1.3_1_480px] grid-cols-2 gap-3.5">
        {stats.map((s) => (
          <div key={s.key} className="rounded-[26px] border border-[#23362A] bg-[#16291E] p-7">
            <Counter to={s.value} suffix={s.suffix}
              className="block font-display text-[clamp(40px,5vw,60px)] font-medium leading-none tracking-[-0.05em] text-[#C8F169]" />
            <div className="mt-3 text-[15px] text-[#C9D3C6]">{t(`home.stats.${s.key}`)}</div>
          </div>
        ))}
      </div>
    </Reveal>
  )
}