// function create50Items<T>(item: T): T[] {
//   return Array.from(Array(50).keys()).map((data, index) => {
//     return {
//       ...(item as any),
//       userId: index,
//     };
//   });
// }
export function arrayWithIndexItem<T>(items: T[]) {
  return items.map((item, index) => {
    return {
      index: index,
      ...item,
    };
  });
}
