import {getLocaleFromAcceptLanguageHeader} from "../dist/modules";

describe('getLocaleFromAcceptLanguageHeader', () => {
  it.each([
    {header: 'en-GB,en;q=0.9,es-ES;q=0.8,en-US;q=0.6', availableLocales: undefined, expected: 'en-GB'},
    {header: 'en-GB,en;q=0.9,es-ES;q=0.8,en-US;q=0.6', availableLocales: [], expected: 'en-GB'},
    {header: 'en-GB,en;q=0.9,es-ES;q=0.8,en-US;q=0.6', availableLocales: ['es-ES', 'en-us'], expected: 'es-ES'},
    {header: 'en-GB,en;q=0.9,es-ES;q=0.8,en-US;q=0.6', availableLocales: ['es', 'en-us'], expected: 'en-us'},
    {header: 'en-GB,en;q=0.9,es-ES;q=0.8,en-US;q=0.6', availableLocales: ['es', 'de'], expected: 'es'},
    {header: 'en-GB,en;q=0.9,es-ES;q=0.8,en-US;q=0.6', availableLocales: ['de'], expected: undefined},
    {header: null, availableLocales: ['en-US'], expected: undefined},
    {header: '', availableLocales: ['en-US'], expected: undefined},
  ])('header: $header; availableLocales: $availableLocales', ({header, availableLocales, expected}) => {
    const result = getLocaleFromAcceptLanguageHeader(header, availableLocales);
    expect(result?.toLowerCase()).toEqual(expected?.toLowerCase());
  });
});
