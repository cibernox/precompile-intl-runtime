declare type MemoizedFunction = <F extends any>(fn: F) => F;
declare const monadicMemoize: MemoizedFunction;
export { monadicMemoize };
