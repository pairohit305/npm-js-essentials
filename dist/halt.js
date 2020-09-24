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
exports.HaltCounter = exports.halt = void 0;
/**
 * Halt the function till the counter becomes expected value, for more details see example folder
 * @param couter counter class to keep a eye on
 * @param tobe what you expect counter to be
 * @param options option controls
 */
function halt(couter, tobe, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            let totalTimepassed = 0;
            let timeout = (options === null || options === void 0 ? void 0 : options.every) || 1000;
            let loop = setInterval(() => {
                totalTimepassed += timeout;
                // if maxtimeout has passed reject it
                if ((options === null || options === void 0 ? void 0 : options.maxTimeout) && totalTimepassed >= options.maxTimeout) {
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
    });
}
exports.halt = halt;
// since js don't support referenc variable we need to use class
class HaltCounter {
    constructor(initCount) {
        this.initCount = initCount;
        this.index = initCount;
    }
    get count() {
        return this.index;
    }
    set count(value) {
        this.index = value;
    }
}
exports.HaltCounter = HaltCounter;
//# sourceMappingURL=halt.js.map