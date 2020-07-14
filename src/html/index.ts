export function plainText2HTML(text: string) {
  return text.replace(/\n/g, "<br />");
}
