# Header Navigation Removal Design

## Goal

Remove the navigation controls highlighted by the user while retaining the black header and linked viAct logo.

## Scope

- Remove the six desktop navigation labels and their dropdown menus.
- Remove the header `Schedule Demo` button.
- Remove the mobile navigation toggle, mobile menu, and its `Schedule Demo` button.
- Keep the viAct logo and its home link.
- Keep all page content and calls to action outside the header unchanged.

## Implementation

Delete the shared navigation data and header navigation markup instead of hiding controls with CSS. Remove the now-unused mobile state and navigation styles. Simplify the header layout so the logo remains aligned within the existing 96px black bar on all breakpoints.

## Verification

- Add a regression check that the header navigation and header demo control are absent.
- Run the full test, production build, and lint commands.
- Verify desktop and mobile browser widths show only the logo in the header.
- Deploy to the existing Vercel production alias and repeat the browser check there.
