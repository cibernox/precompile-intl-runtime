export function capital(str) {
    return str.replace(/(^|\s)\S/, l => l.toLocaleUpperCase());
}
export function title(str) {
    return str.replace(/(^|\s)\S/g, l => l.toLocaleUpperCase());
}
export function upper(str) {
    return str.toLocaleUpperCase();
}
export function lower(str) {
    return str.toLocaleLowerCase();
}
const getFromQueryString = (queryString, key) => {
    const keyVal = queryString.split('&').find(i => i.indexOf(`${key}=`) === 0);
    if (keyVal) {
        return keyVal.split('=').pop();
    }
    return null;
};
const getFirstMatch = (base, pattern) => {
    const match = pattern.exec(base);
    // istanbul ignore if
    if (!match)
        return null;
    // istanbul ignore else
    return match[1] || null;
};
export const hostnameLocale = (regex) => getFirstMatch(window.location.hostname, regex);
export const pathnameLocale = (regex) => getFirstMatch(window.location.pathname, regex);
export const navigatorLocale = () => window.navigator.language || window.navigator.languages[0];
export const searchLocale = (str) => getFromQueryString(window.location.search.substr(1), str);
export const hashLocale = (str) => getFromQueryString(window.location.hash.substr(1), str);
export const getClientLocale = ({ navigator, hash, search, pathname, hostname }) => {
    // istanbul ignore next
    if (typeof window === "undefined")
        return null;
    return (hostname && hostnameLocale(hostname) ||
        pathname && pathnameLocale(pathname) ||
        navigator && navigatorLocale() ||
        search && searchLocale(search) ||
        hash && hashLocale(hash) ||
        null);
};
