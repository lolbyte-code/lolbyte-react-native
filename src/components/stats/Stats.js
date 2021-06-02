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
        percent={props.statisticsData.playerStats.winPercentage}
        kdaShort={`${props.statisticsData.playerStats.kills}/${props.statisticsData.playerStats.deaths}/${props.statisticsData.playerStats.assists}`}
        kdaLong={`${(
          (props.statisticsData.playerStats.kills +
            props.statisticsData.playerStats.assists) /
          Math.max(props.statisticsData.playerStats.deaths, 1)
        ).toFixed(2)} KDA`}
        wards={`${props.statisticsData.playerStats.wards.toFixed(
          1,
        )} Wards Placed`}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.championStatsTitle}>
          {props.championStatsTitle}
        </Text>
      </View>
      <MostPlayedChampions
        champions={props.statisticsData.mostPlayedChamps.champs}
      />
      <TopChampions champions={props.statisticsData.topChamps.champs} />
    </View>
  );
};

StatsSummary.defaultProps = {
  playerStatsTitle: 'Player Statistics',
  playerStatsSubtitle: 'Last 20 Matches',
  championStatsTitle: 'Champion Statistics',
  statisticsData: {},
};

StatsSummary.propTypes = {
  playerStatsTitle: PropTypes.string,
  playerStatsSubtitle: PropTypes.string,
  championStatsTitle: PropTypes.string,
  statisticsData: PropTypes.object,
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
