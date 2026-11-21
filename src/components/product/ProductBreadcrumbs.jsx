import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { tr } from '@/lib/tr'

export default function ProductBreadcrumbs({ product, dept, className = '' }) {
  const { t } = useTranslation()
  const { lang } = useParams()
  const base = `/${lang}`
  return (
    <Breadcrumbs className={className} items={[
      { label: t('nav.home'), to: base },
      { label: t('nav.departments'), to: `${base}/departments` },
      { label: tr(dept.name, lang), to: `${base}/departments/${dept.slug}` },
      { label: tr(product.name, lang) },
    ]} />
  )
}
