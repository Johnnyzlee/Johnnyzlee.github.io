# Blog content

This directory contains the source and generated HTML for standalone blog notes. The public index remains at [blog.jemdoc](../blog.jemdoc), where articles are grouped by category.

## Layout

```text
blogs/
├── README.md
├── blog.conf
├── blog-note.css
├── mathematical-problems-and-puzzles/
│   ├── brainteasers.jemdoc
│   └── brainteasers.html
└── technical-notes/
    ├── hkust-hpc-server-guide.jemdoc
    └── hkust-hpc-server-guide.html
```

## Categories

| Directory | Public category | Intended content |
| --- | --- | --- |
| `mathematical-problems-and-puzzles/` | Mathematical Problems & Puzzles | Mathematical notes and numbered brainteasers with hidden answers |
| `technical-notes/` | Technical Notes | Short operational guides, command references, and infrastructure notes |

Add future categories as lowercase, kebab-case sibling directories. Keep every article's `.jemdoc` source and generated `.html` file together in its category directory.

## Article conventions

- Use a short, descriptive, lowercase filename.
- Keep the public article link in the matching section of the root `blog.jemdoc`.
- Use `blogs/blog-note.css` for the shared note layout instead of creating per-article styling.
- Nested articles are standalone pages with a visible link back to `../../blog.html`; they intentionally do not duplicate the root `MENU`.
- Prefer concise prose, short command blocks, official primary links, and obvious uppercase placeholders such as `YOUR_USERNAME`.
- Never publish passwords, tokens, SSH private keys, account balances, or non-public infrastructure details. Include personal usernames or group/account identifiers only when the site owner explicitly asks for them.

Use this header for a new note at the same directory depth:

```text
# jemdoc: nofooter, nodefaultcss, addcss{../blog-note}
= Article title
[../../blog.html ← 返回 Blogs]
```

Generate from the repository root. The Blog-specific configuration adds the
mobile viewport metadata required by the responsive article layout:

```bash
python2 jemdoc.py -c blogs/blog.conf blogs/technical-notes/example.jemdoc
python2 jemdoc.py blog.jemdoc
```

Commit the article source, generated HTML, shared assets if changed, and the updated `blog.jemdoc` / `blog.html` together.
