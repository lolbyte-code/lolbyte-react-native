import {StyleSheet, View} from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';
import SummonerEntry from 'LolByte/src/components/home/SummonerEntry';

const Summoners = (props) => {
  var i = 0;
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
    <View>
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
  entries: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
});

export default Summoners;
