"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genRandomUniqueId = exports.genUniqueId = void 0;
const uuid_1 = require("uuid");
const random_1 = require("../random");
// generate uid base on version uuid v5
function genUniqueId(lock, key) {
    let uid = uuid_1.v5(lock + key, uuid_1.v5.URL);
    return uid;
}
exports.genUniqueId = genUniqueId;
function genRandomUniqueId() {
    return uuid_1.v5(random_1.randomInteger(Math.pow(2, 64)).toString(), uuid_1.v5.URL);
}
exports.genRandomUniqueId = genRandomUniqueId;
//# sourceMappingURL=index.js.map