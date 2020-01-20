import { hasLocaleDictionary, $dictionary, addMessages, } from '../stores/dictionary';
import { getRelatedLocalesOf } from '../stores/locale';
import { $isLoading } from '../stores/loading';
import { getOptions } from '../configs';
const loaderQueue = {};
export function resetQueues() {
    Object.keys(loaderQueue).forEach(key => {
        delete loaderQueue[key];
    });
}
function createLocaleQueue(locale) {
    loaderQueue[locale] = new Set();
}
function removeLocaleFromQueue(locale) {
    delete loaderQueue[locale];
}
function getLocaleQueue(locale) {
    return loaderQueue[locale];
}
function getLocalesQueues(locale) {
    return getRelatedLocalesOf(locale)
        .reverse()
        .map(localeItem => {
        const queue = getLocaleQueue(localeItem);
        return [localeItem, queue ? [...queue] : []];
    })
        .filter(([, queue]) => queue.length > 0);
}
export function hasLocaleQueue(locale) {
    return getRelatedLocalesOf(locale)
        .reverse()
        .some(getLocaleQueue);
}
const activeLocaleFlushes = {};
export function flush(locale) {
    if (!hasLocaleQueue(locale))
        return;
    if (locale in activeLocaleFlushes)
        return activeLocaleFlushes[locale];
    // get queue of XX-YY and XX locales
    const queues = getLocalesQueues(locale);
    // istanbul ignore if
    if (queues.length === 0)
        return;
    const loadingDelay = setTimeout(() => $isLoading.set(true), getOptions().loadingDelay);
    // TODO what happens if some loader fails
    activeLocaleFlushes[locale] = Promise.all(queues.map(([locale, queue]) => {
        return Promise.all(queue.map(loader => loader())).then(partials => {
            removeLocaleFromQueue(locale);
            partials = partials.map(partial => partial.default || partial);
            addMessages(locale, ...partials);
        });
    })).then(() => {
        clearTimeout(loadingDelay);
        $isLoading.set(false);
        delete activeLocaleFlushes[locale];
    });
    return activeLocaleFlushes[locale];
}
export function registerLocaleLoader(locale, loader) {
    if (!getLocaleQueue(locale))
        createLocaleQueue(locale);
    const queue = getLocaleQueue(locale);
    // istanbul ignore if
    if (getLocaleQueue(locale).has(loader))
        return;
    if (!hasLocaleDictionary(locale)) {
        $dictionary.update(d => {
            d[locale] = {};
            return d;
        });
    }
    queue.add(loader);
}
