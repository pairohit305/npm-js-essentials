/**XmodY **3mod5=2** */
export function mod(X: number, Y: number): number {
  return Math.round(
    parseFloat(
      "0." +
      parseFloat((X / Y).toString())
        .toString()
        .split(".")[1]
    ) * Y
  );
}

export function minmax(num: number, min: number, max: number) {
  return Math.min(max, Math.max(min, num));
}