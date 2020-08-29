import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';

import ApiUrl from '../api/Constants';
import ChampStatsHeader from './profile/ChampStatsHeader';
import LeagueDetails from './profile/LeagueDetails';
import MostPlayedChamps from './profile/MostPlayedChamps';
import PlayerStats from './profile/PlayerStats';
import PlayerStatsHeader from './profile/PlayerStatsHeader';
import Rank from './profile/Rank';
import React from 'react';
import SummonerDetails from './profile/SummonerDetails';
import TopChamps from './profile/TopChamps';
import {addToStorage} from '../utils/Storage';

const background = require('../img/assets/background.png');

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

const Profile = ({route}) => {
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
          let summoner = {
            summonerName: json.summonerName,
            summonerIcon: json.summonerObject.summonerIcon,
            summonerRegion: json.region,
          };
          addToStorage('@savedSummoners', summoner);
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
    <ImageBackground source={background} style={styles.background}>
      <ScrollView>
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    // TODO: hacky AF
    width: '100.03%',
  },
  profileContainer: {
    flex: 1,
    marginTop: '5%',
  },
});

export default Profile;
