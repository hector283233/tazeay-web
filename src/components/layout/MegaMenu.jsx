import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { departments } from '@/data/departments'
import { tr } from '@/lib/tr'
import { Icon } from '@/icons'

const ease = [0.2, 0.8, 0.2, 1]

export default function MegaMenu() {
  const { lang } = useParams()
  const { t } = useTranslation()

  return (
    <div className="absolute left-1/2 top-full z-50 w-[min(1120px,calc(100vw-32px))] -translate-x-1/2 pt-2.5">
      <motion.div id="mega-menu" role="region" aria-label={t('nav.departments')}
        initial={{ opacity: 0, y: -12, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.98 }} transition={{ duration: 0.3, ease }}
        className="flex flex-wrap gap-3.5 rounded-[32px] border border-ink/10 bg-surface/95 p-3.5 shadow-[0_40px_80px_rgba(13,27,19,0.18)] backdrop-blur-2xl">
        <ul className="grid flex-[3_1_620px] grid-cols-[repeat(auto-fill,minmax(236px,1fr))] gap-0.5">
          {departments.map((d, i) => (
            <motion.li key={d.slug} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.025, duration: 0.45, ease }}>
              <Link to={`/${lang}/departments/${d.slug}`}
                className="group flex items-center gap-3 rounded-[18px] p-2.5 transition duration-300 ease-brand hover:translate-x-1 hover:bg-bg">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-[14px] transition-transform duration-500 ease-brand group-hover:-rotate-8 group-hover:scale-110"
                  style={{ background: d.soft, color: d.tint }}>
                  <Icon name={d.icon} className="size-[22px]" strokeWidth={1.6} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[15px] font-medium">{tr(d.name, lang)}</span>
                  <span className="mt-0.5 block text-xs text-muted">{tr(d.cats, lang)}</span>
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
        <motion.div className="flex-[1_1_230px]" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5, ease }}>
          <Link to={`/${lang}/departments`}
            className="group relative flex h-full min-h-60 flex-col justify-between overflow-hidden rounded-3xl bg-accent p-6 text-[#0D1B13]">
            <span aria-hidden className="absolute -right-10 -top-10 size-40 rounded-full bg-white/45 transition-transform duration-700 group-hover:scale-125" />
            <span className="relative text-[13px] font-medium">{t('nav.count')}</span>
            <span className="relative font-display text-2xl font-medium leading-tight tracking-tight">{t('nav.allDepartments')}</span>
            <span className="relative flex size-12 items-center justify-center rounded-full bg-[#0D1B13] text-accent">
              <Icon name="arrow" className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}