import {
  __interpolate,
  __plural,
  __offsetPlural,
  __select,
  __date,
  __time,
  __number,
  addMessages,
  locale,
  dictionary,
  locales,
  init,
  format,
  time,
  date,
  number,
  json
} from "../dist/modules";

beforeEach(() => {
  locale.set(undefined);
  dictionary.set({});
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
    locale.set('en-US');
    let pluralizations = {
      z: "no cats",
      o: "one cat",
      t: "a couple cats",
      3: "a triplet of cats",  // a specific translation for 3 that trumps over anything else
      f: "a few cats",
      m: "many cats",
      h: "other cats"
    };
    expect(__plural(0, pluralizations)).toBe('other cats'); // english has no zero pluralization
    expect(__plural(1, pluralizations)).toBe('one cat');
    expect(__plural(2, pluralizations)).toBe('other cats');
    expect(__plural(3, pluralizations)).toBe('a triplet of cats');
    expect(__plural(6, pluralizations)).toBe('other cats');
    expect(__plural(18, pluralizations)).toBe('other cats');
    expect(__plural(200, pluralizations)).toBe('other cats');

    locale.set("ar-EG"); // arabic has a lot of different categories for
    expect(__plural(0, pluralizations)).toBe('no cats');
    expect(__plural(1, pluralizations)).toBe('one cat');
    expect(__plural(2, pluralizations)).toBe('a couple cats');
    expect(__plural(3, pluralizations)).toBe("a triplet of cats");
    expect(__plural(6, pluralizations)).toBe('a few cats');
    expect(__plural(18, pluralizations)).toBe('many cats');
    expect(__plural(200, pluralizations)).toBe('other cats');
  });
});

describe('__offsetPlural', function() {
  it('works respecting the offset and the pluralization rules of the current locale', function() {
    let translation = trainers => __offsetPlural(trainers, 1, {
      0: "The gym is empty",
      1: "You are alone here",
      o: `You and ${trainers - 1} trainer`,
      h: `You and ${trainers - 1} other trainers`
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

describe('locale', function() {
  it('subscribes get notified when its value is updated', () => {
    expect.assertions(2);
    let earlyExit = true;
    let unsubscribe = locale.subscribe(locale => {
      if (earlyExit) return;
      expect(locale).toBe('es-ES');
    });
    let unsubscribe2 = locale.subscribe(locale => {
      if (earlyExit) return;
      expect(locale).toBe('es-ES');
    });
    earlyExit = false;
    locale.set('es-ES');
    unsubscribe();
    unsubscribe2();
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

describe("format", function() {
  it('translates the given messages on the current locale', () => {
    addMessages("en-US", {
      simple: "Hello",
      nested: {
        deep: "Goodbye"
      },
      "nested.fake": "Greetings",
      complex: (a, b) => `This is a function that interpolates ${b} and ${a}`
    });
    let unsubscribe = format.subscribe(t => {
      expect(t("simple")).toBe("Hello");
      expect(t("nested.deep")).toBe("Goodbye");
      expect(t("nested.fake")).toBe("Greetings");
      expect(t("complex", { values: { a: 'HA', b: "BO" } }))
        .toBe("This is a function that interpolates BO and HA");
    });
    unsubscribe()
  });
});

describe("json", function() {
  it('retrieves json segment of messages on the current locale', () => {
    addMessages("en-US", {
      nested: {
        deep: "Goodbye"
      },
    });
    let unsubscribe = json.subscribe(j => {
      expect(j("nested")).toStrictEqual({ deep: "Goodbye" });
    });
    unsubscribe()
  });
});

describe("time", function() {
  let wedding = new Date(Date.UTC(2013, 11, 18, 19, 13, 50));
  it('formats the given time in the current locale with the given style (if any)', () => {
    let unsubscribe = time.subscribe(format => {
      expect(format(wedding)).toBe("8:13 PM");
      expect(format(wedding, { format: "full" })).toBe("8:13:50 PM GMT+1");
    });
    unsubscribe();
  });
});

describe("date", function() {
  let wedding = new Date(Date.UTC(2013, 11, 18, 19, 13, 50));
  it("formats the given date in the current locale with the given style (if any)", () => {
    let unsubscribe = date.subscribe(format => {
      expect(format(wedding)).toBe("12/18/13");
      expect(format(wedding, { format: "full" })).toBe("Wednesday, December 18, 2013");
    });
    unsubscribe();
  });
});

describe("number", function() {
  let num = 123456.789;
  it("formats the given number in the current locale with the given style (if any)", () => {
    number.subscribe(format => {
      expect(format(num)).toBe("123,456.789");
      expect(format(num, { format: "eur" })).toBe("€123,456.79");
    });
  });
});
