import { Link, useLocation, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LANGS } from '@/i18n'

export default function LanguageSwitch({className = ''}){
    const {lang} = useParams()
    const {pathname, search} = useLocation()
    const {t} = useTranslation()
    const to = (l) => pathname.replace(/^\/(tm|ru|en)(?=\/|$)/, `/${l}`) + search

    return (
    <div role="group" aria-label={t('nav.language')} className={`flex rounded-full bg-bg p-[3px] ${className}`}>
      {LANGS.map((l) => (
        <Link key={l} to={to(l)} lang={l === 'tm' ? 'tk' : l} aria-current={l === lang ? 'true' : undefined}
          className={`flex h-[38px] min-w-[38px] items-center justify-center rounded-full text-[13px] uppercase transition-colors
            ${l === lang ? 'bg-surface font-semibold text-ink' : 'font-medium text-muted hover:text-ink'}`}>
          {l}
        </Link>
      ))}
    </div>
  )
}