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
export declare function getPossibleLocales(refLocale: string, fallbackLocale?: string): string[];
export {};
