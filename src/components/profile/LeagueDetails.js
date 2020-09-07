import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from 'LolByte/src/Theme';

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
  },
  queue: {
    color: colors.white,
    fontSize: 25,
    fontFamily: fonts.bold,
  },
  rank: {
    color: colors.white,
    fontSize: 25,
    fontFamily: fonts.bold,
  },
  points: {
    color: colors.white,
    fontSize: 18,
    fontFamily: fonts.regular,
  },
  score: {
    color: colors.blue,
    fontSize: 18,
    fontFamily: fonts.regular,
  },
  wins: {
    color: colors.lightGrey,
    fontSize: 18,
    fontFamily: fonts.regular,
  },
});

export default LeagueDetails;
