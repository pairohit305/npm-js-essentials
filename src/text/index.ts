export function textLimitor(text: string, limit: number = 60, content = "...") {
  if (!text) return "";

  if (text.length > limit) {
    return text.slice(0, limit) + content;
  }
  return text;
}
