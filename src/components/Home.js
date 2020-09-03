import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';

import Logo from './home/Logo';
import PropTypes from 'prop-types';
import React from 'react';
import RegionSelector from './home/RegionSelector';
import SavedSearches from './home/SavedSearches';
import SummonerSearch from './home/SummonerSearch';
import {backgrounds} from '../Theme';
import {pages} from '../Constants';
import {useNavigation} from '@react-navigation/native';

const Home = (props) => {
  const navigation = useNavigation();

  const [summonerNameQuery, setSummonerNameQuery] = React.useState('');
  const [regionQuery, setRegionQuery] = React.useState('na');

  React.useEffect(() => {
    setRegionQuery(props.route.params.region);
  }, [props.route.params.region]);

  const changeSummonerHandler = (summonerName) => {
    setSummonerNameQuery(summonerName);
  };
  const searchSummonerHandler = () => {
    navigation.navigate(pages.results, {
      summonerName: summonerNameQuery,
      region: regionQuery,
    });
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
          <RegionSelector selectedRegion={regionQuery.toUpperCase()} />
        </View>
        <SavedSearches />
      </ScrollView>
    </ImageBackground>
  );
};

Home.defaultProps = {
  backgroundImage: backgrounds.main,
};

Home.propTypes = {
  backgroundImage: PropTypes.node,
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    // TODO: hacky AF
    width: '101%',
  },
  logo: {
    alignItems: 'center',
    marginTop: 50,
  },
  search: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
});

export default Home;
