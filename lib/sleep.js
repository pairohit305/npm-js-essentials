"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = void 0;
async function sleep(timeout) {
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, timeout);
    });
}
exports.sleep = sleep;
//# sourceMappingURL=sleep.js.map