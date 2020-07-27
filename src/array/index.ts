export function splitArrayInto(array: any[], into: number): any[][] {
  const array2d = [];
  let loopCount = Math.ceil(array.length / into);
  for (let i = 0; i < loopCount; i++) {
    array2d.push(array.slice(i * into, i * into + into));
  }
  return array2d;
}
