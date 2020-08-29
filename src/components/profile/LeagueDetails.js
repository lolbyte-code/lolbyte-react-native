import {StyleSheet, Text, View} from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';

const LeagueDetails = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.queue}>{props.queue}</Text>
      <Text style={styles.rank}>{props.rank}</Text>
      <Text style={styles.points}>{props.points}</Text>
      <Text style={styles.score}>{props.score}</Text>
      <Text style={styles.wins}>{props.wins}</Text>
    </View>
  );
};

LeagueDetails.defaultProps = {
  queue: 'unknown',
  rank: 'Unranked',
  points: '0 points',
  score: 'LolByte Score 0',
  wins: '0 wins',
};

LeagueDetails.propTypes = {
  queue: PropTypes.string,
  rank: PropTypes.string,
  points: PropTypes.string,
  score: PropTypes.string,
  wins: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  queue: {
    color: 'white',
    fontSize: 25,
  },
  rank: {
    color: 'white',
    fontSize: 25,
  },
  points: {
    color: 'white',
    fontSize: 18,
  },
  score: {
    color: 'teal',
    fontSize: 18,
  },
  wins: {
    color: 'grey',
    fontSize: 18,
  },
});

export default LeagueDetails;
