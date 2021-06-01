import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '@app/Theme';

import MostPlayedChampionsEntry from '@app/components/stats/MostPlayedChampionsEntry';
import PropTypes from 'prop-types';
import React from 'react';

const MostPlayedChampions = (props) => {
  var i = 0;
  const ChampionEntries = props.champions.map((entry) => (
    <MostPlayedChampionsEntry
      key={`mostPlayedChampionEntry_${i++}`}
      championId={entry.id}
      championName={entry.name}
      gamesPlayed={entry.gamesPlayed}
    />
  ));
  return (
    <View>
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.championEntries}>{ChampionEntries}</View>
    </View>
  );
};

MostPlayedChampions.defaultProps = {
  title: 'Most Played (Recent)',
  champions: [],
};

MostPlayedChampions.propTypes = {
  title: PropTypes.string,
  champions: PropTypes.array,
};

const styles = StyleSheet.create({
  championEntries: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  title: {
    marginBottom: 10,
    marginLeft: 15,
    color: colors.lightGrey,
    fontSize: 15,
    fontFamily: fonts.regular,
  },
});

export default MostPlayedChampions;
