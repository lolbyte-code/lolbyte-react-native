import React from 'react';
import {View, StyleSheet} from 'react-native';
import SummonerDetails from '../components/profile/SummonerDetails';
import Rank from '../components/profile/Rank';
import LeagueDetails from '../components/profile/LeagueDetails';
import ApiUrl from '../api/Constants';

const ProfileScreen = ({route}) => {
  const [summonerData, setSummonerData] = React.useState({});
  const [rankedData, setRankedData] = React.useState([{}]);

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
    <View style={styles.profile}>
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
      </View>
    </View>
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
