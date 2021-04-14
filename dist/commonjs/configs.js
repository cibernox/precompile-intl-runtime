"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const locale_1 = require("./stores/locale");
const utils_1 = require("./includes/utils");
function init(opts) {
    const { formats, ...rest } = opts;
    const initialLocale = opts.initialLocale || opts.fallbackLocale;
    const options = utils_1.getOptions();
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
