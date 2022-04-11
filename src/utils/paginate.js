import underscore from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  //   underscore.slice(items, startIndex);
  //   underscore.take(underscore.slice(items, startIndex), pageSize);
  return underscore(items).slice(startIndex).take(pageSize).value();
}
