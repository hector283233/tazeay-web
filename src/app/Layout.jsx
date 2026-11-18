import { useEffect } from 'react'
import { Outlet, Navigate, ScrollRestoration, useParams, useMatches } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { MotionConfig } from 'motion/react'
import { LANGS } from '@/i18n'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollProgress from '@/components/layout/ScrollProgress'

const htmlLang = (l) => (l === 'tm' ? 'tk' : l)

export default function Layout() {
  const { lang } = useParams()
  const { t, i18n } = useTranslation()
  const heroHeader = useMatches().some((m) => m.handle?.heroHeader)

  useEffect(() => {
    if (LANGS.includes(lang)) {
      i18n.changeLanguage(lang)
      document.documentElement.lang = htmlLang(lang)
    }
  }, [lang, i18n])

  if (!LANGS.includes(lang)) return <Navigate to="/ru" replace />

  return (
    <MotionConfig reducedMotion="user">
      <a href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-bg">
        {t('a11y.skip')}
      </a>
      <div className="min-h-screen overflow-x-clip">
        <ScrollProgress />
        {!heroHeader && <Header />}
        <div id="content" tabIndex={-1} className="outline-none">
          <Outlet />
        </div>
        <Footer />
      </div>
      <ScrollRestoration />
    </MotionConfig>
  )
}