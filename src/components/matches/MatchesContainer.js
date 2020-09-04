import {StyleSheet, View} from 'react-native';

import Loading from '../common/Loading';
import Matches from './Matches';
import PropTypes from 'prop-types';
import React from 'react';
import {useSelector} from 'react-redux';

const MatchesContainer = (props) => {
  const searches = useSelector((state) => state.searches);

  return (
    <View style={props.visible ? null : styles.hide}>
      {props.isFetching ? (
        <Loading loadingIndicatorSize={props.matchesLoadingIndicatorSize} />
      ) : (
        <Matches
          matchEntries={props.matchesData}
          currentSummoner={searches[0].summonerName}
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
};

MatchesContainer.propTypes = {
  visible: PropTypes.bool,
  isFetching: PropTypes.bool,
  matchesData: PropTypes.array,
  matchesLoadingIndicatorSize: PropTypes.string,
};

const styles = StyleSheet.create({
  hide: {
    display: 'none',
  },
});

export default MatchesContainer;
