// This was a svelte-only library, it could be a writable store
class WritableStore {
  constructor(v) {
    this._initialValue = v;
    this._value = this._initialValue;
    this._subscribers = [];
  }
  subscribe(fn) {
    this._subscribers.push(fn);
    fn(this._value);
    return () => this._subscribers.splice(this._subscribers.indexOf(fn), 1);
  }
  set(v) {
    this._value = v;
    this._subscribers.forEach(fn => fn(v));
  }
  update(cb) {
    this._value = cb(this._value);
    this._subscribers.forEach(fn => fn(this._value));
  }
}
const defaultFormats = {
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

const defaultOptions = {
  fallbackLocale: null,
  initialLocale: null,
  loadingDelay: 200,
  formats: defaultFormats,
  warnOnMissingMessages: true
};
const options = defaultOptions;
function getOptions() {
  return options;
}
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

function getClientLocale({ navigator, hash, search, pathname, hostname }) {
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
};

export const currentLocale = new WritableStore();
export const dictionary = new WritableStore({});
export const locales = new WritableStore([]);
dictionary.subscribe(dict => {
  locales.set(Object.keys(dict));
});

export function init(opts) {
  const { formats, ...rest } = opts
  const initialLocale = opts.initialLocale
    ? typeof opts.initialLocale === 'string'
      ? opts.initialLocale
      : getClientLocale(opts.initialLocale) || opts.fallbackLocale
    : opts.fallbackLocale

  Object.assign(options, rest, { initialLocale })

  if (formats) {
    if ('number' in formats) {
      Object.assign(options.formats.number, formats.number)
    }
    if ('date' in formats) {
      Object.assign(options.formats.date, formats.date)
    }
    if ('time' in formats) {
      Object.assign(options.formats.time, formats.time)
    }
  }

  return currentLocale.set(initialLocale);
}

function getLocalPluralFor(v) {
  return new Intl.PluralRules(currentLocale._value).select(v);
}

export function __interpolate(value) {
  return value === 0 ? 0 : value || '';
}

export function __plural(value, opts) {
  return opts[value] || opts[getLocalPluralFor(value)] || "";
}

export function __select(value, opts) {
  return opts[value] || opts['other'];
}

export function __number(value, style) {
  let formatterOpts = getOptions().formats.number[style] || {}
  return new Intl.NumberFormat(currentLocale._value, formatterOpts).format(
    value
  );
}

export function __date(value, style = "short") {
  let formatterOpts = getOptions().formats.date[style] || {};
  return new Intl.DateTimeFormat(currentLocale._value, formatterOpts).format(
    value
  );
}

export function __time(value, style = "short") {
  let formatterOpts = getOptions().formats.time[style] || {};
  return new Intl.DateTimeFormat(currentLocale._value, formatterOpts).format(
    value
  );
}

export function addMessages(locale, messages) {
  dictionary.update(value => {
    value[locale] = Object.assign(value[locale] || {}, messages);
    return value;
  });
}

export function lookupMessage(key, locale = currentLocale._value) {
  return dictionary._value[locale][key];
}

