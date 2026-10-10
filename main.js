/* ===========================================================================
   Istiaque Ahmed — academic site
   Shared across all pages. Every block guards on the elements it needs, so
   each page only runs what it actually has.
   =========================================================================== */

(function () {
  "use strict";

  var root = document.documentElement;
  var ME = window.ME || "Istiaque Ahmed";
  var DATA = window.PUBLICATIONS || [];

  /* ------------------------------- helpers ------------------------------- */

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  }

  /* ----------------------------- theme toggle ---------------------------- */

  var themeBtn = $("#themeBtn");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      var current = root.getAttribute("data-theme") || (prefersDark ? "dark" : "light");
      var next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("ia-theme", next); } catch (e) { /* blocked */ }
    });
  }

  /* --------------------------- nav: state + menu ------------------------- */

  var page = document.body.getAttribute("data-page");
  var activeLink = page && $('.nav__links a[data-nav="' + page + '"]');
  if (activeLink) activeLink.classList.add("is-on");

  var burger = $("#burger");
  var navLinks = $("#navLinks");
  if (burger && navLinks) {
    burger.addEventListener("click", function () {
      var open = navLinks.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    // Close the dropdown when a link is followed or Escape is pressed.
    navLinks.addEventListener("click", function (ev) {
      if (ev.target.tagName === "A") navLinks.classList.remove("is-open");
    });
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape") navLinks.classList.remove("is-open");
    });
  }

  /* ------------------------- footer copyright year ----------------------- */

  // The markup carries a hard-coded year so it still reads correctly without
  // JavaScript; this just keeps it from going stale.
  $$("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* --------------------------- publication model ------------------------- */

  var GROUPS = [
    { key: "journal",      label: "Peer-reviewed journal articles" },
    { key: "chapter",      label: "Book chapters" },
    { key: "conference",   label: "Peer-reviewed conference papers" },
    { key: "presentation", label: "Other conference presentations" },
    { key: "review",       label: "Manuscripts under review" },
    { key: "preprint",     label: "Preprints" }
  ];

  // A filter chip can cover more than one entry type.
  var FILTERS = {
    all:        null,
    journal:    ["journal"],
    conference: ["conference", "presentation"],
    chapter:    ["chapter"],
    preprint:   ["preprint"],
    review:     ["review"]
  };

  // Research areas, matched against entry tags. Used for the home page counts,
  // the "key publications" lists on the research page, and ?area= deep links.
  var AREAS = {
    ai: {
      label: "Security of AI systems",
      tags: ["AI security", "LLM safety", "guardrails", "agentic AI", "LLM",
             "intrusion detection"]
    },
    llm: {
      label: "LLM and generative model architectures",
      tags: ["autoregressive models", "diffusion models", "generative models",
             "LLM pretraining", "model architecture"]
    },
    privacy: {
      label: "Privacy-preserving identity",
      tags: ["ZKP", "SSI", "DID", "eKYC", "verifiable credentials", "MPC",
             "identity", "privacy", "usable privacy", "Merkle tree", "access control"]
    },
    blockchain: {
      label: "Blockchain and secure communication",
      tags: ["blockchain", "Ethereum", "smart contracts", "dApps", "IPFS", "cryptography",
             "traceability", "governance", "fintech"]
    }
  };

  function inArea(p, key) {
    var area = AREAS[key];
    if (!area) return true;
    return (p.tags || []).some(function (t) { return area.tags.indexOf(t) !== -1; });
  }

  function areaEntries(key) {
    return DATA.filter(function (p) { return inArea(p, key); })
               .sort(function (a, b) { return (b.year || 0) - (a.year || 0); });
  }

  function venueText(p) {
    if (p.arxiv) return "arXiv:" + p.arxiv + (p.primaryClass ? " [" + p.primaryClass + "]" : "");
    return p.venue || "";
  }

  // Bibliographic bits after the venue, in citation order.
  function detailBits(p) {
    var b = [];
    if (p.editors)   b.push(p.editors);
    if (p.publisher) b.push(p.publisher);
    if (p.location)  b.push(p.location);
    if (p.chapter)   b.push("ch. " + p.chapter);
    if (p.volume)    b.push("vol. " + p.volume);
    if (p.number)    b.push("no. " + p.number);
    if (p.artno)     b.push("art. " + p.artno);
    if (p.pages)     b.push("pp. " + p.pages);
    if (p.year)      b.push(String(p.year));
    return b;
  }

  function haystack(p) {
    return [p.title, (p.authors || []).join(" "), venueText(p), p.venue,
            (p.tags || []).join(" "), p.year].join(" ").toLowerCase();
  }

  /* ------------------------------- BibTeX -------------------------------- */

  var BIB_TYPE = {
    journal: "article", conference: "inproceedings", presentation: "inproceedings",
    chapter: "incollection", preprint: "misc", review: "unpublished"
  };

  function bibKey(p) {
    var first = (p.authors && p.authors[0]) || "anon";
    var surname = first.trim().split(/\s+/).pop().replace(/[^A-Za-z]/g, "").toLowerCase();
    var word = (p.title || "")
      .replace(/[^A-Za-z0-9\s]/g, " ").trim().split(/\s+/)
      .filter(function (w) { return w.length > 3; })[0] || "untitled";
    return surname + (p.year || "") + word.toLowerCase();
  }

  function bibtex(p) {
    var type = BIB_TYPE[p.type] || "misc";
    var f = [];
    var add = function (k, v) { if (v) f.push([k, String(v)]); };

    add("author", (p.authors || []).join(" and "));
    add("title", p.title);

    if (type === "article") add("journal", p.venue);
    else if (type === "inproceedings" || type === "incollection") add("booktitle", p.venue);
    else if (p.venue) add("howpublished", p.venue);

    add("editor", p.editors ? p.editors.replace(/,?\s*Eds?\.$/, "") : "");
    add("publisher", p.publisher);
    add("address", p.location);
    add("chapter", p.chapter);
    add("volume", p.volume);
    add("number", p.number);
    add("pages", p.pages ? p.pages.replace(/[–—]/g, "--") : "");
    add("year", p.year);

    if (p.arxiv) {
      add("eprint", p.arxiv);
      add("archivePrefix", "arXiv");
      add("primaryClass", p.primaryClass);
    }
    add("doi", p.doi);
    add("note", p.note);

    var pad = f.reduce(function (m, kv) { return Math.max(m, kv[0].length); }, 0);
    var body = f.map(function (kv) {
      return "  " + kv[0] + new Array(pad - kv[0].length + 1).join(" ") +
             " = {" + kv[1] + "}";
    }).join(",\n");

    return "@" + type + "{" + bibKey(p) + ",\n" + body + "\n}";
  }

  /* ------------------------------ rendering ------------------------------ */

  function authorsHTML(p) {
    return (p.authors || []).map(function (a) {
      return a === ME ? '<span class="me">' + esc(a) + "</span>" : esc(a);
    }).join(", ");
  }

  // Every destination here is a publisher, preprint server or repository, so
  // they all open in a new tab rather than navigating the reader away.
  function linksHTML(p, withBib) {
    var out = [];
    var A = '<a class="pub__link" target="_blank" rel="noopener" href="';
    if (p.doi) {
      out.push(A + 'https://doi.org/' + esc(p.doi) + '">DOI</a>');
    }
    if (p.arxiv) {
      out.push(A + 'https://arxiv.org/abs/' + esc(p.arxiv) + '">arXiv</a>');
    }
    if (p.pdf)  out.push(A + esc(p.pdf) + '">PDF</a>');
    if (p.code) out.push(A + esc(p.code) + '">Code</a>');
    if (withBib) {
      out.push('<button type="button" class="pub__link" data-bib="' +
               DATA.indexOf(p) + '">BibTeX</button>');
    }
    return out.length ? '<p class="pub__links">' + out.join("") + "</p>" : "";
  }

  // Compact bibliography row, used on the publications and research pages.
  function entryHTML(p) {
    var bits = detailBits(p);
    return '' +
      '<article class="pub" id="' + esc(p.id) + '">' +
        '<div class="pub__year">' + (p.year ? esc(p.year) : "&mdash;") + '</div>' +
        '<div class="pub__body">' +
          '<h3 class="pub__title">' + esc(p.title) + '</h3>' +
          '<p class="pub__authors">' + authorsHTML(p) + '</p>' +
          '<p class="pub__venue"><span class="v">' + esc(venueText(p)) + '</span>' +
            (bits.length ? ", " + esc(bits.join(", ")) : "") + '.' +
          '</p>' +
          (p.note ? '<span class="pub__note">' + esc(p.note) + "</span>" : "") +
          linksHTML(p, true) +
        '</div>' +
      '</article>';
  }

  // Highlight row for "Selected work" on the home page — same dated-list
  // shape as the news items directly below it.
  function workHTML(p) {
    return '' +
      '<li>' +
        '<time>' + esc(p.year || "") + '</time>' +
        '<div>' +
          '<h3>' + esc(p.title) + '</h3>' +
          '<p class="sw__authors">' + authorsHTML(p) + '</p>' +
          '<p class="sw__venue">' + esc(venueText(p)) + '</p>' +
          linksHTML(p, false) +
        '</div>' +
      '</li>';
  }

  /* -------------------------- home: selected work ------------------------ */

  var selectedEl = $("#selectedWork");
  if (selectedEl) {
    var picks = DATA.filter(function (p) { return p.selected; })
                    .sort(function (a, b) { return (b.year || 0) - (a.year || 0); });
    selectedEl.innerHTML = picks.map(workHTML).join("");
  }

  /* ------------------------- home: area pub counts ----------------------- */

  // An area with no papers yet is a direction, not an empty filter, so the
  // card points at the research page instead of a search that returns nothing.
  $$("[data-areacount]").forEach(function (el) {
    var key = el.getAttribute("data-areacount");
    var n = areaEntries(key).length;
    el.innerHTML = n
      ? n + " publication" + (n === 1 ? "" : "s") + " &rarr;"
      : "Current direction &rarr;";
    var card = el.closest("a.card");
    if (card) {
      card.setAttribute("href", n ? "publications.html?area=" + key
                                  : "research.html#" + key);
    }
  });

  /* ------------------------ home: frequent co-authors -------------------- */

  var coEl = $("[data-coauthors]");
  if (coEl) {
    var counts = {};
    DATA.forEach(function (p) {
      (p.authors || []).forEach(function (a) {
        if (a !== ME) counts[a] = (counts[a] || 0) + 1;
      });
    });
    var top = Object.keys(counts)
      .filter(function (a) { return counts[a] > 1; })
      .sort(function (a, b) { return counts[b] - counts[a] || a.localeCompare(b); })
      .slice(0, 14);
    coEl.innerHTML = top.map(function (a) {
      return '<span class="tag">' + esc(a) +
             '<b class="tag__n">' + counts[a] + "</b></span>";
    }).join("");
  }

  /* --------------------- research: key papers per area ------------------- */

  $$("[data-arealist]").forEach(function (el) {
    var key = el.getAttribute("data-arealist");
    var all = areaEntries(key);
    if (!all.length) return;   // a new direction has nothing to list yet
    el.innerHTML = all.slice(0, 3).map(entryHTML).join("") +
      '<p class="pub__count"><a href="publications.html?area=' + esc(key) + '">' +
      "All " + all.length + " papers in this area &rarr;</a></p>";
  });

  /* ------------------------- publications page --------------------------- */

  var listEl = $("#pubList");
  var searchEl = $("#pubSearch");
  var filtersEl = $("#pubFilters");
  var state = { filter: "all", q: "", area: "" };

  function matches(p) {
    var types = FILTERS[state.filter];
    if (types && types.indexOf(p.type) === -1) return false;
    if (state.area && !inArea(p, state.area)) return false;
    if (state.q && haystack(p).indexOf(state.q) === -1) return false;
    return true;
  }

  function render() {
    var shown = DATA.filter(matches);
    var html = "";
    var filtered = state.q || state.filter !== "all" || state.area;

    if (state.area && AREAS[state.area]) {
      html += '<p class="pub__count">Area: <strong>' + esc(AREAS[state.area].label) +
              '</strong> &middot; <a href="publications.html">clear</a></p>';
    }

    if (!shown.length) {
      listEl.innerHTML = html +
        '<p class="pub__empty">No publications match that filter.</p>';
      return;
    }

    if (filtered) {
      html += '<p class="pub__count">Showing ' + shown.length + " of " +
              DATA.length + " entries.</p>";
    }

    GROUPS.forEach(function (g) {
      var items = shown.filter(function (p) { return p.type === g.key; });
      if (!items.length) return;
      items.sort(function (a, b) { return (b.year || 0) - (a.year || 0); });
      html += '<section class="pub__group"><h2>' + g.label +
              '<span class="chip__n">' + items.length + "</span></h2>" +
              items.map(entryHTML).join("") + "</section>";
    });

    listEl.innerHTML = html;
  }

  if (listEl) {
    // Deep links: ?area=ai, ?type=journal, ?q=zero-knowledge
    var params = new URLSearchParams(window.location.search);
    var pArea = params.get("area");
    var pType = params.get("type");
    var pQ = params.get("q");
    if (pArea && AREAS[pArea]) state.area = pArea;
    if (pType && FILTERS[pType]) state.filter = pType;
    if (pQ) state.q = pQ.trim().toLowerCase();
    if (pQ && searchEl) searchEl.value = pQ;

    if (filtersEl) {
      // Annotate each chip with how many entries it covers.
      $$(".chip", filtersEl).forEach(function (chip) {
        var key = chip.getAttribute("data-filter");
        var types = FILTERS[key];
        var n = types
          ? DATA.filter(function (p) { return types.indexOf(p.type) !== -1; }).length
          : DATA.length;
        chip.insertAdjacentHTML("beforeend", '<span class="chip__n">' + n + "</span>");
        chip.classList.toggle("is-on", key === state.filter);
      });

      filtersEl.addEventListener("click", function (ev) {
        var chip = ev.target.closest(".chip");
        if (!chip) return;
        $$(".chip", filtersEl).forEach(function (c) {
          c.classList.toggle("is-on", c === chip);
        });
        state.filter = chip.getAttribute("data-filter");
        render();
      });
    }

    if (searchEl) {
      searchEl.addEventListener("input", function () {
        state.q = searchEl.value.trim().toLowerCase();
        render();
      });
    }

    render();
  }

  /* --------------------------- BibTeX dialog ----------------------------- */

  var dlg = $("#bibDlg");
  var bibOut = $("#bibOut");
  var bibCopy = $("#bibCopy");

  if (dlg && bibOut) {
    document.addEventListener("click", function (ev) {
      var btn = ev.target.closest("[data-bib]");
      if (!btn) return;
      var p = DATA[Number(btn.getAttribute("data-bib"))];
      if (!p) return;
      bibOut.textContent = bibtex(p);
      if (dlg.showModal) dlg.showModal();
      else window.prompt("BibTeX", bibOut.textContent);
    });
  }

  if (bibCopy && bibOut) {
    bibCopy.addEventListener("click", function () {
      var reset = function (label) {
        bibCopy.textContent = label;
        setTimeout(function () { bibCopy.textContent = "Copy"; }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(bibOut.textContent)
          .then(function () { reset("Copied"); }, function () { reset("Select and copy"); });
      } else {
        var r = document.createRange();
        r.selectNodeContents(bibOut);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(r);
        reset("Select and copy");
      }
    });
  }
})();
