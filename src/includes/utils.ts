interface Options {
  fallbackLocale: string;
  initialLocale: string;
  loadingDelay: number;
}

const defaultOptions: Options = {
  fallbackLocale: "",
  initialLocale: "",
  loadingDelay: 200,
};

const options: Options = defaultOptions;
let currentLocale: string;

export function getCurrentLocale() {
  return currentLocale;
}
export function setCurrentLocale(val: string) {
  return (currentLocale = val);
}
export function getOptions() {
  return options;
}
function getSubLocales(refLocale: string) {
  return refLocale
    .split("-")
    .map((_, i, arr) => arr.slice(0, i + 1).join("-"))
    .reverse();
}
export function getPossibleLocales(
  refLocale: string,
  fallbackLocale = getOptions().fallbackLocale
): string[] {
  const locales = getSubLocales(refLocale);

  if (fallbackLocale) {
    return [...new Set([...locales, ...getSubLocales(fallbackLocale)])];
  }

  return locales;
}
