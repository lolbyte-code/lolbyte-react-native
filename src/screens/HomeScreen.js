import React from 'react';
import {View, StyleSheet} from 'react-native';
import SummonerSearch from '../components/home/SummonerSearch';
import Logo from '../components/home/Logo';
import RegionSelector from '../components/home/RegionSelector';

const HomeScreen = ({navigation}) => {
  const [summoner, setSummoner] = React.useState(null);
  const [region, setRegion] = React.useState('na');
  const changeTextHandler = (value) => {
    setSummoner(value);
  };
  const submitHandler = () => {
    navigation.navigate('Profile', {query: summoner, region: region});
  };
  const regionHandler = (value) => {
    setRegion(value);
  };
  return (
    <View style={styles.home}>
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
    </View>
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
  },
});

export default HomeScreen;
