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
  it("works respecting the pluralization rules of the current locale", () => {
    currentLocale.set('en-US');
    let pluralizations = {
      zero: "no cats",
      one: "one cat",
      two: "a couple cats",
      3: "a triplet of cats",  // a specific translation for 3 that trups over
      few: "a few cats",
      many: "many cats",
      other: "other cats"
    };
    expect(__plural(0, pluralizations)).toBe('other cats'); // english has no zero pluralization
    expect(__plural(1, pluralizations)).toBe('one cat');
    expect(__plural(2, pluralizations)).toBe('other cats');
    expect(__plural(3, pluralizations)).toBe('a triplet of cats');
    expect(__plural(6, pluralizations)).toBe('other cats');
    expect(__plural(18, pluralizations)).toBe('other cats');
    expect(__plural(200, pluralizations)).toBe('other cats');

    currentLocale.set("ar-EG"); // arabic has a lot of different categories for
    expect(__plural(0, pluralizations)).toBe('no cats');
    expect(__plural(1, pluralizations)).toBe('one cat');
    expect(__plural(2, pluralizations)).toBe('a couple cats');
    expect(__plural(3, pluralizations)).toBe("a triplet of cats");
    expect(__plural(6, pluralizations)).toBe('a few cats');
    expect(__plural(18, pluralizations)).toBe('many cats');
    expect(__plural(200, pluralizations)).toBe('other cats');
  });

  it('supports receiving an offset as second argument', function() {
    let translation = trainers => __plural(trainers, 1, {
      0: "The gym is empty",
      1: "You are alone here",
      one: `You and ${trainers - 1} trainer`,
      other: `You and ${trainers - 1} other trainers`
    });

    expect(translation(0)).toBe("The gym is empty");
    expect(translation(1)).toBe("You are alone here");
    expect(translation(2)).toBe("You and 1 trainer");
    expect(translation(3)).toBe("You and 2 other trainers");
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
  it('subscribes get notified when its value is updated', () => {
    expect.assertions(2);
    let earlyExit = true;
    let unsubscribe = currentLocale.subscribe(locale => {
      if (earlyExit) return;
      expect(locale).toBe('es-ES');
    });
    let unsubscribe2 = currentLocale.subscribe(locale => {
      if (earlyExit) return;
      expect(locale).toBe('es-ES');
    });
    earlyExit = false;
    currentLocale.set('es-ES');
    unsubscribe();
    unsubscribe2();
  });

  it('subscribers get immediately invoked', function() {
    expect.assertions(1);
    currentLocale.set("fr-Fr");
    let unsubscribe = currentLocale.subscribe(locale => {
      expect(locale).toBe("fr-Fr");
    });
    unsubscribe();
  });
});

describe("addMessages", function() {
  it("updates the `dictionary` and `locales` observables", () => {
    expect.assertions(2);
    let earlyExit = true;
    let unsubscribe = locales.subscribe(locales => {
      if (earlyExit) return;
      expect(locales).toStrictEqual(["es"]);
    });
    let unsubscribe2 = dictionary.subscribe(messages => {
      if (earlyExit) return;
      expect(messages["es"]).toStrictEqual({ salute: "Hola" });
    });
    earlyExit = false;
    addMessages('es', { salute: 'Hola' });
    unsubscribe();
    unsubscribe2();
  });
});
