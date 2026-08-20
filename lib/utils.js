import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function splitHighlightedText(text, highlightWords = []) {
  if (!text) {
    return []
  }

  const keywords = [...new Set(highlightWords.filter(Boolean))].sort(
    (a, b) => b.length - a.length
  )

  if (keywords.length === 0) {
    return [{ text, highlighted: false }]
  }

  const escaped = keywords.map((word) =>
    word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  )
  const pattern = new RegExp(
    `(?<![A-Za-z0-9])(${escaped.join("|")})(?![A-Za-z0-9])`,
    "gi"
  )

  const segments = []
  let lastIndex = 0

  for (const match of text.matchAll(pattern)) {
    if (match.index > lastIndex) {
      segments.push({
        text: text.slice(lastIndex, match.index),
        highlighted: false,
      })
    }
    segments.push({ text: match[0], highlighted: true })
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    segments.push({ text: text.slice(lastIndex), highlighted: false })
  }

  return segments.length ? segments : [{ text, highlighted: false }]
}
