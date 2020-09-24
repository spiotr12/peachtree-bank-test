## Run

Run as normal angular app `npm run start`

## Test

Test as normal angular app `npm run test`

## Structure

TODO

## Notes

1. `@angular/material`
    - Used only for Confirmation Dialog
    - Not used for anything else as the requirement was not to use css frameworks. Obviously `@angular/material` 
    is not a css framework, but it comes with many tools that when used would brake that rule.
1. Confirmation Dialog
    - MatDialog was used as the requirements had not specified if this should be a page or dialog (no mocks)
1. `scripts/` directory
    - `scripts/` directory contains helpful utils created by myself used for generating and merging i18n 
    translations. Please do not copy those.
