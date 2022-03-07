const getFromQueryString = (queryString: string, key: string) => {
  const keyVal = queryString.split('&').find((i) => i.indexOf(`${key}=`) === 0);

  if (keyVal) {
    return keyVal.split('=').pop() || null;
  }

  return null;
};

const getFirstMatch = (base: string, pattern: RegExp) => {
  const match = pattern.exec(base);

  // istanbul ignore if
  if (!match) return null;

  // istanbul ignore else
  return match[1] || null;
};

export const getLocaleFromHostname = (hostname: RegExp) => {
  // istanbul ignore next
  if (typeof window === 'undefined') return null;

  return getFirstMatch(window.location.hostname, hostname);
};

export const getLocaleFromPathname = (pathname: RegExp) => {
  // istanbul ignore next
  if (typeof window === 'undefined') return null;

  return getFirstMatch(window.location.pathname, pathname);
};

export const getLocaleFromNavigator = (ssrDefault?: string) => {
  // istanbul ignore next
  if (typeof window === 'undefined') {
    return ssrDefault || null;
  }

  return window.navigator.language || window.navigator.languages[0];
};

export const getLocaleFromQueryString = (search: string) => {
  // istanbul ignore next
  if (typeof window === 'undefined') return null;

  return getFromQueryString(window.location.search.substr(1), search);
};

export const getLocaleFromHash = (hash: string) => {
  // istanbul ignore next
  if (typeof window === 'undefined') return null;

  return getFromQueryString(window.location.hash.substr(1), hash);
};

export const getLocaleFromAcceptLanguageHeader = (header: string | null, availableLocales?: string[]): string | undefined => {
  // If header is null (i.e. does not exist) the fallbackLocale should be used
  if (!header)
    return undefined;

  // Parse Accept-Language header
  const locales = header
      .split(',')
      .map(locale => locale.trim())
      .map(locale => {
        const directives = locale.split(';q=');
        return {
          locale: directives[0],
          quality: parseFloat(directives[1]) || 1.0
        };
      })
      .sort((a, b) => b.quality - a.quality);

  // If availableLocales is not defined return the first language from header
  if (!availableLocales)
    return locales[0].locale;

  // Check full match
  for (const locale of locales) {
    if (availableLocales.includes(locale.locale))
      return locale.locale;
  }

  // Check base language match
  for (const locale of locales.filter(l => l.locale.includes('-'))) {
    const base = locale.locale.split('-')[0];
    if (availableLocales.includes(base))
      return base;
  }

  // If no match found use fallbackLocale
  return undefined;
}
