/**
 * Splitting 1D array into 2D array
 * @param array original array
 * @param into slice into how many parts
 */

export function splitArrayInto<T>(array: T[], into: number): T[][] {
  const array2d = [];
  let loopCount = Math.ceil(array.length / into);
  for (let i = 0; i < loopCount; i++) {
    array2d.push(array.slice(i * into, i * into + into));
  }
  return array2d;
}

export function shuffleArray<T>(array: Array<T>): Array<T> {
  // copying
  array = [...array];

  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
