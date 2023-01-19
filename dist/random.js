"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pickIndexByWeight = exports.randomInt = void 0;
function randomInt(config) {
    return config.min + Math.floor(Math.random() * config.max + 1 - config.min);
}
exports.randomInt = randomInt;
function pickIndexByWeight(dropRates) {
    var reservoir = 0;
    var totalDropRate = dropRates[0];
    for (var i = 1; i < dropRates.length; i++) {
        var rand = Math.random() * (totalDropRate + dropRates[i]);
        if (rand < totalDropRate) {
            reservoir = i;
        }
        totalDropRate += dropRates[i];
    }
    return reservoir;
}
exports.pickIndexByWeight = pickIndexByWeight;
