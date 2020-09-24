# Extracting localization from code

Because `ng xi18n` always override `messages.xlf` file any custom translations need to be added in `custom.xlf`

1. `npm run _extract-i18n-from-code` will extract strings from build in each language
1. add any translations to `custom.xlf` file
1. `npm run _merge-xlf` will merge `custom.xlf` with `messages.xlf`
