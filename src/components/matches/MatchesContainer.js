import {StyleSheet, View} from 'react-native';

import Loading from 'LolByte/src/components/common/Loading';
import Matches from 'LolByte/src/components/matches/Matches';
import MatchesFilter from 'LolByte/src/components/matches/MatchesFilter';
import PropTypes from 'prop-types';
import React from 'react';

const MatchesContainer = (props) => {
  return (
    <View style={props.visible ? null : styles.hide}>
      {props.isFetching ? (
        <Loading loadingIndicatorSize={props.matchesLoadingIndicatorSize} />
      ) : (
        <View>
          <MatchesFilter
            selectedGameType={props.selectedGameType}
            setSelectedGameTypeHandler={props.setSelectedGameTypeHandler}
          />
          <Matches
            matchEntries={props.matchesData}
            currentSummonerName={props.currentSummonerName}
          />
        </View>
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
  selectedGameType: 0,
  setSelectedGameTypeHandler: () => {},
};

MatchesContainer.propTypes = {
  visible: PropTypes.bool,
  isFetching: PropTypes.bool,
  matchesData: PropTypes.array,
  matchesLoadingIndicatorSize: PropTypes.string,
  currentSummonerName: PropTypes.string,
  selectedGameType: PropTypes.number,
  setSelectedGameTypeHandler: PropTypes.func,
};

const styles = StyleSheet.create({
  hide: {
    display: 'none',
  },
});

export default MatchesContainer;
