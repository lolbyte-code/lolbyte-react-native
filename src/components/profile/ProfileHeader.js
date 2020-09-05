import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';

import {DEFAULT_SCROLL_BAR} from '../../Constants';
import InGameIndicator from './InGameIndicator';
import LeagueDetails from './LeagueDetails';
import PropTypes from 'prop-types';
import Rank from './Rank';
import React from 'react';
import RecentMatches from './RecentMatches';
import ScrollDots from '../common/ScrollDots';
import SummonerDetails from './SummonerDetails';

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
        <RecentMatches recentMatches={props.recentMatches} />
      </View>
      <View>
        <ScrollView
          indicatorStyle={DEFAULT_SCROLL_BAR}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          onScroll={rankScrollHandler}
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
  summonerName: '',
  summonerLevel: 0,
  summonerIcon: '',
  summonerRegion: '',
  recentMatches: [],
  inGame: false,
  currentGameData: {},
};

ProfileHeader.propTypes = {
  rankedData: PropTypes.array,
  summonerName: PropTypes.string,
  summonerLevel: PropTypes.number,
  summonerIcon: PropTypes.string,
  summonerRegion: PropTypes.string,
  recentMatches: PropTypes.array,
  inGame: PropTypes.bool,
  currentGameData: PropTypes.object,
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
