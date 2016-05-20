'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMotion = require('react-motion');

var _reactHammerjs = require('react-hammerjs');

var _reactHammerjs2 = _interopRequireDefault(_reactHammerjs);

var _extend = require('1-liners/extend');

var _extend2 = _interopRequireDefault(_extend);

var _isFunction = require('1-liners/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _styles3 = require('./styles');

var _styles4 = _interopRequireDefault(_styles3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _React$PropTypes = _react2.default.PropTypes;
var bool = _React$PropTypes.bool;
var number = _React$PropTypes.number;
var array = _React$PropTypes.array;
var object = _React$PropTypes.object;
var string = _React$PropTypes.string;
var func = _React$PropTypes.func;
var oneOfType = _React$PropTypes.oneOfType;
var oneOf = _React$PropTypes.oneOf;


var EVENT_DIRECTIONS = {
  DIRECTION_NONE: 1,
  DIRECTION_LEFT: 2,
  DIRECTION_RIGHT: 4,
  DIRECTION_UP: 8,
  DIRECTION_DOWN: 16,
  DIRECTION_HORIZONTAL: 6,
  DIRECTION_VERTICAL: 24,
  DIRECTION_ALL: 30
};

var Drawer = function (_React$Component) {
  _inherits(Drawer, _React$Component);

  function Drawer() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Drawer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Drawer)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      currentState: 'CLOSED',
      x: undefined,
      y: undefined
    }, _temp), _possibleConstructorReturn(_this, _ret);
  } // offset


  _createClass(Drawer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.open) {
        this.open();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var open = this.props.open;
      var nextOpen = nextProps.open;


      if (nextOpen !== open) {
        if (nextOpen) this.open();else this.close();
      }
    }
  }, {
    key: 'isState',
    value: function isState(s) {
      return s === this.state.currentState;
    }
  }, {
    key: 'isClosed',
    value: function isClosed() {
      return this.isState('CLOSED');
    }
  }, {
    key: 'isOpen',
    value: function isOpen() {
      return this.isState('OPEN');
    }
  }, {
    key: 'isOpening',
    value: function isOpening() {
      return this.isState('IS_OPENING');
    }
  }, {
    key: 'isClosing',
    value: function isClosing() {
      return this.isState('IS_CLOSING');
    }
  }, {
    key: 'findOpenAxis',
    value: function findOpenAxis() {
      var position = this.props.position;

      return position === 'top' || position === 'bottom' ? 'vertical' : 'horizontal';
    }
  }, {
    key: 'setStateBasedOnOpenAxis',
    value: function setStateBasedOnOpenAxis(options) {
      var openAxis = this.findOpenAxis();
      var vertical = options.vertical;
      var horizontal = options.horizontal;

      if (openAxis === 'vertical' && vertical) {
        return this.setState(vertical);
      }
      if (openAxis === 'horizontal' && horizontal) {
        return this.setState(horizontal);
      }
    }
  }, {
    key: 'onPress',
    value: function onPress(e) {
      if (this.props.noTouchOpen) return;
      e.preventDefault();
      this.peak();
    }
  }, {
    key: 'onPressUp',
    value: function onPressUp(e) {
      e.preventDefault();
      this.close();
    }
  }, {
    key: 'peak',
    value: function peak() {
      var _props = this.props;
      var onChange = _props.onChange;
      var handleWidth = _props.handleWidth;

      onChange(false);
      return this.setStateBasedOnOpenAxis({
        vertical: {
          currentState: 'PEAK',
          y: handleHeight
        },
        horizontal: {
          currentState: 'PEAK',
          x: handleWidth
        }
      });
    }
  }, {
    key: 'close',
    value: function close() {
      this.props.onChange(false);
      return this.setStateBasedOnOpenAxis({
        vertical: {
          currentState: 'CLOSED',
          y: 0
        },
        horizontal: {
          currentState: 'CLOSED',
          x: 0
        }
      });
    }
  }, {
    key: 'open',
    value: function open() {
      var _props2 = this.props;
      var onChange = _props2.onChange;
      var width = _props2.width;
      var height = _props2.height;

      onChange(true);
      return this.setStateBasedOnOpenAxis({
        vertical: {
          currentState: 'OPEN',
          y: height
        },
        horizontal: {
          currentState: 'OPEN',
          x: width
        }
      });
    }
  }, {
    key: 'isClosingDirection',
    value: function isClosingDirection(direction) {
      var position = this.props.position;

      if (position === "top") {
        return direction === EVENT_DIRECTIONS.DIRECTION_UP;
      }
      if (position === "bottom") {
        return direction === EVENT_DIRECTIONS.DIRECTION_DOWN;
      }
      if (position === "left") {
        return direction === EVENT_DIRECTIONS.DIRECTION_LEFT;
      }
      if (position === "right") {
        return direction === EVENT_DIRECTIONS.DIRECTION_RIGHT;
      }
    }
  }, {
    key: 'closingOrOpening',
    value: function closingOrOpening(direction) {
      return this.isClosingDirection(direction) ? 'IS_CLOSING' : 'IS_OPENING';
    }
  }, {
    key: 'inPanTolerance',
    value: function inPanTolerance(delta) {
      var currentState = this.state.currentState;
      var panTolerance = this.props.panTolerance;


      return Math.abs(delta) <= panTolerance && currentState === 'OPEN';
    }
  }, {
    key: 'onPan',
    value: function onPan(e) {
      if (this.isClosed() && this.props.noTouchOpen) return;
      if (this.isOpen() && this.props.noTouchClose) return;
      e.preventDefault();

      var isFinal = e.isFinal;
      var pointers = e.pointers;
      var direction = e.direction;
      var deltaX = e.deltaX;
      var deltaY = e.deltaY;
      var _props3 = this.props;
      var position = _props3.position;
      var peakingAmount = _props3.peakingAmount;
      var width = _props3.width;
      var height = _props3.height;
      var handleWidth = _props3.handleWidth;


      if (position === "bottom" || position === "top") {
        if (this.inPanTolerance(deltaY)) return;

        if (isFinal) {
          if (this.isOpening()) this.open();else if (this.isClosing()) this.close();
          return;
        }

        var currentState = this.state.currentState;
        var clientY = pointers[0].clientY;


        var y = position === 'top' ? document.body.clientHeight - clientY : clientY;

        if (y + peakingAmount >= height) y = height - peakingAmount;

        var closingOrOpening = this.closingOrOpening(direction);
        var nextState = {
          PEAK: closingOrOpening,
          IS_OPENING: closingOrOpening,
          IS_CLOSING: closingOrOpening,
          OPEN: 'IS_CLOSING',
          CLOSED: 'PEAK'
        };

        this.setState({
          currentState: nextState[currentState],
          y: this.isClosed() ? peakingAmount : peakingAmount / 2 + y
        });
      } else {
        if (this.inPanTolerance(deltaX)) return;

        if (isFinal) {
          if (this.isOpening()) this.open();else if (this.isClosing()) this.close();
          return;
        }

        var _currentState = this.state.currentState;
        var _pointers$ = pointers[0];
        var clientX = _pointers$.clientX;
        var _clientY = _pointers$.clientY;


        var x = position === 'right' ? document.body.clientWidth - clientX : clientX;

        if (x + peakingAmount >= width) x = width - peakingAmount;

        var _closingOrOpening = this.closingOrOpening(direction);
        var _nextState = {
          PEAK: _closingOrOpening,
          IS_OPENING: _closingOrOpening,
          IS_CLOSING: _closingOrOpening,
          OPEN: 'IS_CLOSING',
          CLOSED: 'PEAK'
        };

        this.setState({
          currentState: _nextState[_currentState],
          x: this.isClosed() ? peakingAmount : peakingAmount / 2 + x
        });
      }
    }
  }, {
    key: 'onOverlayTap',
    value: function onOverlayTap(e) {
      e.preventDefault();
      if (this.isOpen()) this.close();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props4 = this.props;
      var config = _props4.config;
      var drawerStyle = _props4.drawerStyle;
      var className = _props4.className;
      var overlayClassName = _props4.overlayClassName;
      var width = _props4.width;
      var children = _props4.children;
      var offset = _props4.offset;
      var _state = this.state;
      var x = _state.x;
      var y = _state.y;

      var vertical = this.findOpenAxis() === 'vertical';
      if (vertical) {
        return _react2.default.createElement(
          _reactMotion.Motion,
          { style: {
              myProp: (0, _reactMotion.spring)(y + offset || 0, config)
            } },
          function (interpolated) {
            var _styles = (0, _styles4.default)(interpolated.myProp, _this2.props);

            var drawer = _styles.drawer;
            var transform = _styles.transform;
            var overlay = _styles.overlay;


            var computedStyle = (0, _extend2.default)(drawer, drawerStyle);
            if (interpolated.myProp > 0) computedStyle.display = 'block';else computedStyle.display = 'none';

            return _react2.default.createElement(
              'div',
              { style: transform },
              _react2.default.createElement(
                _reactHammerjs2.default,
                {
                  onPress: _this2.onPress.bind(_this2),
                  onPressUp: _this2.onPressUp.bind(_this2),
                  onPan: _this2.onPan.bind(_this2), vertical: vertical },
                _react2.default.createElement(
                  'div',
                  { className: className, style: computedStyle },
                  (0, _isFunction2.default)(children) ? children(interpolated.myProp) : children,
                  !_this2.isClosed() && _react2.default.createElement(
                    _reactHammerjs2.default,
                    { style: overlay, className: overlayClassName, onTap: _this2.onOverlayTap.bind(_this2) },
                    _react2.default.createElement('span', null)
                  )
                )
              )
            );
          }
        );
      }
      return _react2.default.createElement(
        _reactMotion.Motion,
        { style: {
            myProp: (0, _reactMotion.spring)(x + offset || 0, config)
          } },
        function (interpolated) {
          var _styles2 = (0, _styles4.default)(interpolated.myProp, _this2.props);

          var drawer = _styles2.drawer;
          var transform = _styles2.transform;
          var overlay = _styles2.overlay;


          var computedStyle = (0, _extend2.default)(drawer, drawerStyle);
          if (interpolated.myProp > 0) computedStyle.display = 'block';else computedStyle.display = 'none';

          return _react2.default.createElement(
            'div',
            { style: transform },
            _react2.default.createElement(
              _reactHammerjs2.default,
              {
                onPress: _this2.onPress.bind(_this2),
                onPressUp: _this2.onPressUp.bind(_this2),
                onPan: _this2.onPan.bind(_this2), vertical: false },
              _react2.default.createElement(
                'div',
                { className: className, style: computedStyle },
                (0, _isFunction2.default)(children) ? children(interpolated.myProp) : children,
                !_this2.isClosed() && _react2.default.createElement(
                  _reactHammerjs2.default,
                  { style: overlay, className: overlayClassName, onTap: _this2.onOverlayTap.bind(_this2) },
                  _react2.default.createElement('span', null)
                )
              )
            )
          );
        }
      );
    }
  }]);

  return Drawer;
}(_react2.default.Component);

Drawer.propTypes = {
  zIndex: number, // z-index of the drawer default is 10000
  noTouchOpen: bool, // can a user pan to open
  noTouchClose: bool, // can a user pan to close
  onChange: func, // called when the drawer is open
  drawerStyle: object, // additional drawer styles
  className: string, // additional drawer className
  overlayClassName: string, // additional overlay className
  config: array, // configuration of the react-motion animation
  open: bool, // states if the drawer is open
  width: oneOfType([number, string]), // width of the drawer
  height: oneOfType([number, string]), // height of the drawer
  handleWidth: number, // width of the handle
  handleHeight: number, // height of handle
  peakingAmount: number, // amount that the drawer peaks on press
  panTolerance: number, // tolerance until the drawer starts to move
  position: oneOf(['top', 'bottom', 'left', 'right']), // drawer on the right side of the screen
  overlayColor: string, // color of the overlay
  fadeOut: bool, // fade out
  offset: number };
Drawer.defaultProps = {
  zIndex: 10000,
  noTouchOpen: false,
  noTouchClose: false,
  onChange: function onChange() {},
  overlayColor: 'rgba(0, 0, 0, 0.4)',
  config: [350, 40],
  open: false,
  width: 300,
  height: '100%',
  handleWidth: 20,
  peakingAmount: 50,
  panTolerance: 50,
  position: 'left',
  fadeOut: false,
  offset: 0
};
exports.default = Drawer;