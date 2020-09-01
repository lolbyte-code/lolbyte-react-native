import {StyleSheet, View} from 'react-native';

import ChampionStatsHeader from './ChampionStatsHeader';
import MostPlayedChampions from './MostPlayedChampions';
import PlayerStats from './PlayerStats';
import PlayerStatsHeader from './PlayerStatsHeader';
import ProfileHeader from './ProfileHeader';
import PropTypes from 'prop-types';
import React from 'react';
import TopChampions from './TopChampions';

const Profile = (props) => {
  return (
    <View style={props.selected ? styles.container : styles.hide}>
      <ProfileHeader
        rankedData={props.rankedData}
        summonerName={props.summonerData.summonerName}
        summonerLevel={props.summonerData.summonerLevel}
        summonerIcon={props.summonerData.summonerObject.summonerIcon}
        summonerRegion={props.summonerData.region}
        recentMatches={props.summonerData.recentGames}
        inGame={
          !props.inGameDataFetching &&
          props.currentGameData.summoners.length > 0
        }
        currentGameData={props.currentGameData}
        previousSummoners={props.previousSummoners}
        currentSummoner={props.currentSummoner}
      />
      <PlayerStatsHeader
        subtitle={props.summonerData.playerStats[0].playerStatType}
      />
      <PlayerStats
        percent={props.summonerData.playerStats[0].winPercentage}
        kdaShort={props.summonerData.playerStats[0].kdaLong}
        kdaLong={props.summonerData.playerStats[0].kdaShort}
        wards={props.summonerData.playerStats[0].averageWardsPlaced}
      />
      <ChampionStatsHeader />
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

Profile.defaultProps = {
  selected: true,
  inGameDataFetching: true,
  summonerData: {},
  rankedData: [],
  currentGameData: {},
  championData: [],
  previousSummoners: [],
  currentSummoner: {},
};

Profile.propTypes = {
  selected: PropTypes.bool,
  inGameDataFetching: PropTypes.bool,
  summonerData: PropTypes.object,
  rankedData: PropTypes.array,
  currentGameData: PropTypes.object,
  championData: PropTypes.array,
  previousSummoners: PropTypes.array,
  currentSummoner: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    marginTop: '5%',
  },
  hide: {
    display: 'none',
  },
});

export default Profile;
