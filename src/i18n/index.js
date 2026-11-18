import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ru from './ru.json'
import tm from './tm.json'
import en from './en.json'

export const LANGS = ['tm', 'ru', 'en']

i18n.use(initReactI18next).init({
  resources: { ru: { translation: ru }, tm: { translation: tm }, en: { translation: en } },
  lng: 'ru',
  fallbackLng: 'ru',
  interpolation: { escapeValue: false },
})

export default i18n