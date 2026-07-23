// Strips common Markdown syntax down to plain text, for excerpts and meta
// descriptions where raw "## " / "**bold**" would otherwise show literally.
export function toPlainText(markdown: string, maxLength?: number): string {
  const plain = markdown
    .replace(/[#*_`>~-]/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();

  if (!maxLength || plain.length <= maxLength) return plain;
  return `${plain.slice(0, maxLength - 1).trimEnd()}…`;
}
