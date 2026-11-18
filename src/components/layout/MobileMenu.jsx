import { useEffect } from 'react'
import { Link, NavLink, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'motion/react'
import { departments } from '@/data/departments'
import { tr } from '@/lib/tr'
import { Icon } from '@/icons'
import LanguageSwitch from './LanguageSwitch'

export default function MobileMenu({ open, onClose }) {
  const { lang } = useParams()
  const { t } = useTranslation()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [open, onClose])

  const links = [['home', ''], ['about', '/about'], ['gallery', '/gallery'], ['news', '/news'], ['contacts', '/contacts']]

  return (
    <AnimatePresence>
      {open && (
        <motion.div role="dialog" aria-modal="true" aria-label={t('nav.main')}
          initial={{ opacity: 0, y: -24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
          className="fixed inset-0 z-[60] overflow-y-auto bg-bg px-5 pb-10 pt-5 lg:hidden">
          <div className="flex items-center justify-between">
            <LanguageSwitch />
            <button type="button" onClick={onClose} aria-label={t('nav.close')}
              className="flex size-12 items-center justify-center rounded-full bg-ink text-bg">
              <Icon name="close" />
            </button>
          </div>
          <nav className="mt-10 flex flex-col">
            {links.map(([k, p], i) => (
              <motion.div key={k} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>
                <NavLink to={`/${lang}${p}`} end={p === ''} onClick={onClose}
                  className={({ isActive }) => `block border-b border-line py-4 font-display text-3xl font-medium tracking-tight ${isActive ? 'text-primary' : ''}`}>
                  {t(`nav.${k}`)}
                </NavLink>
              </motion.div>
            ))}
          </nav>
          <h2 className="mt-10 text-sm font-medium text-muted">{t('nav.departments')}</h2>
          <ul className="mt-3 grid grid-cols-2 gap-2">
            {departments.map((d) => (
              <li key={d.slug}>
                <Link to={`/${lang}/departments/${d.slug}`} onClick={onClose}
                  className="flex h-full items-center gap-2.5 rounded-2xl p-3 text-sm font-medium" style={{ background: d.soft }}>
                  <Icon name={d.icon} className="size-5 shrink-0" style={{ color: d.tint }} />
                  {tr(d.name, lang)}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  )
}