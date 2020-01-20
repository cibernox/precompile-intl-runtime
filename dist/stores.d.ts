declare class WritableStore<T> {
    _value: T;
    _subscribers: ((T: any) => void)[];
    constructor(v: any);
    subscribe(fn: (value: T) => void): () => ((T: any) => void)[];
    set(v: T): void;
    update(cb: (value: T) => T): void;
}
export declare type LocaleDictionary = Record<string, string>;
export declare const currentLocale: WritableStore<string>;
export declare const dictionary: WritableStore<Record<string, Record<string, string>>>;
export declare const locales: WritableStore<string[]>;
export declare function getCurrentLocale(): string;
export {};
