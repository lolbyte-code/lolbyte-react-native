import {StyleSheet, Text, View} from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';
import TopChampionsEntry from './TopChampionsEntry';

const TopChampions = (props) => {
  let i = 0;
  const ChampionEntries = props.data.map((entry) => (
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
  data: [],
};

TopChampions.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
};

const styles = StyleSheet.create({
  entries: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    color: 'grey',
    fontSize: 15,
    marginLeft: 15,
  },
});

export default TopChampions;
