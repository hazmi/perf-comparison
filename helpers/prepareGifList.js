import { getShortestColumnIndex } from './getShortestColumnIndex';

const GUTTER = 16;
const WIDTH = 248;
const arrLeft = [
  0,
  WIDTH + GUTTER,
  WIDTH + GUTTER + WIDTH + GUTTER,
  WIDTH + GUTTER + WIDTH + GUTTER + WIDTH + GUTTER
];

const getHeight = (gif) => {
  const originalWidth = gif.images.original.width * 1;
  const originalHeight = gif.images.original.height * 1;
  return (originalHeight / originalWidth) * WIDTH;
}

export const prepareGifList = (rawData) => {
  let arrTop = [0,0,0,0];
  const data = rawData.map((gif) => {
    const height = getHeight(gif);
    const shortestIndex = getShortestColumnIndex(arrTop);
    const style = {
      '--height': `${height}px`,
      '--top': `${arrTop[shortestIndex]}px`,
      '--left': `${arrLeft[shortestIndex]}px`,
    };

    arrTop[shortestIndex] = arrTop[shortestIndex] + height + GUTTER ;

    return {
      id: gif.id,
      style,
      title: gif.title,
      imgAttr: {
        width: WIDTH,
        height,
        src: gif.images.downsized.url
      },
      userImgAttr: {
        src: gif.user ? gif.user.avatar_url : '',
        width: 25,
        height: 25,
      },
      userDisplayName: gif.user ? gif.user.display_name : ''
    };
  });
  return {
    data,
    containerHeight: Math.max(...arrTop)
  }
}