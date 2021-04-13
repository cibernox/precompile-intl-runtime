"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = exports.getOptions = exports.defaultOptions = exports.defaultFormats = void 0;
const locale_1 = require("./stores/locale");
exports.defaultFormats = {
    number: {
        scientific: { notation: 'scientific' },
        engineering: { notation: 'engineering' },
        compactLong: { notation: 'compact', compactDisplay: 'long' },
        compactShort: { notation: 'compact', compactDisplay: 'short' },
    },
    date: {
        short: { month: 'numeric', day: 'numeric', year: '2-digit' },
        medium: { month: 'short', day: 'numeric', year: 'numeric' },
        long: { month: 'long', day: 'numeric', year: 'numeric' },
        full: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' },
    },
    time: {
        short: { hour: 'numeric', minute: 'numeric' },
        medium: { hour: 'numeric', minute: 'numeric', second: 'numeric' },
        long: {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZoneName: 'short',
        },
        full: {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZoneName: 'short',
        },
    },
};
exports.defaultOptions = {
    fallbackLocale: '',
    initialLocale: '',
    loadingDelay: 200,
    formats: exports.defaultFormats,
    warnOnMissingMessages: true,
};
const options = exports.defaultOptions;
function getOptions() {
    return options;
}
exports.getOptions = getOptions;
function init(opts) {
    const { formats, ...rest } = opts;
    const initialLocale = opts.initialLocale || opts.fallbackLocale;
    Object.assign(options, rest, { initialLocale });
    if (formats) {
        if ('number' in formats) {
            Object.assign(options.formats.number, formats.number);
        }
        if ('date' in formats) {
            Object.assign(options.formats.date, formats.date);
        }
        if ('time' in formats) {
            Object.assign(options.formats.time, formats.time);
        }
    }
    return locale_1.$locale.set(initialLocale);
}
exports.init = init;
