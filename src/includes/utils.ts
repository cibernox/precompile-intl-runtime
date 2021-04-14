import { GetClientLocaleOptions } from "../types/index";
interface Formats {
  number: Record<string, any>
  date: Record<string, any>
  time: Record<string, any>
}
interface Options {
  fallbackLocale: string
  initialLocale: string
  formats: Formats
  loadingDelay: number
  warnOnMissingMessages: boolean
}

export const defaultFormats: Formats = {
  number: {
    scientific: { notation: 'scientific' },
    engineering: { notation: 'engineering' },
    compactLong: { notation: 'compact', compactDisplay: 'long' },
    compactShort: { notation: 'compact', compactDisplay: 'short' },
  },
  date: {
    short: { month: 'numeric', day: 'numeric', year: '2-digit' },
    medium: { month: 'short', day: 'numeric', year: 'numeric' },
    long: { month: 'long', day: 'numeric', year: 'numeric' },
    full: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' },
  },
  time: {
    short: { hour: 'numeric', minute: 'numeric' },
    medium: { hour: 'numeric', minute: 'numeric', second: 'numeric' },
    long: {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short',
    },
    full: {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short',
    },
  },
}

const defaultOptions: Options = {
  fallbackLocale: '',
  initialLocale: '',
  loadingDelay: 200,
  formats: defaultFormats,
  warnOnMissingMessages: true,
}

const options: Options = defaultOptions
let currentLocale: string

export function getCurrentLocale() {
  return currentLocale
}
export function setCurrentLocale(val: string) {
  return currentLocale = val;
}
export function getOptions() {
  return options
}

function isRelatedLocale(localeA: string, localeB: string) {
  return (
    localeA === localeB ||
    isFallbackLocaleOf(localeA, localeB) ||
    isFallbackLocaleOf(localeB, localeA)
  )
}

function isFallbackLocaleOf(localeA: string, localeB: string) {
  return localeB.indexOf(localeA) === 0 && localeA !== localeB
}

export function capital(str: string) {
  return str.replace(/(^|\s)\S/, l => l.toLocaleUpperCase())
}

export function title(str: string) {
  return str.replace(/(^|\s)\S/g, l => l.toLocaleUpperCase())
}

export function upper(str: string) {
  return str.toLocaleUpperCase()
}

export function lower(str: string) {
  return str.toLocaleLowerCase()
}

export function getFallbackOf(locale: string) {
  const index = locale.lastIndexOf('-')
  if (index > 0) return locale.slice(0, index)

  const { fallbackLocale } = getOptions()
  if (fallbackLocale && !isRelatedLocale(locale, fallbackLocale)) {
    return fallbackLocale
  }

  return null
}

export function getRelatedLocalesOf(locale: string): string[] {
  const locales = locale
    .split('-')
    .map((_, i, arr) => arr.slice(0, i + 1).join('-'))

  const { fallbackLocale } = getOptions()
  if (fallbackLocale && !isRelatedLocale(locale, fallbackLocale)) {
    return locales.concat(getRelatedLocalesOf(fallbackLocale))
  }
  return locales
}

const getFromQueryString = (queryString: string, key: string) => {
  const keyVal = queryString.split('&').find(i => i.indexOf(`${key}=`) === 0)

  if (keyVal) {
    return keyVal.split('=').pop()
  }
  return null
}

const getFirstMatch = (base: string, pattern: RegExp) => {
  const match = pattern.exec(base)
  // istanbul ignore if
  if (!match) return null
  // istanbul ignore else
  return match[1] || null
}

export const hostnameLocale = (regex: RegExp) => getFirstMatch(window.location.hostname, regex);
export const pathnameLocale = (regex: RegExp) => getFirstMatch(window.location.pathname, regex);
export const navigatorLocale = () => window.navigator.language || window.navigator.languages[0];
export const searchLocale = (str: string) => getFromQueryString(window.location.search.substr(1), str);
export const hashLocale = (str: string) => getFromQueryString(window.location.hash.substr(1), str);

export const getClientLocale = ({
  navigator,
  hash,
  search,
  pathname,
  hostname
}: GetClientLocaleOptions) => {
  // istanbul ignore next
  if (typeof window === "undefined") return null;
  return (
    hostname && hostnameLocale(hostname) ||
    pathname && pathnameLocale(pathname) ||
    navigator && navigatorLocale() ||
    search && searchLocale(search) ||
    hash && hashLocale(hash) ||
    null
  );
};
