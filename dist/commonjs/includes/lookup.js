"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lookup = exports.lookupCache = void 0;
const dictionary_1 = require("../stores/dictionary");
const utils_1 = require("./utils");
exports.lookupCache = {};
const addToCache = (path, locale, message) => {
    if (!message)
        return message;
    if (!(locale in exports.lookupCache))
        exports.lookupCache[locale] = {};
    if (!(path in exports.lookupCache[locale]))
        exports.lookupCache[locale][path] = message;
    return message;
};
const searchForMessage = (path, locale) => {
    if (locale == null)
        return '';
    const message = dictionary_1.getMessageFromDictionary(locale, path);
    if (message)
        return message;
    return searchForMessage(path, utils_1.getFallbackOf(locale));
};
const lookup = (path, locale) => {
    if (locale in exports.lookupCache && path in exports.lookupCache[locale]) {
        return exports.lookupCache[locale][path];
    }
    const message = searchForMessage(path, locale);
    if (message) {
        return addToCache(path, locale, message);
    }
    return null;
};
exports.lookup = lookup;
