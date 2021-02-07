export const getShortestColumnIndex = (arrTop) => {
  let shortestIndex = 0;
  let shortest = arrTop[0];
  for (let i = 1; i < arrTop.length; i++) {
    if (arrTop[i] < shortest) {
      shortest = arrTop[i];
      shortestIndex = i;
    }
  }
  return shortestIndex;
};