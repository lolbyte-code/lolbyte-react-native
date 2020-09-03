import {StyleSheet, View} from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';
import SummonerMatchEntry from './SummonerMatchEntry';

const SummonerMatches = (props) => {
  const SummonerMatchEntries = props.allData.players.map((data) => {
    return (
      <SummonerMatchEntry
        cs={data.cs.replace(',', '')}
        championId={data.championId}
        kda={data.kdaLong}
        summonerName={data.summonerName}
        rank={data.rank}
        items={data.items}
        badges={data.badges}
        spells={data.spells}
      />
    );
  });
  return (
    <View>
      <View style={styles.summonerMatches}>
        {SummonerMatchEntries[0]}
        {SummonerMatchEntries[5]}
      </View>
      <View style={styles.summonerMatches}>
        {SummonerMatchEntries[1]}
        {SummonerMatchEntries[6]}
      </View>
      <View style={styles.summonerMatches}>
        {SummonerMatchEntries[2]}
        {SummonerMatchEntries[7]}
      </View>
      <View style={styles.summonerMatches}>
        {SummonerMatchEntries[3]}
        {SummonerMatchEntries[8]}
      </View>
      <View style={styles.summonerMatches}>
        {SummonerMatchEntries[4]}
        {SummonerMatchEntries[9]}
      </View>
    </View>
  );
};

SummonerMatches.defaultProps = {
  allData: {},
};

SummonerMatches.propTypes = {
  allData: PropTypes.object,
};

const styles = StyleSheet.create({
  summonerMatches: {
    flexDirection: 'row',
  },
});

export default SummonerMatches;
