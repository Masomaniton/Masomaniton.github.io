/**
 * Keep Obsidian's wikilink workflow while avoiding Quartz's default SVG
 * `<object>` renderer. CSS filters applied to an object flatten its transparent
 * canvas; a normal image preserves alpha and can be theme-adjusted safely.
 */
export const manifest = {
  name: "remarkable-svg-image",
  displayName: "reMarkable SVG image embeds",
  description: "Renders bare reMarkable SVG wikilink embeds as images",
  version: "1.0.0",
  category: "transformer",
  defaultOrder: 25,
}

function escapeHtmlAttribute(value) {
  return value.replace(/[&"'<>]/g, (character) => {
    const entities = {
      "&": "&amp;",
      '"': "&quot;",
      "'": "&#39;",
      "<": "&lt;",
      ">": "&gt;",
    }
    return entities[character]
  })
}

function siteAssetPath(assetPath) {
  // This transformer emits raw HTML. Unlike Markdown image URLs, raw HTML is
  // not rebased by Quartz, so an asset path must be rooted at the site rather
  // than relative to a nested note such as /vow/my-note.
  return `/${assetPath}`
}

function imageHtml(attributes) {
  // The Markdown source owns block boundaries. Keep an embed on its own line,
  // then add a blank line before the following paragraph so Obsidian and
  // Quartz parse the same document structure.
  return `<img ${attributes}>`
}

export default function remarkableSvgImage() {
  return {
    name: "RemarkableSvgImage",
    textTransform(_ctx, source) {
      return source.replace(
        /!\[\[(assets\/remarkable\/[^\]|]+\.svg)(?:\|([^\]]+))?\]\]/gi,
        (match, assetPath, modifier) => {
          if (modifier === undefined) return `![](${assetPath})`

          if (/^\d+$/.test(modifier)) {
            // Quartz's regular SVG wikilink renderer uses an object for this
            // form. An image retains alpha, so its dark-mode filter works.
            return imageHtml(
              `class="remarkable-sized-image" src="${escapeHtmlAttribute(siteAssetPath(assetPath))}" width="${modifier}" alt=""`,
            )
          }

          const [placement, requestedWidth, ...extraModifiers] = modifier
            .split("|")
            .map((part) => part.trim())
          const side = placement.toLowerCase()
          const hasValidWidth = requestedWidth === undefined || /^\d+$/.test(requestedWidth)

          if (
            (side === "left" || side === "right") &&
            hasValidWidth &&
            extraModifiers.length === 0
          ) {
            // In a note: ![[assets/remarkable/notebook/page.svg|right]]
            // or:        ![[assets/remarkable/notebook/page.svg|right|240]]
            // The matching Obsidian CSS snippet styles this same alias there.
            const widthAttribute = requestedWidth === undefined ? "" : ` width="${requestedWidth}"`
            return imageHtml(
              `class="remarkable-float remarkable-float-${side}" src="${escapeHtmlAttribute(siteAssetPath(assetPath))}"${widthAttribute} alt=""`,
            )
          }

          // Preserve standard Quartz behavior for ordinary aliases.
          return match
        },
      )
    },
  }
}
