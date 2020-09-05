import {DEFAULT_GAME_TYPE, DEFAULT_SCROLL_BAR} from '../Constants';
import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';
import {
  fetchChampionData,
  fetchCurrentGameData,
  fetchMatchesData,
  fetchRankedData,
  fetchSummonerData,
} from '../data/ApiActions';
import {useDispatch, useSelector} from 'react-redux';

import Loading from './common/Loading';
import MatchesContainer from './matches/MatchesContainer';
import Profile from './profile/Profile';
import PropTypes from 'prop-types';
import React from 'react';
import SearchNav from './common/SearchNav';
import TogglePageHeader from './common/TogglePageHeader';
import {addRecentSummoner} from '../data/SummonersActions';
import {backgrounds} from '../Theme';

const PROFILE_SELECTED = 'profile';
const MATCHES_SELECTED = 'matches';
const MATCHES_LIMIT = 6;

const Results = (props) => {
  const summonerData = useSelector((state) => state.api.summonerData);
  const rankedData = useSelector((state) => state.api.rankedData);
  const championData = useSelector((state) => state.api.championData);
  const currentGameData = useSelector((state) => state.api.currentGameData);
  const matchesData = useSelector((state) => state.api.matchesData);
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
    }
    dispatch(
      fetchRankedData(summonerData.data.summonerId, summonerData.data.region),
    );
  }, [props.route, summonerData, dispatch]);

  React.useEffect(() => {
    if (summonerData.isFetching) {
      return;
    }
    dispatch(
      fetchChampionData(summonerData.data.summonerId, summonerData.data.region),
    );
  }, [props.route, summonerData, dispatch]);

  React.useEffect(() => {
    if (summonerData.isFetching) {
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
    if (summonerData.isFetching) {
      return;
    }
    const matchIds = summonerData.data.recentGames.map((game) => game.matchId);
    dispatch(
      fetchMatchesData(
        matchIds.slice(0, MATCHES_LIMIT),
        summonerData.data.region,
        summonerData.data.summonerId,
      ),
    );
  }, [summonerData, dispatch]);

  React.useEffect(() => {
    if (summonerData.isFetching) {
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

  if (
    summonerData.isFetching ||
    rankedData.isFetching ||
    championData.isFetching
  ) {
    return <Loading />;
  }

  return (
    <ImageBackground source={props.backgroundImage} style={styles.background}>
      <SearchNav />
      <ScrollView indicatorStyle={DEFAULT_SCROLL_BAR}>
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
        <Profile
          visible={selectedHeader === PROFILE_SELECTED}
          summonerData={summonerData.data}
          rankedData={rankedData.data}
          inGameDataFetching={currentGameData.isFetching}
          currentGameData={currentGameData.data}
          championData={championData.data}
        />
        <MatchesContainer
          visible={selectedHeader === MATCHES_SELECTED}
          isFetching={matchesData.isFetching}
          matchesData={matchesData.data}
          currentSummonerName={summonerData.data.summonerName}
          selectedGameType={selectedGameType}
          setSelectedGameTypeHandler={setSelectedGameTypeHandler}
        />
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
    // TODO: hacky AF
    width: '101%',
  },
  headers: {
    justifyContent: 'space-evenly',
    marginTop: 15,
    flexDirection: 'row',
  },
});

export default Results;
