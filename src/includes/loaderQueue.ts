import { MessagesLoader } from "../types/index";
import {
  hasLocaleDictionary,
  $dictionary,
  addMessages,
} from "../stores/dictionary";
import { getPossibleLocales, getOptions } from "../includes/utils";
import { $isLoading } from "../stores/loading";

type Queue = Set<MessagesLoader>;
const loaderQueue: Record<string, Queue> = {};

export function resetQueues() {
  Object.keys(loaderQueue).forEach((key) => {
    delete loaderQueue[key];
  });
}

function createLocaleQueue(locale: string) {
  loaderQueue[locale] = new Set();
}

function removeLocaleFromQueue(locale: string) {
  delete loaderQueue[locale];
}

function getLocaleQueue(locale: string) {
  return loaderQueue[locale];
}

function getLocalesQueues(locale: string) {
  return getPossibleLocales(locale)
    .reverse()
    .map<[string, MessagesLoader[]]>((localeItem) => {
      const queue = getLocaleQueue(localeItem);
      return [localeItem, queue ? [...queue] : []];
    })
    .filter(([, queue]) => queue.length > 0);
}

export function hasLocaleQueue(locale: string) {
  return getPossibleLocales(locale).reverse().some(getLocaleQueue);
}

const activeLocaleFlushes: { [key: string]: Promise<void> } = {};
export function flush(locale: string) {
  if (!hasLocaleQueue(locale)) return Promise.resolve();
  if (locale in activeLocaleFlushes) return activeLocaleFlushes[locale];

  // get queue of XX-YY and XX locales
  const queues = getLocalesQueues(locale);
  // istanbul ignore if
  if (queues.length === 0) return Promise.resolve();

  const loadingDelay = setTimeout(
    () => $isLoading.set(true),
    getOptions().loadingDelay
  );

  // TODO what happens if some loader fails
  activeLocaleFlushes[locale] = Promise.all(
    queues.map(([locale, queue]) => {
      return Promise.all(queue.map((loader) => loader())).then((partials) => {
        removeLocaleFromQueue(locale);
        partials = partials.map((partial) => partial.default || partial);
        addMessages(locale, ...partials);
      });
    })
  ).then(() => {
    clearTimeout(loadingDelay);
    $isLoading.set(false);
    delete activeLocaleFlushes[locale];
  });

  return activeLocaleFlushes[locale];
}

export function registerLocaleLoader(locale: string, loader: MessagesLoader) {
  if (!getLocaleQueue(locale)) createLocaleQueue(locale);

  const queue = getLocaleQueue(locale);
  // istanbul ignore if
  if (getLocaleQueue(locale).has(loader)) return;

  if (!hasLocaleDictionary(locale)) {
    $dictionary.update((d) => {
      d[locale] = {};
      return d;
    });
  }

  queue.add(loader);
}
