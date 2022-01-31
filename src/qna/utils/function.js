export const ensafe = (evalFn) => {
  try {
    return evalFn();
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const pseudoToPath = (path) =>
  path
    .split(".")
    .slice(1)
    .map((route) => `.children[${route}]`)
    .join("");

export const findItems = (item, condition) => {
  let result = [];
  if (Array.isArray(item)) {
    result = result.concat(
      item
        .map((i) => findItems(i, condition))
        .reduce((acc, cur) => acc.concat(cur || []), [])
    );
  } else if (item && typeof item === "object") {
    if (condition(item)) result.push(item);
    else
      Object.keys(item).map((key) => {
        result = result.concat(findItems(item[key], condition));
      });
  }
  return result;
};
