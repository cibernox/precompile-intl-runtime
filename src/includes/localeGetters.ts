const getFirstMatch = (base: string, pattern: RegExp) => {
  const match = pattern.exec(base);

  // istanbul ignore if
  if (!match) return null;

  // istanbul ignore else
  return match[1] || null;
};

export const getLocaleFromHostname = (hostname: RegExp) => {
  // istanbul ignore next
  if (typeof window === "undefined") return null;

  return getFirstMatch(window.location.hostname, hostname);
};

export const getLocaleFromPathname = (pathname: RegExp) => {
  // istanbul ignore next
  if (typeof window === "undefined") return null;

  return getFirstMatch(window.location.pathname, pathname);
};

export const getLocaleFromNavigator = (ssrDefault?: string) => {
  // istanbul ignore next
  if (typeof window === "undefined") {
    return ssrDefault || null;
  }

  return window.navigator.language || window.navigator.languages[0];
};

export const getLocaleFromAcceptLanguageHeader = (
  header: string | null,
  availableLocales?: string[]
): string | undefined => {
  // If header is null (i.e. does not exist) the fallbackLocale should be used
  if (!header) return undefined;

  // Parse Accept-Language header
  const locales = header
    .split(",")
    .map((locale) => locale.trim())
    .map((locale) => {
      const directives = locale.split(";q=");
      return {
        locale: directives[0],
        quality: parseFloat(directives[1]) || 1.0,
      };
    })
    .sort((a, b) => b.quality - a.quality);

  // If availableLocales is not defined return the first language from header
  if (!availableLocales || availableLocales.length === 0)
    return locales[0].locale;

  locales.forEach((l) => (l.locale = l.locale.toLowerCase()));

  let firstAvailableBaseMatch: { match: string; base: string } | undefined;

  // Check languages
  for (const locale of locales) {
    if (
      firstAvailableBaseMatch &&
      !locale.locale
        .toLowerCase()
        .startsWith(`${firstAvailableBaseMatch.base}-`)
    ) {
      continue;
    }

    // Full match
    const fullMatch = getArrayElementCaseInsensitive(
      availableLocales,
      locale.locale
    );
    if (fullMatch) {
      return fullMatch;
    }

    if (firstAvailableBaseMatch) {
      continue;
    }

    // header base match
    const baseMatch = getArrayElementCaseInsensitive(
      availableLocales,
      locale.locale.split("-")[0]
    );
    if (baseMatch) {
      return baseMatch;
    }

    // available base match
    for (const availableLocale of availableLocales) {
      const availableBase = availableLocale.split("-")[0];
      if (availableBase.toLowerCase() === locale.locale) {
        // Remember base match to check if full match with same base exists
        firstAvailableBaseMatch = {
          match: availableLocale,
          base: locale.locale,
        };
        break;
      }
    }
  }

  if (firstAvailableBaseMatch !== undefined) {
    return firstAvailableBaseMatch.match;
  }

  // If no match found use fallbackLocale
  return undefined;
};

function getArrayElementCaseInsensitive(
  array: string[],
  searchElement: string
): string | undefined {
  searchElement = searchElement.toLowerCase();
  for (const element of array) {
    if (element.toLowerCase() === searchElement) {
      return element;
    }
  }
  return undefined;
}
