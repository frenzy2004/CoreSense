# Header Navigation Removal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Leave only the linked viAct logo in the existing black header on desktop and mobile.

**Architecture:** Remove the shared navigation data, desktop and mobile navigation markup, mobile menu state, and their dedicated CSS. Preserve the header container and brand link, then simplify its grid so the logo remains aligned without empty navigation columns.

**Tech Stack:** React 19, TypeScript, CSS, Node test runner, Vite, Vercel

## Global Constraints

- Keep the black 96px header and linked viAct logo.
- Remove desktop navigation, dropdowns, the header `Schedule Demo` button, mobile toggle, and mobile menu.
- Keep all page content and calls to action outside the header unchanged.
- Add no dependencies.

---

### Task 1: Remove Header Navigation Controls

**Files:**
- Modify: `tests/rendered-html.test.mjs`
- Modify: `app/SmartWatchClone.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `SmartWatchClone()` and the existing `.topbar`/`.brand` CSS contract.
- Produces: A header whose only interactive child is `<a className="brand">`.

- [ ] **Step 1: Write the failing regression test**

Add this test to `tests/rendered-html.test.mjs`:

```js
test("keeps only the viAct brand link in the header", () => {
  assert.doesNotMatch(source, /aria-label="Main navigation"/);
  assert.doesNotMatch(source, />Schedule Demo</);
  assert.doesNotMatch(source, /aria-label="Toggle navigation"/);
});
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `node --test tests/rendered-html.test.mjs`

Expected: FAIL because the current component still renders `Main navigation`, `Schedule Demo`, and `Toggle navigation`.

- [ ] **Step 3: Implement the source removal**

In `app/SmartWatchClone.tsx`:

- Delete `navMenus` and header-only `hrefFor`/`linkMap` entries that have no remaining consumer.
- Remove `mobileOpen` state.
- Keep the `.brand` anchor inside `.topbar`.
- Delete `.desktop-nav`, the header `Schedule Demo` button, `.mobile-toggle`, and conditional `.mobile-menu` markup.
- Do not change buttons or links outside the header.

In `app/globals.css`:

- Change `.topbar` to a single-column grid.
- Remove `.desktop-nav`, `.nav-item`, `.mega-menu`, `.mobile-toggle`, and `.mobile-menu` rules, including responsive overrides.
- Keep `.topbar`, `.brand`, and the existing 96px height.

- [ ] **Step 4: Run the focused test and verify GREEN**

Run: `node --test tests/rendered-html.test.mjs`

Expected: PASS with all header-removal assertions satisfied.

- [ ] **Step 5: Run full static verification**

Run:

```bash
npm test
npm run vercel-build
npm run lint
git diff --check
```

Expected: all tests and builds exit 0; lint has no errors.

- [ ] **Step 6: Verify browser behavior**

Start the local Vite site and verify both desktop and mobile widths:

- `.topbar .brand` count is `1`.
- `.desktop-nav`, `.mobile-toggle`, `.mobile-menu`, and `.topbar > .button` counts are `0`.
- No framework error overlay or console error is present.

- [ ] **Step 7: Deploy and verify production**

Run: `npx vercel@latest --prod --yes`

Verify the existing alias returns HTTP 200 and repeat the browser assertions against `https://https-www-viact-ai-iot-smart.vercel.app/`.

- [ ] **Step 8: Commit**

```bash
git add app/SmartWatchClone.tsx app/globals.css tests/rendered-html.test.mjs
git commit -m "Remove header navigation controls"
```
