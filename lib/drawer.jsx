import React from 'react';
import { Motion, spring } from 'react-motion';
import Hammer from 'react-hammerjs';
import extend from '1-liners/extend';
import isFunction from '1-liners/isFunction';
import styles from './styles';

const { bool, number, array, object, string, func, oneOfType, oneOf } = React.PropTypes;

const EVENT_DIRECTIONS = {
  DIRECTION_NONE: 1,
  DIRECTION_LEFT: 2,
  DIRECTION_RIGHT: 4,
  DIRECTION_UP: 8,
  DIRECTION_DOWN: 16,
  DIRECTION_HORIZONTAL: 6,
  DIRECTION_VERTICAL: 24,
  DIRECTION_ALL: 30,
};

export default class Drawer extends React.Component {

  static propTypes = {
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
    offset: number, // offset
  };

  static defaultProps = {
    zIndex: 10000,
    noTouchOpen: false,
    noTouchClose: false,
    onChange: () => {
    },
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
    offset: 0,
  };

  componentDidMount() {
    if (this.props.open) {
      this.open();
    }
  }

  componentWillReceiveProps(nextProps) {
    const {open} = this.props;
    const {open: nextOpen} = nextProps;

    if (nextOpen !== open) {
      if (nextOpen) this.open();
      else this.close();
    }
  }

  state = {
    currentState: 'CLOSED',
    x: undefined,
    y: undefined
  };

  isState(s) {
    return s === this.state.currentState;
  }
  isClosed() {
    return this.isState('CLOSED');
  }
  isOpen() {
    return this.isState('OPEN');
  }
  isOpening() {
    return this.isState('IS_OPENING');
  }
  isClosing() {
    return this.isState('IS_CLOSING');
  }

  findOpenAxis() {
    const {position} = this.props;
    return position === 'top' || position === 'bottom' ? 'vertical' : 'horizontal';
  }

  setStateBasedOnOpenAxis(options) {
    const openAxis = this.findOpenAxis();
    const {vertical, horizontal} = options;
    if (openAxis === 'vertical' && vertical) {
      return this.setState(vertical);
    }
    if (openAxis === 'horizontal' && horizontal) {
      return this.setState(horizontal);
    }
  }

  onPress(e) {
    if (this.props.noTouchOpen) return;
    e.preventDefault();
    this.peak();
  }

  onPressUp(e) {
    e.preventDefault();
    this.close();
  }

  peak() {
    const {onChange, handleWidth} = this.props;
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
    })
  }

  close() {
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

  open() {
    const {onChange, width, height} = this.props;
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

  isClosingDirection(direction) {
    const {position} = this.props;
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

  closingOrOpening(direction) {
    return this.isClosingDirection(direction) ? 'IS_CLOSING' : 'IS_OPENING';
  }

  inPanTolerance(delta) {
    const {currentState} = this.state;
    const {panTolerance} = this.props;

    return Math.abs(delta) <= panTolerance && currentState === 'OPEN';
  }

  onPan(e) {
    if (this.isClosed() && this.props.noTouchOpen) return;
    if (this.isOpen() && this.props.noTouchClose) return;
    e.preventDefault();

    const {isFinal, pointers, direction, deltaX, deltaY} = e;
    const {position, peakingAmount, width, height, handleWidth} = this.props;

    if (position === "bottom" || position === "top") {
      if (this.inPanTolerance(deltaY)) return;

      if (isFinal) {
        if (this.isOpening()) this.open();else if (this.isClosing()) this.close();
        return;
      }

      const {currentState} = this.state;
      const {clientY} = pointers[0];

      let y = position === 'top' ? document.body.clientHeight - clientY : clientY;

      if (y + peakingAmount >= height)
        y = height - peakingAmount;

      const closingOrOpening = this.closingOrOpening(direction);
      const nextState = {
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

      const {currentState} = this.state;
      const {clientX, clientY} = pointers[0];

      let x = position === 'right' ? document.body.clientWidth - clientX : clientX;


      if (x + peakingAmount >= width)
        x = width - peakingAmount;

      const closingOrOpening = this.closingOrOpening(direction);
      const nextState = {
        PEAK: closingOrOpening,
        IS_OPENING: closingOrOpening,
        IS_CLOSING: closingOrOpening,
        OPEN: 'IS_CLOSING',
        CLOSED: 'PEAK'
      };

      this.setState({
        currentState: nextState[currentState],
        x: this.isClosed() ? peakingAmount : peakingAmount / 2 + x
      });
    }
  }

  onOverlayTap(e) {
    e.preventDefault();
    if (this.isOpen()) this.close();
  }

  render() {
    const {config, drawerStyle, className, overlayClassName, width, children, offset} = this.props;
    const {x, y} = this.state;
    const vertical = this.findOpenAxis() === 'vertical';
    if (vertical) {
      return (
        <Motion style={{
          myProp: spring(y + offset || 0, config)
        }}>
              {interpolated => {
          const {drawer, transform, overlay} = styles(interpolated.myProp, this.props);

          let computedStyle = extend(drawer, drawerStyle);
          if (interpolated.myProp > 0)
            computedStyle.display = 'block';
          else
            computedStyle.display = 'none';

          return (
            <div style={transform}>
                    <Hammer
            onPress={this.onPress.bind(this)}
            onPressUp={this.onPressUp.bind(this)}
            onPan={this.onPan.bind(this)} vertical={vertical}>

                        <div className={className} style={computedStyle}>
                          { isFunction(children) ?
              children(interpolated.myProp)
              : children }

                        {!this.isClosed() &&
            <Hammer style={overlay} className={overlayClassName} onTap={this.onOverlayTap.bind(this)}><span></span></Hammer> }
                        </div>
                    </Hammer>
                  </div>
            );
        }
        }
            </Motion>
        );
    }
    return (
      <Motion style={{
        myProp: spring(x + offset || 0, config)
      }}>
          {interpolated => {
        const {drawer, transform, overlay} = styles(interpolated.myProp, this.props);

        let computedStyle = extend(drawer, drawerStyle);
        if (interpolated.myProp > 0)
          computedStyle.display = 'block';
        else
          computedStyle.display = 'none';

        return (
          <div style={transform}>
                <Hammer
          onPress={this.onPress.bind(this)}
          onPressUp={this.onPressUp.bind(this)}
          onPan={this.onPan.bind(this)} vertical={false}>

                    <div className={className} style={computedStyle}>
                      { isFunction(children) ?
            children(interpolated.myProp)
            : children }

                    {!this.isClosed() &&
          <Hammer style={overlay} className={overlayClassName} onTap={this.onOverlayTap.bind(this)}><span></span></Hammer> }
                    </div>
                </Hammer>
              </div>
          );
      }
      }
        </Motion>
      );
  }
}
