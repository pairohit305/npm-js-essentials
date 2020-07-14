"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePlayerTag = void 0;
function validatePlayerTag(playerTag) {
    if (playerTag.startsWith("#"))
        return true;
    return false;
}
exports.validatePlayerTag = validatePlayerTag;
//# sourceMappingURL=playerTag.js.map