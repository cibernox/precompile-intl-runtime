export const defaultFormats = {
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
    formats: defaultFormats,
    warnOnMissingMessages: true,
};
const options = defaultOptions;
let currentLocale;
export function getCurrentLocale() {
    return currentLocale;
}
export function setCurrentLocale(val) {
    return currentLocale = val;
}
export function getOptions() {
    return options;
}
function isRelatedLocale(localeA, localeB) {
    return (localeA === localeB ||
        isFallbackLocaleOf(localeA, localeB) ||
        isFallbackLocaleOf(localeB, localeA));
}
function isFallbackLocaleOf(localeA, localeB) {
    return localeB.indexOf(localeA) === 0 && localeA !== localeB;
}
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
export function getFallbackOf(locale) {
    const index = locale.lastIndexOf('-');
    if (index > 0)
        return locale.slice(0, index);
    const { fallbackLocale } = getOptions();
    if (fallbackLocale && !isRelatedLocale(locale, fallbackLocale)) {
        return fallbackLocale;
    }
    return null;
}
export function getRelatedLocalesOf(locale) {
    const locales = locale
        .split('-')
        .map((_, i, arr) => arr.slice(0, i + 1).join('-'));
    const { fallbackLocale } = getOptions();
    if (fallbackLocale && !isRelatedLocale(locale, fallbackLocale)) {
        return locales.concat(getRelatedLocalesOf(fallbackLocale));
    }
    return locales;
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
