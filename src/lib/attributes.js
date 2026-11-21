import { tr } from '@/lib/tr'

const locale = (lang) => (lang === 'en' ? 'en-US' : 'ru-RU')

// "19 г", "−18 °C", "Замороженное" — one characteristic as display text
export function formatValue(item, lang) {
  const { value, unit } = item
  let text
  if (typeof value === 'number') text = value.toLocaleString(locale(lang))
  else if (value && typeof value === 'object') text = tr(value, lang)
  else text = value ?? ''
  return unit ? `${text} ${tr(unit, lang)}` : text
}

export const findGroup = (groups = [], key) => groups.find((g) => g.key === key)

// the few values shown big (protein, fat, energy, storage temperature …)
export const keyFacts = (groups = [], limit = 4) =>
  groups.flatMap((g) => g.items).filter((i) => i.isKey).slice(0, limit)

// the first rows that are not key facts — for compact tables in quick view
export const minorRows = (groups = [], limit = 3) =>
  groups.flatMap((g) => g.items).filter((i) => !i.isKey).slice(0, limit)
