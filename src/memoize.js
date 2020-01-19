export const monadicMemoize = fn => {
  const cache = Object.create(null)
  return (arg) => {
    const cacheKey = JSON.stringify(arg)
    if (cacheKey in cache) {
      return cache[cacheKey]
    }
    return (cache[cacheKey] = fn(arg))
  }
}
