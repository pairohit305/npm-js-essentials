export function randomInt(config) {
    return config.min + Math.floor(Math.random() * config.max + 1 - config.min);
}
export function pickIndexByWeight(dropRates) {
    let reservoir = 0;
    let totalDropRate = dropRates[0];
    for (let i = 1; i < dropRates.length; i++) {
        const rand = Math.random() * (totalDropRate + dropRates[i]);
        if (rand < totalDropRate) {
            reservoir = i;
        }
        totalDropRate += dropRates[i];
    }
    return reservoir;
}
