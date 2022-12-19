type MemoizedFunction = <F extends Function>(fn: F) => F;

const monadicMemoize: MemoizedFunction = (fn) => {
  const cache = Object.create(null);
  const memoizedFn: any = (arg: unknown) => {
    const cacheKey = JSON.stringify(arg);
    if (!(cacheKey in cache)) {
      cache[cacheKey] = fn(arg);
    }
    return cache[cacheKey];
  };
  return memoizedFn;
};
export { monadicMemoize };
