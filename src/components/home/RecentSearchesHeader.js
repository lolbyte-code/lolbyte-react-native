import React from 'react';
import {StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';
import PropTypes from 'prop-types';

const RecentSearchesHeader = (props) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => props.onPressHandler('recentSearches')}>
      <View
        style={
          props.selected
            ? styles.containerSelected
            : styles.containerNotSelected
        }>
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
};

RecentSearchesHeader.propTypes = {
  title: PropTypes.string,
};

const styles = StyleSheet.create({
  containerNotSelected: {
    marginLeft: 15,
  },
  containerSelected: {
    paddingBottom: 6,
    borderBottomWidth: 5,
    borderBottomColor: 'teal',
    marginLeft: 15,
  },
  titleNotSelected: {
    color: 'grey',
    fontSize: 20,
  },
  titleSelected: {
    color: 'teal',
    fontSize: 20,
  },
});

export default RecentSearchesHeader;
