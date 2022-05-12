// @ts-ignore
import { writable, derived } from 'svelte/store';
import { LocaleDictionary, LocaleDictionaryValue, DeepDictionary, Dictionary }
  from '../types/index';
import { getPossibleLocales } from '../includes/utils';
import { delve } from '../shared/delve';

let dictionary: Dictionary
const $dictionary = writable<Dictionary>({})

export function getLocaleDictionary(locale: string) {
  return (dictionary[locale] as LocaleDictionary) || null
}

export function getDictionary() {
  return dictionary
}

export function hasLocaleDictionary(locale: string) {
  return locale in dictionary
}


export function getMessageFromDictionary(locale: string, id: string) {
  if (!hasLocaleDictionary(locale)) {
    return null;
  }

  const localeDictionary = getLocaleDictionary(locale);

  const match = delve(localeDictionary, id);

  return match;
}


export function getClosestAvailableLocale(refLocale: string): string | null {
  if (refLocale == null) return null;

  const relatedLocales = getPossibleLocales(refLocale);

  for (let i = 0; i < relatedLocales.length; i++) {
    const locale = relatedLocales[i];

    if (hasLocaleDictionary(locale)) {
      return locale;
    }
  }

  return null;
}


export function addMessages(locale: string, ...partials: DeepDictionary[]) {
  $dictionary.update(d => {
    d[locale] = Object.assign(d[locale] || {}, ...partials)
    return d
  })
}

const $locales = /*@__PURE__*/derived([$dictionary], ([$dictionary]) =>
  Object.keys($dictionary)
);
$dictionary.subscribe(newDictionary => (dictionary = newDictionary))

export { $dictionary, $locales }
