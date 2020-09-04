import {StyleSheet, View} from 'react-native';

import Loading from '../common/Loading';
import Matches from './Matches';
import PropTypes from 'prop-types';
import React from 'react';

const MatchesContainer = (props) => {
  return (
    <View style={props.visible ? null : styles.hide}>
      {props.isFetching ? (
        <Loading loadingIndicatorSize={props.matchesLoadingIndicatorSize} />
      ) : (
        <Matches
          matchEntries={props.matchesData}
          currentSummonerName={props.currentSummonerName}
        />
      )}
    </View>
  );
};

MatchesContainer.defaultProps = {
  visible: false,
  isFetching: true,
  matchesData: [],
  matchesLoadingIndicatorSize: 'small',
  currentSummonerName: '',
};

MatchesContainer.propTypes = {
  visible: PropTypes.bool,
  isFetching: PropTypes.bool,
  matchesData: PropTypes.array,
  matchesLoadingIndicatorSize: PropTypes.string,
  currentSummonerName: PropTypes.string,
};

const styles = StyleSheet.create({
  hide: {
    display: 'none',
  },
});

export default MatchesContainer;
