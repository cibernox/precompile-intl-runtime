export declare const getLocaleFromHostname: (hostname: RegExp) => string | null;
export declare const getLocaleFromPathname: (pathname: RegExp) => string | null;
export declare const getLocaleFromNavigator: (ssrDefault?: string | undefined) => string | null;
export declare const getLocaleFromQueryString: (search: string) => string | null;
export declare const getLocaleFromHash: (hash: string) => string | null;
