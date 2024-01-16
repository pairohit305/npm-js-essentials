/**
 * Halt the function till the counter becomes expected value, for more details see example folder
 * @param tracker tracker class to keep a eye on
 */
export async function halt(tracker: HaltTracker) {
  return new Promise((resolve) => {
    tracker._resolveFn = resolve;
  });
}

// since js don't support reference variable we need to use class
export class HaltTracker {
  _resolveFn: null | Function = null;

  stop() {
    if (this._resolveFn) {
      this._resolveFn();
    }
  }
}
