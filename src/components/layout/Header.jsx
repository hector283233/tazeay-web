import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AnimatePresence } from 'motion/react'
import Logo from './Logo'
import LanguageSwitch from './LanguageSwitch'
import ThemeToggle from './ThemeToggle'
import SearchBox from './SearchBox'
import MegaMenu from './MegaMenu'
import MobileMenu from './MobileMenu'
import { Icon } from '@/icons'

const LINKS = [['about', '/about'], ['gallery', '/gallery'], ['news', '/news'], ['contacts', '/contacts']]

const linkClass = ({ isActive }) =>
  `nav-link rounded-full px-3.5 py-3 text-[15px] font-medium transition-colors ${
    isActive ? 'bg-ink text-bg' : 'text-ink/75 hover:text-ink'}`

export default function Header({ variant = 'plain' }) {
  const { t } = useTranslation()
  const { lang } = useParams()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [mobile, setMobile] = useState(false)
  const wrapRef = useRef(null)
  const base = `/${lang}`
  const inDepts = pathname.startsWith(`${base}/departments`)

  const [lastPath, setLastPath] = useState(pathname)
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setOpen(false)
    setMobile(false)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const onDown = (e) => wrapRef.current && !wrapRef.current.contains(e.target) && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onDown)
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onDown) }
  }, [open])

  const deptBtn = open ? 'bg-accent text-[#0D1B13]' : inDepts ? 'bg-ink text-bg' : 'text-ink/75 hover:text-ink'

  const nav = (
    <nav aria-label={t('nav.main')} className="hidden items-center gap-0.5 lg:flex">
      <NavLink to={base} end className={linkClass}>{t('nav.home')}</NavLink>
      <button type="button" aria-expanded={open} aria-controls="mega-menu"
        onClick={() => setOpen((o) => !o)} onMouseEnter={() => setOpen(true)}
        className={`flex items-center gap-1.5 rounded-full px-3.5 py-3 text-[15px] font-medium transition-colors ${deptBtn}`}>
        {t('nav.departments')}
        <Icon name="chevron" strokeWidth={2} className={`size-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      {LINKS.map(([k, p]) => (
        <NavLink key={k} to={base + p} className={linkClass}>{t(`nav.${k}`)}</NavLink>
      ))}
    </nav>
  )

  const burger = (
    <button type="button" onClick={() => setMobile(true)} aria-label={t('nav.menu')}
      className="flex size-11 items-center justify-center rounded-full bg-ink text-bg lg:hidden">
      <Icon name="menu" />
    </button>
  )

  const menus = (
    <>
      <AnimatePresence>{open && <MegaMenu />}</AnimatePresence>
      <MobileMenu open={mobile} onClose={() => setMobile(false)} />
    </>
  )

  if (variant === 'hero') {
    return (
      <div ref={wrapRef} onMouseLeave={() => setOpen(false)} className="relative z-30">
        <header className="flex items-start justify-between gap-3">
          <div className="hidden rounded-br-[28px] bg-bg py-2.5 pl-3 pr-3.5 md:block"><LanguageSwitch /></div>
          <div className="flex items-center gap-2.5 rounded-b-[28px] bg-bg px-3.5 pb-3 pt-2">
            <Logo size="lg" />
            {nav}
            <SearchBox tone="surface" className="hidden xl:flex" />
            {burger}
          </div>
          <div className="hidden rounded-bl-[28px] bg-bg py-2.5 pl-3.5 pr-3 md:block"><ThemeToggle /></div>
        </header>
        {menus}
      </div>
    )
  }

  return (
    <div ref={wrapRef} onMouseLeave={() => setOpen(false)} className="sticky top-0 z-40 px-4 pt-3">
      <header className="mx-auto flex max-w-[1320px] items-center justify-between gap-3 rounded-full border border-ink/10 bg-surface/80 py-2 pl-2.5 pr-2 shadow-[0_8px_30px_rgba(13,27,19,0.06)] backdrop-blur-xl">
        <Logo />
        {nav}
        <div className="flex items-center gap-1.5">
          <SearchBox className="hidden xl:flex" />
          <LanguageSwitch className="hidden md:flex" />
          <ThemeToggle />
          <Link to={`${base}/contacts`}
            className="btn-shine hidden h-11 items-center gap-2 rounded-full bg-ink px-[18px] text-[15px] font-medium text-bg sm:inline-flex">
            {t('nav.contact')} <Icon name="arrow" strokeWidth={2} className="size-4 text-accent" />
          </Link>
          {burger}
        </div>
      </header>
      {menus}
    </div>
  )
}