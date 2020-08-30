import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';

import Logo from './home/Logo';
import PropTypes from 'prop-types';
import QuickSearch from './home/QuickSearch';
import React from 'react';
import RegionSelector from './home/RegionSelector';
import SummonerSearch from './home/SummonerSearch';
import {useNavigation} from '@react-navigation/native';

const Home = (props) => {
  const navigation = useNavigation();

  const [summonerNameQuery, setSummonerNameQuery] = React.useState('');
  const [regionQuery, setRegionQuery] = React.useState('na');

  const changeSummonerHandler = (summonerName) => {
    setSummonerNameQuery(summonerName);
  };
  const searchSummonerHandler = () => {
    navigation.navigate('Profile', {
      summonerName: summonerNameQuery,
      region: regionQuery,
    });
  };
  const changeRegionHandler = (region) => {
    setRegionQuery(region);
  };

  return (
    <ImageBackground source={props.backgroundImage} style={styles.background}>
      <ScrollView>
        <View style={styles.logo}>
          <Logo />
        </View>
        <View style={styles.search}>
          <SummonerSearch
            onChangeTextHandler={changeSummonerHandler}
            onSubmitEditingHandler={searchSummonerHandler}
          />
          <RegionSelector onChangeItemHandler={changeRegionHandler} />
        </View>
        <QuickSearch />
      </ScrollView>
    </ImageBackground>
  );
};

Home.defaultProps = {
  backgroundImage: require('../img/assets/background.png'),
};

Home.propTypes = {
  backgroundImage: PropTypes.node,
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
});

export default Home;
