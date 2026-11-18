import { useTranslation } from 'react-i18next'

export default function PageLoader() {
  const { t } = useTranslation()
  return (
    <div role="status" className="flex min-h-[60vh] items-center justify-center gap-3 text-muted">
      <span className="size-6 animate-spin rounded-full border-2 border-line border-t-[#1F5F3A]" />
      {t('common.loading')}
    </div>
  )
}