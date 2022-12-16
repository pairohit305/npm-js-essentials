"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomWeightedIndex = exports.randomInteger = void 0;
var array_1 = require("./array");
function randomInteger(config) {
    return config.min + Math.floor(Math.random() * config.max + 1 - config.min);
}
exports.randomInteger = randomInteger;
var RandomWeightedIndex = (function () {
    function RandomWeightedIndex(dropRates) {
        var _this = this;
        this.dropIndexes = [];
        this.pointer = 0;
        var total = 100 / Math.min.apply(Math, dropRates.filter(function (rate) { return rate !== 0; }));
        dropRates.map(function (rate, index) {
            var scaled = Math.round((rate / 100) * total);
            _this.dropIndexes = _this.dropIndexes.concat(Array.from(Array(scaled).keys()).fill(index));
        });
    }
    RandomWeightedIndex.prototype.get = function () {
        var index = this.dropIndexes[this.pointer];
        if (this.pointer === 0)
            (0, array_1.shuffleArray)(this.dropIndexes);
        if (this.pointer + 1 >= this.dropIndexes.length) {
            this.pointer = 0;
        }
        else
            this.pointer++;
        return index;
    };
    return RandomWeightedIndex;
}());
exports.RandomWeightedIndex = RandomWeightedIndex;
