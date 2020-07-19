declare type MemoizedFunction = <F extends Function>(fn: F) => F;
declare const monadicMemoize: MemoizedFunction;
export { monadicMemoize };
