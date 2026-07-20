# Blog content

This directory contains the source and generated HTML for standalone blog notes. The public index remains at [blog.jemdoc](../blog.jemdoc), where articles are grouped by category.

## Layout

```text
blogs/
├── README.md
├── blog.conf
├── blog-zh.conf
├── blog-note.css
├── math-render.js
├── mathematical-problems-and-puzzles/
│   ├── brainteasers.jemdoc
│   └── brainteasers.html
└── technical-notes/
    ├── algorithms-for-quant-interviews.jemdoc / .html
    ├── algorithms-for-quant-interviews-en.jemdoc / .html
    ├── hkust-hpc-server-guide.jemdoc
    ├── hkust-hpc-server-guide.html
    ├── python-for-quant-interviews.jemdoc / .html
    ├── python-for-quant-interviews-en.jemdoc / .html
    ├── quant-interview-question-bank.jemdoc / .html
    ├── quant-math-review.jemdoc / .html
    └── quant-math-review-en.jemdoc / .html
```

## Categories

| Directory | Public category | Intended content |
| --- | --- | --- |
| `mathematical-problems-and-puzzles/` | Mathematical Problems & Puzzles | Mathematical notes and numbered brainteasers with hidden answers |
| `technical-notes/` | Technical Notes | Operational guides, command references, interview study guides, and technical notes |

Add future categories as lowercase, kebab-case sibling directories. Keep every article's `.jemdoc` source and generated `.html` file together in its category directory.

## Article conventions

- Use a short, descriptive, lowercase filename.
- Keep the public article link in the matching section of the root `blog.jemdoc`.
- Use `blogs/blog-note.css` for the shared note layout instead of creating per-article styling.
- For bilingual notes with separate pages, keep the unsuffixed filename as the default Chinese page and use `-en` for English. Add reciprocal language links near the page title.
- The quantitative research mathematics question bank is intentionally a single page: each question includes Chinese and English wording, while answers remain in English.
- Math-heavy bilingual notes load `blogs/math-render.js`, which configures MathJax and provides responsive equation layout. Keep raw TeX in the `.jemdoc` source and use `noeqs` so the legacy image equation renderer stays disabled.
- Nested articles are standalone pages with a visible link back to `../../blog.html`; they intentionally do not duplicate the root `MENU`.
- Prefer concise prose, short command blocks, official primary links, and obvious uppercase placeholders such as `YOUR_USERNAME`.
- Never publish passwords, tokens, SSH private keys, account balances, or non-public infrastructure details. Include personal usernames or group/account identifiers only when the site owner explicitly asks for them.

Use this header for a new note at the same directory depth:

```text
# jemdoc: nofooter, nodefaultcss, noeqs, addcss{../blog-note}, addjs{../math-render}
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
