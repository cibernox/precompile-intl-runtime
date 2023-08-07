// @ts-ignore
import { writable, derived } from 'svelte/store';
import { getPossibleLocales } from '../includes/utils.js';
let dictionary;
const $dictionary = writable({});
export function getLocaleDictionary(locale) {
    return dictionary[locale] || null;
}
export function getDictionary() {
    return dictionary;
}
export function hasLocaleDictionary(locale) {
    return locale in dictionary;
}
export function getMessageFromDictionary(locale, id) {
    if (hasLocaleDictionary(locale)) {
        const localeDictionary = getLocaleDictionary(locale);
        if (id in localeDictionary) {
            return localeDictionary[id];
        }
        const ids = id.split('.');
        let tmpDict = localeDictionary;
        for (let i = 0; i < ids.length; i++) {
            if (typeof tmpDict[ids[i]] !== 'object') {
                return tmpDict[ids[i]] || null;
            }
            tmpDict = tmpDict[ids[i]];
        }
        return tmpDict;
    }
    return null;
}
export function getClosestAvailableLocale(refLocale) {
    if (refLocale == null)
        return null;
    const relatedLocales = getPossibleLocales(refLocale);
    for (let i = 0; i < relatedLocales.length; i++) {
        const locale = relatedLocales[i];
        if (hasLocaleDictionary(locale)) {
            return locale;
        }
    }
    return null;
}
export function addMessages(locale, ...partials) {
    $dictionary.update(d => {
        d[locale] = Object.assign(d[locale] || {}, ...partials);
        return d;
    });
}
const $locales = /*@__PURE__*/ derived([$dictionary], ([$dictionary]) => Object.keys($dictionary));
$dictionary.subscribe(newDictionary => (dictionary = newDictionary));
export { $dictionary, $locales };
