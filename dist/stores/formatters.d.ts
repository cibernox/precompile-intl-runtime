import { MessageFormatter, TimeFormatter, DateFormatter, NumberFormatter } from '../types/index';
export declare const formatMessage: MessageFormatter;
export declare const formatTime: TimeFormatter;
export declare const formatDate: DateFormatter;
export declare const formatNumber: NumberFormatter;
export declare const $format: import("./store").Readable<MessageFormatter>;
export declare const $formatTime: import("./store").Readable<TimeFormatter>;
export declare const $formatDate: import("./store").Readable<DateFormatter>;
export declare const $formatNumber: import("./store").Readable<NumberFormatter>;
