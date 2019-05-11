export function uniqueCount(scrapes) {
  return scrapes.filter((item, i, arr) => {
    if (i === 0) return true;
    const lastItem = arr[i - 1];
    return !(item.count === lastItem.count);
  });
}
