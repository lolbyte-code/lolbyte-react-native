import {StyleSheet, View} from 'react-native';

import BlueCircleSvg from '../../svg/scrollBarCircleBlue.svg';
import GreyCircleSvg from '../../svg/scrollBarCircleGrey.svg';
import PropTypes from 'prop-types';
import React from 'react';

const ScrollDots = (props) => {
  var positions = [];
  for (var i = 0; i < props.listSize; i++) {
    positions.push(i * props.itemWidth);
  }

  const Dots = positions.map((position) => (
    <View style={styles.scrollDots}>
      {props.currentItemPosition === position ? (
        <BlueCircleSvg
          width={props.scrollDotsWidth}
          height={props.scrollDotsHeight}
          style={styles.scrollDot}
        />
      ) : (
        <GreyCircleSvg
          width={props.scrollDotsWidth}
          height={props.scrollDotsHeight}
          style={styles.scrollDot}
        />
      )}
    </View>
  ));

  return (
    <View style={props.listSize > 1 ? styles.show : styles.hide}>{Dots}</View>
  );
};

ScrollDots.defaultProps = {
  currentItemPosition: 0,
  listSize: 0,
  itemWidth: 0,
  scrollDotsWidth: 5,
  scrollDotsHeight: 5,
};

ScrollDots.propTypes = {
  currentItemIndex: PropTypes.number,
  listSize: PropTypes.number,
  itemWidth: PropTypes.number,
  scrollDotsWidth: PropTypes.number,
  scrollDotsHeight: PropTypes.number,
};

const styles = StyleSheet.create({
  scrollDots: {
    marginTop: 5,
  },
  scrollDot: {
    margin: 1,
  },
  show: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  hide: {
    display: 'none',
  },
});

export default ScrollDots;
