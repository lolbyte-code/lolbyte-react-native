import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';
import {
  fetchChampionData,
  fetchCurrentGameData,
  fetchMatchesData,
  fetchRankedData,
  fetchSummonerData,
} from '../data/ApiActions';
import {useDispatch, useSelector} from 'react-redux';

import Header from './common/Header';
import Loading from './common/Loading';
import MatchesResults from './matches/MatchesResults';
import Profile from './profile/Profile';
import PropTypes from 'prop-types';
import React from 'react';
import SearchNav from './common/SearchNav';
import {addRecentSummoner} from '../data/SummonersActions';
import {backgrounds} from '../Theme';
import {pushSearch} from '../data/SearchActions';

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

  const [selectedHeader, setSelectedHeader] = React.useState(PROFILE_SELECTED);

  const selectProfileHeader = () => {
    setSelectedHeader(PROFILE_SELECTED);
  };
  const selectMatchesHeader = () => {
    setSelectedHeader(MATCHES_SELECTED);
  };

  React.useEffect(() => {
    dispatch(
      fetchSummonerData(
        props.route.params.summonerName,
        props.route.params.summonerRegion,
      ),
    );
  }, [props.route, dispatch]);

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
      <ScrollView indicatorStyle={props.indicatorStyle}>
        <SearchNav />
        <View style={styles.headers}>
          <Header
            title={props.profileHeader}
            onPressHandler={() => selectProfileHeader()}
            selected={selectedHeader === PROFILE_SELECTED}
          />
          <Header
            title={props.matchesHeader}
            onPressHandler={() => selectMatchesHeader()}
            selected={selectedHeader === MATCHES_SELECTED}
          />
        </View>
        <Profile
          selected={selectedHeader === PROFILE_SELECTED}
          summonerData={summonerData.data}
          rankedData={rankedData.data}
          inGameDataFetching={currentGameData.isFetching}
          currentGameData={currentGameData.data}
          championData={championData.data}
        />
        <MatchesResults
          selected={selectedHeader === MATCHES_SELECTED}
          isFetching={matchesData.isFetching}
          matchesData={matchesData.data}
          selectedSummonerName={summonerData.data.summonerName}
        />
      </ScrollView>
    </ImageBackground>
  );
};

Results.defaultProps = {
  backgroundImage: backgrounds.main,
  route: {},
  profileHeader: 'Profile',
  matchesHeader: 'Matches',
};

Results.propTypes = {
  backgroundImage: PropTypes.node,
  route: PropTypes.object,
  profileHeader: PropTypes.string,
  matchesHeader: PropTypes.string,
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    // TODO: hacky AF
    width: '101%',
  },
  headers: {
    justifyContent: 'space-evenly',
    marginTop: '5%',
    flexDirection: 'row',
  },
});

export default Results;
