import {DEFAULT_GAME_TYPE, DEFAULT_SCROLL_BAR, pages} from '@app/Constants';
import {
  ImageBackground,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {
  fetchChampionData,
  fetchCurrentGameData,
  fetchRankedData,
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
import {useNavigation} from '@react-navigation/native';

const PROFILE_SELECTED = 'profile';
const MATCHES_SELECTED = 'matches';

const Results = (props) => {
  const navigation = useNavigation();
  const summonerData = useSelector((state) => state.api.summonerData);
  const rankedData = useSelector((state) => state.api.rankedData);
  const championData = useSelector((state) => state.api.championData);
  const currentGameData = useSelector((state) => state.api.currentGameData);
  const dispatch = useDispatch();

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
    dispatch(
      fetchSummonerData(
        props.route.params.summonerName,
        props.route.params.summonerRegion,
        selectedGameType,
      ),
    );
  }, [props.route, selectedGameType, dispatch]);

  React.useEffect(() => {
    if (summonerData.isFetching) {
      return;
    } else if (summonerData.data.summonerLevel === 0) {
      navigation.navigate(pages.notFound);
    }
  }, [summonerData, navigation]);

  React.useEffect(() => {
    if (summonerData.isFetching || summonerData.data.summonerLevel === 0) {
      return;
    }
    dispatch(
      fetchRankedData(summonerData.data.summonerId, summonerData.data.region),
    );
  }, [props.route, summonerData, dispatch]);

  React.useEffect(() => {
    if (summonerData.isFetching || summonerData.data.summonerLevel === 0) {
      return;
    }
    dispatch(
      fetchChampionData(summonerData.data.summonerId, summonerData.data.region),
    );
  }, [props.route, summonerData, dispatch]);

  React.useEffect(() => {
    if (summonerData.isFetching || summonerData.data.summonerLevel === 0) {
      return;
    }
    dispatch(
      fetchCurrentGameData(
        summonerData.data.summonerId,
        summonerData.data.region,
      ),
    );
  }, [props.route, summonerData, dispatch]);

  React.useEffect(() => {
    if (summonerData.isFetching || summonerData.data.summonerLevel === 0) {
      return;
    }
    dispatch(
      addRecentSummoner({
        summonerName: summonerData.data.summonerName,
        summonerIcon: summonerData.data.summonerObject.summonerIcon,
        summonerRegion: summonerData.data.region,
      }),
    );
  }, [summonerData, dispatch]);

  const profileDataLoading =
    summonerData.isFetching ||
    rankedData.isFetching ||
    championData.isFetching ||
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

  if (profileDataLoading && !props.route.params.refreshed) {
    return <Loading />;
  }

  return (
    <ImageBackground source={props.backgroundImage} style={styles.background}>
      <ScrollView
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
        <SearchNav />
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
              rankedData={rankedData.data}
              inGameDataFetching={currentGameData.isFetching}
              currentGameData={currentGameData.data}
              championData={championData.data}
              selectMatchesHeader={selectMatchesHeader}
            />
            <MatchesContainer
              visible={selectedHeader === MATCHES_SELECTED}
              matchesData={summonerData.data.recentGames}
              currentSummonerName={summonerData.data.summonerName}
              selectedGameType={selectedGameType}
              setSelectedGameTypeHandler={setSelectedGameTypeHandler}
              summonerId={summonerData.data.summonerId}
              summonerRegion={summonerData.data.region}
            />
          </View>
        ) : null}
      </ScrollView>
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
});

export default Results;
