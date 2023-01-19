export function randomInt(config: { min: number; max: number }) {
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
export function pickIndexByWeight(dropRates: number[]) {
  let reservoir = 0;
  let totalDropRate = dropRates[0];

  for (let i = 1; i < dropRates.length; i++) {
    const rand = Math.random() * (totalDropRate + dropRates[i]);

    if (rand < totalDropRate) {
      reservoir = i;
    }

    totalDropRate += dropRates[i];
  }

  return reservoir;
}
