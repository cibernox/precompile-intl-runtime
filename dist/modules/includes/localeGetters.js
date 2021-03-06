const getFromQueryString = (queryString, key) => {
    const keyVal = queryString.split('&').find((i) => i.indexOf(`${key}=`) === 0);
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
export const getLocaleFromHostname = (hostname) => {
    // istanbul ignore next
    if (typeof window === 'undefined')
        return null;
    return getFirstMatch(window.location.hostname, hostname);
};
export const getLocaleFromPathname = (pathname) => {
    // istanbul ignore next
    if (typeof window === 'undefined')
        return null;
    return getFirstMatch(window.location.pathname, pathname);
};
export const getLocaleFromNavigator = (ssrDefault) => {
    // istanbul ignore next
    if (typeof window === 'undefined') {
        return ssrDefault || null;
    }
    return window.navigator.language || window.navigator.languages[0];
};
export const getLocaleFromQueryString = (search) => {
    // istanbul ignore next
    if (typeof window === 'undefined')
        return null;
    return getFromQueryString(window.location.search.substr(1), search);
};
export const getLocaleFromHash = (hash) => {
    // istanbul ignore next
    if (typeof window === 'undefined')
        return null;
    return getFromQueryString(window.location.hash.substr(1), hash);
};
