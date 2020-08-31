import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';

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
    borderBottomColor: '#22A8CE',
  },
  titleNotSelected: {
    color: '#B2B4BB',
    fontSize: 20,
  },
  titleSelected: {
    color: '#22A8CE',
    fontSize: 20,
  },
});

export default RecentSearchesHeader;
