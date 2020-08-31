import {StyleSheet, View} from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';
import SummonerEntry from './SummonerEntry';

const Summoners = (props) => {
  let i = 0;
  const SummonerEntries = props.entries.map((entry) => (
    <SummonerEntry
      key={`summoner_${i++}`}
      championId={entry.championId}
      summonerName={entry.summonerName}
      summonerRegion={props.region}
      summonerRank={entry.rank}
      summonerTeamId={entry.teamId}
      selectedSummoner={entry.selectedSummoner}
      previousSummoners={props.previousSummoners}
    />
  ));
  return (
    <View>
      <View style={styles.entries}>{SummonerEntries}</View>
    </View>
  );
};

Summoners.defaultProps = {
  entries: [],
  region: '',
  previousSummoners: [],
};

Summoners.propTypes = {
  entries: PropTypes.array,
  region: PropTypes.string,
  previousSummoners: PropTypes.array,
};

const styles = StyleSheet.create({
  entries: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
});

export default Summoners;
