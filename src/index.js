const MESSAGES = {};
let currentLocale;
export function __plural(value, opts) {
  return `pluralized ${value}!`;
}

export function __select(value, options) {
  return `selected ${value}!`;
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

export function addMessage(locale, messages) {
  MESSAGES[locale] = messages;
}

export function lookupMessage(key) {
  return MESSAGES[currentLocale][key];
}

