"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomUniqueId = exports.generateUniqueId = void 0;
const uuid_1 = require("uuid");
const random_1 = require("../random");
// generate uid base on version uuid v5
function generateUniqueId(lock, key) {
    let uid = (0, uuid_1.v5)(lock + key, uuid_1.v5.URL);
    return uid;
}
exports.generateUniqueId = generateUniqueId;
function generateRandomUniqueId() {
    return (0, uuid_1.v5)((0, random_1.randomInteger)(Math.pow(2, 64)).toString(), uuid_1.v5.URL);
}
exports.generateRandomUniqueId = generateRandomUniqueId;
//# sourceMappingURL=index.js.map