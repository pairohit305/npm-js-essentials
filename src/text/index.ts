export function textLimitor(text: string, limit: number = 60, content = "...") {
  if (text.length > limit) {
    return text.slice(0, limit) + content;
  }
  return text;
}

export function toStartCase(
  text: string,
  options?: { handleUnderscore: boolean }
) {
  if (options?.handleUnderscore) {
    text = text.split("_").join(" ");
  }
  text = text.toLowerCase();
  text = text.charAt(0).toUpperCase() + text.slice(1);
  return text;
}

export function onlyAlphanumeric(text: string) {
  let f_text = "";

  for (let index = 0; index < text.length; index++) {
    const char = text[index];
    const isAlphaNumeric = char.match(/^[0-9a-z]/);

    // if no alpha numberic then replace it with its char code
    if (!isAlphaNumeric) {
      f_text += char.charCodeAt(0) + "";
    } else {
      f_text += char;
    }
  }

  return f_text;
}
