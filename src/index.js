// This was a svelte-only library, it could be a writable store
class WritableStore {
  constructor(v) {
    this._initialValue = v;
    this._value = this._initialValue;
    this._subscribers = [];
  }
  subscribe(fn) {
    this._subscribers.push(fn);
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
export const currentLocale = new WritableStore();
export const dictionary = new WritableStore({});
export const locales = new WritableStore([]);
dictionary.subscribe(dict => {
  locales.set(Object.keys(dict));
});

export function __interpolate(value) {
  return value === 0 ? 0 : value || '';
}

export function __plural(value, opts) {
  return opts[value] || opts['other'];
}

export function __select(value, opts) {
  return opts[value] || opts['other'];
}

export function __number(value, style) {
  return `numbered ${value}!`;
}

export function __date(value, style) {
  return `dated ${value}!`;
}

export function __time(value, style) {
  return `timed ${value}!`;
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

