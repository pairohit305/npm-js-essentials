export function splitArrayInto(array, into) {
    const array2d = [];
    let loopCount = Math.ceil(array.length / into);
    for (let i = 0; i < loopCount; i++) {
        array2d.push(array.slice(i * into, i * into + into));
    }
    return array2d;
}
export function shuffleArray(array) {
    array = [...array];
    let currentIndex = array.length, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }
    return array;
}
