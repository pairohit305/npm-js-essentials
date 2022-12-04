"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HaltTracker = exports.halt = void 0;
/**
 * Halt the function till the counter becomes expected value, for more details see example folder
 * @param tracker tracker class to keep a eye on
 * @param config option controls
 */
function halt(tracker, config = {
    timeout: -1,
    every: 1000,
}) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            let waitTime = 0;
            let loop = setInterval(() => {
                waitTime += config.every;
                // if timeout has passed reject it
                if (config.timeout !== -1 &&
                    config.timeout &&
                    waitTime >= config.timeout) {
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
    });
}
exports.halt = halt;
// since js don't support reference variable we need to use class
class HaltTracker {
    constructor() {
        this._status = false;
    }
    get status() {
        return this._status;
    }
    stop() {
        this._status = true;
    }
}
exports.HaltTracker = HaltTracker;
//# sourceMappingURL=halt.js.map