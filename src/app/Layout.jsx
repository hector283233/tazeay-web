import { useEffect } from 'react'
import { Outlet, Navigate, useParams, useMatches } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { MotionConfig } from 'motion/react'
import { LANGS } from '@/i18n'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollProgress from '@/components/layout/ScrollProgress'

export default function Layout() {
  const { lang } = useParams()
  const { i18n } = useTranslation()
  const heroHeader = useMatches().some((m) => m.handle?.heroHeader)

  useEffect(() => {
    if (LANGS.includes(lang)) {
      i18n.changeLanguage(lang)
      document.documentElement.lang = lang
    }
  }, [lang, i18n])

  if (!LANGS.includes(lang)) return <Navigate to="/ru" replace />

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen overflow-x-clip">
        <ScrollProgress />
        {!heroHeader && <Header />}
        <Outlet />
        <Footer />
      </div>
    </MotionConfig>
  )
}