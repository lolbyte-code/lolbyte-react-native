import {StyleSheet, TextInput} from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';

const SummonerSearch = (props) => {
  return (
    <TextInput
      placeholder={props.placeholder}
      style={styles.input}
      onChangeText={(value) => props.onChangeTextHandler(value)}
      onSubmitEditing={() => props.onSubmitEditingHandler()}
    />
  );
};

SummonerSearch.defaultProps = {
  placeholder: 'enter summoner name',
  onChangeTextHandler: {},
  onSubmitEditingHandler: {},
};

SummonerSearch.propTypes = {
  placeholder: PropTypes.string,
  onChangeTextHandler: PropTypes.func,
  onSubmitEditingHandler: PropTypes.func,
};

const styles = StyleSheet.create({
  input: {
    width: '66%',
    height: 44,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
});

export default SummonerSearch;
