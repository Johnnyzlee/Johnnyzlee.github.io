# Blog content

This directory contains the source and generated HTML for Blog subject indexes and standalone notes. The public category index remains at [blog.jemdoc](../blog.jemdoc). Directories follow the public categories and subcategories; within Study Guides, the three subject indexes and their notes share the same directory.

## Layout

```text
blogs/
├── README.md
├── blog.conf
├── blog-zh.conf
├── blog-note.css
├── blog-sidebar.js
├── math-render.js
├── quantitative-career-resources/
│   ├── study-guides/
│   │   ├── mathematics.jemdoc / .html
│   │   ├── algorithms.jemdoc / .html
│   │   ├── programming.jemdoc / .html
│   │   ├── quant-math-review.jemdoc / .html
│   │   ├── quant-math-review-en.jemdoc / .html
│   │   ├── python-for-quant-interviews.jemdoc / .html
│   │   ├── python-for-quant-interviews-en.jemdoc / .html
│   │   ├── numpy-for-quant-interviews.jemdoc / .html
│   │   ├── numpy-for-quant-interviews-en.jemdoc / .html
│   │   ├── pandas-for-quant-interviews.jemdoc / .html
│   │   ├── pandas-for-quant-interviews-en.jemdoc / .html
│   │   ├── scikit-learn-for-quant-interviews.jemdoc / .html
│   │   ├── scikit-learn-for-quant-interviews-en.jemdoc / .html
│   │   ├── algorithms-for-quant-interviews.jemdoc / .html
│   │   └── algorithms-for-quant-interviews-en.jemdoc / .html
│   └── problem-sets/
│       ├── brainteasers.jemdoc / .html
│       ├── quant-interview-question-bank.jemdoc / .html
│       ├── mosteller-probability-problems.jemdoc / .html
│       ├── stefanica-150-quant-interview-questions.jemdoc / .html
│       ├── crack-heard-on-the-street-question-bank.jemdoc / .html
│       └── zhou-quant-finance-interview-question-bank.jemdoc / .html
├── technical-notes/
│   ├── git-github-working-reference.jemdoc / .html
│   ├── hkust-hpc4-personal-playbook.jemdoc
│   └── hkust-hpc4-personal-playbook.html
└── arsenal/
    └── raycast-workflow.jemdoc / .html
```

## Public categories

| Public category | Subcategory | Intended content |
| --- | --- | --- |
| Quantitative Career Resources | Study Guides | Mathematics, Algorithms, and Programming subject indexes, each linking to the available notes and their language versions |
| Quantitative Career Resources | Problem Sets | Assorted brainteasers, the general mathematics question bank, and the independently adapted book-based question banks |
| Technical Notes | — | Operational guides, command references, and self-contained mathematical or technical essays |
| Arsenal | — | Personal toolbox: tools, workflows, and configurations for academic work and daily life |

The top-level category directory and any subcategory directory must use the same English label as the public Blog index, converted to lowercase kebab case. When an article changes public category, move its `.jemdoc` and generated `.html` together and update the affected root or subject indexes and relative asset paths in the same change.

Add future categories as lowercase, kebab-case sibling directories. Add subcategories beneath their public parent category. Keep every article's `.jemdoc` source and generated `.html` file together.

## Study Guides navigation

Readers follow **Blog → subject index → note language version**. All files below live directly in `quantitative-career-resources/study-guides/`; the subject indexes do not introduce another directory level or change existing note URLs.

| Subject index | Current notes (Chinese filename / English filename) |
| --- | --- |
| `mathematics.html` | `quant-math-review.html` / `quant-math-review-en.html` |
| `algorithms.html` | `algorithms-for-quant-interviews.html` / `algorithms-for-quant-interviews-en.html` |
| `programming.html` | `python-for-quant-interviews.html` / `python-for-quant-interviews-en.html`; `numpy-for-quant-interviews.html` / `numpy-for-quant-interviews-en.html`; `pandas-for-quant-interviews.html` / `pandas-for-quant-interviews-en.html`; `scikit-learn-for-quant-interviews.html` / `scikit-learn-for-quant-interviews-en.html` |

Subject indexes list available notes and language links. They use English titles, `blogs/blog.conf`, the shared `blog-note.css` and `blog-sidebar.js`, and a `../../../blog.html` backlink. Since these indexes contain no chapter headings, the sidebar script leaves them as simple link pages. They do not need `math-render.js`.

When adding, removing, or renaming a Study Guides note, update and regenerate its subject index along with the affected note pages. Update and regenerate `blog.jemdoc` only when its own links or categories change. Problem Sets, Technical Notes, and Arsenal continue to list their notes directly in `blog.jemdoc`.

## Article conventions

- Use a short, descriptive, lowercase filename.
- Keep the public article link in the matching section of the root `blog.jemdoc`, or in its subject index. Study Guides links to `mathematics.jemdoc`, `algorithms.jemdoc`, and `programming.jemdoc` under `quantitative-career-resources/study-guides/`. Each subject index lists only available notes and language links.
- Keep every public article title and its `blog.jemdoc` link label in English, including on Chinese and bilingual pages.
- Use `blogs/blog-note.css` for the shared note layout instead of creating per-article styling.
- Load `blogs/blog-sidebar.js` on every standalone note. It builds a responsive section sidebar from the article's level-two headings, so no hand-maintained sidebar markup is needed.
- For bilingual notes with separate pages, keep the unsuffixed filename as the default Chinese page and use `-en` for English. Add reciprocal language links near the page title.
- Keep the Quantitative Research Interview Mathematics Review checklist-first: place a requested concept under its natural module, keep its summary visually identical to an ordinary checklist row, and put the explanation in a default-closed `<details class="concept-detail">` block with an inline Expand\/Collapse label. Mirror substantive additions between the Chinese and English pages.
- Keep that review's “提纲 / Outline” aligned with the body's chapter order, titles, and scope. Each outline entry links to the corresponding chapter; update both language versions when the chapter structure changes.
- In the Quantitative Research Interview Mathematics Question Bank, write heading difficulty labels as `\[C\]`, `\[M\]`, or `\[H\]` for Core, Medium, and Hard. `blog-sidebar.js` turns them into colored, accessible tags while retaining the compact letters in the generated HTML fallback.
- Keep the Python interview tutorial series split into Python fundamentals, NumPy, pandas, and scikit-learn. Examples should identify inputs, explain non-obvious commands, show expected output, and call out common failure modes.
- The quantitative research mathematics question bank and book-based question banks are intentionally single-page bilingual notes: each question includes Chinese and English wording, while answers remain in English.
- Math-heavy bilingual notes load `blogs/math-render.js`, which configures MathJax and provides responsive equation layout. Keep raw TeX in the `.jemdoc` source and use `noeqs` so the legacy image equation renderer stays disabled.
- Nested articles are standalone pages with a visible link back to the root `blog.html`; they intentionally do not duplicate the root `MENU`. Category-level notes use `../../blog.html`; notes inside a subcategory use `../../../blog.html`.
- Prefer concise prose, short command blocks, official primary links, and obvious uppercase placeholders such as `YOUR_USERNAME`.
- Never publish passwords, tokens, SSH private keys, account balances, or non-public infrastructure details. Include personal usernames or group/account identifiers only when the site owner explicitly asks for them.

Use this header for a new note inside a subcategory such as `quantitative-career-resources/study-guides/`:

```text
# jemdoc: nofooter, nodefaultcss, noeqs, addcss{../../blog-note}, addjs{../../math-render}, addjs{../../blog-sidebar}
= Article title
[../../../blog.html ← 返回 Blogs]
```

For a category-level note under `technical-notes/`, use one fewer `../` component for the shared assets and Blog backlink.

Generate from the repository root. The Blog-specific configuration adds the
mobile viewport metadata required by the responsive article layout:

```bash
# Bilingual mathematics note
python2 jemdoc.py -c blogs/blog.conf blogs/quantitative-career-resources/study-guides/quant-math-review-en.jemdoc
python2 jemdoc.py -c blogs/blog-zh.conf blogs/quantitative-career-resources/study-guides/quant-math-review.jemdoc

# Subject indexes: run for the indexes that changed
python2 jemdoc.py -c blogs/blog.conf blogs/quantitative-career-resources/study-guides/mathematics.jemdoc
python2 jemdoc.py -c blogs/blog.conf blogs/quantitative-career-resources/study-guides/algorithms.jemdoc
python2 jemdoc.py -c blogs/blog.conf blogs/quantitative-career-resources/study-guides/programming.jemdoc

# Category-level note
python2 jemdoc.py -c blogs/blog.conf blogs/technical-notes/git-github-working-reference.jemdoc

# Root Blog index, when changed
python2 jemdoc.py blog.jemdoc
```

When committing an authorized change, include each changed note or index source with its generated HTML, plus any changed shared assets. This includes affected subject indexes and, when changed, `blog.jemdoc` / `blog.html`.
