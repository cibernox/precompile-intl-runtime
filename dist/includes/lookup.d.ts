import { LocaleDictionaryValue } from '../types/index';
export declare const lookupCache: Record<string, Record<string, LocaleDictionaryValue>>;
export declare const lookup: (path: string, locale: string) => LocaleDictionaryValue;
