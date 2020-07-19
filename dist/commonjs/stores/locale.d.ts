declare const $locale: import("svelte/store").Writable<any>;
export declare function isFallbackLocaleOf(localeA: string, localeB: string): boolean;
export declare function isRelatedLocale(localeA: string, localeB: string): boolean;
export declare function getFallbackOf(locale: string): string;
export declare function getRelatedLocalesOf(locale: string): string[];
export declare function getCurrentLocale(): string;
export { $locale };
