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
export { monadicMemoize };
