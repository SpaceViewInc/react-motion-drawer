export default function (val, props) {
  const { zIndex, position, width, height, handleWidth, handleHeight, overlayColor, fadeOut, offset } = props;
  const { clientWidth, clientHeight } = document.body;
  let opacity;
  let transformVal = val;
  let transform;
  let drawer;
  let overlay;
  let overlayTransform;

  if (position === 'right') {
    opacity = (val - offset) / width;
    transformVal = width - val;
    drawer = {
      display: 'block',
      width,
      height,
      overflow: 'auto',
    };

    transform = {
      boxSizing: 'content-box',
      pointer: 'cursor',
      position: 'absolute',
      display: 'block',
      zIndex,
      width,
      paddingLeft: handleWidth,
      maxWidth: width,
      height,
      top: 0,
      right: 0,
      margin: 0,
      transform: `translate3d(${transformVal}px, 0, 0)`,
      WebkitTransform: `translate3d(${transformVal}px, 0, 0)`,
      opacity: fadeOut ? opacity : 1,
    };


    overlayTransform = -width;
    overlay = {
      zIndex: -2,
      pointer: 'cursor',
      position: 'absolute',
      width: clientWidth,
      height: '100%',
      background: overlayColor,
      opacity,
      top: 0,
      right: 0,
      margin: 0,
      transform: `translate3d(${overlayTransform}px, 0, 0)`,
      WebkitTransform: `translate3d(${overlayTransform}px, 0, 0)`,
    };
  }
  if (position === 'left') {
    opacity = (val - offset) / width;
    transformVal = val - width;
    drawer = {
      display: 'block',
      width,
      height,
      overflow: 'auto',
    };

    transform = {
      boxSizing: 'content-box',
      pointer: 'cursor',
      position: 'absolute',
      display: 'block',
      zIndex,
      width,
      paddingRight: handleWidth,
      maxWidth: width,
      height,
      top: 0,
      left: 0,
      margin: 0,
      transform: `translate3d(${transformVal}px, 0, 0)`,
      WebkitTransform: `translate3d(${transformVal}px, 0, 0)`,
      opacity: fadeOut ? opacity : 1,
    };


    overlayTransform = width;
    overlay = {
      zIndex: -2,
      pointer: 'cursor',
      position: 'absolute',
      width: clientWidth,
      height: '100%',
      background: overlayColor,
      opacity,
      top: 0,
      left: 0,
      margin: 0,
      transform: `translate3d(${overlayTransform}px, 0, 0)`,
      WebkitTransform: `translate3d(${overlayTransform}px, 0, 0)`,
    };
  }
  if (position === 'bottom') {
    opacity = (val - offset) / height;
    transformVal = height - val;
    drawer = {
      display: 'block',
      width,
      height,
      overflow: 'auto',
    };

    transform = {
      boxSizing: 'content-box',
      pointer: 'cursor',
      position: 'absolute',
      display: 'block',
      zIndex,
      width,
      paddingTop: handleHeight,
      maxHeight: height,
      height,
      left: 0,
      bottom: 0,
      margin: 0,
      transform: `translate3d(0, ${transformVal}px, 0)`,
      WebkitTransform: `translate3d(0, ${transformVal}px, 0)`,
      opacity: fadeOut ? opacity : 1,
    };


    overlayTransform = -height;
    overlay = {
      zIndex: -2,
      pointer: 'cursor',
      position: 'absolute',
      height: clientHeight,
      width: '100%',
      background: overlayColor,
      opacity,
      bottom: 0,
      left: 0,
      margin: 0,
      transform: `translate3d(0, ${overlayTransform}px, 0)`,
      WebkitTransform: `translate3d(0, ${overlayTransform}px, 0)`,
    };
  }
  if (position === 'top') {
    opacity = (val - offset) / height;
    transformVal = val - height;
    drawer = {
      display: 'block',
      width,
      height,
      overflow: 'auto',
    };

    transform = {
      boxSizing: 'content-box',
      pointer: 'cursor',
      position: 'absolute',
      display: 'block',
      zIndex,
      width,
      paddingBottom: handleHeight,
      maxHeight: height,
      height,
      left: 0,
      top: 0,
      margin: 0,
      transform: `translate3d(0, ${transformVal}px, 0)`,
      WebkitTransform: `translate3d(0, ${transformVal}px, 0)`,
      opacity: fadeOut ? opacity : 1,
    };


    overlayTransform = height;
    overlay = {
      zIndex: -2,
      pointer: 'cursor',
      position: 'absolute',
      height: clientHeight,
      width: '100%',
      background: overlayColor,
      opacity,
      left: 0,
      top: 0,
      margin: 0,
      transform: `translate3d(0, ${overlayTransform}px, 0)`,
      WebkitTransform: `translate3d(0, ${overlayTransform}px, 0)`,
    };
  }


  return {
    drawer,
    transform,
    overlay,
  };
}
