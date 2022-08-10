import { MessageFormatter, TimeFormatter, DateFormatter, NumberFormatter, JsonGetter } from '../types/index';
export declare const formatMessage: MessageFormatter;
export declare const getJSON: JsonGetter;
export declare const formatTime: TimeFormatter;
export declare const formatDate: DateFormatter;
export declare const formatNumber: NumberFormatter;
export declare const $format: import("svelte/store").Readable<(id: string | import("../types/index").MessageObjectWithId, options?: import("../types/index").MessageObject | undefined) => string>;
export declare const $formatTime: import("svelte/store").Readable<(d: number | Date, options?: (Intl.DateTimeFormatOptions & {
    format?: string | undefined;
    locale?: string | undefined;
}) | undefined) => string>;
export declare const $formatDate: import("svelte/store").Readable<(d: number | Date, options?: (Intl.DateTimeFormatOptions & {
    format?: string | undefined;
    locale?: string | undefined;
}) | undefined) => string>;
export declare const $formatNumber: import("svelte/store").Readable<(d: number, options?: (Intl.NumberFormatOptions & {
    format?: string | undefined;
    locale?: string | undefined;
}) | undefined) => string>;
export declare const $getJSON: import("svelte/store").Readable<JsonGetter>;
