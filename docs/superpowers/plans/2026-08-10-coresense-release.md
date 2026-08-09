# CoreSense Release Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish CoreSense with a clean repository identity, polished README, genuine Git history, GitHub `main` branch, and CoreSense Vercel URL.

**Architecture:** Keep the tested static Vinext/Vite product unchanged. Limit code changes to repository identity, obsolete documentation cleanup, and publication configuration, then verify the exact build before and after GitHub and Vercel publication.

**Tech Stack:** React 19, TypeScript, Vinext, Vite, CSS, Node test runner, Vercel CLI, Git, GitHub CLI.

## Global Constraints

- Preserve genuine commits and do not create padding commits.
- Keep only CoreSense product identity in the tracked `HEAD` tree.
- Retain all product media, embedded Markdown documents, and evidence disclosures.
- Publish to `https://github.com/frenzy2004/CoreSense`.
- Prefer `https://coresense.vercel.app` when the slug is available.

---

### Task 1: Clean Repository Identity

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `tests/rendered-html.test.mjs`
- Delete: obsolete transition design and plan documents

- [ ] Rename the npm package to `coresense-web`.
- [ ] Replace transition-oriented test names and fixtures with CoreSense-only assertions.
- [ ] Remove obsolete transition documents that retain the former identity.
- [ ] Run a tracked-text search and confirm the current tree contains no former identity references.
- [ ] Commit the identity cleanup.

### Task 2: Publish the Product README

**Files:**
- Modify: `README.md`

- [ ] Replace the starter README with the CoreSense product, architecture, evidence, setup, validation, structure, and deployment guide.
- [ ] Check every documented command and path against the repository.
- [ ] Commit the README independently.

### Task 3: Verify and Publish GitHub

**Files:**
- Verify: repository working tree and generated build output

- [ ] Run `npm run lint`.
- [ ] Run `npm test`.
- [ ] Run `npm run vercel-build`.
- [ ] Add `https://github.com/frenzy2004/CoreSense.git` as `origin`.
- [ ] Push the current genuine history to remote `main`.
- [ ] Verify repository metadata, default branch, README, and commit count with GitHub CLI.

### Task 4: Rename and Verify Vercel

**Files:**
- Update: `.vercel/project.json` through the Vercel CLI

- [ ] Rename the linked Vercel project to `coresense`, or the shortest available CoreSense-only slug.
- [ ] Deploy the verified production build.
- [ ] Inspect the deployment and production aliases.
- [ ] Verify the live page title, CoreSense content, video playback, document viewer, and clean browser console.
- [ ] Leave the clean production URL open for delivery.

