import { getCurrentLocale, lookupMessage } from './stores'
import { getOptions } from './config'
import { monadicMemoize } from './memoize'

type IntlFormatterOptions<T> = T & {
  format?: string
  locale?: string
}

interface MemoizedIntlFormatter<T, U> {
  (options?: IntlFormatterOptions<U>): T;
}

interface FormatMessageOpts {
  values?: Record<string|number,any>
}

const getIntlFormatterOptions = (type: "date" | "time" | "number", name: string) => {
  const formats = getOptions().formats
  if (type in formats && name in formats[type]) {
    return formats[type][name]
  }

  throw new Error(`[icu-helpers] Unknown "${name}" ${type} format.`)
}

export const getNumberFormatter: MemoizedIntlFormatter<
  Intl.NumberFormat,
  Intl.NumberFormatOptions
> = monadicMemoize(({ locale, format, ...options } = {}) => {
  locale = locale || getCurrentLocale()
  if (locale == null) {
    throw new Error('[icu-helpers] A "locale" must be set to format numbers')
  }

  if (format) {
    options = getIntlFormatterOptions('number', format)
  }

  return new Intl.NumberFormat(locale, options)
})

export const getDateFormatter: MemoizedIntlFormatter<
  Intl.DateTimeFormat,
  Intl.DateTimeFormatOptions
> = monadicMemoize(({ locale, format, ...options } = {}) => {
  locale = locale || getCurrentLocale()
  if (locale == null) {
    throw new Error('[icu-helpers] A "locale" must be set to format dates')
  }

  if (format) options = getIntlFormatterOptions('date', format)
  else if (Object.keys(options).length === 0) {
    options = getIntlFormatterOptions('date', 'short')
  }

  return new Intl.DateTimeFormat(locale, options)
})

export const getTimeFormatter: MemoizedIntlFormatter<
  Intl.DateTimeFormat,
  Intl.DateTimeFormatOptions
> = monadicMemoize(({ locale, format, ...options } = {}) => {
  locale = locale || getCurrentLocale()
  if (locale == null) {
    throw new Error(
      '[svelte-i18n] A "locale" must be set to format time values'
    )
  }

  if (format) options = getIntlFormatterOptions('time', format)
  else if (Object.keys(options).length === 0) {
    options = getIntlFormatterOptions('time', 'short')
  }

  return new Intl.DateTimeFormat(locale, options)
})

export const formatTime = (t: Date, options: Record<string, any>) =>
  getTimeFormatter(options).format(t);
export const formatDate = (d: Date, options: Record<string, any>) =>
  getDateFormatter(options).format(d);
export const formatNumber = (n: number, options: Record<string, any>) =>
  getNumberFormatter(options).format(n);

export const formatMessage = (id: string, options: FormatMessageOpts = {}) => {
  const message = lookupMessage(id);
  if (typeof message === 'string') {
    return message;
  } else {
    return message(...Object.keys(options.values || {}).sort().map(k => options.values[k]));
  }
}
// import { getOptions } from "./config";

// const CACHED = Object.create(null);

// export function formatterOptions(type, style) {
//   return getOptions().formats[type][style] || {};
// }
// const getIntlFormatterOptions = (type, name) => {
//   const formats = getOptions().formats
//   if (type in formats && name in formats[type]) {
//     return formats[type][name]
//   }

//   throw new Error(`[icu-helpers] Unknown "${name}" ${type} format.`)
// }

// // const getIntlFormatterOptions = (
// //   type: 'time' | 'number' | 'date',
// //   name: string
// // ): any => {
// //   const formats = getOptions().formats
// //   if (type in formats && name in formats[type]) {
// //     return formats[type][name]
// //   }

// //   throw new Error(`[svelte-i18n] Unknown "${name}" ${type} format.`)
// // }

// // export const getNumberFormatter: MemoizedIntlFormatter<
// //   Intl.NumberFormat,
// //   Intl.NumberFormatOptions
// // > = monadicMemoize(({ locale, format, ...options } = {}) => {
// //   locale = locale || getCurrentLocale()
// //   if (locale == null) {
// //     throw new Error('[svelte-i18n] A "locale" must be set to format numbers')
// //   }

// //   if (format) {
// //     options = getIntlFormatterOptions('number', format)
// //   }

// //   return new Intl.NumberFormat(locale, options)
// // })

// // export const getDateFormatter: MemoizedIntlFormatter<
// //   Intl.DateTimeFormat,
// //   Intl.DateTimeFormatOptions
// // > = monadicMemoize(({ locale, format, ...options } = {}) => {
// //   locale = locale || getCurrentLocale()
// //   if (locale == null) {
// //     throw new Error('[svelte-i18n] A "locale" must be set to format dates')
// //   }

// //   if (format) options = getIntlFormatterOptions('date', format)
// //   else if (Object.keys(options).length === 0) {
// //     options = getIntlFormatterOptions('date', 'short')
// //   }

// //   return new Intl.DateTimeFormat(locale, options)
// // })

// // export const getTimeFormatter: MemoizedIntlFormatter<
// //   Intl.DateTimeFormat,
// //   Intl.DateTimeFormatOptions
// // > = monadicMemoize(({ locale, format, ...options } = {}) => {
// //   locale = locale || getCurrentLocale()
// //   if (locale == null) {
// //     throw new Error(
// //       '[svelte-i18n] A "locale" must be set to format time values'
// //     )
// //   }

// //   if (format) options = getIntlFormatterOptions('time', format)
// //   else if (Object.keys(options).length === 0) {
// //     options = getIntlFormatterOptions('time', 'short')
// //   }

// //   return new Intl.DateTimeFormat(locale, options)
// // })

// // export function getNumberFormatter({ locale, format, ...options }) {
// //   let key = "number" + locale + JSON.stringify(opts);
// //   return CACHED[key] || (CACHED[key] = new Intl.NumberFormat(locale, opts));
// // }
// // export function getDateFormatter(locale, opts) {
// //   let key = "date" + locale + JSON.stringify(opts);
// //   return CACHED[key] || (CACHED[key] = new Intl.DateTimeFormat(locale, opts));
// // }
// // export function getTimeFormatter(locale, opts) {
// //   let key = "time" + locale + JSON.stringify(opts);
// //   return CACHED[key] || (CACHED[key] = new Intl.DateTimeFormat(locale, opts));
// // }
