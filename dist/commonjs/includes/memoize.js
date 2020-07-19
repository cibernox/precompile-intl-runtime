"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.monadicMemoize = void 0;
const monadicMemoize = fn => {
    const cache = Object.create(null);
    const memoizedFn = (arg) => {
        const cacheKey = JSON.stringify(arg);
        if (!(cacheKey in cache)) {
            cache[cacheKey] = fn(arg);
        }
        return cache[cacheKey];
    };
    return memoizedFn;
};
exports.monadicMemoize = monadicMemoize;
