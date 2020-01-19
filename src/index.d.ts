declare module "icu-helpers" {
  type MessageFn = (...args: any) => string
  interface WritableStore {
    subscribe: (v: any) => () => {}
    set(v: any): void
    update(cb: () => {}): void
    clear(): void
  }
  export const currentLocale: WritableStore
  export const locales: WritableStore
  export const dictionary: WritableStore
  declare function addMessages(locale: any, messages: any): void
  declare function setLocale(locale: string): void
  declare function lookupMessage(key: string, locale?: string): string | MessageFn
  declare function init(Record): void
  declare function getDateFormatter(locale: string, opts: Record)
  declare function getNumberFormatter(locale: string, opts: Record)
  declare function getTimeFormatter(locale: string, opts: Record)
}