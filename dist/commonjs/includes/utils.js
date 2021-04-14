"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientLocale = exports.hashLocale = exports.searchLocale = exports.navigatorLocale = exports.pathnameLocale = exports.hostnameLocale = exports.getRelatedLocalesOf = exports.getFallbackOf = exports.lower = exports.upper = exports.title = exports.capital = exports.getOptions = exports.setCurrentLocale = exports.getCurrentLocale = exports.defaultFormats = void 0;
exports.defaultFormats = {
    number: {
        scientific: { notation: 'scientific' },
        engineering: { notation: 'engineering' },
        compactLong: { notation: 'compact', compactDisplay: 'long' },
        compactShort: { notation: 'compact', compactDisplay: 'short' },
    },
    date: {
        short: { month: 'numeric', day: 'numeric', year: '2-digit' },
        medium: { month: 'short', day: 'numeric', year: 'numeric' },
        long: { month: 'long', day: 'numeric', year: 'numeric' },
        full: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' },
    },
    time: {
        short: { hour: 'numeric', minute: 'numeric' },
        medium: { hour: 'numeric', minute: 'numeric', second: 'numeric' },
        long: {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZoneName: 'short',
        },
        full: {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZoneName: 'short',
        },
    },
};
const defaultOptions = {
    fallbackLocale: '',
    initialLocale: '',
    loadingDelay: 200,
    formats: exports.defaultFormats,
    warnOnMissingMessages: true,
};
const options = defaultOptions;
let currentLocale;
function getCurrentLocale() {
    return currentLocale;
}
exports.getCurrentLocale = getCurrentLocale;
function setCurrentLocale(val) {
    return currentLocale = val;
}
exports.setCurrentLocale = setCurrentLocale;
function getOptions() {
    return options;
}
exports.getOptions = getOptions;
function isRelatedLocale(localeA, localeB) {
    return (localeA === localeB ||
        isFallbackLocaleOf(localeA, localeB) ||
        isFallbackLocaleOf(localeB, localeA));
}
function isFallbackLocaleOf(localeA, localeB) {
    return localeB.indexOf(localeA) === 0 && localeA !== localeB;
}
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
function getFallbackOf(locale) {
    const index = locale.lastIndexOf('-');
    if (index > 0)
        return locale.slice(0, index);
    const { fallbackLocale } = getOptions();
    if (fallbackLocale && !isRelatedLocale(locale, fallbackLocale)) {
        return fallbackLocale;
    }
    return null;
}
exports.getFallbackOf = getFallbackOf;
function getRelatedLocalesOf(locale) {
    const locales = locale
        .split('-')
        .map((_, i, arr) => arr.slice(0, i + 1).join('-'));
    const { fallbackLocale } = getOptions();
    if (fallbackLocale && !isRelatedLocale(locale, fallbackLocale)) {
        return locales.concat(getRelatedLocalesOf(fallbackLocale));
    }
    return locales;
}
exports.getRelatedLocalesOf = getRelatedLocalesOf;
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
const hostnameLocale = (regex) => getFirstMatch(window.location.hostname, regex);
exports.hostnameLocale = hostnameLocale;
const pathnameLocale = (regex) => getFirstMatch(window.location.pathname, regex);
exports.pathnameLocale = pathnameLocale;
const navigatorLocale = () => window.navigator.language || window.navigator.languages[0];
exports.navigatorLocale = navigatorLocale;
const searchLocale = (str) => getFromQueryString(window.location.search.substr(1), str);
exports.searchLocale = searchLocale;
const hashLocale = (str) => getFromQueryString(window.location.hash.substr(1), str);
exports.hashLocale = hashLocale;
const getClientLocale = ({ navigator, hash, search, pathname, hostname }) => {
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
exports.getClientLocale = getClientLocale;
