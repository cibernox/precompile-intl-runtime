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
interface GetClientLocaleOptions {
    navigator?: boolean;
    hash?: string;
    search?: string;
    pathname?: RegExp;
    hostname?: RegExp;
}
interface ConfigureOptions {
    fallbackLocale: string;
    initialLocale?: string | GetClientLocaleOptions;
    formats?: Partial<Formats>;
    loadingDelay?: number;
}
export declare function init(opts: ConfigureOptions): void;
export declare function getOptions(): Options;
export {};
