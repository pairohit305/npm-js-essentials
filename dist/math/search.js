"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchCount = void 0;
function searchCount(list, searcher) {
    let count = 0;
    list.forEach((elm) => (elm === searcher ? count++ : undefined));
    return count;
}
exports.searchCount = searchCount;
//# sourceMappingURL=search.js.map