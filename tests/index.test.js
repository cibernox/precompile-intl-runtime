import {
  __interpolate,
  __plural,
  __select,
  __date,
  __time,
  __number,
  addMessages,
  currentLocale,
  dictionary,
  locales,
  init
} from "../src";

beforeEach(() => {
  currentLocale.set(undefined);
  dictionary.set({});
  locales.set([]);
  init({
    fallbackLocale: "en",
    initialLocale: "en-US", // in node by default only the en-US language is available.
    formats: {
      number: {
        eur: { style: "currency", currency: "EUR" }
      },
      date: {
        "abbr-full": { weekday: "long", month: "short", day: "numeric" }
      },
      time: {
        hour: { hour: "numeric" }
      }
    }
  });
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

describe('__date', function() {
  it('formats dates on the "short" format by default', function() {
    let wedding = new Date('2013-10-18')
    expect(__date(wedding)).toBe("10/18/13"); // 10/18/13
  });

  it('accepts "short", "medium", "long" and "full" as second argument', function() {
    let wedding = new Date('2013-10-18');
    expect(__date(wedding, 'short')).toBe("10/18/13");
    expect(__date(wedding, "medium")).toBe("Oct 18, 2013");
    expect(__date(wedding, "long")).toBe("October 18, 2013");
    expect(__date(wedding, "full")).toBe("Friday, October 18, 2013");
  });

  it('accepts custom formats preconfigured when the library was initialized', function() {
    let wedding = new Date('2013-10-18');
    expect(__date(wedding, "abbr-full")).toBe("Friday, Oct 18");
  });
});

describe("__time", function() {
  it('formats times on the "short" format by default', function() {
    let wedding = new Date(Date.UTC(2013, 11, 18, 19, 13, 50));
    expect(__time(wedding)).toBe("8:13 PM");
  });

  it('accepts "short", "medium", "long" and "full" as second argument', function() {
    let wedding = new Date(Date.UTC(2013, 11, 18, 19, 13, 50));
    expect(__time(wedding, "short")).toBe("8:13 PM");
    expect(__time(wedding, "medium")).toBe("8:13:50 PM");
    expect(__time(wedding, "long")).toBe("8:13:50 PM GMT+1");
    expect(__time(wedding, "full")).toBe("8:13:50 PM GMT+1");
  });

  it("accepts custom formats preconfigured when the library was initialized", function() {
    let wedding = new Date(Date.UTC(2013, 11, 18, 19, 13, 50));
    expect(__time(wedding, "hour")).toBe("8 PM");
  });
});

describe("__number", function() {
  it('formats numbers in the current\'s locale way', function() {
    expect(__number(12345678)).toBe("12,345,678");
  });

  it('accepts "scientific", "engineering", "compactLong" and "compactShort" as second argument', function() {
    expect(__number(12345678, "scientific")).toBe("1.235E7");
    expect(__number(12345678, "engineering")).toBe("12.346E6");
    expect(__number(12345678, "compactLong")).toBe("12 million");
    expect(__number(12345678, "compactShort")).toBe("12M");
  });

  it("accepts custom formats preconfigured when the library was initialized", function() {
    expect(__number(12345678, "eur")).toBe("€12,345,678.00");
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
