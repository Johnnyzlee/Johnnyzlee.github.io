# Blog content

This directory contains the source and generated HTML for standalone blog notes. The public index remains at [blog.jemdoc](../blog.jemdoc). The filesystem hierarchy mirrors the reader-facing category and subcategory hierarchy shown on that page.

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
├── arsenal/
│   └── raycast-workflow.jemdoc / .html
└── world-models/
    ├── world-models-learning-note.jemdoc / .html
    └── world-models-for-communication-networks.jemdoc / .html
```

## Public categories

| Public category | Subcategory | Intended content |
| --- | --- | --- |
| Quantitative Career Resources | Study Guides | Mathematics review, Python fundamentals, NumPy, pandas, scikit-learn, and algorithms for quantitative research interviews |
| Quantitative Career Resources | Problem Sets | Assorted brainteasers, the general mathematics question bank, and the independently adapted book-based question banks |
| Technical Notes | — | Operational guides, command references, and self-contained mathematical or technical essays |
| Arsenal | — | Personal toolbox: tools, workflows, and configurations for academic work and daily life |
| World Models | — | Chinese-first learning notes on world models, latent dynamics, planning, and related agent research |

The top-level category directory and any subcategory directory must use the same English label as the public Blog index, converted to lowercase kebab case. When an article changes public category, move its `.jemdoc` and generated `.html` together and update the root index and relative asset paths in the same change.

Add future categories as lowercase, kebab-case sibling directories. Add subcategories beneath their public parent category. Keep every article's `.jemdoc` source and generated `.html` file together.

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
python2 jemdoc.py -c blogs/blog.conf blogs/quantitative-career-resources/study-guides/example-en.jemdoc
python2 jemdoc.py -c blogs/blog-zh.conf blogs/quantitative-career-resources/study-guides/example.jemdoc
python2 jemdoc.py -c blogs/blog.conf blogs/technical-notes/example.jemdoc
python2 jemdoc.py blog.jemdoc
```

Commit the article source, generated HTML, shared assets if changed, and the updated `blog.jemdoc` / `blog.html` together.
