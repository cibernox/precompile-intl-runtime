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
// could use a reduce, but a simple for-in has less footprint
export const flatObj = (obj, prefix = '') => {
    const flatted = {};
    for (const key in obj) {
        const flatKey = prefix + key;
        // we want plain objects and arrays
        if (typeof obj[key] === 'object') {
            Object.assign(flatted, flatObj(obj[key], `${flatKey}.`));
        }
        else {
            flatted[flatKey] = obj[key];
        }
    }
    return flatted;
};
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
export const getClientLocale = ({ navigator, hash, search, pathname, hostname, }) => {
    let locale;
    // istanbul ignore next
    if (typeof window === 'undefined')
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
};
