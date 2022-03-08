import {DEFAULT_REGION, DEFAULT_SCROLL_BAR, pages} from '@app/Constants';
import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';
import {backgrounds, colors} from '@app/Theme';
import {useDispatch, useSelector} from 'react-redux';

import Alert from '@app/components/home/Alert';
import Logo from '@app/components/home/Logo';
import PropTypes from 'prop-types';
import React from 'react';
import RegionSelector from '@app/components/home/RegionSelector';
import SavedSearches from '@app/components/home/SavedSearches';
import SummonerSearch from '@app/components/home/SummonerSearch';
import {pushSearch} from '@app/data/actions/SearchActions';
import {resetProfileData} from '@app/data/actions/ApiActions';
import {useNavigation} from '@react-navigation/native';

const Home = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const notificationData = useSelector((state) => state.api.notificationData);

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
    resetProfileData(dispatch);
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
        <View
          style={
            notificationData.isFetching || notificationData.data.alert === ''
              ? styles.hide
              : styles.alertContainer
          }>
          <Alert
            alertText={
              notificationData.isFetching ? '' : notificationData.data.alert
            }
          />
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
    width: '100%',
    backgroundColor: colors.background,
  },
  hide: {
    height: 0,
    width: 0,
    opacity: 0,
  },
  logo: {
    alignItems: 'center',
    marginTop: 70,
  },
  alertContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  search: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 35,
  },
  regionContainer: {
    marginLeft: 5,
  },
});

export default Home;
