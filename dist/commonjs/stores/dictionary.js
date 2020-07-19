"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$locales = exports.$dictionary = exports.addMessages = exports.getClosestAvailableLocale = exports.getMessageFromDictionary = exports.hasLocaleDictionary = exports.getDictionary = exports.getLocaleDictionary = void 0;
// @ts-ignore
const store_1 = require("svelte/store");
const locale_1 = require("./locale");
let dictionary;
const $dictionary = store_1.writable({});
exports.$dictionary = $dictionary;
function getLocaleDictionary(locale) {
    return dictionary[locale] || null;
}
exports.getLocaleDictionary = getLocaleDictionary;
function getDictionary() {
    return dictionary;
}
exports.getDictionary = getDictionary;
function hasLocaleDictionary(locale) {
    return locale in dictionary;
}
exports.hasLocaleDictionary = hasLocaleDictionary;
function getMessageFromDictionary(locale, id) {
    if (hasLocaleDictionary(locale)) {
        const localeDictionary = getLocaleDictionary(locale);
        if (id in localeDictionary) {
            return localeDictionary[id];
        }
    }
    return null;
}
exports.getMessageFromDictionary = getMessageFromDictionary;
function getClosestAvailableLocale(locale) {
    if (locale == null || hasLocaleDictionary(locale))
        return locale;
    return getClosestAvailableLocale(locale_1.getFallbackOf(locale));
}
exports.getClosestAvailableLocale = getClosestAvailableLocale;
function addMessages(locale, ...partials) {
    $dictionary.update(d => {
        d[locale] = Object.assign(d[locale] || {}, ...partials);
        return d;
    });
}
exports.addMessages = addMessages;
const $locales = /*@__PURE__*/ store_1.derived([$dictionary], ([$dictionary]) => Object.keys($dictionary));
exports.$locales = $locales;
$dictionary.subscribe(newDictionary => (dictionary = newDictionary));
