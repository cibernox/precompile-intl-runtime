import { getOptions, getCurrentLocale } from './utils';
import { monadicMemoize } from './memoize';
const getIntlFormatterOptions = (type, name) => {
    const { formats } = getOptions();
    if (type in formats && name in formats[type]) {
        return formats[type][name];
    }
    throw new Error(`[precompile-intl-runtime] Unknown "${name}" ${type} format.`);
};
export const getNumberFormatter = monadicMemoize(({ locale, format, ...options } = {}) => {
    locale = locale || getCurrentLocale();
    if (locale == null) {
        throw new Error('[precompile-intl-runtime] A "locale" must be set to format numbers');
    }
    if (typeof format === 'string') {
        return new Intl.NumberFormat(locale, getIntlFormatterOptions('number', format));
    }
    else {
        return new Intl.NumberFormat(locale, format);
    }
});
export const getDateFormatter = monadicMemoize(({ locale, format, ...options } = {}) => {
    locale = locale || getCurrentLocale();
    if (locale == null) {
        throw new Error('[precompile-intl-runtime] A "locale" must be set to format dates');
    }
    if (format) {
        options = getIntlFormatterOptions('date', format);
    }
    else if (Object.keys(options).length === 0) {
        options = getIntlFormatterOptions('date', 'short');
    }
    return new Intl.DateTimeFormat(locale, options);
});
export const getTimeFormatter = monadicMemoize(({ locale, format, ...options } = {}) => {
    locale = locale || getCurrentLocale();
    if (locale == null) {
        throw new Error('[precompile-intl-runtime] A "locale" must be set to format time values');
    }
    if (format) {
        options = getIntlFormatterOptions('time', format);
    }
    else if (Object.keys(options).length === 0) {
        options = getIntlFormatterOptions('time', 'short');
    }
    return new Intl.DateTimeFormat(locale, options);
});
