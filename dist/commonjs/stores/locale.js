"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$locale = void 0;
// @ts-ignore
const store_1 = require("svelte/store");
const loaderQueue_1 = require("../includes/loaderQueue");
const utils_1 = require("../includes/utils");
const dictionary_1 = require("./dictionary");
const $locale = store_1.writable('');
exports.$locale = $locale;
$locale.subscribe((newLocale) => {
    utils_1.setCurrentLocale(newLocale);
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
    let currentLocale = utils_1.getCurrentLocale();
    fn(currentLocale);
    localeSet(currentLocale);
};
