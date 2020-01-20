import { writable, derived } from './store';
import { flatObj } from '../includes/utils';
import { getFallbackOf } from './locale';
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
    }
    return null;
}
export function getClosestAvailableLocale(locale) {
    if (locale == null || hasLocaleDictionary(locale))
        return locale;
    return getClosestAvailableLocale(getFallbackOf(locale));
}
export function addMessages(locale, ...partials) {
    const flattedPartials = partials.map(partial => flatObj(partial));
    $dictionary.update(d => {
        d[locale] = Object.assign(d[locale] || {}, ...flattedPartials);
        return d;
    });
}
const $locales = derived([$dictionary], ([$dictionary]) => Object.keys($dictionary));
$dictionary.subscribe(newDictionary => (dictionary = newDictionary));
export { $dictionary, $locales };
