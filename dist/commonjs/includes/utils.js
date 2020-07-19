"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientLocale = exports.hashLocale = exports.searchLocale = exports.navigatorLocale = exports.pathnameLocale = exports.hostnameLocale = exports.lower = exports.upper = exports.title = exports.capital = void 0;
function capital(str) {
    return str.replace(/(^|\s)\S/, l => l.toLocaleUpperCase());
}
exports.capital = capital;
function title(str) {
    return str.replace(/(^|\s)\S/g, l => l.toLocaleUpperCase());
}
exports.title = title;
function upper(str) {
    return str.toLocaleUpperCase();
}
exports.upper = upper;
function lower(str) {
    return str.toLocaleLowerCase();
}
exports.lower = lower;
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
exports.hostnameLocale = regex => getFirstMatch(window.location.hostname, regex);
exports.pathnameLocale = regex => getFirstMatch(window.location.pathname, regex);
exports.navigatorLocale = () => window.navigator.language || window.navigator.languages[0];
exports.searchLocale = regex => getFromQueryString(window.location.search.substr(1), regex);
exports.hashLocale = regex => getFromQueryString(window.location.hash.substr(1), regex);
exports.getClientLocale = ({ navigator, hash, search, pathname, hostname }) => {
    // istanbul ignore next
    if (typeof window === "undefined")
        return null;
    return (hostname && exports.hostnameLocale(hostname) ||
        pathname && exports.pathnameLocale(pathname) ||
        navigator && exports.navigatorLocale() ||
        search && exports.searchLocale(search) ||
        hash && exports.hashLocale(hash) ||
        null);
};
