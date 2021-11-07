/**
 * Spliting 1D array into 2D array
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

/** Count the given element in an array */
export function arrayElmCounter(list: any[], searcher: any): number {
  let count = 0;
  list.forEach((elm) => (elm === searcher ? count++ : undefined));
  return count;
}

/**
 * includes++
 * @param array Array of numbers only supported currently
 * @param val Providing only number will act as inbuild includes, but if you want to compare with another array then this option is available too
 */
export function containsInArray(
  array: number[],
  val: { searchElements: number[]; exact: boolean } | number
) {
  // not tested yet!
  if (typeof val === "object") {
    const { searchElements = [], exact } = val;

    return exact
      ? searchElements.every((value) => {
          return array.includes(value);
        })
      : searchElements.some((value) => {
          return array.includes(value);
        });
  } else if (typeof val === "number") {
    return array.includes(val);
  } else {
    throw new Error(
      "contains function expects typeof val to be Object or Number"
    );
  }
}

export function isDistinctiveArray(array: any[]) {
  return !array.some((value) => {
    return arrayElmCounter(array, value) > 1;
  });
}

/**
 * Find the minimum interger in an array
 * @param array
 */
export function minArray(array: number[]) {
  let min = Number.MAX_VALUE;
  array.forEach((value) => {
    if (value < min) min = value;
  });

  return min;
}

/**
 * Find the minimum interger in an array
 * @param array
 */
export function maxArray(array: number[]) {
  let max = Number.MIN_VALUE;
  array.forEach((value) => {
    if (value > max) max = value;
  });

  return max;
}

/**
 * Swap the element in an array
 *
 * Return 1 if operation is successfull and -1 for failture
 */
export function swapElmArray(array: any[], indexA: number, indexB: number) {
  if (
    indexA >= 0 &&
    indexA < array.length &&
    indexB >= 0 &&
    indexB < array.length
  ) {
    const temp = array[indexB];
    array[indexB] = array[indexA];
    array[indexA] = temp;

    return 1;
  } else return -1;
}
