import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';

import LeagueDetails from './LeagueDetails';
import PropTypes from 'prop-types';
import Rank from './Rank';
import React from 'react';
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
    <View>
      <SummonerDetails
        summonerName={props.summonerName}
        summonerLevel={props.summonerLevel}
        summonerIcon={props.summonerIcon}
        summonerRegion={props.region}
      />
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
};

ProfileHeader.propTypes = {
  rankedData: PropTypes.array,
  summonerName: PropTypes.string,
  summonerLevel: PropTypes.number,
  summonerIcon: PropTypes.string,
  summonerRegion: PropTypes.string,
};

const styles = StyleSheet.create({
  rankEntryContainer: {
    width: Dimensions.get('window').width,
  },
});

export default ProfileHeader;
