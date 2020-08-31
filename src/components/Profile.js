import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';
import {
  fetchChampionData,
  fetchCurrentGameData,
  fetchRankedData,
  fetchSummonerData,
} from '../reducers/ApiActions';
import {useDispatch, useSelector} from 'react-redux';

import ChampionStatsHeader from './profile/ChampionStatsHeader';
import MostPlayedChampions from './profile/MostPlayedChampions';
import PlayerStats from './profile/PlayerStats';
import PlayerStatsHeader from './profile/PlayerStatsHeader';
import ProfileHeader from './profile/ProfileHeader';
import PropTypes from 'prop-types';
import React from 'react';
import TopChampions from './profile/TopChampions';
import {addRecentSummoner} from '../reducers/SummonersActions';

const Profile = (props) => {
  const summonerData = useSelector((state) => state.api.summonerData);
  const rankedData = useSelector((state) => state.api.rankedData);
  const championData = useSelector((state) => state.api.championData);
  const currentGameData = useSelector((state) => state.api.currentGameData);
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
      fetchCurrentGameData(
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
      // TODO: make this a loading page instead
      <ImageBackground
        source={props.backgroundImage}
        style={styles.background}
      />
    );
  }

  return (
    <ImageBackground source={props.backgroundImage} style={styles.background}>
      <ScrollView indicatorStyle={props.indicatorStyle}>
        <View style={styles.profileContainer}>
          <ProfileHeader
            rankedData={rankedData.data}
            summonerName={summonerData.data.summonerName}
            summonerLevel={summonerData.data.summonerLevel}
            summonerIcon={summonerData.data.summonerObject.summonerIcon}
            summonerRegion={summonerData.data.region}
            recentMatches={summonerData.data.recentGames}
            inGame={
              !currentGameData.isFetching &&
              currentGameData.data.summoners.length > 0
            }
            currentGameData={currentGameData.data}
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
          <ChampionStatsHeader />
          <MostPlayedChampions
            title={championData.data[0].championStatType}
            champions={championData.data[0].mostPlayedChampions}
          />
          <TopChampions
            title={championData.data[1].championStatType}
            champions={championData.data[1].topChampions}
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
    marginTop: '5%',
  },
});

export default Profile;
