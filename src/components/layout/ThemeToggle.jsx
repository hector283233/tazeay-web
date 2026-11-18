import { useTranslation } from 'react-i18next'
import { useTheme } from '@/hooks/useTheme'
import { Icon } from '@/icons'

export default function ThemeToggle() {
    const [theme, toggle] = useTheme()
    const { t } = useTranslation()

    return (
        <button type="button" onClick={toggle} aria-label={t('nav.theme')} aria-pressed={theme === 'dark'}
            className="btn-shine flex size-11 items-center justify-center rounded-full bg-bg text-ink">
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} className="size-[18px]" />
        </button>
    )
}