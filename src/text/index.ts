export function textLimitor(text: string, limit: number = 60, content = "...") {
  if (text.length > limit) {
    return text.slice(0, limit) + content;
  }
  return text;
}

export class Case {
  constructor(private sentence: string) {}

  /**
   * "type case" 👉 "TYPE CASE"
   */
  public toUpperCase() {
    this.sentence = this.sentence.toLocaleUpperCase();
    return this;
  }

  /**
   * "tYpE cASE" 👉 type case"
   */
  public toLowerCase() {
    this.sentence = this.sentence.toLocaleLowerCase();
    return this;
  }

  /**
   * "tYpe cAse" 👉 "Type Case"
   */
  public toStartCase() {
    const words = this.sentence.split(" ");

    let nSentence = "";
    words.forEach((word, i, { length }) => {
      nSentence +=
        word.charAt(0).toLocaleUpperCase() + word.slice(1).toLocaleLowerCase();

      const isLastWord = i === length - 1;
      if (!isLastWord) {
        nSentence += " "; // add space
      }
    });

    this.sentence = nSentence;
    return this;
  }

  /**
   * "type cAsE" 👉 "typeCase"
   */
  public toCamelCase() {
    const words = this.sentence.split(" ");

    let nSentence = "";
    words.forEach((word, i) => {
      // first word lower case
      if (i == 0) {
        nSentence += word.toLocaleLowerCase();
      }

      // second word onward start case
      else {
        nSentence +=
          word.charAt(0).toLocaleUpperCase() +
          word.slice(1).toLocaleLowerCase();
      }
    });

    this.sentence = nSentence;
    return this;
  }

  /**
   * "tyPe cAsE" 👉 "TypeCase"
   */
  public toPascalCase() {
    const words = this.sentence.split(" ");

    let nSentence = "";
    words.forEach((word) => {
      // every word start case
      nSentence +=
        word.charAt(0).toLocaleUpperCase() + word.slice(1).toLocaleLowerCase();
    });

    this.sentence = nSentence;
    return this;
  }

  /**
   * "tyPe cAsE" 👉 "type_case"
   */
  public toSnakeCase() {
    const words = this.sentence.split(" ");

    let nSentence = "";
    words.forEach((word, i, { length }) => {
      nSentence += word.toLocaleLowerCase();

      const isLastWord = i === length - 1;
      if (!isLastWord) {
        nSentence += "_"; // add _
      }
    });

    this.sentence = nSentence;
    return this;
  }

  /**
   * "tyPe cAsE" 👉 "type-case"
   */
  public toKebabCase() {
    const words = this.sentence.split(" ");

    let nSentence = "";
    words.forEach((word, i, { length }) => {
      nSentence += word.toLocaleLowerCase();

      const isLastWord = i === length - 1;
      if (!isLastWord) {
        nSentence += "-"; // add -
      }
    });

    this.sentence = nSentence;
    return this;
  }

  public get() {
    return this.sentence;
  }
}

export function onlyAlphanumeric(text: string) {
  let f_text = "";

  for (let index = 0; index < text.length; index++) {
    const char = text[index];
    const isAlphaNumeric = char.match(/^[0-9a-zA-Z]/);

    // if no alpha numberic then replace it with its char code
    if (!isAlphaNumeric) {
      f_text += char.charCodeAt(0) + "";
    } else {
      f_text += char;
    }
  }

  return f_text;
}
