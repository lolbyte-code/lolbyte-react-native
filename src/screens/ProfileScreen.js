import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import SummonerDetails from '../components/profile/SummonerDetails';
import Rank from '../components/profile/Rank';
import LeagueDetails from '../components/profile/LeagueDetails';
import PlayerStatsHeader from '../components/profile/PlayerStatsHeader';
import PlayerStats from '../components/profile/PlayerStats';
import ApiUrl from '../api/Constants';

const initialSummonerData = {
  region: 'na',
  summonerId: '1',
  summonerName: 'unknown',
  summonerLevel: 0,
  playerStats: [
    {
      playerStatType: 'Last 20 Matches',
      winPercentage: 0,
      kdaLong: '1/2/3',
      kdaShort: '1 KDA',
      averageWardsPlaced: '1 Ward Placed',
    },
  ],
};
const initialRankedData = [{}];

const ProfileScreen = ({route}) => {
  const [summonerData, setSummonerData] = React.useState(initialSummonerData);
  const [rankedData, setRankedData] = React.useState(initialRankedData);

  React.useEffect(() => {
    let isCancelled = false;

    fetch(
      `${ApiUrl}/summoners/${route.params.region}/name/${route.params.query}?gameType=0`,
      {
        method: 'GET',
      },
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (!isCancelled) {
          setSummonerData(json);
        }
      })
      .catch((error) => console.error(error));

    return () => {
      isCancelled = true;
    };
  }, [route.params]);

  React.useEffect(() => {
    let isCancelled = false;

    fetch(
      `${ApiUrl}/summoners/${route.params.region}/summoner-id/${summonerData.summonerId}/rank`,
      {
        method: 'GET',
      },
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (!isCancelled) {
          setRankedData(json);
        }
      })
      .catch((error) => console.error(error));

    return () => {
      isCancelled = true;
    };
  }, [route.params, summonerData]);

  return (
    <ScrollView style={styles.profile}>
      <View style={styles.profileContainer}>
        <SummonerDetails
          name={summonerData.summonerName}
          level={summonerData.summonerLevel}
        />
        <Rank tier={rankedData[0].tier} />
        <LeagueDetails
          queue={rankedData[0].rankQueueType}
          rank={rankedData[0].rank}
          points={rankedData[0].leagueProgress}
          score={rankedData[0].mmr}
          wins={rankedData[0].rankedWL}
        />
        <PlayerStatsHeader
          subtitle={summonerData.playerStats[0].playerStatType}
        />
        <PlayerStats
          percent={summonerData.playerStats[0].winPercentage}
          kdaShort={summonerData.playerStats[0].kdaLong}
          kdaLong={summonerData.playerStats[0].kdaShort}
          wards={summonerData.playerStats[0].averageWardsPlaced}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  profile: {
    backgroundColor: 'black',
    flex: 1,
  },
  profileContainer: {
    flex: 1,
    marginTop: '5%',
  },
});

export default ProfileScreen;
