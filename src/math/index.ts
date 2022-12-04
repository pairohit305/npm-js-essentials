/**
 *
 * @param number input
 * @param min if not provide it will default to Number.NEGATIVE_INFINITY
 * @param max if not provide it will default to Number.POSITIVE_INFINITY
 * @returns
 */
export function range(number: number, min?: number, max?: number) {
  return Math.min(
    max ?? Number.POSITIVE_INFINITY,
    Math.max(min ?? Number.NEGATIVE_INFINITY, number)
  );
}
