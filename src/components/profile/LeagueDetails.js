import {StyleSheet, Text, View} from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';
import {colors} from '../../Theme';

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
  queue: '',
  rank: '',
  points: '',
  score: '',
  wins: '',
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
    marginTop: 15,
  },
  queue: {
    color: colors.white,
    fontSize: 25,
  },
  rank: {
    color: colors.white,
    fontSize: 25,
  },
  points: {
    color: colors.white,
    fontSize: 18,
  },
  score: {
    color: colors.blue,
    fontSize: 18,
  },
  wins: {
    color: colors.lightGrey,
    fontSize: 18,
  },
});

export default LeagueDetails;
