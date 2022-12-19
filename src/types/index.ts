import { Readable } from "svelte/store";

export interface DeepDictionary {
  [key: string]: DeepDictionary | string | string[];
}
export type LocaleDictionaryValue = string | ((...args: any[]) => string);
export type LocaleDictionary = Record<string, LocaleDictionaryValue>;
export type Dictionary = Record<string, LocaleDictionary>;

export interface MessageObject {
  locale?: string;
  format?: string;
  default?: string;
  values?: Record<string, string | number | Date>;
}

export interface MessageObjectWithId<T = string> extends MessageObject {
  id: T;
}

export type JsonGetter = (id: string, locale?: string) => any;

export type MessageFormatter<T = string> = (
  currentLocale: string,
  id: T | MessageObjectWithId<T>,
  options?: MessageObject
) => string;

export type TimeFormatter = (
  currentLocale: string,
  d: Date | number,
  options?: IntlFormatterOptions<Intl.DateTimeFormatOptions>
) => string;

export type DateFormatter = (
  currentLocale: string,
  d: Date | number,
  options?: IntlFormatterOptions<Intl.DateTimeFormatOptions>
) => string;

export type NumberFormatter = (
  currentLocale: string,
  d: number,
  options?: IntlFormatterOptions<Intl.NumberFormatOptions>
) => string;

export type IntlFormatterOptions<T> = T & {
  format?: string;
  locale?: string;
};

export interface MemoizedIntlFormatter<T, U> {
  (options?: IntlFormatterOptions<U>): T;
}

export interface MessagesLoader {
  (): Promise<any>;
}
export interface GetClientLocaleOptions {
  navigator?: boolean;
  hash?: string;
  search?: string;
  pathname?: RegExp;
  hostname?: RegExp;
}

export interface ConfigureOptions {
  fallbackLocale: string;
  initialLocale?: string;
  loadingDelay?: number;
}

export type TypedFormat<T = string> = Readable<
  (
    id: T | MessageObjectWithId<T>,
    options?: MessageObject | undefined
  ) => string
>;
