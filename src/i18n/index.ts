import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en.json'
import de from './de.json'
import { LANGUAGE_STORAGE_KEY } from '../shared/constants/storageKeys'

const SUPPORTED_LANGUAGES = ['en', 'de'] as const
type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]

function getStoredLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') return 'en'
  const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
  return SUPPORTED_LANGUAGES.includes(stored as SupportedLanguage) ? (stored as SupportedLanguage) : 'en'
}

const initialLanguage = getStoredLanguage()

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, de: { translation: de } },
  lng: initialLanguage,
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
})

if (typeof window !== 'undefined') {
  i18n.on('languageChanged', (lng) => {
    if (SUPPORTED_LANGUAGES.includes(lng as SupportedLanguage)) {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lng)
    }
  })
}

export default i18n
