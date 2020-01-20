// This was a svelte-only library, it could be a writable store
class WritableStore<T> {
  _value: T;
  _subscribers: ((T) => void)[];
  constructor(v) {
    this._value = v;
    this._subscribers = [];
  }
  subscribe(fn: (value: T) => void) {
    this._subscribers.push(fn);
    fn(this._value);
    return () => this._subscribers.splice(this._subscribers.indexOf(fn), 1);
  }
  set(v: T) {
    this._value = v;
    this._subscribers.forEach(fn => fn(v));
  }
  update(cb: (value: T) => T) {
    this._value = cb(this._value);
    this._subscribers.forEach(fn => fn(this._value));
  }
}
export type LocaleDictionaryValue = string | ((...args: any[]) => string)
export type LocaleDictionary = Record<string, LocaleDictionaryValue>;
type Dictionary = Record<string, LocaleDictionary>;

export const currentLocale = new WritableStore<string>(undefined);
export const dictionary = new WritableStore<Dictionary>({});
export const locales = new WritableStore<string[]>([]);
dictionary.subscribe(dict => {
  locales.set(Object.keys(dict));
});

export function getCurrentLocale(): string {
  return currentLocale._value;
}


export function lookupMessage(key: string, locale: string = getCurrentLocale()): LocaleDictionaryValue {
  return dictionary._value[locale][key];
}