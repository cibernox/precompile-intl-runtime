import { __plural, __select } from "../src";

describe('__plural', function() {
  it("works", () => {
    expect(__plural(0, { 0: 'cats', 1: 'cat', other: 'cats' })).toBe('cats');
    expect(__plural(1, { 0: 'cats', 1: 'cat', other: 'cats' })).toBe('cat');
    expect(__plural(2, { 0: 'cats', 1: 'cat', other: 'cats' })).toBe('cats');
  });
});

describe('__select', function() {
  it("works", () => {
    expect(__select('male', { male: 'He', female: 'She', other: 'They' })).toBe('He');
    expect(__select('female', { male: 'He', female: 'She', other: 'They' })).toBe('She');
    expect(__select('animal', { male: 'He', female: 'She', other: 'They' })).toBe('They');
  });
});
