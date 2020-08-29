import {ScrollView, StyleSheet, View} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import FavoritesHeader from '../components/home/FavoritesHeader';
import Logo from '../components/home/Logo';
import React from 'react';
import RecentSearchesHeader from '../components/home/RecentSearchesHeader';
import RegionSelector from '../components/home/RegionSelector';
import SummonerSearch from '../components/home/SummonerSearch';
import Summoners from '../components/home/Summoners';

const getSavedSummoners = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@savedSummoners');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

const getFavoriteSummoners = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@favoriteSummoners');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

const initialSavedSummoners = [
  {
    summonerName: 'Unknown',
    summonerIcon: '1',
    summonerRegion: 'NA',
  },
  {
    summonerName: 'Unknown',
    summonerIcon: '1',
    summonerRegion: 'NA',
  },
  {
    summonerName: 'Unknown',
    summonerIcon: '1',
    summonerRegion: 'NA',
  },
  {
    summonerName: 'Unknown',
    summonerIcon: '1',
    summonerRegion: 'NA',
  },
  {
    summonerName: 'Unknown',
    summonerIcon: '1',
    summonerRegion: 'NA',
  },
  {
    summonerName: 'Unknown',
    summonerIcon: '1',
    summonerRegion: 'NA',
  },
  {
    summonerName: 'Unknown',
    summonerIcon: '1',
    summonerRegion: 'NA',
  },
  {
    summonerName: 'Unknown',
    summonerIcon: '1',
    summonerRegion: 'NA',
  },
];

const HomeScreen = ({navigation}) => {
  const [summoner, setSummoner] = React.useState(null);
  const [region, setRegion] = React.useState('na');
  const [savedSummoners, setSavedSummoners] = React.useState(
    initialSavedSummoners,
  );
  const [favoriteSummoners, setFavoriteSummoners] = React.useState(
    initialSavedSummoners,
  );
  const [summonersList, setSummonersList] = React.useState('favorites');
  const selectListHandler = (value) => {
    setSummonersList(value);
  };
  const changeTextHandler = (value) => {
    setSummoner(value);
  };
  const submitHandler = () => {
    navigation.navigate('Profile', {query: summoner, region: region});
  };
  const regionHandler = (value) => {
    setRegion(value);
  };
  React.useEffect(() => {
    getSavedSummoners().then((ss) => {
      setSavedSummoners(ss);
    });
    getFavoriteSummoners().then((ss) => {
      setFavoriteSummoners(ss);
    });
  }, [summonersList]);
  return (
    <ScrollView style={styles.home}>
      <View style={styles.logo}>
        <Logo />
      </View>
      <View style={styles.search}>
        <SummonerSearch
          onChangeTextHandler={changeTextHandler}
          onSubmitEditingHandler={submitHandler}
        />
        <RegionSelector onChangeItemHandler={regionHandler} />
      </View>
      <View style={styles.saved}>
        <FavoritesHeader
          onPressHandler={selectListHandler}
          selected={summonersList === 'favorites'}
        />
        <RecentSearchesHeader
          onPressHandler={selectListHandler}
          selected={summonersList === 'recentSearches'}
        />
      </View>
      {summonersList === 'favorites' ? (
        <View>
          <Summoners
            data={
              favoriteSummoners == null ? [] : favoriteSummoners.slice(0, 4)
            }
          />
          <Summoners
            data={
              favoriteSummoners == null ? [] : favoriteSummoners.slice(4, 8)
            }
          />
        </View>
      ) : (
        <View>
          <Summoners
            data={savedSummoners == null ? [] : savedSummoners.slice(0, 4)}
          />
          <Summoners
            data={savedSummoners == null ? [] : savedSummoners.slice(4, 8)}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  home: {
    backgroundColor: 'black',
    flex: 1,
  },
  logo: {
    alignItems: 'center',
    marginTop: 40,
  },
  search: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  saved: {
    justifyContent: 'center',
    marginTop: 35,
    flexDirection: 'row',
  },
});

export default HomeScreen;
