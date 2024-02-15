export function ellipsize(text, limit = 60, content = "...") {
    if (text.length > limit) {
        return text.slice(0, limit) + content;
    }
    return text;
}
export function alphaNumericConvertor(text) {
    let f_text = "";
    for (let index = 0; index < text.length; index++) {
        const char = text[index];
        const isAlphaNumeric = char.match(/^[0-9a-zA-Z]/);
        if (!isAlphaNumeric) {
            f_text += char.charCodeAt(0) + "";
        }
        else {
            f_text += char;
        }
    }
    return f_text;
}
