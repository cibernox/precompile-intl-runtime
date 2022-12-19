import { flush } from "./includes/loaderQueue";
import { getOptions, getCurrentLocale } from "./includes/utils";
export * from "./includes/localeGetters";
export * from "./includes/utils";

export function waitLocale(locale?: string) {
  return flush(locale || getCurrentLocale() || getOptions().initialLocale);
}

export { init } from "./configs";

export { $locale as locale } from "./stores/locale";

export {
  $dictionary as dictionary,
  $locales as locales,
  addMessages,
} from "./stores/dictionary";
export { registerLocaleLoader as register } from "./includes/loaderQueue";

export { $isLoading as isLoading } from "./stores/loading";

import { formatTime, formatDate, formatNumber } from "./stores/formatters";
import { IntlFormatterOptions } from "./types";
export {
  formatMessage,
  $format as __t,
  $formatDate as date,
  $formatNumber as number,
  $formatTime as time,
  $getJSON as json,
} from "./stores/formatters";

// low-level
export {
  getDateFormatter,
  getNumberFormatter,
  getTimeFormatter,
  setCustomDateFormat,
  setCustomNumberFormat,
  setCustomTimeFormat,
} from "./includes/formatters";

type PluralRule = "z" | "o" | "t" | "f" | "m" | "h" | number;
export type PluralOptions = Partial<Record<PluralRule, string>>;
export function __interpolate(value: any) {
  return value === 0 ? 0 : value || "";
}

const PLURAL_RULES: Record<string, Intl.PluralRules> = {};
function getLocalPluralFor(v: number): PluralRule {
  let loc = getCurrentLocale();
  let pluralRules =
    PLURAL_RULES[loc] || (PLURAL_RULES[loc] = new Intl.PluralRules(loc));
  let key = pluralRules.select(v);
  return key === "other" ? "h" : (key[0] as PluralRule);
}
export function __offsetPlural(
  value: number,
  offset: number,
  opts: PluralOptions
): string {
  return opts[value] || opts[getLocalPluralFor(value - offset)] || "";
}

export function __plural(value: number, opts: PluralOptions): string {
  return opts[value] || opts[getLocalPluralFor(value)] || "";
}

export function __select(value: any, opts: Record<any, string>): string {
  return opts[value] || opts["other"] || "";
}

export function __number(
  value: number,
  format?: string | IntlFormatterOptions<Intl.NumberFormatOptions>
): string {
  return formatNumber(
    getCurrentLocale(),
    value,
    typeof format === "string" ? { format } : format
  );
}

export function __date(value: Date, format = "short"): string {
  return formatDate(getCurrentLocale(), value, { format });
}

export function __time(value: Date, format = "short"): string {
  return formatTime(getCurrentLocale(), value, { format });
}

export { TypedFormat } from "./types";
