import {
  __interpolate,
  __plural,
  __select,
  addMessages,
  currentLocale,
  dictionary,
  locales
} from "../src";

beforeEach(() => {
  currentLocale.set(undefined);
  dictionary.set({});
  locales.set([]);
});

describe('__interpolate', function() {
  it("interpolate values bug ignores null, false and undefined", () => {
    expect(__interpolate(0)).toBe(0);
    expect(__interpolate(null)).toBe('');
    expect(__interpolate(false)).toBe('');
    expect(__interpolate(undefined)).toBe('');
    expect(__interpolate(1)).toBe(1);
    expect(__interpolate('foo')).toBe('foo');
  });
});

describe('__plural', function() {
  it("works", () => {
    expect(__plural(0, { 0: 'cats', 1: 'cat', other: 'cats' })).toBe('cats');
    expect(__plural(1, { 0: 'cats', 1: 'cat', other: 'cats' })).toBe('cat');
    expect(__plural(2, { 0: 'cats', 1: 'cat', other: 'cats' })).toBe('cats');
  });
});

describe('__select', function() {
  it("works", () => {
    expect(__select('male', { male: 'He', female: 'She', other: 'They' })).toBe('He');
    expect(__select('female', { male: 'He', female: 'She', other: 'They' })).toBe('She');
    expect(__select('animal', { male: 'He', female: 'She', other: 'They' })).toBe('They');
  });
});

describe('currentLocale', function() {
  it('behaves like an observable', () => {
    expect.assertions(2);
    let unsubscribe = currentLocale.subscribe(locale => {
      expect(locale).toBe('es-ES');
    });
    let unsubscribe2 = currentLocale.subscribe(locale => {
      expect(locale).toBe('es-ES');
    });
    currentLocale.set('es-ES');
    unsubscribe();
    unsubscribe2();
  });
});

describe("addMessages", function() {
  it("updates the `dictionary` and `locales` observables", () => {
    expect.assertions(2);
    let unsubscribe = locales.subscribe(locales => {
      expect(locales).toStrictEqual(["es"]);
    });
    let unsubscribe2 = dictionary.subscribe(messages => {
      expect(messages["es"]).toStrictEqual({ salute: "Hola" });
    });
    addMessages('es', { salute: 'Hola' });
    unsubscribe();
    unsubscribe2();
  });
});
