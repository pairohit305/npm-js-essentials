/**
 * Spliting 1D array into 2D array
 * @param array original array
 * @param into slice into how many parts
 */

export function splitArrayInto(array: any[], into: number): any[][] {
  const array2d = [];
  let loopCount = Math.ceil(array.length / into);
  for (let i = 0; i < loopCount; i++) {
    array2d.push(array.slice(i * into, i * into + into));
  }
  return array2d;
}

/**
 * includes++
 * @param array Array of numbers only supported currently
 * @param val Providing only number will act as inbuild includes, but if you want to compare with another array then this option is available too
 */
export function contains(
  array: number[],
  val: { searchElements: number[]; exact: boolean } | number
) {
  if (typeof val === "object") {
    const { searchElements: searchElement, exact } = val;
    if (searchElement.length <= 0)
      throw new Error("contains function expects searchElement length more than 1");
    return exact
      ? searchElement.every((value) => {
          return array.includes(value);
        })
      : searchElement.some((value) => {
          return array.includes(value);
        });
  } else if (typeof val === "number") {
    return array.includes(val);
  } else {
    throw new Error("contains function expects typeof val to be Object or Number");
  }
}
