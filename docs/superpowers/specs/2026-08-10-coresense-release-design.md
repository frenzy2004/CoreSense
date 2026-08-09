# CoreSense Release Identity Design

## Objective

Publish the existing CoreSense product site as a clean standalone project with a CoreSense-only repository identity, documentation set, GitHub home, and Vercel address.

## Repository Identity

- Preserve the genuine implementation history without padding the commit count.
- Use `CoreSense` as the product and repository name.
- Rename the npm package to `coresense-web`.
- Remove obsolete transition notes and every remaining tracked reference to the former source identity.
- Publish the current branch as `main` in `frenzy2004/CoreSense`.

## README

The root README will present the product first and cover:

- the heat-safety problem and CoreSense operating loop;
- the worker band, edge decision logic, supervisor workflow, and evidence boundary;
- the media-rich product experience and embedded Markdown library;
- the technology stack, local development commands, validation commands, and project structure;
- the live Vercel deployment and the distinction between prototype evidence and field claims.

## Deployment Identity

Rename the existing Vercel project to the shortest available CoreSense slug, preferring `coresense`. Preserve the current deployment configuration and verify that the new production alias serves the same tested build.

## Validation

- `rg` finds no legacy-name references in tracked text at `HEAD`.
- `npm run lint`, `npm test`, and `npm run vercel-build` pass.
- GitHub shows the genuine history on `main` with the new README.
- The new Vercel alias returns the CoreSense page, media, and document viewer without browser errors.

