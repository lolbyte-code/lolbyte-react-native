import {StyleSheet, View} from 'react-native';

import BlueCircleSvg from '@app/assets/svg/blueDot.svg';
import PropTypes from 'prop-types';
import React from 'react';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const TripleDot = (props) => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        style={styles.touchContainer}
        onPress={props.onPress}>
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
      </TouchableWithoutFeedback>
    </View>
  );
};

TripleDot.defaultProps = {
  tripleDotsWidth: 7,
  tripleDotsHeight: 7,
  onPress: () => {},
};

TripleDot.propTypes = {
  tripleDotsWidth: PropTypes.number,
  tripleDotsHeight: PropTypes.number,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    width: 29,
  },
  touchContainer: {
    flexDirection: 'row',
  },
  tripleDot: {
    margin: 1,
  },
});

export default TripleDot;
