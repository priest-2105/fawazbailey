---
name: Fawaz Bailey Commerce
description: Independent visual system for /ecommerce-projects only; existing portfolio routes retain their incumbent comic identity.
colors:
  commerce-paper: "#f5f7f2"
  commerce-ink: "#20392c"
  commerce-muted: "#526157"
  commerce-line: "#cdd6ca"
  commerce-sage: "#dce5d5"
  commerce-lilac: "#e5e0ee"
  heading-sage: "#627760"
  tab-track: "#e9eee5"
  tab-selected: "#fff"
  results-surface: "#eaf0e5"
  chart-visits: "#60745a"
  chart-appointments: "#74638d"
  chart-range: "#b6a7cc"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(52px, 6.4vw, 96px)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-.04em"
  headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(30px, 3.2vw, 46px)"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-.04em"
  project-title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(25px, 2.4vw, 36px)"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-.04em"
  story-title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(28px, 3vw, 42px)"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-.04em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "15px"
    lineHeight: 1.65
  story-body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "14px"
    lineHeight: 1.9
  action-label:
    fontFamily: "Manrope, sans-serif"
    fontSize: "13px"
    fontWeight: 650
  tab-label:
    fontFamily: "Manrope, sans-serif"
    fontSize: "11px"
rounded:
  tab: "3px"
  tab-track: "6px"
  circular-action: "50%"
spacing:
  commerce-gutter: "clamp(22px, 5vw, 88px)"
  screen-inset: "clamp(18px, 3vw, 48px)"
  project-gap: "clamp(32px, 5vw, 80px)"
  compact: "8px"
  small: "16px"
  medium: "24px"
  story-gap: "28px"
  large: "32px"
  preview-inset: "36px"
  section-space: "112px"
components:
  text-link:
    textColor: "{colors.commerce-ink}"
    typography: "{typography.action-label}"
  view-tab:
    backgroundColor: "transparent"
    textColor: "{colors.commerce-muted}"
    typography: "{typography.tab-label}"
    rounded: "{rounded.tab}"
    padding: "8px 12px"
  view-tab-selected:
    backgroundColor: "{colors.tab-selected}"
    textColor: "{colors.commerce-ink}"
    typography: "{typography.tab-label}"
    rounded: "{rounded.tab}"
    padding: "8px 12px"
  view-tab-hover:
    backgroundColor: "{colors.commerce-paper}"
    textColor: "{colors.commerce-ink}"
  preview-action:
    backgroundColor: "{colors.commerce-paper}"
    textColor: "{colors.commerce-ink}"
    rounded: "{rounded.circular-action}"
    width: "44px"
    height: "44px"
  preview-action-hover:
    backgroundColor: "{colors.commerce-ink}"
    textColor: "{colors.commerce-paper}"
  screenshot-stage-sage:
    backgroundColor: "{colors.commerce-sage}"
    padding: "{spacing.screen-inset}"
  screenshot-stage-lilac:
    backgroundColor: "{colors.commerce-lilac}"
    padding: "{spacing.screen-inset}"
  results-panel:
    backgroundColor: "{colors.results-surface}"
    textColor: "{colors.commerce-ink}"
    padding: "clamp(20px, 3vw, 40px)"
  chart-tooltip:
    backgroundColor: "{colors.commerce-paper}"
    textColor: "{colors.commerce-ink}"
    padding: "12px 16px"
---

# Design System: Fawaz Bailey Commerce

## Overview

**Creative North Star: "The Storefront Collection"**

This document describes the implemented visual world of `/ecommerce-projects` only. The original portfolio's comic design in `app/globals.css` remains the incumbent system for its existing routes. These tokens must not be promoted to global portfolio defaults.

The commerce route uses restrained green typography, pale surfaces, rectangular imagery, and spacious editorial layouts. Real storefront captures provide the visual detail; light rules organize the surrounding explanations. The North Star and descriptive color names are documentation language inferred from this implementation, not a recorded user approval. Direct implementation was an assumption made for the user's speed requirement, not a standing workflow preference.

**Key Characteristics:**

- Route-scoped Manrope typography and cool green surfaces.
- Real desktop and mobile screenshots with quiet tonal framing.
- Large balanced headings, fine rules, and generous responsive gutters.
- Understated link motion and visible keyboard focus.

The current content covers two verified stores. The complete store inventory is still unconfirmed; content and capture provenance are recorded in `docs/ecommerce-projects-research.md`.

## Colors

The palette places deep pine text over cool paper, with sage and lilac fields supporting the storefront images.

### Primary

- **Pine ink** (`commerce-ink`): headings, primary text, link rules, focus outlines, and the contact background.
- **Heading sage** (`heading-sage`): the softer second line of the hero heading.

### Secondary

- **Sage field** (`commerce-sage`): one storefront's preview and screenshot stage.
- **Lilac field** (`commerce-lilac`): the other storefront's preview and screenshot stage.
- **Visits green**, **appointments purple**, and **range lilac** (`chart-visits`, `chart-appointments`, `chart-range`): distinct reported activity categories; pine ink identifies confirmed sales. The lighter appointment segment communicates the supplied range.

### Neutral

- **Cool paper** (`commerce-paper`): the page surface, circular preview action, and reversed contact text.
- **Muted green** (`commerce-muted`): supporting copy, captions, metadata, and inactive tabs.
- **Quiet rule** (`commerce-line`): section dividers.
- **Tab track** (`tab-track`): the compact segmented control background.
- **Selected white** (`tab-selected`): the selected screenshot tab.
- **Results surface** (`results-surface`): the pale inset background behind reported weekly activity.

The sidecar's tonal ramps are generated preview aids, not additional implemented palette tokens.

## Typography

Manrope is bundled at `app/fonts/manrope-latin.woff2` and loaded with `next/font/local`, using the local `--font-commerce` variable and a sans-serif fallback. It belongs to the commerce page wrapper. Headings use medium weight, tight tracking, and balanced wrapping. Body text stays open and readable; labels use small sizes with heavier action text rather than uppercase decoration.

The normative desktop hierarchy is in the frontmatter. Supporting hero copy uses 16px with 1.8 line-height. Preview titles use 22px and tighter tracking of -.025em. Story paragraphs have a 70ch maximum measure; project introductions start at 30ch, expanding to 58ch when the page becomes one column. Contact headings use `clamp(44px, 5.4vw, 78px)` with 1.12 line-height. Responsive overrides are recorded below.

## Layout

Header, hero, work, and footer share a centered 1680px maximum width and the commerce gutter. The contact surface spans the viewport; above 1680px its content aligns to a 1504px inner span. Sections and articles with anchor IDs use 32px scroll margins.

The desktop hero introduction uses a 1.4:1 grid with a 64px gap. Two previews share equal columns with a 28px gap. Each preview image area has a 1.47 aspect ratio and 36px top/side inset. Project articles use .75:2 columns, a fluid gap, 56px top padding, and a top rule. Subsequent articles have 100px top margin. Project identity remains sticky 40px below the viewport top. Story rows pair a narrow label column with a wider text column.

Screenshot stages use a 1.33 aspect ratio with fluid inset. Desktop images fill available width; mobile images preserve their natural proportions with height-constrained `object-fit: contain`.

Architecture explanations use two equal columns with a 32px gap. Their ordered three-step flows use equal columns with 24px gaps. Results sit in a rectangular pale panel with fluid 20–40px padding. The chart occupies a full-width 268px-high canvas.

- **At 1000px and below:** hero gap becomes 36px; preview inset becomes 24px; preview captions stack; work headings stack; project columns become .85:2 with a 32px gap; story labels stack above prose; screenshot toolbars may wrap.
- **At 800px and below:** hero and projects become single column; sticky identity becomes static; work vertical padding becomes 80px; project metadata uses two columns; story labels return to a 140px side column; contact vertical padding becomes 64px.
- **At 640px and below:** navigation compacts and the Commerce suffix hides; previews stack; hero type becomes `clamp(44px, 10.5vw, 64px)`; work and story headings become 32px; project spacing becomes 64px; story labels stack; contact stacks with 48px heading text; footer wraps. Tabs use 10px text, 6px 8px padding, and a 38px minimum height. Screenshot inset becomes 18px and the mobile stage uses a .8 aspect ratio.

At the same 640px breakpoint, architecture layers and flow steps stack, results padding becomes 20px 14px, the results heading and legend stack, and the chart height becomes 248px.

## Elevation & Depth

Depth comes primarily from pale tonal fields and fine dividers. Screenshots alone receive soft shadows: preview captures use `0 10px 30px #20392c14`; project captures use `0 12px 36px #20392c18`. These shadows separate the captured storefront from its colored field; surrounding editorial sections remain flat.

## Shapes

Screenshots, image fields, and editorial sections retain rectangular geometry. Rounded shapes are reserved for the screenshot tabs and their track, plus the circular preview arrow. Rules are thin single-pixel strokes. Screenshot areas clip overflow deliberately to frame real website captures.

## Components

### Navigation and text links

The independent masthead pairs a shopping-bag mark and name with two in-page navigation links. Desktop navigation uses 13px text at weight 600. Navigation, text links, screenshot caption links, and footer links have a minimum height of 44px. Hover underlines these links. Store links instead retain a bottom rule and shift their arrow diagonally by 2px over .2s. External store links announce their new-tab behavior to screen readers.

### Storefront previews

Linked screenshot panels use sage or lilac framing and captions below. On hover the capture rises 8px over .5s using `cubic-bezier(.16,1,.3,1)`; the circular arrow reverses to pine with paper text over .2s. The image remains a real capture, not an invented storefront mockup. Each preview jumps to the corresponding project article.

### Screenshot tabs and stage

Desktop and Mobile are a two-option tablist backed by React state. The selected tab is white with pine text; inactive tabs use the track background and muted text. Hover uses paper. Desktop tabs have a 36px minimum height. The active tab alone enters the tab sequence; Left/Right toggle and focus the other view, while Home/End select the first/last view. `aria-selected`, `aria-controls`, and the focusable labelled tabpanel remain synchronized.

Images have descriptive alt text and responsive source sizing. The Augusta Newham mobile view explicitly identifies its collection capture rather than presenting it as the homepage. Each view offers a full-size image link. The sidecar tab previews illustrate visual states; the live `ProjectScreens.tsx` supplies keyboard and switching behavior.

### Project study

Each semantic article pairs project identity, verified stack, and experience details with the screenshot viewer and story sections. Metadata uses a definition list, while story labels and prose follow the heading hierarchy. The screenshot stage provides the visual container; there is no enclosing rounded card.

### Contact and accessibility

The pine contact band reverses the palette. Its email link has a bottom rule and an arrow that shifts diagonally by 4px over .2s. Supporting contact text uses `#c6d4c2`; the link rule uses `#96ad96`.

Interactive focus uses a 2px pine outline with 6px offset, reversing to paper in the contact band. A focus-revealed skip link leads to the work section. Decorative icons are hidden from assistive technology. Reduced-motion preference disables transitions and hover transforms and restores automatic scrolling within the page. Preserve these behaviors when extending the route; the current tab hit areas are smaller than the route's 44px text-link targets.

### Architecture and disclosures

Architecture sections separate the Next.js storefront from the Shopify backend, followed by a semantic ordered flow. Their headings use `clamp(24px, 2.5vw, 32px)` and supporting prose uses 13px with 1.85 line-height. Native `details` elements expose deeper implementation and measurement notes; summaries use medium weight, 10px vertical padding, and the route's visible focus treatment.

### Reported weekly results

The 920 Luxury panel uses a Recharts horizontal bar chart with a zero-based 0–60 count axis and ticks every 15. Bars are 28px thick, with slightly rounded right ends. Numeric text uses tabular figures. The approximately 50 visits, 15 confirmed sales, and 15–20 appointments are attributed reported figures; the extra five appointments form a lighter range segment. Labels and the legend explain this without relying on color alone.

Hover reveals a paper tooltip with a fine rule and 12px text. Chart and tooltip animation are disabled. Recharts' accessibility layer is enabled, and a native disclosure contains a captioned table with column and row headers plus measurement notes. This is a weekly activity snapshot: categories can overlap, appointment scope remains unconfirmed, and no conversion rate, precise baseline, or historical series is inferred. Augusta's recent-launch note carries no CRO results. Sidecar previews document the disclosure and tooltip styling; the live chart remains implemented in `CommerceResults.tsx`.

## Do's and Don'ts

### Do:

- **Do** keep the commerce tokens and Manrope scoped to `/ecommerce-projects`.
- **Do** preserve real screenshot proportions, accurate capture labels, and image provenance.
- **Do** retain visible keyboard focus, tab keyboard controls, semantic headings, and reduced-motion behavior.
- **Do** use the existing fluid gutters, tonal image fields, and thin dividers when extending this route.

### Don't:

- **Don't** apply this palette or typography to the original portfolio routes without a separate design decision.
- **Don't** present inferred documentation language as a user-approved brand or workflow preference.
- **Don't** replace verified project evidence with invented outcomes or imply the two-store collection is exhaustive.
- **Don't** turn screenshots into rounded decorative cards; the implemented framing is rectangular.
