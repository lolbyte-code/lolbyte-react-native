import {DEFAULT_GAME_TYPE, DEFAULT_SCROLL_BAR, pages} from '@app/Constants';
import {
  Dimensions,
  ImageBackground,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {
  fetchCurrentGameData,
  fetchRankedData,
  fetchRecentGamesData,
  fetchStatisticsData,
  fetchSummonerData,
  resetProfileData,
} from '@app/data/actions/ApiActions';
import {useDispatch, useSelector} from 'react-redux';

import Loading from '@app/components/common/Loading';
import MatchesContainer from '@app/components/matches/MatchesContainer';
import Profile from '@app/components/profile/Profile';
import PropTypes from 'prop-types';
import React from 'react';
import SearchNav from '@app/components/common/SearchNav';
import TogglePageHeader from '@app/components/common/TogglePageHeader';
import {addRecentSummoner} from '@app/data/actions/SummonersActions';
import {backgrounds} from '@app/Theme';
import {colors} from '@app/Theme';
import {isLandscape} from '@app/utils/Device';
import {useNavigation} from '@react-navigation/native';

const PROFILE_SELECTED = 'profile';
const MATCHES_SELECTED = 'matches';

const Results = (props) => {
  const navigation = useNavigation();
  const summonerData = useSelector((state) => state.api.summonerData);
  const recentGamesData = useSelector((state) => state.api.recentGamesData);
  const rankedData = useSelector((state) => state.api.rankedData);
  const statisticsData = useSelector((state) => state.api.statisticsData);
  const currentGameData = useSelector((state) => state.api.currentGameData);
  const dispatch = useDispatch();

  // Force a re-render of the results page when changing orientation.
  const [, setOrientation] = React.useState({
    orientation: isLandscape() ? 'landscape' : 'portrait',
  });

  React.useEffect(() => {
    Dimensions.addEventListener('change', () => {
      setOrientation({
        orientation: isLandscape() ? 'landscape' : 'portrait',
      });
    });
  }, []);

  const [selectedGameType, setSelectedGameType] = React.useState(
    DEFAULT_GAME_TYPE,
  );

  const [selectedHeader, setSelectedHeader] = React.useState(PROFILE_SELECTED);

  const selectProfileHeader = () => {
    setSelectedHeader(PROFILE_SELECTED);
  };

  const selectMatchesHeader = () => {
    setSelectedHeader(MATCHES_SELECTED);
  };

  const setSelectedGameTypeHandler = (gameType) => {
    setSelectedGameType(gameType);
  };

  React.useEffect(() => {
    resetProfileData(dispatch);
    dispatch(
      fetchSummonerData(
        props.route.params.summonerName,
        props.route.params.summonerRegion,
        selectedGameType,
      ),
    );
  }, [props.route, selectedGameType, dispatch]);

  React.useEffect(() => {
    if (summonerData.isFetching || summonerData.isError) {
      return;
    }
    dispatch(
      fetchRecentGamesData(
        summonerData.data.id,
        summonerData.data.region,
        selectedGameType,
      ),
    );
  }, [props.route, summonerData, selectedGameType, dispatch]);

  React.useEffect(() => {
    if (summonerData.isFetching) {
      return;
    } else if (summonerData.isError) {
      navigation.navigate(pages.notFound);
    }
  }, [summonerData, navigation]);

  React.useEffect(() => {
    if (summonerData.isFetching || summonerData.isError) {
      return;
    }
    dispatch(fetchRankedData(summonerData.data.id, summonerData.data.region));
  }, [props.route, summonerData, dispatch]);

  React.useEffect(() => {
    if (summonerData.isFetching || summonerData.isError) {
      return;
    }
    dispatch(
      fetchStatisticsData(
        summonerData.data.id,
        summonerData.data.region,
        selectedGameType,
      ),
    );
  }, [props.route, summonerData, selectedGameType, dispatch]);

  React.useEffect(() => {
    if (summonerData.isFetching || summonerData.isError) {
      return;
    }
    dispatch(
      fetchCurrentGameData(summonerData.data.id, summonerData.data.region),
    );
  }, [props.route, summonerData, dispatch]);

  React.useEffect(() => {
    if (summonerData.isFetching || summonerData.isError) {
      return;
    }
    dispatch(
      addRecentSummoner({
        summonerName: summonerData.data.name,
        summonerIcon: summonerData.data.icon,
        summonerRegion: summonerData.data.region,
      }),
    );
  }, [summonerData, dispatch]);

  const profileDataLoading =
    summonerData.isFetching ||
    recentGamesData.isFetching ||
    rankedData.isFetching ||
    statisticsData.isFetching ||
    currentGameData.isFetching;

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    resetProfileData(dispatch);
    setRefreshing(true);
    navigation.navigate(pages.results, {
      ...props.route.params,
      refreshed: true,
    });
  }, [props.route.params, navigation, dispatch]);

  React.useEffect(() => {
    setRefreshing(profileDataLoading);
  }, [profileDataLoading]);

  if (!summonerData.isFetching && summonerData.isError) {
    navigation.navigate(pages.error, {
      error: `Failed to fetch summoner data: '${String(summonerData.data)}'`,
    });
    return null;
  }

  if (profileDataLoading && !props.route.params.refreshed) {
    return <Loading />;
  }

  return (
    <ImageBackground source={props.backgroundImage} style={styles.background}>
      <SafeAreaView
        style={
          StatusBar.currentHeight && Platform.OS === 'android'
            ? {paddingBottom: StatusBar.currentHeight}
            : null
        }>
        {Platform.OS === 'android' && <StatusBar backgroundColor={colors.blue}></StatusBar>}
        <SearchNav />
        <ScrollView
          style={styles.scrollContainer}
          indicatorStyle={DEFAULT_SCROLL_BAR}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.blue}
              color={colors.blue}
              progressBackgroundColor={colors.blue}
            />
          }>
          <View style={styles.headers}>
            <TogglePageHeader
              title={props.profileHeader}
              onPressHandler={() => selectProfileHeader()}
              selected={selectedHeader === PROFILE_SELECTED}
            />
            <TogglePageHeader
              title={props.matchesHeader}
              onPressHandler={() => selectMatchesHeader()}
              selected={selectedHeader === MATCHES_SELECTED}
            />
          </View>
          {!profileDataLoading ? (
            <View>
              <Profile
                visible={selectedHeader === PROFILE_SELECTED}
                summonerData={summonerData.data}
                recentGamesData={recentGamesData.data}
                rankedData={rankedData.data}
                inGameDataFetching={currentGameData.isFetching}
                currentGameData={currentGameData.data}
                statisticsData={statisticsData.data}
                selectMatchesHeader={selectMatchesHeader}
              />
              <MatchesContainer
                visible={selectedHeader === MATCHES_SELECTED}
                matchesData={recentGamesData.data}
                currentSummonerName={summonerData.data.name}
                selectedGameType={selectedGameType}
                setSelectedGameTypeHandler={setSelectedGameTypeHandler}
                summonerId={summonerData.data.id}
                summonerRegion={summonerData.data.region}
              />
            </View>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

Results.defaultProps = {
  backgroundImage: backgrounds.main,
  profileHeader: 'Profile',
  matchesHeader: 'Matches',
  route: {},
};

Results.propTypes = {
  backgroundImage: PropTypes.node,
  profileHeader: PropTypes.string,
  matchesHeader: PropTypes.string,
  route: PropTypes.object,
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.background,
  },
  headers: {
    justifyContent: 'space-evenly',
    marginTop: 15,
    flexDirection: 'row',
  },
  scrollContainer: {
    marginBottom: 50,
  },
});

export default Results;
