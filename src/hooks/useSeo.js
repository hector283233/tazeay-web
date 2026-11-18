import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { LANGS } from '@/i18n'

const SITE = 'https://tazeay.com'

function upsert(tag, key, value, attrs) {
  let el = document.head.querySelector(`${tag}[${key}="${value}"]`)
  if (!el) {
    el = document.createElement(tag)
    el.setAttribute(key, value)
    document.head.appendChild(el)
  }
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v))
}

export function useSeo(title, description) {
  const { pathname } = useLocation()

  useEffect(() => {
    const full = title ? `${title} · Täze Aý` : 'Täze Aý'
    document.title = full
    upsert('meta', 'property', 'og:title', { content: full })
    if (description) {
      upsert('meta', 'name', 'description', { content: description })
      upsert('meta', 'property', 'og:description', { content: description })
    }
    const rest = pathname.replace(/^\/(tm|ru|en)(?=\/|$)/, '')
    LANGS.forEach((l) => {
      upsert('link', 'hreflang', l === 'tm' ? 'tk' : l, { rel: 'alternate', href: `${SITE}/${l}${rest}` })
    })
    upsert('link', 'rel', 'canonical', { href: `${SITE}${pathname}` })
  }, [title, description, pathname])
}