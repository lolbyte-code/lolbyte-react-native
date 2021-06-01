import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '@app/Theme';

import MostPlayedChampions from '@app/components/stats/MostPlayedChampions';
import PlayerStats from '@app/components/stats/PlayerStats';
import PropTypes from 'prop-types';
import React from 'react';
import TopChampions from '@app/components/stats/TopChampions';

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
        percent={props.statisticsData[0].winPercentage}
        kdaShort={`${props.statisticsData[0].kills}/${props.statisticsData[0].deaths}/${props.statisticsData[0].assists}`}
        kdaLong={`${(
          (props.statisticsData[0].kills + props.statisticsData[0].assists) /
          Math.max(props.statisticsData[0].deaths, 1)
        ).toFixed(2)} KDA`}
        wards={`${props.statisticsData[0].wards.toFixed(1)} Wards Placed`}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.championStatsTitle}>
          {props.championStatsTitle}
        </Text>
      </View>
      <MostPlayedChampions
        title={props.statisticsData[1].type}
        champions={props.statisticsData[1].champs}
      />
      <TopChampions
        title={props.statisticsData[2].type}
        champions={props.statisticsData[2].champs}
      />
    </View>
  );
};

StatsSummary.defaultProps = {
  playerStatsTitle: 'Player Statistics',
  playerStatsSubtitle: 'Last 20 Matches',
  championStatsTitle: 'Champion Statistics',
  statisticsData: [],
};

StatsSummary.propTypes = {
  playerStatsTitle: PropTypes.string,
  playerStatsSubtitle: PropTypes.string,
  championStatsTitle: PropTypes.string,
  statisticsData: PropTypes.array,
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
