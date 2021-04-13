"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerLocaleLoader = exports.flush = exports.hasLocaleQueue = exports.resetQueues = void 0;
const dictionary_1 = require("../stores/dictionary");
const locale_1 = require("../stores/locale");
const loading_1 = require("../stores/loading");
const configs_1 = require("../configs");
const loaderQueue = {};
function resetQueues() {
    Object.keys(loaderQueue).forEach(key => {
        delete loaderQueue[key];
    });
}
exports.resetQueues = resetQueues;
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
    return locale_1.getRelatedLocalesOf(locale)
        .reverse()
        .map(localeItem => {
        const queue = getLocaleQueue(localeItem);
        return [localeItem, queue ? [...queue] : []];
    })
        .filter(([, queue]) => queue.length > 0);
}
function hasLocaleQueue(locale) {
    return locale_1.getRelatedLocalesOf(locale)
        .reverse()
        .some(getLocaleQueue);
}
exports.hasLocaleQueue = hasLocaleQueue;
const activeLocaleFlushes = {};
function flush(locale) {
    if (!hasLocaleQueue(locale))
        return Promise.resolve();
    if (locale in activeLocaleFlushes)
        return activeLocaleFlushes[locale];
    // get queue of XX-YY and XX locales
    const queues = getLocalesQueues(locale);
    // istanbul ignore if
    if (queues.length === 0)
        return Promise.resolve();
    const loadingDelay = setTimeout(() => loading_1.$isLoading.set(true), configs_1.getOptions().loadingDelay);
    // TODO what happens if some loader fails
    activeLocaleFlushes[locale] = Promise.all(queues.map(([locale, queue]) => {
        return Promise.all(queue.map(loader => loader())).then(partials => {
            removeLocaleFromQueue(locale);
            partials = partials.map(partial => partial.default || partial);
            dictionary_1.addMessages(locale, ...partials);
        });
    })).then(() => {
        clearTimeout(loadingDelay);
        loading_1.$isLoading.set(false);
        delete activeLocaleFlushes[locale];
    });
    return activeLocaleFlushes[locale];
}
exports.flush = flush;
function registerLocaleLoader(locale, loader) {
    if (!getLocaleQueue(locale))
        createLocaleQueue(locale);
    const queue = getLocaleQueue(locale);
    // istanbul ignore if
    if (getLocaleQueue(locale).has(loader))
        return;
    if (!dictionary_1.hasLocaleDictionary(locale)) {
        dictionary_1.$dictionary.update(d => {
            d[locale] = {};
            return d;
        });
    }
    queue.add(loader);
}
exports.registerLocaleLoader = registerLocaleLoader;
