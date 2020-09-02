import {StyleSheet, View} from 'react-native';

import Loading from '../common/Loading';
import Matches from './Matches';
import PropTypes from 'prop-types';
import React from 'react';

const MatchesResults = (props) => {
  return (
    <View style={props.selected ? styles.container : styles.hide}>
      {props.isFetching ? (
        <Loading loadingIndicatorSize={props.matchesLoadingIndicatorSize} />
      ) : (
        <Matches matches={props.matchesData} />
      )}
    </View>
  );
};

MatchesResults.defaultProps = {
  selected: false,
  isFetching: true,
  matchesData: [],
  matchesLoadingIndicatorSize: 'small',
};

MatchesResults.propTypes = {
  selected: PropTypes.bool,
  isFetching: PropTypes.bool,
  matchesData: PropTypes.array,
  matchesLoadingIndicatorSize: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    marginTop: '2%',
  },
  hide: {
    display: 'none',
  },
});

export default MatchesResults;