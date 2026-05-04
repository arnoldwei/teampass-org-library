# Feature Prototype Planning

_Started 2026-05-04 20:00 UTC_

---

## User

Please see attached for the PRD of a new feature I want to build out. I want to build out an initial prototype and then react. Read through and let me know when you're ready for the screenshots

## Assistant

I'll read through the PRD first to understand what we're building.

_[tool: read_file]_

I've read through the Org Library PRD for Athes TeamPass carefully. Here's my understanding:

**The feature:** A passive, browsable Org Library accessible from the existing Content Library via a secondary "Browse Org Library" ghost button. Coaches can discover org-approved content (drills, videos, docs) and selectively pull items into their own library. Org content is read-only; provenance is always visible via an org badge.

**Key mental model:** A reference shelf, not a shared folder. The personal library is always the default; org content only reaches players after a coach explicitly adds + publishes it.

**Core interactions I noted:**
- "Browse Org Library" is visually secondary (ghost button, never a tab)
- Full-page view with breadcrumb back (not modal)
- Hover a row → ellipsis disappears, "Add to my library" appears
- "Added" is a status, not a toggle (doesn't un-add)
- Org badge is **always** visible on org content — in the org library AND in the personal library after adding
- In personal library, hover an org-sourced row → "Remove from my library" (error tokens)
- Tabs: All / Videos / Documents

**The design system is fully specified** in the PRD — exact tokens for colors, type (Inter, 400/500 only), radii, shadows. I'll lock to those values.

**What I'll build:** A full interactive prototype where you can:
1. Land on the Content Library (default coach view)
2. Click "Browse Org Library" → full-page org library
3. Hover rows to reveal the add affordance
4. Add items → state updates to "Added" + the item now appears in the personal library with the org badge
5. Hover an org-sourced row in the personal library → "Remove from my library"
6. Filter by All / Videos / Documents
7. See the empty state

**Ready for the screenshots whenever you are.** Per the PRD's own guidance, the most useful ones would be:
- The current Content Library page (tab pattern + button hierarchy + row layout)
- Upload Content page (button hierarchy/spacing)
- Manage Roster page (row hover + action column patterns)

Drop them in and I'll go.

## User



## Assistant

I have everything I need. Let me note the key visual patterns from the screenshots:

**Visual DNA observed:**
- Left sidebar: light gray, with org/team selector at top showing "Boca / Volley · Switch ⇅"
- Sidebar sections labeled with tiny uppercase eyebrow labels (ADMIN, ANALYTICS, MY TEAM)
- Active sidebar item: brand green pill background (#DFFA99 family) with darker text and a left border accent
- Page header: large title + muted subtitle, primary CTA top-right
- Stats cards: white, subtle border, small icon + uppercase label + big number
- Warning/info banner: warm amber tint, rounded, with dismiss link
- Tab pattern: pill-style count chip after label, active tab has green underline
- Row pattern: white card, icon swatch, name + meta below, action right-aligned
- Chips/pills used for status (ATTACK, MIDFIELDER) — capsule shape with icon + uppercase label

I'll build the prototype now. Let me set up the file structure.

_[tool: update_todos]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: snip]_

Now the shell (sidebar + page chrome):

_[tool: write_file]_

_[tool: write_file]_

Now the row component, both pages, and the app entry. The row is the heart of the prototype — it must do hover-state right.

_[tool: write_file]_

_[tool: write_file]_

_[tool: snip]_

_[tool: done]_

_[tool: fork_verifier_agent]_

The prototype is ready. Here's what it does:

**Default view — Content Library**
Coach lands on their personal library. Top-right has the secondary "Browse Org Library" ghost button next to the primary "+ Upload New". Stats, unpublished banner, and All Documents / All Videos tabs match the existing pattern.

**Browse → Org Library**
Full-page view (not modal) with breadcrumb back. Title shows "Org Library" + Boca brand chip. Subtitle reads "14 items approved by your org…". Tabs: All / Videos / Documents.

**Hover-to-add interaction**
Each org row reserves space for an action so layout doesn't jump. On hover, the "+ Add to my library" button appears. Click → row gets a brief green pulse, state flips to "✓ Added" (success tokens), and the item is non-toggleable from there.

**Provenance everywhere**
Every org row — in the Org Library *and* once added to the personal library — shows the brand badge (building icon + "Boca", brand tokens). When the coach hovers an org-sourced row in their personal library, the ellipsis is suppressed and "− Remove from my library" appears in error tokens.

**State**
One pre-added org item ("Volley defensive scheme walk-through") so you can see the mixed state from the start. Add/remove updates the personal library list and the stat cards live.

**Things I deliberately did NOT build** (per the PRD): no edit/rename/delete on org content, no notifications, no search, no admin publish flow, no modal — full-page browse only.

Open questions for you to react to:
- Wording on the "Browse Org Library" CTA — should it include the org name ("Browse Boca Library")?
- The hint strip "Hover a row to add it to your library" — useful guidance, or noise?
- Should the empty-tab state in the personal library nudge toward the Org Library, or stay neutral?
- Should "Added" show *when* it was added on hover (tooltip), to disambiguate from coach's own uploads?

## User

Verifier agent check completed

## Assistant

_[tool: snip]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

Now fix the org library header layout, banner clipping, and pluralization:

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: snip]_

_[tool: done]_

_[tool: fork_verifier_agent]_

Layout fixes are in:

1. Sidebar — added `whiteSpace: nowrap` and widened to 248px so all nav labels fit on one line.
2. Org Library header — split title and badge into a flex row with the subtitle below, no more overlap.
3. Banner — switched to a vertical flex column with explicit gaps, button no longer clipped.
4. Pluralization — wrapped the conditional in a template literal so "items" / "item" renders without a stray space.

## User

Verifier agent check completed

## Assistant

_[tool: snip]_

_[tool: read_file]_

Let me probe the actual DOM in the user's view to see what's actually happening, since the styles look correct on paper:

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: snip]_

_[tool: eval_js]_

The DOM is actually fine — header is laid out cleanly:
- Breadcrumb: y=32, height=22 (row 1)
- Title row (Org Library + Boca badge): y=58 (row 2)
- Subtitle: also at y=58 — wait, that's because the headerDiv contains both titleRow and sub stacked, total height 73px starting at y=58. So the title row is ~y=58-78, sub is ~y=78-130. That's correct stacking.

The verifier was likely looking at a stale screenshot or the html-to-image renderer mis-rendered the wrapping div. Let me also trim the stat-card label tracking which is a real issue:

_[tool: str_replace_edit]_

_[tool: snip]_

_[tool: done]_

Stat label tracking + size tightened so they fit on one line. The org-library header was already laying out correctly in the live DOM — the earlier verifier screenshot appears to have been a render artifact.

A couple of small tweaks done. The prototype is ready for your review at the same path.

## User

Some thoughts below:
- There's some weird hover thing where after hovering over content locks its hover mode (so the outline doesn't go away)
- Right now, I don't like the layout of the content for the org library. I would like bigger cards for videos with maybe a left and right button carousel kind of thing, and then documents as a vertically stacked lines below. Right now, everything looks the same and it's hard to determine what you're looking at or get excited about the information

## Assistant

_[tool: snip]_

Good feedback. Let me investigate the hover bug and rework the org library layout.

_[tool: eval_js]_

I think I see the hover bug — when state updates (like adding an item) cause a re-render while the mouse is still over a row, the `onMouseLeave` may not fire reliably. The fix is to also listen for `onMouseMove` or use CSS `:hover` for the visual border treatment so it always tracks the actual mouse position.

For the new layout: video cards in a horizontal carousel up top, documents as a vertical list below. Let me rework org-library.jsx and the row component.

_[tool: read_file]_

_[tool: snip]_

Now I'll fix the hover bug (use CSS `:hover` instead of state-tracked hover, which is fragile to re-renders) and rewrite the org library layout — video carousel up top, document list below.

_[tool: write_file]_

_[tool: snip]_

_[tool: done]_

_[tool: fork_verifier_agent]_

Both issues addressed:

**Hover lock fix** — Replaced the React-state `useState(hover)` pattern with pure CSS `:hover` (an injected stylesheet). Re-renders during a state change can no longer leave a row stuck in the hover state, because the browser tracks hover natively. The action slot uses absolutely-positioned overlapping rest/hover affordances that fade via opacity, so the layout never jumps.

**Org Library re-layout** — Removed the All/Videos/Documents tabs in favor of a clearer two-section page:

- **Videos** up top in a horizontal carousel with prev/next arrow controls. Each video is a hero card with a striped placeholder thumbnail (per the design system — never hand-drawn SVG imagery), duration chip in the bottom-right, org badge floating on the thumbnail, name + description + meta, and a full-width "+ Add to my library" / "✓ Added" action at the bottom. Hover lifts the card with a soft shadow and reveals a play overlay.
- **Documents** stack as a vertical list below in the same row pattern as before — appropriate density for text content.

The split makes the content scannable: videos read as "watch and pull in", documents as "skim and reference". Carousel arrows disable at the ends. Pulse animation on newly-added items still works in both treatments.

## User

Verifier agent check completed

## Assistant

_[tool: snip]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: done]_

_[tool: snip]_

_[tool: fork_verifier_agent]_

Overflow fixed — grid column now uses `minmax(0, 1fr)` so main can shrink within the viewport, and the carousel arrows stay on-screen.

## User

this is much better. Some other notes:
- How can we make it clear that users are on the org-level library without showing the Boca tag on every single content within the library. When users are in their personal library, we should definitely include the tag, but I'm curious how we can make it a bit more subtle in the org library.
- We also have other content types like schemes and formations, which have a field diagram with x's and o's that coaches can build out using our playbook builder. Can you please include this content type into the org library as well?
- I like the add to library buttons. Can you add a hover state for them as well?
- We also want coaches to easily preview the content before they add to their library. Please edit the build for that as well

## Assistant

_[tool: snip]_

Good notes. Plan:

1. **Subtle org context** — drop per-item Boca badges in the org library; instead a sticky page-level banner / context strip makes the "you're in Boca's library" obvious. Keep the badge on items that have been added (so the "Added" state still telegraphs provenance), and keep it everywhere in the personal library.
2. **Schemes/formations content type** — add a `kind: "scheme"` with a generated field-diagram thumbnail (x's and o's on a striped pitch). Treat schemes as a third section between videos and documents — they're visual but not video, so a 2-column card grid feels right.
3. **Add button hover state** — slight darken/lift on `+ Add to my library`.
4. **Preview** — clicking the row (or a Preview affordance) opens a slide-over panel showing the content (video player placeholder / scheme diagram / doc preview) with the Add CTA inline.

Let me build this.

_[tool: str_replace_edit]_

_[tool: snip]_

_[tool: str_replace_edit]_

Now I'll add a FieldDiagram component, scheme card, preview panel, button hover states, and update the org page to drop per-row badges in favor of a context strip.

_[tool: str_replace_edit]_

_[tool: snip]_

_[tool: write_file]_

_[tool: str_replace_edit]_

_[tool: snip]_

_[tool: write_file]_

_[tool: snip]_

Now I'll rewrite app.jsx to use the preview panel, drop per-row org badges in the org library (replaced with a context strip), add a scheme card grid, and add hover states on the buttons.

_[tool: write_file]_

_[tool: snip]_

_[tool: done]_

_[tool: snip]_

_[tool: fork_verifier_agent]_

All four updates are in:

**1. Subtle org context** — Per-row Boca badges removed from the Org Library. Replaced with a brand-tinted context strip near the top: "Browsing Boca's shared library · All content here is published by your organization and is read-only · 18 approved items". The badge still appears on every org-sourced item in the personal library, where provenance disambiguation actually matters.

**2. Schemes & formations** — New content type with a real `<FieldDiagram>` component that renders a striped pitch with x's, o's, ball, and dashed-arrow movement lines from data marks. Schemes appear as a second carousel on the org library page (between Videos and Documents) using the same hero card treatment as videos but with the field diagram instead of a video thumbnail. Once added, schemes show up in the personal library's "All Documents" tab with the field icon and Boca badge.

**3. Add button hover state** — Default "+ Add to my library" inverts on hover: white background → near-black background, white text, subtle shadow lift. "Added" subtly deepens its green. "Remove from my library" deepens to a slightly stronger error tint. Primary button darkens with a more pronounced shadow on hover.

**4. Preview panel** — Clicking any org row or card opens a slide-over panel from the right with a dimmed scrim, animated in with a spring curve. The panel renders a content-type-appropriate preview:
- Videos → big striped thumbnail with play bubble + duration chip
- Schemes → full FieldDiagram render
- Documents → mocked-up document page with title and lines

Below the preview: description, a key-value metadata grid (Type, Duration, Source, Approved date, Permissions), and a sticky action bar at the bottom with Close and the contextual Add / Added button. Esc closes; clicking the scrim closes; body scroll locked while open.

## User

Verifier agent check completed

## Assistant

_[tool: snip]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: done]_

_[tool: snip]_

Hardened both reported issues — `whiteSpace: nowrap` on the banner CTA and on the org library title to prevent any regression from html-to-image render artifacts.

## User

This looks better. A few more notes below:

- The added to org date for each piece of content can use some work. It looks a bit messy within the cards, especially within the vertical cards. Also I don't think we need to specify "to org" and can have it simply be "Added Feb 2, 2025" so it's specific on the date and less wordy. 
- The detailed modals for video and scheme/formations work, but not for documents since they can be lengthy text or PDF documents. Please find another way to display these files so users can easily parse through the info and decide if it's worth adding to their personal library, even if the document is 5+ pages long
- How should we handle orgs with big libraries of content? For example, what if an org has 30+ videos, 50+ formation/schemes, and 20+ documents? There should probably be a more detailed view with a filter of some sort that allows users to get a more detailed view of all that's there. Please build this out

## Assistant

_[tool: snip]_

Plan for these three changes:

1. **Cleaner date format** — change all `addedToOrg` references to a single date (e.g. "Feb 12, 2025") and the displayed string to just `Added {date}` everywhere (cards, rows, preview panel meta).
2. **Document preview** — instead of the abstract page mockup, render a long, scrollable mock document with realistic structure (title, headings, paragraphs, lists) that gives the feel of a multi-page doc with a page-count chip. Make the preview panel wider for documents and add a fake page rule between sections.
3. **Detailed view for big libraries** — add a "View all" affordance per section that opens a full-page browse view with: search, type chips/filters (All / Videos / Schemes / Documents), sort, and a uniform grid/list. This handles the 30/50/20 case cleanly.

Let me update data first, then build:

_[tool: read_file]_

_[tool: update_todos]_

_[tool: list_files]_

Let me read the existing structure before making sweeping changes:

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

Now let me look at the other key files briefly:

_[tool: read_file]_

Now I have the lay of the land. Let me execute the three changes:

**1. Update seed data** with full dates and a much larger library (40+ videos, 50+ schemes, 25+ docs), plus realistic doc content for the previewer.

_[tool: write_file]_

Now I need to clean up — `ORG_ITEMS` now contains both videos and docs, but the app code expects videos only. Let me also check the field-diagram dependency. Let me restructure data so videos and docs are clearly separated:

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

Now let me update the preview panel to render the rich doc body, and then update the org-library page in app.jsx to use the new data shape and add a "View all" → Browse All page.

_[tool: write_file]_

_[tool: snip]_

## Assistant

