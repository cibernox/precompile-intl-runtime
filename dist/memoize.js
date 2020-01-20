const monadicMemoize = fn => {
    const cache = Object.create(null);
    const memoizedFn = (arg) => {
        const cacheKey = JSON.stringify(arg);
        if (cacheKey in cache) {
            return cache[cacheKey];
        }
        return (cache[cacheKey] = fn(arg));
    };
    return memoizedFn;
};
export { monadicMemoize };
