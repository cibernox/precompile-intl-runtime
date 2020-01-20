declare type IntlFormatterOptions<T> = T & {
    format?: string;
    locale?: string;
};
interface MemoizedIntlFormatter<T, U> {
    (options?: IntlFormatterOptions<U>): T;
}
interface FormatMessageOpts {
    values?: Record<string | number, any>;
}
export declare const getNumberFormatter: MemoizedIntlFormatter<Intl.NumberFormat, Intl.NumberFormatOptions>;
export declare const getDateFormatter: MemoizedIntlFormatter<Intl.DateTimeFormat, Intl.DateTimeFormatOptions>;
export declare const getTimeFormatter: MemoizedIntlFormatter<Intl.DateTimeFormat, Intl.DateTimeFormatOptions>;
export declare const formatTime: (t: Date, options: Record<string, any>) => string;
export declare const formatDate: (d: Date, options: Record<string, any>) => string;
export declare const formatNumber: (n: number, options: Record<string, any>) => string;
export declare const formatMessage: (id: string, options?: FormatMessageOpts) => string;
export {};
