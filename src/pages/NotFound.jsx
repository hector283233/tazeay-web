import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'

export default function NotFound() {
  const { t } = useTranslation()
  const { lang = 'ru' } = useParams()
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-[720px] flex-col items-center justify-center px-6 text-center">
      <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 14 }}
        className="font-display text-[clamp(96px,18vw,180px)] font-medium leading-none tracking-[-0.06em] text-primary">
        404
      </motion.div>
      <h1 className="mt-4 font-display text-3xl font-medium tracking-tight">{t('notFound.title')}</h1>
      <p className="mt-3 text-muted">{t('notFound.text')}</p>
      <Link to={`/${lang}`} className="btn-shine mt-8 inline-flex h-12 items-center rounded-full bg-ink px-6 font-medium text-bg">
        {t('notFound.back')}
      </Link>
    </main>
  )
}