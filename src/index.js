
import { init } from "./config";
import { formatterOptions, getNumberFormatter, getDateFormatter, getTimeFormatter } from "./formatters";
import { currentLocale, dictionary, locales } from './stores';

export function __interpolate(value) {
  return value === 0 ? 0 : value || '';
}

const PLURAL_RULES = Object.create(null);
function getLocalPluralFor(v) {
  let pluralRules = PLURAL_RULES[currentLocale._value] || (PLURAL_RULES[currentLocale._value] = new Intl.PluralRules(currentLocale._value));
  return pluralRules.select(v);
}
export function __plural(value, offsetOrOptions, opts) {
  if (typeof offsetOrOptions === 'number') {
    return opts[value] || opts[getLocalPluralFor(value - offsetOrOptions)] || "";
  } else {
    return offsetOrOptions[value] || offsetOrOptions[getLocalPluralFor(value)] || "";
  }
}

export function __select(value, opts) {
  return opts[value] || opts['other'];
}

export function __number(value, style) {
  return getNumberFormatter(
    currentLocale._value,
    formatterOptions("number", style)
  ).format(value);
}

export function __date(value, style = "short") {
  return getDateFormatter(
    currentLocale._value,
    formatterOptions("date", style)
  ).format(value);
}

export function __time(value, style = "short") {
  return getTimeFormatter(
    currentLocale._value,
    formatterOptions("time", style)
  ).format(value);
}

export function addMessages(locale, messages) {
  dictionary.update(value => {
    value[locale] = Object.assign(value[locale] || {}, messages);
    return value;
  });
}

export function lookupMessage(key, locale = currentLocale._value) {
  return dictionary._value[locale][key];
}

export {
  init,
  currentLocale,
  dictionary,
  locales,
  getNumberFormatter,
  getDateFormatter,
  getTimeFormatter
};