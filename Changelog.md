## next
## 0.8.0
- Ensure that `$date`, `$time` and `$number` react to language changes by returning a new function every time the locale changes.

## 0.7.0
- Updated logic of `getLocaleFromAcceptLanguageHeader` to return a "sibling" regional variant before moving to the next base language.
  E.g. `fr,fr-CA;q=0.9,en;q=0.8` when the available locales are `fr-FR`, `en` will return `fr-FR` because it's a "sibling" variant of `fr-CA`.
## 0.6.0
- No changes since 0.6.0-beta.0
## 0.6.0-beta.0
- Add `getLocaleFromAcceptLanguageHeader` for server side locale detection
- Support number skeletons. Support might not be complete.
## 0.5.1
- Fix bug in 0.5.0.
## 0.5.0
- Ensure that `formatMessage` reacts to language changes by returning a new function every time the locale changes.
## 0.4.14
- Make some types more strict
## 0.4.11
- Update to latest version of typescript and babel-typescript.
## 0.4.10
- Export method (not a store) to generate a translation. Should almost never be used in the wild, as
  it won't be reactive.
## 0.4.7
- Fix typescript types
## 0.4.6
- [FEATURE] Add `$json` store to access the raw translations object. This feature was added to svelte-intl after the API
  of this library copied it, so this brings it to parity.
## 0.4.5
- [FEATURE] Allow to define keys as nested objects (e.g. `{ dinner: { main: { food: 'pizza' } } }`) beside of the
  traditional dot-namespaced flat object (e.g. `{ 'dinner.main.food': 'pizza' }`)
