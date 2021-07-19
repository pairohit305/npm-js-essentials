import { contains, isDistinctiveArray, maxArray, minArray } from "./array";

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

export function randomNaturalArray(opt: {
  upper: number;
  count: number;
  distinctive?: boolean;
  /**
   * acceptable values = {x∈ N | x≤ count}
   */
  exclude?: number[];
  sorted?: boolean;
}) {
  // default
  const modifiers = {
    exclude: opt?.exclude || [],
    distinctive: opt?.distinctive || false,
    sorted: opt?.sorted || false,
  };
  const upper = opt.upper;
  const count = opt.count;
  const { exclude, distinctive, sorted } = modifiers;

  // if count is not more than 0 then return [] no future calculation needed
  if (count <= 0) return [];

  // err checking
  if (
    exclude &&
    exclude?.length >= 2 &&
    (!isDistinctiveArray(exclude) ||
      minArray(exclude) < 1 ||
      maxArray(exclude) > upper ||
      exclude.length === upper)
  ) {
    throw new Error(
      `randomNaturalArray function expect values of exclude to be = {x∈ N | x≤ count}`
    );
  }

  // real code starts here
  const array: number[] = [];

  if (distinctive && !exclude?.length) {
    if (count > upper)
      throw new Error(
        `randomNaturalArray function expect count ≤ ${upper} for your requirement`
      );
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
  } else if (distinctive && exclude?.length) {
    if (count > upper - exclude.length)
      throw new Error(
        `randomNaturalArray function expect count ≤ ${
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
  } else if (!distinctive && !exclude?.length) {
    for (let i = 0; i < count; i++) {
      let random = randomInteger(upper, 1);
      array.push(random);
    }
  } else if (!distinctive && exclude?.length) {
    if (exclude[0] === 1 && count === 1 && upper === 1)
      throw new Error(
        `randomNaturalArray function expect count ≥ 2 for your requirement`
      );
    for (let i = 0; i < count; i++) {
      let random: number;
      while (true) {
        random = randomInteger(upper, 1);
        if (!exclude.includes(random)) break;
      }
      array.push(random);
    }
  }

  return sorted ? array.sort((a, b) => a - b) : array;
}
