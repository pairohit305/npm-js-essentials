import {
  containsInArray,
  isDistinctiveArray,
  maxArray,
  minArray,
} from "./array";

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
/** returns random alphabet from a to z by default if you want to
 * add capital alphabets then set the flag includeCapital to true; */
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
        if (!containsInArray(array, random)) {
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
        if (!containsInArray(array, random) && !exclude.includes(random)) {
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
export function shuffleArray<T>(array: Array<T>): Array<T> {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
/**
 *
 * @param dropRates
 * [65, 25, 9, 1] => index0 has 65% drop rate, index1 has 25% and so on
 * [75, 25] => index0 has 75% index1 has 25%
 * [75, 0, 25] => index0 has 75% index1 has 0% index2 has 25%
 * @important sum of dropRates must be equal to 100
 */
export class RandomDropRateIndex {
  private dropIndexes: number[] = [];
  private pointer: number = 0;

  constructor(dropRates: number[]) {
    const is100 = dropRates.reduce((sum, val) => sum + val, 0) === 100;
    if (!is100) throw "Sum of drop rate must to equal to 100!";
    if (!dropRates.every((rate) => rate >= 0))
      throw "drop rate must be positive!";

    const total = 100 / Math.min(...dropRates.filter((rate) => rate !== 0));
    // scale accouding to total
    dropRates.map((rate, index) => {
      const scaled = Math.round((rate / 100) * total);

      this.dropIndexes = this.dropIndexes.concat(
        Array.from(Array(scaled).keys()).fill(index)
      );
    });
  }

  public drop() {
    const index = this.dropIndexes[this.pointer];

    // suffle for better randomness at the start
    if (this.pointer === 0) shuffleArray(this.dropIndexes);

    // pointer increment
    if (this.pointer + 1 >= this.dropIndexes.length) {
      this.pointer = 0;
    } else this.pointer++;

    return index;
  }
}
