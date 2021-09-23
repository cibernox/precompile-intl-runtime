// @ts-ignore
import { derived } from "svelte/store";
import { lookup } from '../includes/lookup';
import { hasLocaleQueue } from '../includes/loaderQueue';
import { getTimeFormatter, getDateFormatter, getNumberFormatter, } from '../includes/formatters';
import { getOptions, getCurrentLocale, getPossibleLocales } from '../includes/utils';
import { $dictionary } from './dictionary';
import { $locale } from './locale';
export const formatMessage = (id, options = { id: '#missing-message-id#' }) => {
    if (typeof id === 'object') {
        options = id;
        id = options.id;
    }
    const { values, locale = getCurrentLocale(), default: defaultValue, } = options;
    if (locale == null) {
        throw new Error('[svelte-i18n] Cannot format a message without first setting the initial locale.');
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
        console.warn(`[svelte-i18n] The message "${id}" was not found in "${getPossibleLocales(locale).join('", "')}".${hasLocaleQueue(getCurrentLocale())
            ? `\n\nNote: there are at least one loader still registered to this locale that wasn't executed.`
            : ''}`);
    }
    return defaultValue || id;
};
export const getJSON = (id, locale) => {
    locale ||= getCurrentLocale();
    return lookup(id, locale) || id;
};
export const formatTime = (t, options) => getTimeFormatter(options).format(t);
export const formatDate = (d, options) => getDateFormatter(options).format(d);
export const formatNumber = (n, options) => getNumberFormatter(options).format(n);
export const $format = /*@__PURE__*/ derived([$locale, $dictionary], () => formatMessage);
export const $formatTime = /*@__PURE__*/ derived([$locale], () => formatTime);
export const $formatDate = /*@__PURE__*/ derived([$locale], () => formatDate);
export const $formatNumber = /*@__PURE__*/ derived([$locale], () => formatNumber);
export const $getJSON = /*@__PURE__*/ derived([$locale, $dictionary], () => getJSON);
