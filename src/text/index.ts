export function textLimitor(text: string, limit: number = 60, content = "...") {
  if (text.length > limit) {
    return text.slice(0, limit) + content;
  }
  return text;
}

export function toStartCase(text: string) {
  if (typeof text !== "string" || !text) console.error("string not provided");

  text = text.toLowerCase();
  text = text.charAt(0).toUpperCase() + text.slice(1);
  return text;
}
