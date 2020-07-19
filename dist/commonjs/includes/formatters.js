"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimeFormatter = exports.getDateFormatter = exports.getNumberFormatter = void 0;
const locale_1 = require("../stores/locale");
const configs_1 = require("../configs");
const memoize_1 = require("./memoize");
const getIntlFormatterOptions = (type, name) => {
    const formats = configs_1.getOptions().formats;
    if (type in formats && name in formats[type]) {
        return formats[type][name];
    }
    throw new Error(`[svelte-i18n] Unknown "${name}" ${type} format.`);
};
exports.getNumberFormatter = memoize_1.monadicMemoize(({ locale, format, ...options } = {}) => {
    locale = locale || locale_1.getCurrentLocale();
    if (locale == null) {
        throw new Error('[svelte-i18n] A "locale" must be set to format numbers');
    }
    if (format) {
        options = getIntlFormatterOptions('number', format);
    }
    return new Intl.NumberFormat(locale, options);
});
exports.getDateFormatter = memoize_1.monadicMemoize(({ locale, format, ...options } = {}) => {
    locale = locale || locale_1.getCurrentLocale();
    if (locale == null) {
        throw new Error('[svelte-i18n] A "locale" must be set to format dates');
    }
    if (format)
        options = getIntlFormatterOptions('date', format);
    else if (Object.keys(options).length === 0) {
        options = getIntlFormatterOptions('date', 'short');
    }
    return new Intl.DateTimeFormat(locale, options);
});
exports.getTimeFormatter = memoize_1.monadicMemoize(({ locale, format, ...options } = {}) => {
    locale = locale || locale_1.getCurrentLocale();
    if (locale == null) {
        throw new Error('[svelte-i18n] A "locale" must be set to format time values');
    }
    if (format)
        options = getIntlFormatterOptions('time', format);
    else if (Object.keys(options).length === 0) {
        options = getIntlFormatterOptions('time', 'short');
    }
    return new Intl.DateTimeFormat(locale, options);
});
