/**
 *
 * @param num input
 * @param min if not provide it will default to NEGATIVE_INFINITY
 * @param max if not provide it will default to POSITIVE_INFINITY
 * @returns
 */
export function minmax(num: number, min?: number, max?: number) {
  min = min === undefined ? Number.NEGATIVE_INFINITY : min;
  max = max === undefined ? Number.POSITIVE_INFINITY : max;

  return Math.min(max, Math.max(min, num));
}
