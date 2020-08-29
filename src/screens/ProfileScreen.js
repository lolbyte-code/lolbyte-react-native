import {ScrollView, StyleSheet, View} from 'react-native';

import ApiUrl from '../api/Constants';
import AsyncStorage from '@react-native-community/async-storage';
import ChampStatsHeader from '../components/profile/ChampStatsHeader';
import LeagueDetails from '../components/profile/LeagueDetails';
import MostPlayedChamps from '../components/profile/MostPlayedChamps';
import PlayerStats from '../components/profile/PlayerStats';
import PlayerStatsHeader from '../components/profile/PlayerStatsHeader';
import Rank from '../components/profile/Rank';
import React from 'react';
import SummonerDetails from '../components/profile/SummonerDetails';
import TopChamps from '../components/profile/TopChamps';

const setSavedSummoners = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@savedSummoners', jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const getSavedSummoners = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@savedSummoners');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

const initialSummonerData = {
  region: 'na',
  summonerId: '1',
  summonerName: 'unknown',
  summonerLevel: 0,
  summonerObject: {
    summonerIcon: '1',
  },
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
const initialChampData = [{}, {}];

const ProfileScreen = ({route}) => {
  const [summonerData, setSummonerData] = React.useState(initialSummonerData);
  const [rankedData, setRankedData] = React.useState(initialRankedData);
  const [champData, setChampData] = React.useState(initialChampData);

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
          getSavedSummoners().then((savedSummoners) => {
            if (savedSummoners == null) {
              savedSummoners = [];
            }
            savedSummoners = savedSummoners.slice(0, 8);
            if (
              savedSummoners.some(
                (summoner) => summoner.summonerName === json.summonerName,
              )
            ) {
              return;
            }
            savedSummoners.unshift({
              summonerName: json.summonerName,
              summonerIcon: json.summonerObject.summonerIcon,
              summonerRegion: json.region,
            });
            setSavedSummoners(savedSummoners);
          });
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

  React.useEffect(() => {
    let isCancelled = false;

    fetch(
      `${ApiUrl}/summoners/${route.params.region}/summoner-id/${summonerData.summonerId}/champions`,
      {
        method: 'GET',
      },
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (!isCancelled) {
          setChampData(json);
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
          summonerIcon={summonerData.summonerObject.summonerIcon}
          summonerRegion={summonerData.region}
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
        <ChampStatsHeader />
        <MostPlayedChamps
          title={champData[0].championStatType}
          data={champData[0].mostPlayedChampions}
        />
        <TopChamps
          title={champData[1].championStatType}
          data={champData[1].topChampions}
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
