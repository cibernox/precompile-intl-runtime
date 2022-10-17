import { writable } from 'svelte/store';
import { flush, hasLocaleQueue } from '../includes/loaderQueue';
import { getCurrentLocale, setCurrentLocale } from '../includes/utils';
import { getClosestAvailableLocale } from './dictionary';
const $locale = writable('');
$locale.subscribe((newLocale) => {
    setCurrentLocale(newLocale);
    if (typeof window !== 'undefined') {
        if (newLocale !== '') {
            document.documentElement.setAttribute('lang', newLocale);
        }
    }
});
const localeSet = $locale.set;
$locale.set = (newLocale) => {
    if (getClosestAvailableLocale(newLocale) && hasLocaleQueue(newLocale)) {
        return flush(newLocale).then(() => localeSet(newLocale));
    }
    return localeSet(newLocale);
};
// istanbul ignore next
$locale.update = (fn) => {
    let currentLocale = getCurrentLocale();
    fn(currentLocale);
    localeSet(currentLocale);
};
export { $locale };
