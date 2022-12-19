import { MemoizedIntlFormatter } from "../types/index";
import { getCurrentLocale } from "./utils";
import { monadicMemoize } from "./memoize";

const defaultNumber: Record<string, Intl.NumberFormatOptions> = {
  scientific: { notation: "scientific" },
  engineering: { notation: "engineering" },
  compactLong: { notation: "compact", compactDisplay: "long" },
  compactShort: { notation: "compact", compactDisplay: "short" },
};

const defaultDate: Record<string, Intl.DateTimeFormatOptions> = {
  short: { month: "numeric", day: "numeric", year: "2-digit" },
  medium: { month: "short", day: "numeric", year: "numeric" },
  long: { month: "long", day: "numeric", year: "numeric" },
  full: { weekday: "long", month: "long", day: "numeric", year: "numeric" },
};

const defaultTime: Record<string, Intl.DateTimeFormatOptions> = {
  short: { hour: "numeric", minute: "numeric" },
  medium: { hour: "numeric", minute: "numeric", second: "numeric" },
  long: {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  },
  full: {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  },
};

export const setCustomNumberFormat = (
  f: Record<string, Intl.NumberFormatOptions>
) => {
  customNumber = f;
};

export const setCustomDateFormat = (
  f: Record<string, Intl.DateTimeFormatOptions>
) => {
  customDate = f;
};

export const setCustomTimeFormat = (
  f: Record<string, Intl.DateTimeFormatOptions>
) => {
  customTime = f;
};

let customNumber: Record<string, Intl.NumberFormatOptions> = {};
let customDate: Record<string, Intl.DateTimeFormatOptions> = {};
let customTime: Record<string, Intl.DateTimeFormatOptions> = {};

export const getNumberFormatter: MemoizedIntlFormatter<
  Intl.NumberFormat,
  Intl.NumberFormatOptions
> = monadicMemoize(({ locale, format, ...options } = {}) => {
  locale = locale || getCurrentLocale();
  if (locale == null) {
    throw new Error(
      '[precompile-intl-runtime] A "locale" must be set to format numbers'
    );
  }

  if (typeof format === "string") {
    return new Intl.NumberFormat(
      locale,
      Object.assign({}, defaultNumber, customNumber)[format]
    );
  } else {
    return new Intl.NumberFormat(locale, options);
  }
});

export const getDateFormatter: MemoizedIntlFormatter<
  Intl.DateTimeFormat,
  Intl.DateTimeFormatOptions
> = monadicMemoize(({ locale, format, ...options } = {}) => {
  locale = locale || getCurrentLocale();
  if (locale == null) {
    throw new Error(
      '[precompile-intl-runtime] A "locale" must be set to format dates'
    );
  }

  const formats = Object.assign({}, defaultDate, customDate);

  if (format) {
    options = formats[format];
  } else if (Object.keys(options).length === 0) {
    options = formats["short"];
  }

  return new Intl.DateTimeFormat(locale, options);
});

export const getTimeFormatter: MemoizedIntlFormatter<
  Intl.DateTimeFormat,
  Intl.DateTimeFormatOptions
> = monadicMemoize(({ locale, format, ...options } = {}) => {
  locale = locale || getCurrentLocale();
  if (locale == null) {
    throw new Error(
      '[precompile-intl-runtime] A "locale" must be set to format time values'
    );
  }

  const formats = Object.assign({}, defaultTime, customTime);

  if (format) {
    options = formats[format];
  } else if (Object.keys(options).length === 0) {
    options = formats["short"];
  }

  return new Intl.DateTimeFormat(locale, options);
});
