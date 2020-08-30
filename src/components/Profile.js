import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';
import {
  fetchChampionData,
  fetchRankedData,
  fetchSummonerData,
} from '../reducers/ApiActions';
import {useDispatch, useSelector} from 'react-redux';

import ChampionStatsHeader from './profile/ChampionStatsHeader';
import {Dimensions} from 'react-native';
import LeagueDetails from './profile/LeagueDetails';
import MostPlayedChampions from './profile/MostPlayedChampions';
import PlayerStats from './profile/PlayerStats';
import PlayerStatsHeader from './profile/PlayerStatsHeader';
import PropTypes from 'prop-types';
import Rank from './profile/Rank';
import React from 'react';
import SummonerDetails from './profile/SummonerDetails';
import TopChampions from './profile/TopChampions';
import {addRecentSummoner} from '../reducers/SummonersActions';

const Profile = (props) => {
  // TODO: could break these into separate components and parallelize loading?
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
      // TODO: make this a loading page instead
      <ImageBackground
        source={props.backgroundImage}
        style={styles.background}
      />
    );
  }

  let i = 0;
  const RankEntries = rankedData.data.map((entry) => (
    <View style={styles.rankEntryContainer} key={`leagueDetail_${i++}`}>
      <Rank tier={entry.tier} />
      <LeagueDetails
        queue={entry.rankQueueType}
        rank={entry.rank}
        points={entry.leagueProgress}
        score={entry.mmr}
        wins={entry.rankedWL}
      />
    </View>
  ));

  return (
    <ImageBackground source={props.backgroundImage} style={styles.background}>
      <ScrollView indicatorStyle={props.indicatorStyle}>
        <View style={styles.profileContainer}>
          <SummonerDetails
            summonerName={summonerData.data.summonerName}
            summonerLevel={summonerData.data.summonerLevel}
            summonerIcon={summonerData.data.summonerObject.summonerIcon}
            summonerRegion={summonerData.data.region}
          />
          <View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={true}
              indicatorStyle={props.indicatorStyle}
              pagingEnabled>
              {RankEntries}
            </ScrollView>
          </View>
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
            data={championData.data[0].mostPlayedChampions}
          />
          <TopChampions
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
  indicatorStyle: 'white',
};

Profile.propTypes = {
  backgroundImage: PropTypes.node,
  route: PropTypes.object,
  indicatorStyle: PropTypes.string,
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
  rankEntryContainer: {
    width: Dimensions.get('window').width,
  },
});

export default Profile;
