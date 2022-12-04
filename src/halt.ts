/**
 * Halt the function till the counter becomes expected value, for more details see example folder
 * @param tracker tracker class to keep a eye on
 * @param config option controls
 */
export async function halt(
  tracker: HaltTracker,
  config = {
    timeout: -1,
    every: 1000,
  }
) {
  return new Promise((resolve, reject) => {
    let waitTime = 0;

    let loop = setInterval(() => {
      waitTime += config.every;

      // if timeout has passed reject it
      if (
        config.timeout !== -1 &&
        config.timeout &&
        waitTime >= config.timeout
      ) {
        clearInterval(loop);
        return reject(false);
      }

      // the moment we get expected it's resolved.
      if (tracker.status) {
        clearInterval(loop);
        return resolve(true);
      }
    }, config.every);
  });
}

// since js don't support reference variable we need to use class
export class HaltTracker {
  private _status = false;

  get status() {
    return this._status;
  }

  stop() {
    this._status = true;
  }
}
