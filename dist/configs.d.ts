import { ConfigureOptions } from './types/index';
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
export declare const defaultOptions: Options;
export declare function getOptions(): Options;
export declare function init(opts: ConfigureOptions): void;
export {};
