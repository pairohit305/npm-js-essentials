export function ellipsize(text: string, limit: number = 60, content = "...") {
  if (text.length > limit) {
    return text.slice(0, limit) + content;
  }
  return text;
}

/**
 * a0b#z 👉 a0b35z
 *
 * Char that are not alpha numeric, will be replaced with its char code
 * eg. # => 35
 */
export function alphaNumericConvertor(text: string) {
  let f_text = "";

  for (let index = 0; index < text.length; index++) {
    const char = text[index];
    const isAlphaNumeric = char.match(/^[0-9a-zA-Z]/);

    if (!isAlphaNumeric) {
      f_text += char.charCodeAt(0) + "";
    } else {
      f_text += char;
    }
  }

  return f_text;
}
