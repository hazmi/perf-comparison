import { getShortestColumnIndex } from './getShortestColumnIndex';

const GUTTER = 16;
const WIDTH = 248;

const getHeight = (gif, width) => {
  const originalWidth = gif.images.original.width * 1;
  const originalHeight = gif.images.original.height * 1;
  return (originalHeight / originalWidth) * width;
}

export const prepareGifList = (rawData,  params = {}) => {
  const {
    gutter = GUTTER,
    width = WIDTH,
    defaultColumn = [0,0,0,0]
  } = params;
  const arrLeft = [
    0,
    width + gutter,
    width + gutter + width + gutter,
    width + gutter + width + gutter + width + gutter
  ];
  let arrTop = defaultColumn;
  const data = rawData.map((gif) => {
    const height = getHeight(gif, width);
    const shortestIndex = getShortestColumnIndex(arrTop);
    const style = {
      '--height': `${height}px`,
      '--top': `${arrTop[shortestIndex]}px`,
      '--left': `${arrLeft[shortestIndex]}px`,
    };

    arrTop[shortestIndex] = arrTop[shortestIndex] + height + gutter ;

    const src = (gif.images.downsized.url) ? gif.images.downsized.url : gif.images.original.url;

    return {
      id: gif.id,
      style,
      title: gif.title,
      imgAttr: {
        width: width,
        height,
        src
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