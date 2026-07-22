# Blog content

This directory contains the source and generated HTML for standalone blog notes. The public index remains at [blog.jemdoc](../blog.jemdoc), where articles are grouped by reader-facing category. Existing article paths are kept stable even when the public category changes.

## Layout

```text
blogs/
├── README.md
├── blog.conf
├── blog-zh.conf
├── blog-note.css
├── blog-sidebar.js
├── math-render.js
├── book-based-question-banks/
│   ├── mosteller-probability-problems.jemdoc / .html
│   ├── crack-heard-on-the-street-question-bank.jemdoc / .html
│   └── zhou-quant-finance-interview-question-bank.jemdoc / .html
├── mathematical-problems-and-puzzles/
│   ├── brainteasers.jemdoc
│   └── brainteasers.html
└── technical-notes/
    ├── algorithms-for-quant-interviews.jemdoc / .html
    ├── algorithms-for-quant-interviews-en.jemdoc / .html
    ├── hkust-hpc-server-guide.jemdoc
    ├── hkust-hpc-server-guide.html
    ├── numpy-for-quant-interviews.jemdoc / .html
    ├── numpy-for-quant-interviews-en.jemdoc / .html
    ├── optimal-quota-allocation-under-random-resets.jemdoc / .html
    ├── pandas-for-quant-interviews.jemdoc / .html
    ├── pandas-for-quant-interviews-en.jemdoc / .html
    ├── python-for-quant-interviews.jemdoc / .html
    ├── python-for-quant-interviews-en.jemdoc / .html
    ├── quant-interview-question-bank.jemdoc / .html
    ├── quant-math-review.jemdoc / .html
    ├── quant-math-review-en.jemdoc / .html
    ├── scikit-learn-for-quant-interviews.jemdoc / .html
    └── scikit-learn-for-quant-interviews-en.jemdoc / .html
```

## Public categories

| Public category | Subcategory | Intended content |
| --- | --- | --- |
| Quantitative Career Resources | Study Guides | Mathematics review, Python fundamentals, NumPy, pandas, scikit-learn, and algorithms for quantitative research interviews |
| Quantitative Career Resources | Problem Sets | Assorted brainteasers, the general mathematics question bank, and the independently adapted book-based question banks |
| Technical Notes | — | Operational guides, command references, and self-contained mathematical or technical essays |

The legacy `technical-notes/`, `book-based-question-banks/`, and `mathematical-problems-and-puzzles/` paths are retained so existing public URLs continue to work. Their interview-preparation articles are presented together under Quantitative Career Resources on the public Blog index.

Add future categories as lowercase, kebab-case sibling directories. Keep every article's `.jemdoc` source and generated `.html` file together in its category directory.

## Article conventions

- Use a short, descriptive, lowercase filename.
- Keep the public article link in the matching section of the root `blog.jemdoc`.
- Keep every public article title and its `blog.jemdoc` link label in English, including on Chinese and bilingual pages.
- Use `blogs/blog-note.css` for the shared note layout instead of creating per-article styling.
- Load `blogs/blog-sidebar.js` on every standalone note. It builds a responsive section sidebar from the article's level-two headings, so no hand-maintained sidebar markup is needed.
- For bilingual notes with separate pages, keep the unsuffixed filename as the default Chinese page and use `-en` for English. Add reciprocal language links near the page title.
- Keep the Quantitative Research Interview Mathematics Review checklist-first: place a requested concept under its natural module, keep its summary visually identical to an ordinary checklist row, and put the explanation in a default-closed `<details class="concept-detail">` block with an inline Expand\/Collapse label. Mirror substantive additions between the Chinese and English pages.
- Keep the Python interview tutorial series split into Python fundamentals, NumPy, pandas, and scikit-learn. Examples should identify inputs, explain non-obvious commands, show expected output, and call out common failure modes.
- The quantitative research mathematics question bank and book-based question banks are intentionally single-page bilingual notes: each question includes Chinese and English wording, while answers remain in English.
- Math-heavy bilingual notes load `blogs/math-render.js`, which configures MathJax and provides responsive equation layout. Keep raw TeX in the `.jemdoc` source and use `noeqs` so the legacy image equation renderer stays disabled.
- Nested articles are standalone pages with a visible link back to `../../blog.html`; they intentionally do not duplicate the root `MENU`.
- Prefer concise prose, short command blocks, official primary links, and obvious uppercase placeholders such as `YOUR_USERNAME`.
- Never publish passwords, tokens, SSH private keys, account balances, or non-public infrastructure details. Include personal usernames or group/account identifiers only when the site owner explicitly asks for them.

Use this header for a new note at the same directory depth:

```text
# jemdoc: nofooter, nodefaultcss, noeqs, addcss{../blog-note}, addjs{../math-render}, addjs{../blog-sidebar}
= Article title
[../../blog.html ← 返回 Blogs]
```

Generate from the repository root. The Blog-specific configuration adds the
mobile viewport metadata required by the responsive article layout:

```bash
python2 jemdoc.py -c blogs/blog.conf blogs/technical-notes/example.jemdoc
python2 jemdoc.py -c blogs/blog-zh.conf blogs/technical-notes/example.jemdoc
python2 jemdoc.py blog.jemdoc
```

Commit the article source, generated HTML, shared assets if changed, and the updated `blog.jemdoc` / `blog.html` together.
