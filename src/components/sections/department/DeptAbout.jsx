import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useScroll, useTransform } from 'motion/react'
import { Icon } from '@/icons'

export default function DeptAbout({ dept }) {
  const { t } = useTranslation()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [60, -60])
  const points = ['halal', 'own', 'wholesale']

  return (
    <section aria-labelledby="h-about" className="mt-32 flex flex-wrap items-center gap-14">
      <motion.div ref={ref} aria-hidden="true"
        initial={{ clipPath: 'inset(14% 14% 14% 14% round 48px)' }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 36px)' }}
        viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative flex aspect-[5/4] flex-[1_1_460px] items-center justify-center overflow-hidden"
        style={{ background: dept.soft }}>
        <motion.div style={{ y }}>
          <Icon name={dept.icon} strokeWidth={0.5} className="size-[220px]" style={{ color: dept.tint }} />
        </motion.div>
        <span className="absolute bottom-5 left-5 rounded-full bg-white px-3 py-1.5 text-[13px]" style={{ color: dept.tint }}>
          {t('dept.photo')}
        </span>
      </motion.div>

      <motion.div className="flex-[1_1_400px]" initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.2 }}>
        <span className="inline-flex items-center gap-2 text-sm font-medium text-muted">
          <span className="size-2 rounded-full" style={{ background: dept.tint }} />{t('dept.aboutEyebrow')}
        </span>
        <h2 id="h-about" className="mt-3 font-display text-[clamp(32px,4vw,48px)] font-medium leading-[1.02] tracking-[-0.045em]">
          {t('dept.aboutTitle')}
        </h2>
        <p className="mt-5 text-[17px] leading-relaxed text-muted">{t('dept.aboutText')}</p>
        <ul className="mt-7 flex flex-col gap-2.5">
          {points.map((k, i) => (
            <motion.li key={k} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center gap-3.5 rounded-[20px] bg-surface px-5 py-4 text-base">
              <span className="flex size-8 items-center justify-center rounded-full bg-[#C8F169] text-[#0D1B13]">
                <Icon name="check" className="size-4" strokeWidth={2.2} />
              </span>
              {t(`dept.points.${k}`)}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  )
}