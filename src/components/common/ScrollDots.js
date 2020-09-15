import {StyleSheet, View} from 'react-native';

import BlueCircleSvg from '@app/assets/svg/blueDot.svg';
import GreyCircleSvg from '@app/assets/svg/greyDot.svg';
import PropTypes from 'prop-types';
import React from 'react';

const ScrollDots = (props) => {
  var positions = [];
  for (var i = 0; i < props.listSize; i++) {
    positions.push(i * props.itemWidth);
  }

  const Dots = positions.map((position) => (
    <View style={props.scrollDotsStyle} key={`dot_${position}`}>
      {/*
        Effectively the same as props.currentItemPosition === position.
        We allow a little bit of a threshold to account for devices with
        high precision position coordinates.
      */}
      {Math.abs(props.currentItemPosition - position) <= 0.1 ? (
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
  scrollDotsStyle: {},
};

ScrollDots.propTypes = {
  currentItemIndex: PropTypes.number,
  listSize: PropTypes.number,
  itemWidth: PropTypes.number,
  scrollDotsWidth: PropTypes.number,
  scrollDotsHeight: PropTypes.number,
  scrollDotsStyle: PropTypes.object,
};

const styles = StyleSheet.create({
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
