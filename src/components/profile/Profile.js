import {StyleSheet, View} from 'react-native';

import ProfileHeader from 'LolByte/src/components/profile/ProfileHeader';
import PropTypes from 'prop-types';
import React from 'react';
import Stats from 'LolByte/src/components/stats/Stats';

const Profile = (props) => {
  return (
    <View style={props.visible ? styles.container : styles.hide}>
      <ProfileHeader
        summonerName={props.summonerData.summonerName}
        summonerLevel={props.summonerData.summonerLevel}
        summonerIcon={props.summonerData.summonerObject.summonerIcon}
        summonerRegion={props.summonerData.region}
        inGame={
          !props.inGameDataFetching &&
          props.currentGameData.summoners.length > 0
        }
        currentGameData={props.currentGameData}
        recentMatches={props.summonerData.recentGames}
        rankedData={props.rankedData}
        selectMatchesHeader={props.selectMatchesHeader}
      />
      <Stats
        playerStatsData={props.summonerData.playerStats}
        championData={props.championData}
      />
    </View>
  );
};

Profile.defaultProps = {
  visible: true,
  summonerData: {},
  inGameDataFetching: true,
  currentGameData: {},
  rankedData: [],
  championData: [],
  selectMatchesHeader: () => {},
};

Profile.propTypes = {
  visible: PropTypes.bool,
  summonerData: PropTypes.object,
  inGameDataFetching: PropTypes.bool,
  currentGameData: PropTypes.object,
  rankedData: PropTypes.array,
  championData: PropTypes.array,
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
