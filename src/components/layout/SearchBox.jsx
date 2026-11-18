import { useTranslation } from 'react-i18next'
import { Icon } from '@/icons'

export default function SearchBox({ className = '', tone = 'bg' }) {
  const { t } = useTranslation()
  return (
    <form role="search" onSubmit={(e) => e.preventDefault()}
      className={`h-11 w-[210px] items-center gap-2 rounded-full px-4 ${tone === 'surface' ? 'bg-surface' : 'bg-bg'} ${className}`}>
      <Icon name="search" className="size-[18px] text-muted" />
      <label htmlFor={`q-${tone}`} className="sr-only">{t('nav.search')}</label>
      <input id={`q-${tone}`} type="search" placeholder={t('nav.search')}
        className="w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-muted" />
    </form>
  )
}