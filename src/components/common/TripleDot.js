import {StyleSheet, View} from 'react-native';

import BlueCircleSvg from '../../svg/blueDot.svg';
import PropTypes from 'prop-types';
import React from 'react';

const TripleDot = (props) => {
  return (
    <View style={styles.container}>
      <BlueCircleSvg
        width={props.tripleDotsWidth}
        height={props.tripleDotsHeight}
        style={styles.tripleDot}
      />
      <BlueCircleSvg
        width={props.tripleDotsWidth}
        height={props.tripleDotsHeight}
        style={styles.tripleDot}
      />
      <BlueCircleSvg
        width={props.tripleDotsWidth}
        height={props.tripleDotsHeight}
        style={styles.tripleDot}
      />
    </View>
  );
};

TripleDot.defaultProps = {
  tripleDotsWidth: 7,
  tripleDotsHeight: 7,
};

TripleDot.propTypes = {
  tripleDotsWidth: PropTypes.number,
  tripleDotsHeight: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 8,
    marginTop: 6,
  },
  tripleDot: {
    margin: 1,
  },
});

export default TripleDot;
