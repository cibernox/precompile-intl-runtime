import { derived } from "svelte/store";
import { lookup } from '../includes/lookup';
import { hasLocaleQueue } from '../includes/loaderQueue';
import { getTimeFormatter, getDateFormatter, getNumberFormatter, } from '../includes/formatters';
import { getOptions, getCurrentLocale, getPossibleLocales } from '../includes/utils';
import { $dictionary } from './dictionary';
import { $locale } from './locale';
export const formatMessage = (currentLocale, optionsOrId, maybeOptions = {}) => {
    const id = typeof optionsOrId === 'string' ? optionsOrId : optionsOrId.id;
    const options = typeof optionsOrId === 'string' ? maybeOptions : optionsOrId;
    const { values, locale = currentLocale || getCurrentLocale(), default: defaultValue, } = options;
    if (locale == null) {
        throw new Error('[svelte-intl-precompile] Cannot format a message without first setting the initial locale.');
    }
    let message = lookup(id, locale);
    if (typeof message === 'string') {
        return message;
    }
    if (typeof message === 'function') {
        return message(...Object.keys(options.values || {}).sort().map(k => (options.values || {})[k]));
    }
    if (getOptions().warnOnMissingMessages) {
        // istanbul ignore next
        console.warn(`[svelte-intl-precompile] The message "${id}" was not found in "${getPossibleLocales(locale).join('", "')}".${hasLocaleQueue(getCurrentLocale())
            ? `\n\nNote: there are at least one loader still registered to this locale that wasn't executed.`
            : ''}`);
    }
    return defaultValue || id;
};
export const getJSON = (id, locale) => {
    locale = locale || getCurrentLocale();
    return lookup(id, locale) || id;
};
export const formatTime = (currentLocale, t, options) => {
    const locale = currentLocale || getCurrentLocale();
    return getTimeFormatter({ locale, ...options }).format(t);
};
export const formatDate = (currentLocale, d, options) => {
    const locale = currentLocale || getCurrentLocale();
    return getDateFormatter({ locale, ...options }).format(d);
};
export const formatNumber = (currentLocale, n, options) => {
    const locale = currentLocale || getCurrentLocale();
    return getNumberFormatter({ locale, ...options }).format(n);
};
export const $format = /*@__PURE__*/ derived([$locale, $dictionary], ([currentLocale]) => formatMessage.bind(null, currentLocale));
export const $formatTime = /*@__PURE__*/ derived([$locale], ([currentLocale]) => formatTime.bind(null, currentLocale));
export const $formatDate = /*@__PURE__*/ derived([$locale], ([currentLocale]) => formatDate.bind(null, currentLocale));
export const $formatNumber = /*@__PURE__*/ derived([$locale], ([currentLocale]) => formatNumber.bind(null, currentLocale));
export const $getJSON = /*@__PURE__*/ derived([$locale, $dictionary], () => getJSON);
