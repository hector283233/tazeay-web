import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import Reveal from '@/components/ui/Reveal'
import SectionHead from '@/components/ui/SectionHead'
import { departments } from '@/data/departments'
import { tr } from '@/lib/tr'
import { Icon } from '@/icons'

export default function DepartmentsBento() {
  const { t } = useTranslation()
  const { lang } = useParams()
  const base = `/${lang}`
  const fadeIn = (i) => ({
    initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true },
    transition: { delay: i * 0.04, duration: 0.6 },
  })

  return (
    <Reveal as="section" aria-labelledby="h-depts" className="mt-28">
      <SectionHead id="h-depts" eyebrow={t('home.deptsEyebrow')} title={t('home.deptsTitle')}
        right={<p className="max-w-[380px] text-[17px] leading-relaxed text-muted">{t('home.deptsText')}</p>} />

      <div className="grid grid-flow-dense auto-rows-[230px] grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-3.5">
        {departments.map((d, i) => {
          const big = i === 0
          const wide = i === 2 || i === 8
          return (
            <motion.div key={d.slug} {...fadeIn(i)}
              className={big ? 'sm:col-span-2 sm:row-span-2' : wide ? 'sm:col-span-2' : ''}>
              <Link to={`${base}/departments/${d.slug}`}
                className="tilt flex h-full flex-col justify-between overflow-hidden rounded-[30px] p-6"
                style={{ background: big ? d.tint : d.soft, color: big ? '#FFFFFF' : '#0D1B13' }}>
                <span className="flex items-start justify-between gap-3">
                  <span className={`font-display font-medium leading-[1.1] tracking-[-0.03em] ${big ? 'text-3xl sm:text-[40px]' : wide ? 'text-2xl' : 'text-[19px]'}`}>
                    {tr(d.name, lang)}
                  </span>
                  <span className={`flex size-[42px] shrink-0 items-center justify-center rounded-full text-[#0D1B13] ${big ? 'bg-[#C8F169]' : 'bg-white'}`}>
                    <Icon name="arrow" className="size-[18px]" strokeWidth={1.8} />
                  </span>
                </span>
                <span className="flex items-end justify-between gap-3">
                  <span className="max-w-[200px] text-sm leading-snug opacity-80">{tr(d.cats, lang)}</span>
                  <Icon name={d.icon} strokeWidth={1.1}
                    className={`tilt-icon shrink-0 ${big ? 'size-[120px] sm:size-[200px]' : wide ? 'size-[110px]' : 'size-[76px]'}`}
                    style={{ color: big ? '#FFFFFF' : d.tint }} />
                </span>
              </Link>
            </motion.div>
          )
        })}

        <motion.div {...fadeIn(departments.length)}>
          <Link to={`${base}/departments`}
            className="tilt group relative flex h-full flex-col justify-between overflow-hidden rounded-[30px] bg-[#C8F169] p-6 text-[#0D1B13]">
            <span aria-hidden="true" className="absolute -bottom-12 -right-12 size-44 rounded-full bg-white/50 transition-transform duration-700 group-hover:scale-125" />
            <span className="relative font-display text-[22px] font-medium leading-tight">{t('home.allDepts')}</span>
            <span className="relative flex size-[52px] items-center justify-center rounded-full bg-[#0D1B13] text-[#C8F169]">
              <Icon name="arrow" className="size-[22px]" strokeWidth={1.8} />
            </span>
          </Link>
        </motion.div>
      </div>
    </Reveal>
  )
}