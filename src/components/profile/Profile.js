import {StyleSheet, View} from 'react-native';

import ProfileHeader from '@app/components/profile/ProfileHeader';
import PropTypes from 'prop-types';
import React from 'react';
import Stats from '@app/components/stats/Stats';

const Profile = (props) => {
  return (
    <View style={props.visible ? styles.container : styles.hide}>
      <ProfileHeader
        summonerName={props.summonerData.name}
        summonerLevel={props.summonerData.level}
        summonerIcon={props.summonerData.icon}
        summonerRegion={props.summonerData.region}
        inGame={
          !props.inGameDataFetching &&
          props.currentGameData.summoners.length > 0
        }
        currentGameData={props.currentGameData}
        recentMatches={props.recentGamesData.data}
        rankedData={props.rankedData.data}
        selectMatchesHeader={props.selectMatchesHeader}
      />
      <Stats statisticsData={props.statisticsData} />
    </View>
  );
};

Profile.defaultProps = {
  visible: true,
  summonerData: {},
  recentGamesData: {},
  inGameDataFetching: true,
  currentGameData: {},
  rankedData: {},
  statisticsData: [],
  selectMatchesHeader: () => {},
};

Profile.propTypes = {
  visible: PropTypes.bool,
  summonerData: PropTypes.object,
  recentGamesData: PropTypes.object,
  inGameDataFetching: PropTypes.bool,
  currentGameData: PropTypes.object,
  rankedData: PropTypes.object,
  statisticsData: PropTypes.array,
  selectMatchesHeader: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  hide: {
    display: 'none',
  },
});

export default Profile;
