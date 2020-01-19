import { getOptions } from "./config";

const CACHED = Object.create(null);

export function formatterOptions(type, style) {
  return getOptions().formats[type][style] || {};
}

export function getNumberFormatter(locale, opts) {
  let key = "number" + locale + JSON.stringify(opts);
  return CACHED[key] || (CACHED[key] = new Intl.NumberFormat(locale, opts));
}
export function getDateFormatter(locale, opts) {
  let key = "date" + locale + JSON.stringify(opts);
  return CACHED[key] || (CACHED[key] = new Intl.DateTimeFormat(locale, opts));
}
export function getTimeFormatter(locale, opts) {
  let key = "time" + locale + JSON.stringify(opts);
  return CACHED[key] || (CACHED[key] = new Intl.DateTimeFormat(locale, opts));
}
