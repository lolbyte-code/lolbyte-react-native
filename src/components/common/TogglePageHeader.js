import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {colors, fonts} from '../../Theme';

import PropTypes from 'prop-types';
import React from 'react';

const TogglePageHeader = (props) => {
  return (
    <TouchableWithoutFeedback onPress={props.onPressHandler}>
      <View style={props.selected ? styles.containerSelected : null}>
        <Text
          style={
            props.selected ? styles.titleSelected : styles.titleNotSelected
          }>
          {props.title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

TogglePageHeader.defaultProps = {
  title: '',
  onPressHandler: () => {},
  selected: false,
};

TogglePageHeader.propTypes = {
  title: PropTypes.string,
  onPressHandler: PropTypes.func,
  selected: PropTypes.bool,
};

const styles = StyleSheet.create({
  containerSelected: {
    paddingBottom: 6,
    borderBottomWidth: 5,
    borderBottomColor: colors.blue,
  },
  titleNotSelected: {
    color: colors.darkGrey,
    fontSize: 20,
    fontFamily: fonts.bold,
  },
  titleSelected: {
    color: colors.blue,
    fontSize: 20,
    fontFamily: fonts.bold,
  },
});

export default TogglePageHeader;
