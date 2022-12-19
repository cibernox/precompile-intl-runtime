import { ConfigureOptions } from "./types/index";
import { $locale } from "./stores/locale";
import { getOptions } from "./includes/utils";

export function init(opts: ConfigureOptions) {
  const { ...rest } = opts;
  const initialLocale = opts.initialLocale || opts.fallbackLocale;
  const options = getOptions();
  Object.assign(options, rest, { initialLocale });

  return $locale.set(initialLocale);
}
