"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$formatNumber = exports.$formatDate = exports.$formatTime = exports.$format = exports.formatNumber = exports.formatDate = exports.formatTime = exports.formatMessage = void 0;
// @ts-ignore
const store_1 = require("svelte/store");
const lookup_1 = require("../includes/lookup");
const loaderQueue_1 = require("../includes/loaderQueue");
const formatters_1 = require("../includes/formatters");
const configs_1 = require("../configs");
const dictionary_1 = require("./dictionary");
const locale_1 = require("./locale");
exports.formatMessage = (id, options = {}) => {
    if (typeof id === 'object') {
        options = id;
        id = options.id;
    }
    const { values, locale = locale_1.getCurrentLocale(), default: defaultValue } = options;
    if (locale == null) {
        throw new Error('[svelte-i18n] Cannot format a message without first setting the initial locale.');
    }
    const message = lookup_1.lookup(id, locale);
    if (!message) {
        if (configs_1.getOptions().warnOnMissingMessages) {
            // istanbul ignore next
            console.warn(`[svelte-i18n] The message "${id}" was not found in "${locale_1.getRelatedLocalesOf(locale).join('", "')}".${loaderQueue_1.hasLocaleQueue(locale_1.getCurrentLocale())
                ? `\n\nNote: there are at least one loader still registered to this locale that wasn't executed.`
                : ''}`);
        }
        return defaultValue || id;
    }
    if (typeof message === 'string') {
        return message;
    }
    else {
        return message(...Object.keys(options.values || {}).sort().map(k => options.values[k]));
    }
};
exports.formatTime = (t, options) => formatters_1.getTimeFormatter(options).format(t);
exports.formatDate = (d, options) => formatters_1.getDateFormatter(options).format(d);
exports.formatNumber = (n, options) => formatters_1.getNumberFormatter(options).format(n);
exports.$format = store_1.derived([locale_1.$locale, dictionary_1.$dictionary], () => exports.formatMessage);
exports.$formatTime = store_1.derived([locale_1.$locale], () => exports.formatTime);
exports.$formatDate = store_1.derived([locale_1.$locale], () => exports.formatDate);
exports.$formatNumber = store_1.derived([locale_1.$locale], () => exports.formatNumber);
