interface Formats {
    number: Record<string, Intl.NumberFormatOptions>;
    date: Record<string, Intl.DateTimeFormatOptions>;
    time: Record<string, Intl.DateTimeFormatOptions>;
}

export interface DeepDictionary {
  [key: string]: DeepDictionary | string | string[]
}
export type LocaleDictionaryValue = string | ((...args: any[]) => string)
export type LocaleDictionary = Record<string, LocaleDictionaryValue>;
export type Dictionary = Record<string, LocaleDictionary>

export interface MessageObject {
  locale?: string
  format?: string
  default?: string
  values?: Record<string, string | number | Date>
}

export interface MessageObjectWithId extends MessageObject {
  id: string
}

export type JsonGetter = (
  id: string,
  locale?: string
) => any

export type MessageFormatter = (
  currentLocale: string,
  id: string | MessageObjectWithId,
  options?: MessageObject
) => string

export type TimeFormatter = (
  currentLocale: string,
  d: Date | number,
  options?: IntlFormatterOptions<Intl.DateTimeFormatOptions>
) => string

export type DateFormatter = (
  currentLocale: string,
  d: Date | number,
  options?: IntlFormatterOptions<Intl.DateTimeFormatOptions>
) => string

export type NumberFormatter = (
  currentLocale: string,
  d: number,
  options?: IntlFormatterOptions<Intl.NumberFormatOptions>
) => string

export type IntlFormatterOptions<T> = T & {
  format?: string
  locale?: string
}

export interface MemoizedIntlFormatter<T, U> {
  (options?: IntlFormatterOptions<U>): T
}

export interface MessagesLoader {
  (): Promise<any>
}
export interface GetClientLocaleOptions {
  navigator?: boolean;
  hash?: string;
  search?: string;
  pathname?: RegExp;
  hostname?: RegExp;
}

export interface ConfigureOptions {
  fallbackLocale: string
  initialLocale?: string
  formats?: Partial<Formats>
  loadingDelay?: number
}
