import { GetClientLocaleOptions } from "../types/index";

export function capital(str: string) {
  return str.replace(/(^|\s)\S/, l => l.toLocaleUpperCase())
}

export function title(str: string) {
  return str.replace(/(^|\s)\S/g, l => l.toLocaleUpperCase())
}

export function upper(str: string) {
  return str.toLocaleUpperCase()
}

export function lower(str: string) {
  return str.toLocaleLowerCase()
}

const getFromQueryString = (queryString: string, key: string) => {
  const keyVal = queryString.split('&').find(i => i.indexOf(`${key}=`) === 0)

  if (keyVal) {
    return keyVal.split('=').pop()
  }
  return null
}

const getFirstMatch = (base: string, pattern: RegExp) => {
  const match = pattern.exec(base)
  // istanbul ignore if
  if (!match) return null
  // istanbul ignore else
  return match[1] || null
}

export const hostnameLocale = regex => getFirstMatch(window.location.hostname, regex);
export const pathnameLocale = regex => getFirstMatch(window.location.pathname, regex);
export const navigatorLocale = () => window.navigator.language || window.navigator.languages[0];
export const searchLocale = regex => getFromQueryString(window.location.search.substr(1), regex);
export const hashLocale = regex => getFromQueryString(window.location.hash.substr(1), regex);

export const getClientLocale = ({
  navigator,
  hash,
  search,
  pathname,
  hostname
}: GetClientLocaleOptions) => {
  // istanbul ignore next
  if (typeof window === "undefined") return null;
  return (
    hostname && hostnameLocale(hostname) ||
    pathname && pathnameLocale(pathname) ||
    navigator && navigatorLocale() ||
    search && searchLocale(search) ||
    hash && hashLocale(hash) ||
    null
  );
};
