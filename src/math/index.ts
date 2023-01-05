export function clampInt(
  number: number,
  opts?: { min?: number; max?: number }
) {
  return Math.min(
    opts?.max ?? Number.POSITIVE_INFINITY,
    Math.max(opts?.min ?? Number.NEGATIVE_INFINITY, number)
  );
}
