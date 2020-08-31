import {StyleSheet, TextInput} from 'react-native';
import {colors, fonts} from '../../Theme';

import PropTypes from 'prop-types';
import React from 'react';

const SummonerSearch = (props) => {
  return (
    <TextInput
      placeholder={props.placeholder}
      placeholderTextColor={props.placeholderTextColor}
      style={styles.input}
      clearButtonMode={props.clearButtonMode}
      autoCorrect={props.autoCorrect}
      onChangeText={(value) => props.onChangeTextHandler(value)}
      onSubmitEditing={() => props.onSubmitEditingHandler()}
    />
  );
};

SummonerSearch.defaultProps = {
  placeholder: 'enter summoner name',
  placeholderTextColor: colors.lightGrey,
  clearButtonMode: 'always',
  autoCorrect: false,
  onChangeTextHandler: () => {},
  onSubmitEditingHandler: () => {},
};

SummonerSearch.propTypes = {
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  clearButtonMode: PropTypes.string,
  autoCorrect: PropTypes.bool,
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
    fontFamily: fonts.regular,
  },
});

export default SummonerSearch;
