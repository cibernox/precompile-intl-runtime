const MESSAGES = {};
let currentLocale;
export function __plural(value, opts) {
  return opts[value] || opts['other'];
}

export function __select(value, opts) {
  return opts[value] || opts['other'];
}

export function __number(value, style) {
  return `numbered ${value}!`;
}

export function __date(value, style) {
  return `dated ${value}!`;
}

export function __time(value, style) {
  return `timed ${value}!`;
}

export function setLocale(locale) {
  currentLocale = locale;
}

export function addMessages(locale, messages) {
  MESSAGES[locale] = messages;
}

export function lookupMessage(key, locale = currentLocale) {
  return MESSAGES[currentLocale][key];
}

