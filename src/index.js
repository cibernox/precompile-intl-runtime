
import { getOptions, init } from "./config";
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

const NUMBER_FORMATTERS = Object.create(null);
function getNumberFormatterFor(locale, style) {
  let key = locale + style;
  return NUMBER_FORMATTERS[key] ||
    (NUMBER_FORMATTERS[key] = new Intl.NumberFormat(locale, getOptions().formats.number[style] || {}));
}
export function __number(value, style) {
  return getNumberFormatterFor(currentLocale._value, style).format(value);
}

const DATE_FORMATTERS = Object.create(null);
function getDateFormatterFor(locale, style) {
  let key = locale + style;
  return DATE_FORMATTERS[key] ||
    (DATE_FORMATTERS[key] = new Intl.DateTimeFormat(locale, getOptions().formats.date[style] || {}));
}
export function __date(value, style = "short") {
  return getDateFormatterFor(currentLocale._value, style).format(value);
}

const TIME_FORMATTERS = Object.create(null);
function getTimeFormatterFor(locale, style) {
  let key = locale + style;
  return TIME_FORMATTERS[key] ||
    (TIME_FORMATTERS[key] = new Intl.DateTimeFormat(locale, getOptions().formats.time[style] || {}));
}
export function __time(value, style = "short") {
  return getTimeFormatterFor(currentLocale._value, style).format(value);
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

export { init, currentLocale, dictionary, locales };