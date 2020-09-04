import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../Theme';

import MostPlayedChampions from './MostPlayedChampions';
import PlayerStats from './PlayerStats';
import PropTypes from 'prop-types';
import React from 'react';
import TopChampions from './TopChampions';

const StatsSummary = (props) => {
  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.playerStatsTitle}>{props.playerStatsTitle}</Text>
        <Text style={styles.playerStatsSubtitle}>
          {props.playerStatsSubtitle}
        </Text>
      </View>
      <PlayerStats
        percent={props.playerStatsData[0].winPercentage}
        kdaShort={props.playerStatsData[0].kdaLong}
        kdaLong={props.playerStatsData[0].kdaShort}
        wards={props.playerStatsData[0].averageWardsPlaced}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.championStatsTitle}>
          {props.championStatsTitle}
        </Text>
      </View>
      <MostPlayedChampions
        title={props.championData[0].championStatType}
        champions={props.championData[0].mostPlayedChampions}
      />
      <TopChampions
        title={props.championData[1].championStatType}
        champions={props.championData[1].topChampions}
      />
    </View>
  );
};

StatsSummary.defaultProps = {
  playerStatsTitle: 'Player Statistics',
  playerStatsSubtitle: 'Last 20 Matches',
  championStatsTitle: 'Champion Statistics',
  playerStatsData: [],
  championData: [],
};

StatsSummary.propTypes = {
  playerStatsTitle: PropTypes.string,
  playerStatsSubtitle: PropTypes.string,
  championStatsTitle: PropTypes.string,
  playerStatsData: PropTypes.array,
  championData: PropTypes.array,
};

const styles = StyleSheet.create({
  titleContainer: {
    marginLeft: 15,
    marginBottom: 10,
    marginTop: 10,
  },
  playerStatsTitle: {
    color: colors.white,
    fontSize: 25,
    fontFamily: fonts.bold,
  },
  playerStatsSubtitle: {
    color: colors.lightGrey,
    fontSize: 15,
    fontFamily: fonts.regular,
  },
  championStatsTitle: {
    color: colors.white,
    fontSize: 25,
    fontFamily: fonts.bold,
  },
});

export default StatsSummary;
