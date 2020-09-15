import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';
import RecentMatchesGroup from '@app/components/profile/RecentMatchesGroup';
import ScrollDots from '@app/components/common/ScrollDots';

const CHUNK_SIZE = 5;

const RecentMatches = (props) => {
  const [currentGamesPosition, setCurrentGamesPosition] = React.useState(0);

  const gamesScrollHandler = (event) => {
    setCurrentGamesPosition(event.nativeEvent.contentOffset.x);
  };

  const recentGamesGroupSize = Math.ceil(
    props.recentMatches.length / CHUNK_SIZE,
  );
  const arr = new Array(recentGamesGroupSize).fill(0);
  var i = 0;
  const RecentMatchesGroupEntries = arr.map(() => {
    const startIndex = i * CHUNK_SIZE;
    return (
      <RecentMatchesGroup
        key={`recentMatchesGroupEntry_${i++}`}
        recentMatches={props.recentMatches.slice(
          startIndex,
          startIndex + CHUNK_SIZE,
        )}
        selectMatchesHeader={props.selectMatchesHeader}
      />
    );
  });
  return (
    <View style={styles.container}>
      <View style={{width: Dimensions.get('window').width}}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          horizontal={true}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          onScroll={gamesScrollHandler}
          scrollEventThrottle={props.scrollEventThrottle}
          pagingEnabled={true}>
          {RecentMatchesGroupEntries}
        </ScrollView>
      </View>
      <ScrollDots
        listSize={props.recentMatches.length / CHUNK_SIZE}
        currentItemPosition={currentGamesPosition}
        itemWidth={Dimensions.get('window').width}
        scrollDotsStyle={styles.scrollDotsStyle}
      />
    </View>
  );
};

RecentMatches.defaultProps = {
  recentMatches: [],
  selectMatchesHeader: () => {},
  scrollEventThrottle: 0,
};

RecentMatches.propTypes = {
  recentMatches: PropTypes.array,
  selectMatchesHeader: PropTypes.func,
  scrollEventThrottle: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  scrollDotsStyle: {
    marginTop: -10,
  },
});

export default RecentMatches;
