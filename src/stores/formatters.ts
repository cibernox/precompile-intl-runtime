import { derived } from "svelte/store";
import {
  TimeFormatter,
  DateFormatter,
  NumberFormatter,
  JsonGetter,
  TypedFormat,
} from "../types/index";
import { lookup } from "../includes/lookup";
import {
  getTimeFormatter,
  getDateFormatter,
  getNumberFormatter,
} from "../includes/formatters";
import { getCurrentLocale } from "../includes/utils";
import { $dictionary } from "./dictionary";
import { $locale } from "./locale";

export const formatMessage = (
  locale: string,
  id: string,
  values: Record<string, any> = {}
) => {
  let message = lookup(id, locale);

  if (typeof message === "string") {
    return message;
  }
  if (typeof message === "function") {
    return message(
      ...Object.keys(values || {})
        .sort()
        .map((k) => values[k])
    );
  }

  return id;
};

export const getJSON: JsonGetter = (id, locale) => {
  locale = locale || getCurrentLocale();
  return lookup(id, locale) || id;
};

export const formatTime: TimeFormatter = (currentLocale, t, options) => {
  const locale = currentLocale || getCurrentLocale();
  return getTimeFormatter({ locale, ...options }).format(t);
};

export const formatDate: DateFormatter = (currentLocale, d, options) => {
  const locale = currentLocale || getCurrentLocale();
  return getDateFormatter({ locale, ...options }).format(d);
};

export const formatNumber: NumberFormatter = (currentLocale, n, options) => {
  const locale = currentLocale || getCurrentLocale();
  return getNumberFormatter({ locale, ...options }).format(n);
};

export const $format: TypedFormat = /*@__PURE__*/ derived(
  [$locale, $dictionary],
  ([currentLocale]) => formatMessage.bind(null, currentLocale)
);
export const $formatTime = /*@__PURE__*/ derived([$locale], ([currentLocale]) =>
  formatTime.bind(null, currentLocale)
);
export const $formatDate = /*@__PURE__*/ derived([$locale], ([currentLocale]) =>
  formatDate.bind(null, currentLocale)
);
export const $formatNumber = /*@__PURE__*/ derived(
  [$locale],
  ([currentLocale]) => formatNumber.bind(null, currentLocale)
);
export const $getJSON = /*@__PURE__*/ derived(
  [$locale, $dictionary],
  () => getJSON
);
