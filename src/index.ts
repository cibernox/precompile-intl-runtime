
import { init } from "./config";
import {
  currentLocale,
  dictionary,
  locales,
  getCurrentLocale,
  LocaleDictionary,
  LocaleDictionaryValue
} from "./stores";
import {
  getNumberFormatter,
  getDateFormatter,
  getTimeFormatter,
  formatTime,
  formatDate,
  formatNumber
} from "./formatters";

type PluralRule = "zero" | "one" | "two" | "few" | "many" | "other" | number
type PluralOptions = Record<PluralRule, string>
export function __interpolate(value: any) {
  return value === 0 ? 0 : value || '';
}

const PLURAL_RULES = Object.create(null);
function getLocalPluralFor(v: number): PluralRule {
  let loc = getCurrentLocale();
  let pluralRules = PLURAL_RULES[loc] || (PLURAL_RULES[loc] = new Intl.PluralRules(loc));
  return pluralRules.select(v);
}
export function __plural(
  value: number,
  offsetOrOptions: number | PluralOptions,
  opts?: PluralOptions
): string {
  if (typeof offsetOrOptions === "number") {
    return (
      opts[value] ||
      opts[getLocalPluralFor(value - offsetOrOptions)] ||
      ""
    );
  } else {
    return (
      offsetOrOptions[value] ||
      offsetOrOptions[getLocalPluralFor(value)] ||
      ""
    );
  }
}

export function __select(value: any, opts: Record<any, string>): string {
  return opts[value] || opts['other'] || '';
}

export function __number(value: number, format?: string): string {
  return formatNumber(value, { format });
}

export function __date(value: Date, format = "short"): string {
  return formatDate(value, { format });
}

export function __time(value: Date, format = "short"): string {
  return formatTime(value, { format });
}

export function addMessages(locale: string, messages: LocaleDictionary): void {
  dictionary.update(value => {
    value[locale] = Object.assign(value[locale] || {}, messages);
    return value;
  });
}

export function lookupMessage(key: string, locale: string = getCurrentLocale()): LocaleDictionaryValue {
  return dictionary._value[locale][key];
}

export {
  init,
  currentLocale,
  dictionary,
  locales,
  getNumberFormatter,
  getDateFormatter,
  getTimeFormatter,
  formatTime,
  formatDate,
  formatNumber
};