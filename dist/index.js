import { getCurrentLocale } from './stores/locale';
import { getOptions } from './configs';
import { flush } from './includes/loaderQueue';
export function waitLocale(locale) {
    return flush(locale || getCurrentLocale() || getOptions().initialLocale);
}
export { init } from './configs';
export { $locale as locale } from './stores/locale';
export { $dictionary as dictionary, $locales as locales, addMessages, } from './stores/dictionary';
export { registerLocaleLoader as register } from './includes/loaderQueue';
export { $isLoading as isLoading } from './stores/loading';
import { formatTime, formatDate, formatNumber } from './stores/formatters';
export { $format as format, $format as _, $format as t, $formatDate as formatDate, $formatNumber as formatNumber, $formatTime as formatTime, } from './stores/formatters';
// low-level
export { getDateFormatter, getNumberFormatter, getTimeFormatter, } from './includes/formatters';
export function __interpolate(value) {
    return value === 0 ? 0 : value || '';
}
const PLURAL_RULES = Object.create(null);
function getLocalPluralFor(v) {
    let loc = getCurrentLocale();
    let pluralRules = PLURAL_RULES[loc] || (PLURAL_RULES[loc] = new Intl.PluralRules(loc));
    return pluralRules.select(v);
}
export function __plural(value, offsetOrOptions, opts) {
    if (typeof offsetOrOptions === "number") {
        return (opts[value] ||
            opts[getLocalPluralFor(value - offsetOrOptions)] ||
            "");
    }
    else {
        return (offsetOrOptions[value] ||
            offsetOrOptions[getLocalPluralFor(value)] ||
            "");
    }
}
export function __select(value, opts) {
    return opts[value] || opts['other'] || '';
}
export function __number(value, format) {
    return formatNumber(value, { format });
}
export function __date(value, format = "short") {
    return formatDate(value, { format });
}
export function __time(value, format = "short") {
    return formatTime(value, { format });
}
