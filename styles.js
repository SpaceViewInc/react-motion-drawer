'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (val, props) {
  var zIndex = props.zIndex;
  var position = props.position;
  var width = props.width;
  var height = props.height;
  var handleWidth = props.handleWidth;
  var handleHeight = props.handleHeight;
  var overlayColor = props.overlayColor;
  var fadeOut = props.fadeOut;
  var offset = props.offset;
  var _document$body = document.body;
  var clientWidth = _document$body.clientWidth;
  var clientHeight = _document$body.clientHeight;

  var opacity = void 0;
  var transformVal = val;
  var transform = void 0;
  var drawer = void 0;
  var overlay = void 0;
  var overlayTransform = void 0;

  if (position === 'right') {
    opacity = (val - offset) / width;
    transformVal = width - val;
    drawer = {
      display: 'block',
      width: width,
      height: height,
      overflow: 'auto'
    };

    transform = {
      boxSizing: 'content-box',
      pointer: 'cursor',
      position: 'absolute',
      display: 'block',
      zIndex: zIndex,
      width: width,
      paddingLeft: handleWidth,
      maxWidth: width,
      height: height,
      top: 0,
      right: 0,
      margin: 0,
      transform: 'translate3d(' + transformVal + 'px, 0, 0)',
      WebkitTransform: 'translate3d(' + transformVal + 'px, 0, 0)',
      opacity: fadeOut ? opacity : 1
    };

    overlayTransform = -width;
    overlay = {
      zIndex: -2,
      pointer: 'cursor',
      position: 'absolute',
      width: clientWidth,
      height: '100%',
      background: overlayColor,
      opacity: opacity,
      top: 0,
      right: 0,
      margin: 0,
      transform: 'translate3d(' + overlayTransform + 'px, 0, 0)',
      WebkitTransform: 'translate3d(' + overlayTransform + 'px, 0, 0)'
    };
  }
  if (position === 'left') {
    opacity = (val - offset) / width;
    transformVal = val - width;
    drawer = {
      display: 'block',
      width: width,
      height: height,
      overflow: 'auto'
    };

    transform = {
      boxSizing: 'content-box',
      pointer: 'cursor',
      position: 'absolute',
      display: 'block',
      zIndex: zIndex,
      width: width,
      paddingRight: handleWidth,
      maxWidth: width,
      height: height,
      top: 0,
      left: 0,
      margin: 0,
      transform: 'translate3d(' + transformVal + 'px, 0, 0)',
      WebkitTransform: 'translate3d(' + transformVal + 'px, 0, 0)',
      opacity: fadeOut ? opacity : 1
    };

    overlayTransform = width;
    overlay = {
      zIndex: -2,
      pointer: 'cursor',
      position: 'absolute',
      width: clientWidth,
      height: '100%',
      background: overlayColor,
      opacity: opacity,
      top: 0,
      left: 0,
      margin: 0,
      transform: 'translate3d(' + overlayTransform + 'px, 0, 0)',
      WebkitTransform: 'translate3d(' + overlayTransform + 'px, 0, 0)'
    };
  }
  if (position === 'bottom') {
    opacity = (val - offset) / height;
    transformVal = height - val;
    drawer = {
      display: 'block',
      width: width,
      height: height,
      overflow: 'auto'
    };

    transform = {
      boxSizing: 'content-box',
      pointer: 'cursor',
      position: 'absolute',
      display: 'block',
      zIndex: zIndex,
      width: width,
      paddingTop: handleHeight,
      maxHeight: height,
      height: height,
      left: 0,
      bottom: 0,
      margin: 0,
      transform: 'translate3d(0, ' + transformVal + 'px, 0)',
      WebkitTransform: 'translate3d(0, ' + transformVal + 'px, 0)',
      opacity: fadeOut ? opacity : 1
    };

    overlayTransform = -height;
    overlay = {
      zIndex: -2,
      pointer: 'cursor',
      position: 'absolute',
      height: clientHeight,
      width: '100%',
      background: overlayColor,
      opacity: opacity,
      bottom: 0,
      left: 0,
      margin: 0,
      transform: 'translate3d(0, ' + overlayTransform + 'px, 0)',
      WebkitTransform: 'translate3d(0, ' + overlayTransform + 'px, 0)'
    };
  }
  if (position === 'top') {
    opacity = (val - offset) / height;
    transformVal = val - height;
    drawer = {
      display: 'block',
      width: width,
      height: height,
      overflow: 'auto'
    };

    transform = {
      boxSizing: 'content-box',
      pointer: 'cursor',
      position: 'absolute',
      display: 'block',
      zIndex: zIndex,
      width: width,
      paddingBottom: handleHeight,
      maxHeight: height,
      height: height,
      left: 0,
      top: 0,
      margin: 0,
      transform: 'translate3d(0, ' + transformVal + 'px, 0)',
      WebkitTransform: 'translate3d(0, ' + transformVal + 'px, 0)',
      opacity: fadeOut ? opacity : 1
    };

    overlayTransform = height;
    overlay = {
      zIndex: -2,
      pointer: 'cursor',
      position: 'absolute',
      height: clientHeight,
      width: '100%',
      background: overlayColor,
      opacity: opacity,
      left: 0,
      top: 0,
      margin: 0,
      transform: 'translate3d(0, ' + overlayTransform + 'px, 0)',
      WebkitTransform: 'translate3d(0, ' + overlayTransform + 'px, 0)'
    };
  }

  return {
    drawer: drawer,
    transform: transform,
    overlay: overlay
  };
};