"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genRandomUniqueId = exports.genUniqueId = void 0;
const uuid_1 = require("uuid");
const crypto_1 = __importDefault(require("crypto"));
// generate uid base on version uuid v5
function genUniqueId(appName, key) {
    let uid = uuid_1.v5(appName + key, uuid_1.v5.URL);
    return uid;
}
exports.genUniqueId = genUniqueId;
function genRandomUniqueId() {
    return uuid_1.v5(crypto_1.default.randomBytes(8).toString("hex"), uuid_1.v5.URL);
}
exports.genRandomUniqueId = genRandomUniqueId;
//# sourceMappingURL=uuidv5.js.map