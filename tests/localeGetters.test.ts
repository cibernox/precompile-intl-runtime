import {getLocaleFromAcceptLanguageHeader} from "../src/index";
import { describe, it, expect } from "@jest/globals";

describe('getLocaleFromAcceptLanguageHeader', () => {
  it.each([
    {header: 'en-GB,en;q=0.9,es-ES;q=0.8', availableLocales: undefined, expected: 'en-GB'},
    {header: 'en-GB,en;q=0.9,es-ES;q=0.8', availableLocales: [], expected: 'en-GB'},
    {header: 'en-GB,en;q=0.9,es-ES;q=0.8', availableLocales: ['es-ES', 'en-us'], expected: 'en-us'},
    {header: 'en-GB,en;q=0.9,es-ES;q=0.8', availableLocales: ['es', 'en-us'], expected: 'en-us'},
    {header: 'en-GB,en;q=0.9,es-ES;q=0.8', availableLocales: ['es', 'de'], expected: 'es'},
    {header: 'en-GB,en;q=0.9,es-ES;q=0.8,de;q=0.6', availableLocales: ['es', 'de'], expected: 'es'},
    {header: 'fr,fr-CA;q=0.9,en;q=0.8', availableLocales: ['fr-FR', 'en'], expected: 'fr-FR'},
    {header: 'fr,fr-CA;q=0.9,en;q=0.8', availableLocales: ['fr-FR', 'fr-CA'], expected: 'fr-CA'},
    {header: 'fr;q=0.9,en;q=0.8', availableLocales: ['fr-FR', 'fr-CA'], expected: 'fr-FR'},
    {header: 'fr;q=0.9,en-US;q=0.8', availableLocales: ['fr-FR', 'en-US'], expected: 'fr-FR'},
    {header: 'en-GB,en;q=0.9,es-ES;q=0.8,en-US;q=0.6', availableLocales: ['de'], expected: undefined},
    {header: null, availableLocales: ['en-US'], expected: undefined},
    {header: '', availableLocales: ['en-US'], expected: undefined},
  ])('header: $header; availableLocales: $availableLocales', ({header, availableLocales, expected}) => {
    const result = getLocaleFromAcceptLanguageHeader(header, availableLocales);
    expect(result).toEqual(expected);
  });
});
