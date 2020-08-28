import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import PropTypes from 'prop-types';

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
};

SummonerSearch.propTypes = {
  placeholder: PropTypes.string,
};

const styles = StyleSheet.create({
  input: {
    width: '66%',
    height: 44,
    padding: 10,
    marginRight: 5,
    backgroundColor: 'white',
    borderRadius: 5,
  },
});

export default SummonerSearch;
