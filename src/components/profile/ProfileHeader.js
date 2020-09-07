import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';

import {DEFAULT_SCROLL_BAR} from 'LolByte/src/Constants';
import InGameIndicator from 'LolByte/src/components/profile/InGameIndicator';
import LeagueDetails from 'LolByte/src/components/profile/LeagueDetails';
import PropTypes from 'prop-types';
import Rank from 'LolByte/src/components/profile/Rank';
import React from 'react';
import RecentMatches from 'LolByte/src/components/profile/RecentMatches';
import ScrollDots from 'LolByte/src/components/common/ScrollDots';
import SummonerDetails from 'LolByte/src/components/profile/SummonerDetails';

const ProfileHeader = (props) => {
  const [currentRankPosition, setCurrentRankPosition] = React.useState(0);

  const rankScrollHandler = (event) => {
    setCurrentRankPosition(event.nativeEvent.contentOffset.x);
  };

  var i = 0;
  const RankEntries = props.rankedData.map((entry) => (
    <View style={styles.rankEntryContainer} key={`leagueDetail_${i++}`}>
      <Rank tier={entry.tier} />
      <View style={styles.leagueDetailsContainer}>
        <LeagueDetails
          queue={entry.rankQueueType}
          rank={entry.rank}
          points={entry.leagueProgress}
          score={entry.mmr}
          wins={entry.rankedWL}
        />
      </View>
    </View>
  ));

  return (
    <View style={styles.container}>
      <SummonerDetails
        summonerName={props.summonerName}
        summonerLevel={props.summonerLevel}
        summonerIcon={props.summonerIcon}
        summonerRegion={props.summonerRegion}
      />
      <View style={styles.inGameIndicatorContainer}>
        <InGameIndicator
          inGame={props.inGame}
          currentGameData={props.currentGameData}
          currentSummoner={props.summonerName}
          summonerRegion={props.summonerRegion}
        />
      </View>
      <View style={styles.recentMatchesContainer}>
        <RecentMatches
          recentMatches={props.recentMatches}
          selectMatchesHeader={props.selectMatchesHeader}
        />
      </View>
      <View style={styles.rankEntryContainer}>
        <ScrollView
          indicatorStyle={DEFAULT_SCROLL_BAR}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          onScroll={rankScrollHandler}
          scrollEventThrottle={props.scrollEventThrottle}
          pagingEnabled>
          {RankEntries}
        </ScrollView>
      </View>
      <ScrollDots
        listSize={props.rankedData.length}
        currentItemPosition={currentRankPosition}
        itemWidth={Dimensions.get('window').width}
        scrollDotsStyle={styles.scrollDotsStyle}
      />
    </View>
  );
};

ProfileHeader.defaultProps = {
  rankedData: [],
  scrollEventThrottle: 0,
  summonerName: '',
  summonerLevel: 0,
  summonerIcon: '',
  summonerRegion: '',
  recentMatches: [],
  inGame: false,
  currentGameData: {},
  selectMatchesHeader: () => {},
};

ProfileHeader.propTypes = {
  rankedData: PropTypes.array,
  scrollEventThrottle: PropTypes.number,
  summonerName: PropTypes.string,
  summonerLevel: PropTypes.number,
  summonerIcon: PropTypes.string,
  summonerRegion: PropTypes.string,
  recentMatches: PropTypes.array,
  inGame: PropTypes.bool,
  currentGameData: PropTypes.object,
  selectMatchesHeader: PropTypes.func,
};

const styles = StyleSheet.create({
  inGameIndicatorContainer: {
    marginTop: 10,
  },
  recentMatchesContainer: {
    marginTop: 10,
  },
  rankEntryContainer: {
    width: Dimensions.get('window').width,
  },
  leagueDetailsContainer: {
    marginTop: 15,
  },
  scrollDotsStyle: {
    marginTop: 5,
  },
});

export default ProfileHeader;
