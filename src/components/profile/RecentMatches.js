import {StyleSheet, View} from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';
import RecentMatchesEntry from './RecentMatchesEntry';

const RecentMatches = (props) => {
  var i = 0;
  const RecentMatchEntries = props.recentMatches
    .slice(0, 5)
    .map((entry) => (
      <RecentMatchesEntry
        key={`recentMatchEntry_${i++}`}
        championId={entry.championId}
        win={entry.win}
        kda={entry.kda}
      />
    ));
  return <View style={styles.recentMatches}>{RecentMatchEntries}</View>;
};

RecentMatches.defaultProps = {
  recentMatches: [],
};

RecentMatches.propTypes = {
  recentMatches: PropTypes.array,
};

const styles = StyleSheet.create({
  recentMatches: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default RecentMatches;
