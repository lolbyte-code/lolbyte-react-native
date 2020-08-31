import {StyleSheet, Text, View} from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';
import TopChampionsEntry from './TopChampionsEntry';
import {colors} from '../../Theme';

const TopChampions = (props) => {
  let i = 0;
  const ChampionEntries = props.champions.map((entry) => (
    <TopChampionsEntry
      key={`topChampionEntry${i++}`}
      championId={entry.championId}
      championName={entry.championName}
      championLevel={entry.championLevel}
      championPoints={entry.championPoints}
    />
  ));
  return (
    <View>
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.entries}>{ChampionEntries}</View>
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
  entries: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    color: colors.lightGrey,
    fontSize: 15,
    marginLeft: 15,
  },
});

export default TopChampions;
