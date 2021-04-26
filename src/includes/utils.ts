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
function getSubLocales(refLocale: string) {
  return refLocale
    .split('-')
    .map((_, i, arr) => arr.slice(0, i + 1).join('-'))
    .reverse();
}
export function getPossibleLocales(
  refLocale: string,
  fallbackLocale = getOptions().fallbackLocale,
): string[] {
  const locales = getSubLocales(refLocale);

  if (fallbackLocale) {
    return [...new Set([...locales, ...getSubLocales(fallbackLocale)])];
  }

  return locales;
}

