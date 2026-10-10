# Maintaining this site

Six pages, three shared assets, no build step, no dependencies.

| File | What it holds |
| --- | --- |
| `index.html` | Home — hero, stats, research areas, selected work, projects, experience, collaborators, news |
| `research.html` | The four research areas in depth, software artefacts |
| `publications.html` | Full bibliography with filters, search and BibTeX |
| `experience.html` | Appointments, research visits, teaching, supervision, talks |
| `cv.html` | Education, funding, honours, service, memberships, skills |
| `contact.html` | Email addresses, addresses, profile links, what to write about |
| `publications.js` | The publication list — the only file you touch for a new paper |
| `styles.css` | Colour tokens, layout, dark mode |
| `main.js` | Nav, theme, filters, search, BibTeX, area counts |

The nav bar and footer are copied into all six pages. There is no templating,
so if you add a page or change a nav label, update all six.

## Fill in the placeholders first

```bash
grep -rn "SCHOLAR_ID" .
```

One placeholder is left: `SCHOLAR_ID`, the `user=` value from your Google
Scholar profile URL. It appears eight times — the hero link row on the home page, the
profiles list on the contact page, and the footer of all six pages.

GitHub (`istiaque010`), ORCID (`0000-0002-3112-6568`) and LinkedIn
(`istirare`) are already set. `og:url` on the home page assumes the site will
publish at `https://istiaque010.github.io/bigraphy/`; change it if the
repository ends up with a different name.

Two journal entries carry `year: null` because the CV gives no year
(`jcta-server-os`, `ijiacs-gait`); both are marked `TODO` and render with a dash
until you fill them in.

## Adding a publication

Add one object to `window.PUBLICATIONS` in `publications.js`. Only `id`, `type`,
`title` and `authors` are required:

```js
{
  id: "venue2027-shortname",      // unique, used as the anchor link
  type: "conference",             // journal | conference | chapter
                                  // preprint | review | presentation
  title: "Full paper title",
  authors: ["Istiaque Ahmed", "A. Coauthor"],
  venue: "Proc. Some Conference (ABBR)",
  location: "City, Country",
  pages: "1–8",
  year: 2027,
  doi: "10.1109/....",
  pdf: "pdf/venue2027.pdf",       // optional, local file or URL
  code: "https://github.com/...", // optional
  note: "Best paper award",       // optional, shown in accent colour
  selected: true,                 // optional, promotes it to the home page
  tags: ["ZKP", "identity"]       // optional, searchable and drives areas
}
```

A preprint uses `arxiv` and `primaryClass` in place of `venue`:

```js
{ id: "arxiv2027-thing", type: "preprint", title: "...",
  authors: ["Istiaque Ahmed"], arxiv: "2701.01234",
  primaryClass: "cs.CR", year: 2027 }
```

Order in the file does not matter — entries group by `type` and sort newest
first. Filter-chip counts, stat numbers on the research cards and the BibTeX
records are all derived automatically. Write your own name exactly as
`window.ME` at the top of the file so it renders bold.

## Research areas

`AREAS` near the top of `main.js` maps each area to a list of tags. An entry
joins an area when any of its `tags` appears in that list. The mapping drives
three things: the publication counts on the home cards, the "key publications"
lists on the research page, and the `publications.html?area=…` deep links.

To add an area: add an entry to `AREAS`, a card on `index.html` with
`data-areacount="<key>"`, and a section on `research.html` with
`data-arealist="<key>"`.

An area with no publications yet (currently *LLM and generative model
architectures*) shows "Current direction" instead of a count, and its home card links to
`research.html#<key>` rather than to a filter that would return nothing. Both
switch over automatically as soon as a tagged paper exists — tag it
`autoregressive models`, `diffusion models`, `generative models`,
`LLM pretraining` or `model architecture`.

Area order on the home page and the research page is the source order in the
HTML; `AREAS` in `main.js` is kept in the same order for readability but does
not drive it. Change one, change the other.

## Experience

`experience.html` holds positions, research visits, teaching and talks.
`cv.html` deliberately does **not** repeat them — it keeps degrees, funding,
honours, service, memberships and skills, and links across. Put a new position
in `experience.html`, and update the `.tl` timeline on the home page if it
belongs in the top five.

The home timeline marks current roles with `class="is-now"`, which fills the
dot in the accent colour. Remove the class when a role ends.

## Collaborators section

The people cards live in the `#collaborators` section of `index.html`. Each is a
`.person` block: role line, name, affiliation. Add or remove blocks freely; the
grid reflows at three, two and one column.

The "Frequent co-authors" chips below them are **generated** from
`publications.js` — everyone who appears on more than one paper, by count. You
never edit that list; it updates when you add a publication.

## Other routine edits

- **Stats strip** — hard-coded in `index.html`; update the numbers when the
  publication count changes.
- **Education** — the `#education` timeline on `index.html` (same `.tl`
  component as Experience; `.tl__meta` holds the grade line), mirrored in the
  Education section of `cv.html`. Update both.
- **News** — the `newsline` list on `index.html`. Keep it to about five items.
- **Photo** — the hero uses `img/profile.jpg` (560×560) with
  `img/profile@2x.jpg` (1120×1120) served to retina screens via `srcset`. Both
  were cropped square from `img/profilePic.png`, which is kept only as the
  original and is not served; you can delete it to save 1.9 MB. To replace the
  photo, regenerate both sizes — any square crop works, the CSS centres it.
- **PDFs** — put them in `pdf/` and point an entry's `pdf` field at the path.
- **CV** — four buttons point at `pdf/Istiaque_Ahmed_CV.pdf`
  (`index.html`, `contact.html`, and twice in `cv.html`). They open the PDF in
  a new tab; they deliberately do **not** carry the `download` attribute,
  which would force a save and stop the tab from opening. Replace the file in
  place and nothing else needs touching; if you rename it, update all four.
- **Colours** — the `:root` block at the top of `styles.css`. Change `--accent`
  and `--accent-bg` in all three places (light, the `prefers-color-scheme`
  block, and `[data-theme="dark"]`).
- **Last updated** — the `foot__meta` line, in all six pages.

## Previewing

```bash
python -m http.server 8000
```

Then open <http://127.0.0.1:8000/>. Opening `index.html` directly from the file
manager also works — that is why the data is a `.js` file rather than `.json`
(browsers block `fetch()` on `file://`).

## Publishing on GitHub Pages

1. `git init && git add . && git commit -m "Add academic site"`
2. Push to a GitHub repository.
3. Settings → Pages → Source: *Deploy from a branch*, branch `main`, folder
   `/ (root)`.

The site appears at `https://<username>.github.io/<repo>/` within a minute or
two. `.nojekyll` is already present so GitHub serves the files as-is instead of
running Jekyll over them.

For a custom domain, add a `CNAME` file at the repository root containing
the bare domain
and point a DNS `CNAME` record at `<username>.github.io`.
