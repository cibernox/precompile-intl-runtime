import { GetClientLocaleOptions } from '../types/index';
export declare function capital(str: string): string;
export declare function title(str: string): string;
export declare function upper(str: string): string;
export declare function lower(str: string): string;
export declare const flatObj: (obj: Record<string, any>, prefix?: string) => Record<string, string>;
export declare const getClientLocale: ({ navigator, hash, search, pathname, hostname, }: GetClientLocaleOptions) => any;
