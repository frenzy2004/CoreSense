# Contributing to CoreSense

CoreSense combines a public product experience with engineering and evidence documentation. Contributions should preserve both the quality of the interface and the limits of the underlying prototype.

## Development Workflow

1. Create a focused branch from `main`.
2. Install dependencies with `npm ci`.
3. Make one coherent change at a time.
4. Update tests when visible content, media, document coverage, or product behavior changes.
5. Run the full verification suite before opening a pull request.

```bash
npm run lint
npm test
npm run vercel-build
```

## Product Claims

- Describe CoreSense as safety decision support, not a medical device.
- Keep uncertainty and fallback behavior visible.
- Do not claim clinical accuracy, field effectiveness, certification, durability, or battery performance without supporting evidence.
- Update the relevant file in `public/docs` when a technical or operational claim changes.
- Keep worker action, supervisor response, and the reviewable record aligned across the interface.

## Frontend Changes

- Preserve responsive behavior at mobile and desktop widths.
- Use local media from `public/coresense` for product and scenario visuals.
- Keep video muted and accessible when it autoplays.
- Respect reduced-motion preferences.
- Avoid control overlays or decorative elements that obscure the source media.

## Documentation Changes

Markdown files intended for the in-site reader live in `public/docs`. Add new documents to `app/docs-manifest.ts` and extend the rendered-output tests so the manifest and shipped files cannot drift apart.

## Commit Quality

Use concise, imperative commit messages. Each commit should represent a real reviewable change; avoid empty commits, generated noise, and unrelated file churn.
