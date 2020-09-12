import { contains } from "./array";

export function randomInteger(upper: number, lower = 0) {
  // error checking
  if (typeof upper !== "number" || typeof lower !== "number") return -1;
  if (!Number.isInteger(upper) || !Number.isInteger(lower)) return -1;
  if (upper < lower) return -1;

  const diff = upper + 1 - lower;
  return lower + Math.floor(Math.random() * diff);
}

export function randomFloat(upper: number, lower = 0, decimal = 2) {
  // error checking
  if (typeof upper !== "number" || typeof lower !== "number") return -1;
  if (upper < lower) return -1;

  const diff = upper - lower;
  return Number((lower + Math.random() * diff).toFixed(decimal));
}

// returns random alphabet from a to z by default if you want to
// add capital alphabets then set the flag includeCapital to true;
export function randomAlphabet(includeCapital = false) {
  const alphabets = includeCapital
    ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    : "abcdefghijklmnopqrstuvwxyz";

  return alphabets.charAt(randomInteger(includeCapital ? 52 : 26));
}

export function randomNaturalArray(
  upper: number,
  count: number,
  repeat = false,
  exclude?: number[]
) {
  const array: number[] = [];

  if (!repeat && !exclude) {
    for (let i = 0; i < count; i++) {
      let random: number;
      while (true) {
        random = randomInteger(upper, 1);
        if (!contains(array, random)) {
          break;
        }
      }
      array.push(random);
    }
  } else if (!repeat && exclude) {
    if (count > upper - exclude.length)
      throw new Error(
        `randomNaturalArray function expect count to be less than or equal to ${
          upper - exclude.length
        } for your requirement`
      );
    for (let i = 0; i < count; i++) {
      let random: number;
      while (true) {
        random = randomInteger(upper, 1);
        if (!contains(array, random) && !exclude.includes(random)) {
          break;
        }
      }
      array.push(random);
    }
  } else if (repeat && !exclude) {
    for (let i = 0; i < count; i++) {
      let random = randomInteger(upper, 1);
      array.push(random);
    }
  } else if (repeat && exclude) {
    for (let i = 0; i < count; i++) {
      let random: number;
      while (true) {
        random = randomInteger(upper, 1);
        if (!exclude.includes(random)) break;
      }
      array.push(random);
    }
  }

  return array;
}
