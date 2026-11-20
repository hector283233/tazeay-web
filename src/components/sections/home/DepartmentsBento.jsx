import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import Reveal from '@/components/ui/Reveal'
import SectionHead from '@/components/ui/SectionHead'
import Photo from '@/components/ui/Photo'
import { departments } from '@/data/departments'
import { deptPhotos } from '@/data/images'
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
                className="tilt group relative flex h-full flex-col justify-between overflow-hidden rounded-[30px] p-6 text-white"
                style={{ background: d.tint }}>
                <Photo id={deptPhotos[d.slug]} w={big ? 1100 : wide ? 900 : 600}
                  className="transition-transform duration-[900ms] ease-brand group-hover:scale-110" />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
                <span className="relative flex items-start justify-end">
                  <span className={`flex size-[42px] items-center justify-center rounded-full text-[#0D1B13] transition-transform duration-300 group-hover:rotate-45 ${big ? 'bg-[#C8F169]' : 'bg-white'}`}>
                    <Icon name="arrow" className="size-[18px]" strokeWidth={1.8} />
                  </span>
                </span>
                <span className="relative">
                  <span className={`block font-display font-medium leading-[1.1] tracking-[-0.03em] ${big ? 'text-3xl sm:text-[44px]' : wide ? 'text-[26px]' : 'text-xl'}`}>
                    {tr(d.name, lang)}
                  </span>
                  <span className="mt-2 block text-sm text-white/85">{tr(d.cats, lang)}</span>
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