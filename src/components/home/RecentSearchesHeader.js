import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';
import {colors} from '../common/Theme';

const RecentSearchesHeader = (props) => {
  return (
    <TouchableWithoutFeedback onPress={() => props.onPressHandler()}>
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

RecentSearchesHeader.defaultProps = {
  title: 'Recent Searches',
  onPressHandler: {},
  selected: false,
};

RecentSearchesHeader.propTypes = {
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
    color: colors.lightGrey,
    fontSize: 20,
  },
  titleSelected: {
    color: colors.blue,
    fontSize: 20,
  },
});

export default RecentSearchesHeader;
