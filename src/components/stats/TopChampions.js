import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '@app/Theme';

import PropTypes from 'prop-types';
import React from 'react';
import TopChampionsEntry from '@app/components/stats/TopChampionsEntry';

const TopChampions = (props) => {
  var i = 0;
  const ChampionEntries = props.champions.map((entry) => (
    <TopChampionsEntry
      key={`topChampionEntry_${i++}`}
      championId={entry.id}
      championName={entry.name}
      championLevel={entry.level}
      championPoints={entry.points}
    />
  ));
  return (
    <View>
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.championEntries}>{ChampionEntries}</View>
    </View>
  );
};

TopChampions.defaultProps = {
  title: 'Most Played (Mastery)',
  champions: [],
};

TopChampions.propTypes = {
  title: PropTypes.string,
  champions: PropTypes.array,
};

const styles = StyleSheet.create({
  championEntries: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  title: {
    margin: 10,
    marginLeft: 15,
    color: colors.lightGrey,
    fontSize: 15,
    fontFamily: fonts.regular,
  },
});

export default TopChampions;
