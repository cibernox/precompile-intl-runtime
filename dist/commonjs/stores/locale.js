"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$locale = exports.getCurrentLocale = exports.getRelatedLocalesOf = exports.getFallbackOf = exports.isRelatedLocale = exports.isFallbackLocaleOf = void 0;
// @ts-ignore
const store_1 = require("svelte/store");
const loaderQueue_1 = require("../includes/loaderQueue");
const configs_1 = require("../configs");
const dictionary_1 = require("./dictionary");
let current;
const $locale = store_1.writable('');
exports.$locale = $locale;
function isFallbackLocaleOf(localeA, localeB) {
    return localeB.indexOf(localeA) === 0 && localeA !== localeB;
}
exports.isFallbackLocaleOf = isFallbackLocaleOf;
function isRelatedLocale(localeA, localeB) {
    return (localeA === localeB ||
        isFallbackLocaleOf(localeA, localeB) ||
        isFallbackLocaleOf(localeB, localeA));
}
exports.isRelatedLocale = isRelatedLocale;
function getFallbackOf(locale) {
    const index = locale.lastIndexOf('-');
    if (index > 0)
        return locale.slice(0, index);
    const { fallbackLocale } = configs_1.getOptions();
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
    const { fallbackLocale } = configs_1.getOptions();
    if (fallbackLocale && !isRelatedLocale(locale, fallbackLocale)) {
        return locales.concat(getRelatedLocalesOf(fallbackLocale));
    }
    return locales;
}
exports.getRelatedLocalesOf = getRelatedLocalesOf;
function getCurrentLocale() {
    return current;
}
exports.getCurrentLocale = getCurrentLocale;
$locale.subscribe((newLocale) => {
    current = newLocale;
    if (typeof window !== 'undefined') {
        document.documentElement.setAttribute('lang', newLocale);
    }
});
const localeSet = $locale.set;
$locale.set = (newLocale) => {
    if (dictionary_1.getClosestAvailableLocale(newLocale) && loaderQueue_1.hasLocaleQueue(newLocale)) {
        return loaderQueue_1.flush(newLocale).then(() => localeSet(newLocale));
    }
    return localeSet(newLocale);
};
// $locale.update = (fn: (locale: string) => void | Promise<void>) => localeSet(fn(current)); This was what I had but typescript doesn't like it, not sure if i refactored correctly.
// istanbul ignore next
$locale.update = (fn) => {
    fn(current);
    localeSet(current);
};
