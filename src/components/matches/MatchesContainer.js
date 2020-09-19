import {StyleSheet, View} from 'react-native';

import Matches from '@app/components/matches/Matches';
import MatchesFilter from '@app/components/matches/MatchesFilter';
import PropTypes from 'prop-types';
import React from 'react';

const MatchesContainer = (props) => {
  return (
    <View style={props.visible ? null : styles.hide}>
      <MatchesFilter
        selectedGameType={props.selectedGameType}
        setSelectedGameTypeHandler={props.setSelectedGameTypeHandler}
      />
      <Matches
        matches={props.matchesData}
        currentSummonerName={props.currentSummonerName}
        summonerId={props.summonerId}
        summonerRegion={props.summonerRegion}
      />
    </View>
  );
};

MatchesContainer.defaultProps = {
  visible: false,
  matchesData: [],
  currentSummonerName: '',
  selectedGameType: 0,
  setSelectedGameTypeHandler: () => {},
  summonerId: '',
  summonerRegion: '',
};

MatchesContainer.propTypes = {
  visible: PropTypes.bool,
  matchesData: PropTypes.array,
  currentSummonerName: PropTypes.string,
  selectedGameType: PropTypes.number,
  setSelectedGameTypeHandler: PropTypes.func,
  summonerId: PropTypes.string,
  summonerRegion: PropTypes.string,
};

const styles = StyleSheet.create({
  hide: {
    display: 'none',
  },
});

export default MatchesContainer;
