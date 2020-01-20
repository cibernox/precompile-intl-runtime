import { currentLocale } from "./stores";
interface Formats {
  number: Record<string, any>
  date: Record<string, any>
  time: Record<string, any>
}

interface Options {
  fallbackLocale: string
  initialLocale: string
  formats: Formats
  loadingDelay: number
  warnOnMissingMessages: boolean
}

interface GetClientLocaleOptions {
  navigator?: boolean;
  hash?: string;
  search?: string;
  pathname?: RegExp;
  hostname?: RegExp;
}

interface ConfigureOptions {
  fallbackLocale: string;
  initialLocale?: string | GetClientLocaleOptions;
  formats?: Partial<Formats>;
  loadingDelay?: number;
}

const defaultFormats: Formats = {
  number: {
    scientific: { notation: "scientific" },
    engineering: { notation: "engineering" },
    compactLong: { notation: "compact", compactDisplay: "long" },
    compactShort: { notation: "compact", compactDisplay: "short" }
  },
  date: {
    short: { month: "numeric", day: "numeric", year: "2-digit" },
    medium: { month: "short", day: "numeric", year: "numeric" },
    long: { month: "long", day: "numeric", year: "numeric" },
    full: { weekday: "long", month: "long", day: "numeric", year: "numeric" }
  },
  time: {
    short: { hour: "numeric", minute: "numeric" },
    medium: { hour: "numeric", minute: "numeric", second: "numeric" },
    long: {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short"
    },
    full: {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short"
    }
  }
};

const defaultOptions: Options = {
  fallbackLocale: null,
  initialLocale: null,
  loadingDelay: 200,
  formats: defaultFormats,
  warnOnMissingMessages: true
};
const options: Options = defaultOptions;

const getFromQueryString = (queryString, key) => {
  const keyVal = queryString.split("&").find(i => i.indexOf(`${key}=`) === 0);

  if (keyVal) {
    return keyVal.split("=").pop();
  }
  return null;
};

const getFirstMatch = (base, pattern) => {
  const match = pattern.exec(base);
  // istanbul ignore if
  if (!match) return null;
  // istanbul ignore else
  return match[1] || null;
};

function getClientLocale({
  navigator,
  hash,
  search,
  pathname,
  hostname
}: GetClientLocaleOptions) {
  let locale;

  // istanbul ignore next
  if (typeof window === "undefined") return null;

  if (hostname) {
    locale = getFirstMatch(window.location.hostname, hostname);
    if (locale) return locale;
  }

  if (pathname) {
    locale = getFirstMatch(window.location.pathname, pathname);
    if (locale) return locale;
  }

  if (navigator) {
    // istanbul ignore else
    locale = window.navigator.language || window.navigator.languages[0];
    if (locale) return locale;
  }

  if (search) {
    locale = getFromQueryString(window.location.search.substr(1), search);
    if (locale) return locale;
  }

  if (hash) {
    locale = getFromQueryString(window.location.hash.substr(1), hash);
    if (locale) return locale;
  }

  return null;
}

export function init(opts: ConfigureOptions) {
  const { formats, ...rest } = opts;
  const initialLocale = opts.initialLocale
    ? typeof opts.initialLocale === "string"
      ? opts.initialLocale
      : getClientLocale(opts.initialLocale) || opts.fallbackLocale
    : opts.fallbackLocale;

  Object.assign(options, rest, { initialLocale });

  if (formats) {
    if ("number" in formats) {
      Object.assign(options.formats.number, formats.number);
    }
    if ("date" in formats) {
      Object.assign(options.formats.date, formats.date);
    }
    if ("time" in formats) {
      Object.assign(options.formats.time, formats.time);
    }
  }

  return currentLocale.set(initialLocale);
}

export function getOptions(): Options {
  return options;
}