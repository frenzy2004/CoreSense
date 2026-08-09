# CoreSense Media-Rich Rebuild Design

## Objective

Rebuild the existing CoreSense page so it retains the strong section rhythm of
the cloned viAct smart-watch page while feeling specific to the supplied
CoreSense product, evidence, and pilot story. The main correction is visual:
use the complete CoreSense media pack instead of repeating a few static concept
images across generic cards.

## Direction

The page remains an industrial black, white, and orange product presentation.
The header contains only the CoreSense wordmark. Section widths, bento cards,
alternating feature rows, tabbed use cases, evidence, FAQ, CTA, and footer keep
the recognizable viAct-derived flow.

Typography stays compact enough for a product page. Orange identifies actions
and active states; cyan is reserved for technical evidence and confidence. No
decorative gradients, floating cards, fake testimonials, or invented product
screens are introduced.

## Media Map

1. **Hero:** silent product-rotation video as the primary product signal, with
   the construction heat still as the full-bleed context layer and a concise
   CoreSense claim on the left.
2. **Overview bento:** one distinct asset per card: round product concept,
   heat-response video, storm-recall video, Wokwi live screen, and system
   diagram. No repeated tile imagery.
3. **Feature story:** three substantial alternating rows rather than five
   repetitive rows. They cover personal estimation, action/fallback, and the
   edge-to-supervisor evidence loop. Motion is used only where it explains the
   action.
4. **System loop:** a full-width black band presents
   `Sense -> Estimate -> Decide -> Act -> Record` as one ordered interaction.
5. **Use cases:** retain the viAct-style tabbed media panel. The selected tab
   switches the poster/video source as well as copy.
6. **Industries:** lead with the supplied three-sector panorama, then use a
   restrained five-item industry index rather than five generic dark cards.
7. **Evidence:** use Wokwi build/live captures and documented engineering facts.
   Concept or stock media never appears as proof of deployment or outcomes.
8. **FAQ, CTA, footer:** retain the current information architecture, with copy
   tightened to the supplied one-page summary and evidence boundaries.

## Motion And Accessibility

CoreSense videos are local, muted, looping, inline, and lazy-loaded outside the
hero. Each video has a poster image and a visible pause/play icon button.
Reduced-motion users receive the poster rather than autoplay. Use-case tab
buttons remain keyboard-operable and expose the selected tab through ARIA.

## Claim And Disclosure Rules

- Every AI-generated image or clip carries the exact label
  `AI-GENERATED CONCEPT VISUAL - NOT FIELD FOOTAGE`.
- Wokwi and firmware images are labelled as prototype or simulated engineering
  evidence where relevant.
- CoreSense is described as a safety decision-support prototype, not a clinical
  thermometer, medical device, emergency service, certification, or replacement
  for site WBGT and established controls.
- No customer, partner, deployment, field outcome, or measured effectiveness is
  implied.

## Responsive Behavior

Desktop uses a wide cinematic composition. Tablet reduces the hero product
stage and stacks feature rows where needed. Mobile keeps the brand and core
claim in the first viewport, places media immediately after the copy, turns the
system loop into a horizontal sequence, and makes use-case tabs horizontally
scrollable. Media uses fixed aspect ratios so dynamic content does not shift
the layout.

## Verification

- Contract tests verify local video use, unique media mapping, disclosures,
  CoreSense content, and absence of viAct/testimonials/header navigation.
- Lint and production build pass.
- Browser checks cover desktop and mobile screenshots, video/poster loading,
  tab interaction, FAQ interaction, reduced-motion behavior, image load status,
  horizontal overflow, and console errors.

