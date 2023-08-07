import { MessagesLoader } from '../types/index.js';
export declare function resetQueues(): void;
export declare function hasLocaleQueue(locale: string): boolean;
export declare function flush(locale: string): Promise<void>;
export declare function registerLocaleLoader(locale: string, loader: MessagesLoader): void;
