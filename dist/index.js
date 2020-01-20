import { init } from "./config";
import { currentLocale, dictionary, locales, getCurrentLocale } from "./stores";
import { getNumberFormatter, getDateFormatter, getTimeFormatter, formatTime, formatDate, formatNumber, formatMessage } from "./formatters";
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
export function addMessages(locale, messages) {
    dictionary.update(value => {
        value[locale] = Object.assign(value[locale] || {}, messages);
        return value;
    });
}
export { init, currentLocale, dictionary, locales, getNumberFormatter, getDateFormatter, getTimeFormatter, formatMessage, formatTime, formatDate, formatNumber };
