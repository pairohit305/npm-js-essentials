/**
 * Halt the function till the counter becomes expected value, for more details see example folder
 * @param couter counter class to keep a eye on
 * @param tobe what you expect counter to be
 * @param options option controls
 */
export async function halt(
  couter: HaltCounter,
  tobe: number,
  options?: {
    maxTimeout?: number;
    every?: number;
  }
) {
  return new Promise((resolve, reject) => {
    let totalTimepassed = 0;
    let timeout = options?.every || 1000;

    let loop = setInterval(() => {
      totalTimepassed += timeout;
      // if maxtimeout has passed reject it
      if (options?.maxTimeout && totalTimepassed >= options.maxTimeout) {
        clearInterval(loop);
        return reject(-1);
      }

      // the moment the we get expected it's resolved.
      if (couter.count === tobe) {
        clearInterval(loop);
        return resolve(1);
      }
    }, timeout);
  });
}

// since js don't support referenc variable we need to use class
export class HaltCounter {
  private index: number;
  constructor(private initCount: number) {
    this.index = initCount;
  }

  get count() {
    return this.index;
  }

  set count(value: number) {
    this.index = value;
  }
}
