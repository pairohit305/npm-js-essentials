export const searchCount = (list: any[], searcher: any): number => {
  let count = 0;
  list.forEach((elm) => (elm === searcher ? count++ : undefined));
  return count;
};
