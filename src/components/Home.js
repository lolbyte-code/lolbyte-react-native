import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';

import FavoritesHeader from './home/FavoritesHeader';
import Logo from './home/Logo';
import React from 'react';
import RecentSearchesHeader from './home/RecentSearchesHeader';
import RegionSelector from './home/RegionSelector';
import SummonerSearch from './home/SummonerSearch';
import Summoners from './home/Summoners';
import {getFromStorage} from '../utils/Storage';

const background = require('../img/assets/background.png');

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

const Home = ({navigation}) => {
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
    getFromStorage('@savedSummoners').then((ss) => {
      setSavedSummoners(ss);
    });
    getFromStorage('@favoriteSummoners').then((ss) => {
      setFavoriteSummoners(ss);
    });
  }, [summonersList]);
  return (
    <ImageBackground source={background} style={styles.background}>
      <ScrollView>
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    // TODO: hacky AF
    width: '100.03%',
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

export default Home;
