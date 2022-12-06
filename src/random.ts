import { shuffleArray } from "./array";

export function randomInteger(config: { min: number; max: number }) {
  return config.min + Math.floor(Math.random() * config.max + 1 - config.min);
}

/**
 *
 * @param dropRates
 * [65, 25, 9, 1] => index0 has 65% drop rate, index1 has 25% and so on
 * [75, 25] => index0 has 75% index1 has 25%
 * [75, 0, 25] => index0 has 75% index1 has 0% index2 has 25%
 * @important sum of dropRates must be equal to 100
 */
export class RandomWeightedIndex {
  private dropIndexes: number[] = [];
  private pointer: number = 0;

  constructor(dropRates: number[]) {
    const total = 100 / Math.min(...dropRates.filter((rate) => rate !== 0));

    // scale according to total
    dropRates.map((rate, index) => {
      const scaled = Math.round((rate / 100) * total);

      this.dropIndexes = this.dropIndexes.concat(
        Array.from(Array(scaled).keys()).fill(index)
      );
    });
  }

  public get() {
    const index = this.dropIndexes[this.pointer];

    // scuffle for better randomness at the start
    if (this.pointer === 0) shuffleArray(this.dropIndexes);

    // pointer increment
    if (this.pointer + 1 >= this.dropIndexes.length) {
      this.pointer = 0;
    } else this.pointer++;

    return index;
  }
}
