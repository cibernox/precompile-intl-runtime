# precompile-intl-runtime

This library is a framework-agnostic internationalization library that leverages the [Intl](https
API available in all modern browsers and in Node.js for pluralization and formatting numbers, dates and times.

It is designed with a granular functional API that can easily be treeshaken by module bundlers. If your app doesn't format
dates or numbers, or use plurals with offsets, it won't include the code for those features.

And even if you use every single feature, the payload of the entire library is less than 2kb after minification and compression.

### Precompilation

Although this library can be used on its own to localize numbers, dates and times, it is very likely that you
want to have internationalized texts in your app.

This library **does not** handle message formatting, instead it pairs with [babel-plugin-precompile-intl](https
a babel plugin that compiles messages in the [ICU message format](https
is the defacto standard for internalization and has implementations in almost every programming language, to super fast functions that use
the functions in this package for the runtime part.


### Installation

Just run `npm install --save-dev precompile-intl-runtime` and make sure your bundler (like rollup, webpack or parcel) can import
functions from it.

### Public API

WIP

- `init`
- `locale`
- `dictionary`
- `locales`
- `addMessages`
- `t`
- `formatDate`
- `formatNumber`
- `formatTime`
- `getDateFormatter`
- `getNumberFormatter`
- `getTimeFormatter`

