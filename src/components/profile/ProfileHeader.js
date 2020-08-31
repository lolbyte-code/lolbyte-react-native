import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';

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

  const handleRankScroll = (event) => {
    setCurrentRankPosition(event.nativeEvent.contentOffset.x);
  };

  let i = 0;
  const RankEntries = props.rankedData.map((entry) => (
    <View style={styles.rankEntryContainer} key={`leagueDetail_${i++}`}>
      <Rank tier={entry.tier} />
      <LeagueDetails
        queue={entry.rankQueueType}
        rank={entry.rank}
        points={entry.leagueProgress}
        score={entry.mmr}
        wins={entry.rankedWL}
      />
    </View>
  ));

  return (
    <View style={styles.container}>
      <SummonerDetails
        summonerName={props.summonerName}
        summonerLevel={props.summonerLevel}
        summonerIcon={props.summonerIcon}
        summonerRegion={props.region}
      />
      <InGameIndicator inGame={props.inGame} />
      <RecentMatches matches={props.recentMatches} />
      <View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          onScroll={handleRankScroll}
          pagingEnabled>
          {RankEntries}
        </ScrollView>
      </View>
      <ScrollDots
        listSize={props.rankedData.length}
        currentItemPosition={currentRankPosition}
        itemWidth={Dimensions.get('window').width}
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
};

ProfileHeader.propTypes = {
  rankedData: PropTypes.array,
  summonerName: PropTypes.string,
  summonerLevel: PropTypes.number,
  summonerIcon: PropTypes.string,
  summonerRegion: PropTypes.string,
  recentMatches: PropTypes.array,
  inGame: PropTypes.bool,
};

const styles = StyleSheet.create({
  rankEntryContainer: {
    width: Dimensions.get('window').width,
  },
});

export default ProfileHeader;
