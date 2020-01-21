<<<<<<< HEAD
import { GetClientLocaleOptions } from "../types/index";
=======
>>>>>>> 4d385aa... Make locale detection less monolithic
export declare function capital(str: string): string;
export declare function title(str: string): string;
export declare function upper(str: string): string;
export declare function lower(str: string): string;
<<<<<<< HEAD
export declare const hostnameLocale: (regex: any) => string;
export declare const pathnameLocale: (regex: any) => string;
export declare const navigatorLocale: () => string;
export declare const searchLocale: (regex: any) => string;
export declare const hashLocale: (regex: any) => string;
export declare const getClientLocale: ({ navigator, hash, search, pathname, hostname }: GetClientLocaleOptions) => string;
=======
export declare const hostnameLocale: () => (regex: any) => string;
export declare const pathnameLocale: () => (regex: any) => string;
export declare const navigatorLocale: () => () => string;
export declare const searchLocale: () => (regex: any) => string;
export declare const hashLocale: () => (regex: any) => string;
export declare const getClientLocale: (strategies: any) => any;
>>>>>>> 4d385aa... Make locale detection less monolithic
