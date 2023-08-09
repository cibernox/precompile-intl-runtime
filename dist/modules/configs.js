import { $locale } from './stores/locale.js';
import { getOptions } from './includes/utils.js';
export function init(opts) {
    const { formats, ...rest } = opts;
    const initialLocale = opts.initialLocale || opts.fallbackLocale;
    const options = getOptions();
    Object.assign(options, rest, { initialLocale });
    if (formats) {
        if ('number' in formats) {
            Object.assign(options.formats.number, formats.number);
        }
        if ('date' in formats) {
            Object.assign(options.formats.date, formats.date);
        }
        if ('time' in formats) {
            Object.assign(options.formats.time, formats.time);
        }
    }
    return $locale.set(initialLocale);
}
