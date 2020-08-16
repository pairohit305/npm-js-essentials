export function randomInteger(upper: number, lower = 0) {
  // error checking
  if (typeof upper !== "number" || typeof lower !== "number") return -1;
  if (!Number.isInteger(upper) || !Number.isInteger(lower)) return -1;
  if (upper < lower) return -1;

  const diff = upper - lower;
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
