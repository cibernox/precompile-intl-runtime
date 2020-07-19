import { getMessageFromDictionary } from '../stores/dictionary'
import { getFallbackOf } from '../stores/locale'
import { LocaleDictionaryValue } from '../types/index'

export const lookupCache: Record<string, Record<string, LocaleDictionaryValue>> = {}

const addToCache = (path: string, locale: string, message: LocaleDictionaryValue) => {
  if (!message) return message
  if (!(locale in lookupCache)) lookupCache[locale] = {}
  if (!(path in lookupCache[locale])) lookupCache[locale][path] = message
  return message
}

const searchForMessage = (path: string, locale: string | null): LocaleDictionaryValue => {
  if (locale == null) return '';

  const message = getMessageFromDictionary(locale, path)
  if (message) return message
  return searchForMessage(path, getFallbackOf(locale));
}

export const lookup = (path: string, locale: string) => {
  if (locale in lookupCache && path in lookupCache[locale]) {
    return lookupCache[locale][path]
  }

  const message = searchForMessage(path, locale)
  if (message) {
    return addToCache(path, locale, message)
  }

  return null
}
