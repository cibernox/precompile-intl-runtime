import { ConfigureOptions } from './types/index'
import { $locale } from './stores/locale';
import { getOptions } from './includes/utils';

export function init(opts: ConfigureOptions) {
  const { formats, ...rest } = opts
  const initialLocale = opts.initialLocale || opts.fallbackLocale;
  const options = getOptions();
  Object.assign(options, rest, { initialLocale })

  if (formats) {
    if ('number' in formats) {
      Object.assign(options.formats.number, formats.number)
    }
    if ('date' in formats) {
      Object.assign(options.formats.date, formats.date)
    }
    if ('time' in formats) {
      Object.assign(options.formats.time, formats.time)
    }
    if ('dateTime' in formats) {
      Object.assign(options.formats.dateTime, formats.dateTime)
    }
  }

  return $locale.set(initialLocale)
}
