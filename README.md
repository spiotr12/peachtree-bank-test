## Run

Run as normal angular app `npm run start`

To get localized version run `npm run serve-[pl | en]`

## Build

Build as normal angular app `npm run start`

To get localized version run `npm run build-[pl | en]`

## Test

Test as normal angular app `npm run test`

## Structure

```
src/
  assets/           - all graphis
  i18n/             - translations
  styles/           - styles
  app/              - app
    +state/         - redux files
    components/     - generic components
    models/         - enums | interfaces
    pipes/          - global pipes
    services/       - global services
    test-page/      - main code for this test app | lazy loaded module 
                      - includes partial components
                      - includes confirmation dialog
    validators/     - form validators
```

## Notes

1. Responsiveness
    - App is responsive but minimum supported (and recommended) resolution is 1024 x 720
1. Redux / `@ngrx/store`
    - Used to keep state and helps on mocking the backend (sorting and adding transactions)
1. `@angular/material`
    - Used only for Confirmation Dialog
    - Not used for anything else as the requirement was not to use css frameworks. Obviously `@angular/material` 
    is not a css framework, but it comes with many tools that when used would brake that rule.
1. Confirmation Dialog
    - MatDialog was used as the requirements had not specified if this should be a page or dialog (no mocks)
1. `scripts/` directory
    - `scripts/` directory contains helpful utils created by myself (for other project used for generating and 
    merging i18n translations. Please do not copy those.
1. Test coverage score 100%
