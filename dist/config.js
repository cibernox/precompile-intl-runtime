import { currentLocale } from "./stores";
const defaultFormats = {
    number: {
        scientific: { notation: "scientific" },
        engineering: { notation: "engineering" },
        compactLong: { notation: "compact", compactDisplay: "long" },
        compactShort: { notation: "compact", compactDisplay: "short" }
    },
    date: {
        short: { month: "numeric", day: "numeric", year: "2-digit" },
        medium: { month: "short", day: "numeric", year: "numeric" },
        long: { month: "long", day: "numeric", year: "numeric" },
        full: { weekday: "long", month: "long", day: "numeric", year: "numeric" }
    },
    time: {
        short: { hour: "numeric", minute: "numeric" },
        medium: { hour: "numeric", minute: "numeric", second: "numeric" },
        long: {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            timeZoneName: "short"
        },
        full: {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            timeZoneName: "short"
        }
    }
};
const defaultOptions = {
    fallbackLocale: null,
    initialLocale: null,
    loadingDelay: 200,
    formats: defaultFormats,
    warnOnMissingMessages: true
};
const options = defaultOptions;
const getFromQueryString = (queryString, key) => {
    const keyVal = queryString.split("&").find(i => i.indexOf(`${key}=`) === 0);
    if (keyVal) {
        return keyVal.split("=").pop();
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
function getClientLocale({ navigator, hash, search, pathname, hostname }) {
    let locale;
    // istanbul ignore next
    if (typeof window === "undefined")
        return null;
    if (hostname) {
        locale = getFirstMatch(window.location.hostname, hostname);
        if (locale)
            return locale;
    }
    if (pathname) {
        locale = getFirstMatch(window.location.pathname, pathname);
        if (locale)
            return locale;
    }
    if (navigator) {
        // istanbul ignore else
        locale = window.navigator.language || window.navigator.languages[0];
        if (locale)
            return locale;
    }
    if (search) {
        locale = getFromQueryString(window.location.search.substr(1), search);
        if (locale)
            return locale;
    }
    if (hash) {
        locale = getFromQueryString(window.location.hash.substr(1), hash);
        if (locale)
            return locale;
    }
    return null;
}
export function init(opts) {
    const { formats, ...rest } = opts;
    const initialLocale = opts.initialLocale
        ? typeof opts.initialLocale === "string"
            ? opts.initialLocale
            : getClientLocale(opts.initialLocale) || opts.fallbackLocale
        : opts.fallbackLocale;
    Object.assign(options, rest, { initialLocale });
    if (formats) {
        if ("number" in formats) {
            Object.assign(options.formats.number, formats.number);
        }
        if ("date" in formats) {
            Object.assign(options.formats.date, formats.date);
        }
        if ("time" in formats) {
            Object.assign(options.formats.time, formats.time);
        }
    }
    return currentLocale.set(initialLocale);
}
export function getOptions() {
    return options;
}
