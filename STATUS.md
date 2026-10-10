# Project status

Personal academic website for **Istiaque Ahmed** — postdoctoral researcher,
AI security / self-sovereign identity / zero-knowledge proofs.

Plain HTML, CSS and JavaScript. No build step, no dependencies, no framework.
Served from the **repository root** for GitHub Pages.

See [EDITING.md](EDITING.md) for how to change things. This file records what
state the project is in, which decisions were made deliberately, and what is
still outstanding.

---

## Current state

Six pages, all complete and verified:

| Page | Contents |
| --- | --- |
| `index.html` | Hero, stats, 4 research areas, selected work, software, education, experience, collaborators, news, contact CTA |
| `research.html` | The four areas in depth, dissertation callout, 6 software artefacts |
| `publications.html` | All 28 entries, filters, search, BibTeX export |
| `experience.html` | Appointments, research visits, teaching, supervision, talks |
| `cv.html` | Education, funding, honours, service, memberships, skills (nav label: **Resume**) |
| `contact.html` | Email, addresses, profile links, what to write about |

**Nav order:** Home · Research · Publications · Experience · Resume · Blog↗ · Contact
Blog points off-site to Medium. `cv.html` is labelled "Resume" in the nav —
the filename was left alone.

### Data

All 28 publications live in `publications.js` as one object per entry — the
only file to touch when a paper lands. Everything derived from it is
automatic: filter-chip counts, research-area counts, selected work on the home
page, key-publication lists, frequent co-author chips, and BibTeX records.

Counts match the source CV exactly: 10 journal articles (first author on 9),
3 book chapters, 6 conference papers, 2 presentations, 2 under review,
5 preprints.

---

## Outstanding

1. **`SCHOLAR_ID` placeholder** — 8 occurrences. Needs the `user=` value from
   the Google Scholar profile URL. Until then the five "Google Scholar" links
   go nowhere. `grep -rn SCHOLAR_ID .`
2. **Two publications have `year: null`** (`jcta-server-os`, `ijiacs-gait`) —
   the source CV gives no year. They render with a dash. Marked `TODO` in
   `publications.js`.
3. **`img/profilePic.png`** (1.9 MB) and **`pdf/Istiaque_Ahmed_CV.docx`** are
   unreferenced leftovers. Safe to delete; left in place pending a decision.
4. **`og:url`** assumes the repo will be named `bigraphy`
   (`https://istiaque010.github.io/bigraphy/`). Update if it is named
   otherwise.
5. **AgentRed repo link** points at `github.com/istiaque010/AgentRed` — worth
   confirming that repository is public.
6. **Button labels still say "Download CV"** but now open the PDF in a new tab
   rather than saving it. "View CV" would be more accurate.

---

## Deliberate decisions

Things that look like oversights but are not:

- **Phone number is omitted** from the whole site. It is in the source CV, but
  a public page keeps it indexed forever. Email is enough.
- **`publications.js`, not `.json`** — loaded as a plain script so the site
  works when opened directly from disk. `fetch()` is blocked on `file://`.
- **No box-shadows anywhere.** The design is built on hairlines and tint
  fills. Introducing one shadow forces shadows everywhere.
- **Education is duplicated** on the home page and `cv.html` — the home page
  is a summary, the Resume page is the record. Both need updating together.
- **`.person` cards have hover but no lift.** They are not links; a lift would
  promise a click that does not exist.
- **Timeline rows get no background tint** (unlike publication and news rows) —
  a filled block fights the connector line running down the left.
- **The active nav link is not bold.** It was, and the extra width shifted
  every other item by 1–2px on each navigation. Colour plus the accent
  underline carry it instead.
- **CV buttons carry no `download` attribute.** It forces a save and
  suppresses `target="_blank"` entirely; the two cannot both apply.

---

## Gotchas found the hard way

Each of these was a real bug in this codebase. Worth knowing before changing
related code.

- **Shorthand `padding` on an element that also has `.wrap` wipes the
  gutter.** `.band { padding: 4rem 0 }` silently reset `.wrap`'s horizontal
  padding to 0, so every band section was flush to the screen edge on mobile
  and 32px wider than the hero on desktop. Always use `padding-top` /
  `padding-bottom` longhand on `.band`, `.phead` and anything else carrying
  `.wrap`.
- **`<img width>`/`<height>` attributes are presentational hints that beat
  `aspect-ratio`.** The hero photo rendered 280×560 because CSS overrode
  `width` but not `height`. `.hero__img` needs explicit `height: auto`.
- **`.foot p` (0,1,1) outranks `.foot__meta` (0,1,0).** It reset the `auto`
  side margins and left the copyright off-centre. Scoped as
  `.foot .foot__meta` now.
- **Replacing an image referenced by `srcset` breaks it silently.** A
  candidate that 404s does not fall back to the other candidate.
- **Adding a nav item can overflow between breakpoints.** The 7th item broke
  the layout from ~760–860px. The nav now collapses on its own breakpoint at
  880px, separate from the 760px phone layout.

---

## How to verify changes

Chrome headless is available and was used throughout. Techniques that worked:

```bash
# serve
python -m http.server 8000

# screenshot a page
chrome --headless=new --disable-gpu --hide-scrollbars \
  --window-size=1180,900 --force-device-scale-factor=2 \
  --virtual-time-budget=8000 --screenshot=out.png http://127.0.0.1:8000/
```

- **Narrow viewports:** Chrome headless clamps its window to **500px minimum**
  on Windows. To test 320–414px, load the page in an `<iframe>` of that width
  from a host page — iframes get their own viewport, so media queries apply
  correctly. A `--window-size=390` screenshot is really a 500px page cropped
  to 390, which looks broken but is not.
- **Horizontal overflow:** compare `documentElement.scrollWidth` against
  `clientWidth` inside the iframe. To find the culprit, hide every child of
  `<body>` then reveal one at a time — hiding them one at a time gives false
  negatives when two things each contribute.
- **Hover states:** walk `document.styleSheets`, copy every rule whose
  `selectorText` contains `:hover` into a duplicate with `.hovered`
  substituted, then add that class to chosen elements. This screenshots the
  real authored declarations rather than a mock-up.
- **Scripts do not run under `--dump-dom`.** Anything needing JS must be
  verified via `--screenshot`.
- **Link checking:** regex every `href`/`src` in the HTML, skip
  `http`/`mailto`/`#`/`data:`, and assert the rest exist on disk. Currently
  119 local references, all resolving.

`make-profile.py` regenerates the hero photo sizes from `img/profile.png`.

---

*Last reviewed: October 2026*
