"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genUniqueId = void 0;
const uuid_1 = require("uuid");
// generate uid base on version uuid v5
function genUniqueId(applicationName, key) {
    let uid = uuid_1.v5(applicationName + key, uuid_1.v5.URL);
    return uid;
}
exports.genUniqueId = genUniqueId;
//# sourceMappingURL=uuidv5.js.map