import {StyleSheet, View} from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';
import SummonerEntry from './SummonerEntry';

const Summoners = (props) => {
  let i = 0;
  const SummonerEntries = props.entries
    .slice(0, props.maxLimit)
    .map((entry) => (
      <SummonerEntry
        key={`summoner_${i++}`}
        summonerIcon={entry.summonerIcon}
        summonerName={entry.summonerName}
        summonerRegion={entry.summonerRegion}
      />
    ));
  return (
    <View style={styles.container}>
      <View style={styles.entries}>{SummonerEntries}</View>
    </View>
  );
};

Summoners.defaultProps = {
  entries: [],
  maxLimit: 8,
};

Summoners.propTypes = {
  entries: PropTypes.array,
  maxLimit: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
  },
  entries: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
});

export default Summoners;
