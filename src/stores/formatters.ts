// @ts-ignore
import { derived } from "svelte/store";

import {
  MessageFormatter,
  MessageObject,
  TimeFormatter,
  DateFormatter,
  NumberFormatter,
} from '../types/index'
import { lookup } from '../includes/lookup'
import { hasLocaleQueue } from '../includes/loaderQueue'
import {
  getTimeFormatter,
  getDateFormatter,
  getNumberFormatter,
} from '../includes/formatters'
import { getOptions } from '../configs'

import { $dictionary } from './dictionary'
import { getCurrentLocale, getRelatedLocalesOf, $locale } from './locale'

export const formatMessage: MessageFormatter = (id, options = {id: '#missing-message-id#'}) => {
  if (typeof id === 'object') {
    options = id as MessageObject
    id = options.id
  }
  const { values, locale = getCurrentLocale(), default: defaultValue } = options
  if (locale == null) {
    throw new Error(
      '[svelte-i18n] Cannot format a message without first setting the initial locale.'
    )
  }

  const message = lookup(id, locale)

  if (!message) {
    if (getOptions().warnOnMissingMessages) {
      // istanbul ignore next
      console.warn(
        `[svelte-i18n] The message "${id}" was not found in "${getRelatedLocalesOf(
          locale
        ).join('", "')}".${
          hasLocaleQueue(getCurrentLocale())
            ? `\n\nNote: there are at least one loader still registered to this locale that wasn't executed.`
            : ''
        }`
      )
    }
    return defaultValue || id;
  }


  if (typeof message === 'string') {
    return message;
  } else {
    return message(...Object.keys(options.values || {}).sort().map(k => (options.values || {})[k]));
  }
}

export const formatTime: TimeFormatter = (t, options) =>
  getTimeFormatter(options).format(t)

export const formatDate: DateFormatter = (d, options) =>
  getDateFormatter(options).format(d)

export const formatNumber: NumberFormatter = (n, options) =>
  getNumberFormatter(options).format(n)

export const $format = /*@__PURE__*/derived([$locale, $dictionary], () => formatMessage);
export const $formatTime = /*@__PURE__*/derived([$locale], () => formatTime);
export const $formatDate = /*@__PURE__*/derived([$locale], () => formatDate);
export const $formatNumber = /*@__PURE__*/derived([$locale], () => formatNumber);
