# Working agreement for this Quartz site

## Repository role

This is the public Quartz site and the Obsidian vault. `content/` is the vault
and the publishable content root. Treat it as editorial content: preserve the
author's wording, front matter, filenames, and link choices unless a requested
change requires otherwise.

## Content and generated files

- Write reMarkable output only to
  `content/assets/remarkable/<notebook-slug>/<page-id>.svg`.
- SVG names are stable reMarkable page UUIDs. Never rename them based on title,
  page order, or display position.
- The publisher owns SVG generation; this repository may embed, style, or
  remove an SVG only when explicitly requested.
- `public/`, `node_modules/`, `.quartz-cache/`, and `tsconfig.tsbuildinfo` are
  generated or local and must not be hand-edited or committed.
- `content/.obsidian/` is local vault configuration and intentionally ignored.
  The matching CSS snippet is
  `content/.obsidian/snippets/remarkable-floats.css`.
- Never add publisher credentials, device/session tokens, raw `.rm` downloads,
  private normalized page JSON, or publisher manifests to this repository.

## reMarkable embeds and column grammar

Embed a normal page directly:

```md
![[assets/remarkable/project-notes/<page-id>.svg]]
```

Use an explicit, responsive column region for bounded side-by-side content:

```md
> [!col]
>
>> [!col-md-1]
>> Text in the narrower column.
>
>> [!col-md-4]
>>> [!align-center]
>>> ![[assets/remarkable/project-notes/<page-id>.svg|240]]
```

- `col-md-N` uses integer relative weights from 1 through 10. `col-md-1`
  beside `col-md-4` is a 20/80 split.
- Alignment is opt-in. Omit an `align-*` child for normal Markdown flow.
- Available alignment callouts are `align-center`, `align-top`, `align-bottom`,
  `align-left`, `align-right`, `align-top-left`, `align-top-right`,
  `align-bottom-left`, and `align-bottom-right`.
- Put the aligned content inside `>>>` lines. Keep a blank line before and
  after a callout region.
- The custom transformer at
  `quartz/plugins/local/remarkable-svg-image/index.js` converts reMarkable SVG
  wikilinks to `<img>` elements so transparent SVGs and dark mode work. Keep
  the asset path rooted beneath `assets/remarkable/`.
- Any Quartz layout CSS change that affects columns or reMarkable images must
  have an equivalent update in the ignored Obsidian snippet above, so Reading
  View, Live Preview, and the published site agree.

## Verification

Run from repository root:

```sh
npm run check
npx quartz build
```

`npm run check` runs `tsc --noEmit` and Prettier's check mode. Use `npm run
format` only after reviewing its formatting scope; it rewrites files. Validate
new or changed reMarkable embeds with a local Quartz build, particularly from
nested note paths.

## Change discipline

- Read `quartz.config.yaml`, not `quartz.config.default.yaml`, for active site
  configuration.
- Preserve unrelated dirty-worktree changes.
- Prefer changes to `quartz/styles/custom.scss` and local plugins over editing
  Quartz vendored internals.
- Do not use the custom float aliases for new article layouts. They remain for
  backward compatibility; use bounded `col` callouts instead.
