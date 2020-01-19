import { getCurrentLocale } from './stores'
import { getOptions } from './config'
import { monadicMemoize } from './memoize'

const getIntlFormatterOptions = (type, name) => {
  const formats = getOptions().formats
  if (type in formats && name in formats[type]) {
    return formats[type][name]
  }

  throw new Error(`[icu-helpers] Unknown "${name}" ${type} format.`)
}

export const getNumberFormatter = monadicMemoize(({ locale, format, ...options } = {}) => {
  locale = locale || getCurrentLocale()
  if (locale == null) {
    throw new Error('[icu-helpers] A "locale" must be set to format numbers')
  }

  if (format) {
    options = getIntlFormatterOptions('number', format)
  }

  return new Intl.NumberFormat(locale, options)
})

export const getDateFormatter = monadicMemoize(({ locale, format, ...options } = {}) => {
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

export const getTimeFormatter = monadicMemoize(({ locale, format, ...options } = {}) => {
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

export const formatTime = (t, options) => getTimeFormatter(options).format(t);
export const formatDate = (d, options) => getDateFormatter(options).format(d);
export const formatNumber = (n, options) => getNumberFormatter(options).format(n);

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
