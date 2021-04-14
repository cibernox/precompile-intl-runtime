import { GetClientLocaleOptions } from "../types/index";
interface Formats {
    number: Record<string, any>;
    date: Record<string, any>;
    time: Record<string, any>;
}
interface Options {
    fallbackLocale: string;
    initialLocale: string;
    formats: Formats;
    loadingDelay: number;
    warnOnMissingMessages: boolean;
}
export declare const defaultFormats: Formats;
export declare function getCurrentLocale(): string;
export declare function setCurrentLocale(val: string): string;
export declare function getOptions(): Options;
export declare function capital(str: string): string;
export declare function title(str: string): string;
export declare function upper(str: string): string;
export declare function lower(str: string): string;
export declare function getFallbackOf(locale: string): string | null;
export declare function getRelatedLocalesOf(locale: string): string[];
export declare const hostnameLocale: (regex: RegExp) => string | null;
export declare const pathnameLocale: (regex: RegExp) => string | null;
export declare const navigatorLocale: () => string;
export declare const searchLocale: (str: string) => string | null | undefined;
export declare const hashLocale: (str: string) => string | null | undefined;
export declare const getClientLocale: ({ navigator, hash, search, pathname, hostname }: GetClientLocaleOptions) => string | null;
export {};
