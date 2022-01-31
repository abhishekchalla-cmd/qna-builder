export const toggleValue = (arr, value) => {
  console.log(arr);
  arr = [...arr];
  const index = arr.indexOf(value);
  if (index > -1) arr.splice(index, 1);
  else arr.push(value);
  return arr;
};
