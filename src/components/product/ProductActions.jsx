import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/icons'

export default function ProductActions({ dept, showPhone = true, size = 'lg', className = '' }) {
  const { t } = useTranslation()
  const { lang } = useParams()
  const h = size === 'lg' ? 'h-[58px]' : 'h-[52px]'
  return (
    <div className={`flex flex-wrap gap-2.5 ${className}`}>
      <Link to={`/${lang}/contacts`}
        className={`btn-shine inline-flex ${h} items-center gap-3 rounded-full bg-ink pl-[24px] pr-2 text-[15px] font-medium text-bg`}>
        {t('product.ask')}
        <span className="flex size-10 items-center justify-center rounded-full bg-[#C8F169] text-[#0D1B13]">
          <Icon name="arrow" className="size-[17px]" strokeWidth={2} />
        </span>
      </Link>
      {showPhone && dept.phone && (
        <a href={`tel:${dept.phone.replace(/\s/g, '')}`}
          className={`btn-shine inline-flex ${h} items-center gap-2.5 rounded-full border border-line bg-surface px-6 text-[15px] font-medium`}>
          {dept.phone}
        </a>
      )}
    </div>
  )
}
