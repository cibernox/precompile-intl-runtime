declare module "icu-helpers" {
  type MessageFn = (...args: any) => string
  declare function addMessages(locale: any, messages: any): void
  declare function setLocale(locale: string): void
  declare function lookupMessage(key: string, locale?: string): string | MessageFn
}