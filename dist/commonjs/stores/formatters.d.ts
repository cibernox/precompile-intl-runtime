import { MessageFormatter, TimeFormatter, DateFormatter, NumberFormatter } from '../types/index';
export declare const formatMessage: MessageFormatter;
export declare const formatTime: TimeFormatter;
export declare const formatDate: DateFormatter;
export declare const formatNumber: NumberFormatter;
export declare const $format: import("svelte/store").Readable<MessageFormatter>;
export declare const $formatTime: import("svelte/store").Readable<TimeFormatter>;
export declare const $formatDate: import("svelte/store").Readable<DateFormatter>;
export declare const $formatNumber: import("svelte/store").Readable<NumberFormatter>;
