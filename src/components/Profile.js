import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';
import {
  fetchChampionData,
  fetchRankedData,
  fetchSummonerData,
} from '../reducers/ApiActions';
import {useDispatch, useSelector} from 'react-redux';

import ChampStatsHeader from './profile/ChampStatsHeader';
import LeagueDetails from './profile/LeagueDetails';
import MostPlayedChamps from './profile/MostPlayedChamps';
import PlayerStats from './profile/PlayerStats';
import PlayerStatsHeader from './profile/PlayerStatsHeader';
import PropTypes from 'prop-types';
import Rank from './profile/Rank';
import React from 'react';
import SummonerDetails from './profile/SummonerDetails';
import TopChamps from './profile/TopChamps';
import {addRecentSummoner} from '../reducers/SummonersActions';

const Profile = (props) => {
  const summonerData = useSelector((state) => state.api.summonerData);
  const rankedData = useSelector((state) => state.api.rankedData);
  const championData = useSelector((state) => state.api.championData);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(
      fetchSummonerData(
        props.route.params.summonerName,
        props.route.params.region,
      ),
    );
  }, [props.route, dispatch]);

  React.useEffect(() => {
    if (summonerData.isFetching) {
      return;
    }
    dispatch(
      fetchRankedData(summonerData.data.summonerId, props.route.params.region),
    );
  }, [props.route, summonerData, dispatch]);

  React.useEffect(() => {
    if (summonerData.isFetching) {
      return;
    }
    dispatch(
      fetchChampionData(
        summonerData.data.summonerId,
        props.route.params.region,
      ),
    );
  }, [props.route, summonerData, dispatch]);

  React.useEffect(() => {
    if (summonerData.isFetching) {
      return;
    }
    dispatch(
      addRecentSummoner({
        summonerName: summonerData.data.summonerName,
        summonerIcon: summonerData.data.summonerObject.summonerIcon,
        summonerRegion: summonerData.data.region,
      }),
    );
  }, [summonerData, dispatch]);

  if (
    summonerData.isFetching ||
    rankedData.isFetching ||
    championData.isFetching
  ) {
    return (
      <ImageBackground
        source={props.backgroundImage}
        style={styles.background}
      />
    );
  }

  return (
    <ImageBackground source={props.backgroundImage} style={styles.background}>
      <ScrollView>
        <View style={styles.profileContainer}>
          <SummonerDetails
            name={summonerData.data.summonerName}
            level={summonerData.data.summonerLevel}
            summonerIcon={summonerData.data.summonerObject.summonerIcon}
            summonerRegion={summonerData.data.region}
          />
          <Rank tier={rankedData.data[0].tier} />
          <LeagueDetails
            queue={rankedData.data[0].rankQueueType}
            rank={rankedData.data[0].rank}
            points={rankedData.data[0].leagueProgress}
            score={rankedData.data[0].mmr}
            wins={rankedData.data[0].rankedWL}
          />
          <PlayerStatsHeader
            subtitle={summonerData.data.playerStats[0].playerStatType}
          />
          <PlayerStats
            percent={summonerData.data.playerStats[0].winPercentage}
            kdaShort={summonerData.data.playerStats[0].kdaLong}
            kdaLong={summonerData.data.playerStats[0].kdaShort}
            wards={summonerData.data.playerStats[0].averageWardsPlaced}
          />
          <ChampStatsHeader />
          <MostPlayedChamps
            title={championData.data[0].championStatType}
            data={championData.data[0].mostPlayedChampions}
          />
          <TopChamps
            title={championData.data[1].championStatType}
            data={championData.data[1].topChampions}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

Profile.defaultProps = {
  backgroundImage: require('../img/assets/background.png'),
  route: {},
};

Profile.propTypes = {
  backgroundImage: PropTypes.node,
  route: PropTypes.object,
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    // TODO: hacky AF
    width: '100.03%',
  },
  profileContainer: {
    // TODO: revisit all margins
    marginTop: '5%',
  },
});

export default Profile;
