import {StyleSheet, TextInput} from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';
import {colors} from '../../Theme';

const SummonerSearch = (props) => {
  return (
    <TextInput
      placeholder={props.placeholder}
      placeholderTextColor={props.placeholderTextColor}
      style={styles.input}
      onChangeText={(value) => props.onChangeTextHandler(value)}
      onSubmitEditing={() => props.onSubmitEditingHandler()}
    />
  );
};

SummonerSearch.defaultProps = {
  placeholder: 'enter summoner name',
  placeholderTextColor: colors.lightGrey,
  onChangeTextHandler: {},
  onSubmitEditingHandler: {},
};

SummonerSearch.propTypes = {
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  onChangeTextHandler: PropTypes.func,
  onSubmitEditingHandler: PropTypes.func,
};

const styles = StyleSheet.create({
  input: {
    width: '66%',
    height: 44,
    padding: 10,
    backgroundColor: colors.darkGrey,
    borderRadius: 5,
    color: colors.lightGrey,
  },
});

export default SummonerSearch;
