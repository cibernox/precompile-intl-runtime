import { MemoizedIntlFormatter } from "../types/index";
import { getOptions, getCurrentLocale } from "./utils";
import { monadicMemoize } from "./memoize";

const getIntlFormatterOptions = (
  type: "time" | "number" | "date",
  name: string
): any => {
  const { formats } = getOptions();
  if (type in formats && name in formats[type]) {
    return formats[type][name];
  }

  throw new Error(
    `[precompile-intl-runtime] Unknown "${name}" ${type} format.`
  );
};

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
      getIntlFormatterOptions("number", format)
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

  if (format) {
    options = getIntlFormatterOptions("date", format);
  } else if (Object.keys(options).length === 0) {
    options = getIntlFormatterOptions("date", "short");
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

  if (format) {
    options = getIntlFormatterOptions("time", format);
  } else if (Object.keys(options).length === 0) {
    options = getIntlFormatterOptions("time", "short");
  }

  return new Intl.DateTimeFormat(locale, options);
});
