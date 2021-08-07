export async function sleep(
  timeout: number,
  /** If you want to clear the internal setTimeout pass the variable here
   *  to avoid memory leaks!
   *
   * @example
   * let timeoutTimer;
   * async function yourFunction() {
   * await sleep(150_000, timeoutTimer);
   * // ...
   * }
   * function onExit() {
   * clearTimeout(timeoutTimer);
   * }
   */
  clearTimeoutRef?: any
) {
  return await new Promise((resolve) => {
    clearTimeoutRef = setTimeout(() => {
      resolve(1);
    }, timeout);
  });
}
