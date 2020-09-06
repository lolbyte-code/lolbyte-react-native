import {DEFAULT_REGION, DEFAULT_SCROLL_BAR, pages} from '../Constants';
import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';

import Logo from './home/Logo';
import PropTypes from 'prop-types';
import React from 'react';
import RegionSelector from './home/RegionSelector';
import SavedSearches from './home/SavedSearches';
import SummonerSearch from './home/SummonerSearch';
import {backgrounds} from '../Theme';
import {pushSearch} from '../data/SearchActions';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const Home = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [summonerNameQuery, setSummonerNameQuery] = React.useState('');
  const [summonerRegionQuery, setSummonerRegionQuery] = React.useState(
    DEFAULT_REGION,
  );

  React.useEffect(() => {
    setSummonerRegionQuery(props.route.params.summonerRegion);
  }, [props.route.params.summonerRegion]);

  React.useEffect(() => {
    setSummonerNameQuery(props.route.params.summonerName);
  }, [props.route.params]);

  const changeSummonerHandler = (summonerName) => {
    setSummonerNameQuery(summonerName);
  };
  const searchSummonerHandler = () => {
    if (summonerNameQuery === '') {
      return;
    }
    const summoner = {
      summonerName: summonerNameQuery,
      summonerRegion: summonerRegionQuery,
    };
    dispatch(pushSearch(summoner));
    navigation.navigate(pages.results, summoner);
  };

  return (
    <ImageBackground source={props.backgroundImage} style={styles.background}>
      <ScrollView indicatorStyle={DEFAULT_SCROLL_BAR}>
        <View style={styles.logo}>
          <Logo />
        </View>
        <View style={styles.search}>
          <SummonerSearch
            onChangeTextHandler={changeSummonerHandler}
            onSubmitEditingHandler={searchSummonerHandler}
            value={summonerNameQuery}
          />
          <View style={styles.regionContainer}>
            <RegionSelector
              selectedRegion={summonerRegionQuery.toUpperCase()}
            />
          </View>
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
    marginTop: 70,
  },
  search: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
    marginBottom: 35,
  },
  regionContainer: {
    marginLeft: 5,
  },
});

export default Home;
