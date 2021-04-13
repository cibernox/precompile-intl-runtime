"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.__time = exports.__date = exports.__number = exports.__select = exports.__plural = exports.__offsetPlural = exports.__interpolate = exports.getTimeFormatter = exports.getNumberFormatter = exports.getDateFormatter = exports.formatTime = exports.formatNumber = exports.formatDate = exports.t = exports._ = exports.format = exports.isLoading = exports.register = exports.addMessages = exports.locales = exports.dictionary = exports.locale = exports.init = exports.waitLocale = void 0;
const locale_1 = require("./stores/locale");
const configs_1 = require("./configs");
const loaderQueue_1 = require("./includes/loaderQueue");
__exportStar(require("./includes/utils"), exports);
function waitLocale(locale) {
    return loaderQueue_1.flush(locale || locale_1.getCurrentLocale() || configs_1.getOptions().initialLocale);
}
exports.waitLocale = waitLocale;
var configs_2 = require("./configs");
Object.defineProperty(exports, "init", { enumerable: true, get: function () { return configs_2.init; } });
var locale_2 = require("./stores/locale");
Object.defineProperty(exports, "locale", { enumerable: true, get: function () { return locale_2.$locale; } });
var dictionary_1 = require("./stores/dictionary");
Object.defineProperty(exports, "dictionary", { enumerable: true, get: function () { return dictionary_1.$dictionary; } });
Object.defineProperty(exports, "locales", { enumerable: true, get: function () { return dictionary_1.$locales; } });
Object.defineProperty(exports, "addMessages", { enumerable: true, get: function () { return dictionary_1.addMessages; } });
var loaderQueue_2 = require("./includes/loaderQueue");
Object.defineProperty(exports, "register", { enumerable: true, get: function () { return loaderQueue_2.registerLocaleLoader; } });
var loading_1 = require("./stores/loading");
Object.defineProperty(exports, "isLoading", { enumerable: true, get: function () { return loading_1.$isLoading; } });
const formatters_1 = require("./stores/formatters");
var formatters_2 = require("./stores/formatters");
Object.defineProperty(exports, "format", { enumerable: true, get: function () { return formatters_2.$format; } });
Object.defineProperty(exports, "_", { enumerable: true, get: function () { return formatters_2.$format; } });
Object.defineProperty(exports, "t", { enumerable: true, get: function () { return formatters_2.$format; } });
Object.defineProperty(exports, "formatDate", { enumerable: true, get: function () { return formatters_2.$formatDate; } });
Object.defineProperty(exports, "formatNumber", { enumerable: true, get: function () { return formatters_2.$formatNumber; } });
Object.defineProperty(exports, "formatTime", { enumerable: true, get: function () { return formatters_2.$formatTime; } });
// low-level
var formatters_3 = require("./includes/formatters");
Object.defineProperty(exports, "getDateFormatter", { enumerable: true, get: function () { return formatters_3.getDateFormatter; } });
Object.defineProperty(exports, "getNumberFormatter", { enumerable: true, get: function () { return formatters_3.getNumberFormatter; } });
Object.defineProperty(exports, "getTimeFormatter", { enumerable: true, get: function () { return formatters_3.getTimeFormatter; } });
function __interpolate(value) {
    return value === 0 ? 0 : value || '';
}
exports.__interpolate = __interpolate;
const PLURAL_RULES = Object.create(null);
function getLocalPluralFor(v) {
    let loc = locale_1.getCurrentLocale();
    let pluralRules = PLURAL_RULES[loc] || (PLURAL_RULES[loc] = new Intl.PluralRules(loc));
    let key = pluralRules.select(v);
    return key === 'other' ? 'h' : key[0];
}
function __offsetPlural(value, offset, opts) {
    return opts[value] || opts[getLocalPluralFor(value - offset)] || "";
}
exports.__offsetPlural = __offsetPlural;
function __plural(value, opts) {
    return opts[value] || opts[getLocalPluralFor(value)] || "";
}
exports.__plural = __plural;
function __select(value, opts) {
    return opts[value] || opts['other'] || '';
}
exports.__select = __select;
function __number(value, format) {
    return formatters_1.formatNumber(value, { format });
}
exports.__number = __number;
function __date(value, format = "short") {
    return formatters_1.formatDate(value, { format });
}
exports.__date = __date;
function __time(value, format = "short") {
    return formatters_1.formatTime(value, { format });
}
exports.__time = __time;
