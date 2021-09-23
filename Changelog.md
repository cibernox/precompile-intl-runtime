## 0.4.7
- Fix typescript types
## 0.4.6
- [FEATURE] Add `$json` store to access the raw translations object. This feature was added to svelte-intl after the API
  of this library copied it, so this brings it to parity.
## 0.4.5
- [FEATURE] Allow to define keys as nested objects (e.g. `{ dinner: { main: { food: 'pizza' } } }`) beside of the
  traditional dot-namespaced flat object (e.g. `{ 'dinner.main.food': 'pizza' }`)