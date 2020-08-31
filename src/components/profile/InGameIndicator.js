import {StyleSheet, Text, View} from 'react-native';

import InGameSvg from '../../svg/inGame.svg';
import PropTypes from 'prop-types';
import React from 'react';

const InGameIndicator = (props) => {
  return (
    <View style={props.inGame ? styles.show : styles.hide}>
      <InGameSvg width={props.width} height={props.height} />
    </View>
  );
};

InGameIndicator.defaultProps = {
  inGame: false,
  width: 100,
  height: 20,
};

InGameIndicator.propTypes = {
  inGame: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
};

const styles = StyleSheet.create({
  show: {
    alignItems: 'center',
    marginTop: 10,
  },
  hide: {
    display: 'none',
  },
});

export default InGameIndicator;
