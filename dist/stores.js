// This was a svelte-only library, it could be a writable store
class WritableStore {
    constructor(v) {
        this._value = v;
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
export const currentLocale = new WritableStore(undefined);
export const dictionary = new WritableStore({});
export const locales = new WritableStore([]);
dictionary.subscribe(dict => {
    locales.set(Object.keys(dict));
});
export function getCurrentLocale() {
    return currentLocale._value;
}
export function lookupMessage(key, locale = getCurrentLocale()) {
    return dictionary._value[locale][key];
}
