import {StyleSheet, View} from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';
import RecentMatchesEntry from './RecentMatchesEntry';

const RecentMatches = (props) => {
  let i = 0;
  const RecentMatchEntries = props.matches
    .slice(0, 5)
    .map((entry) => (
      <RecentMatchesEntry
        key={`recentMatchEntry${i++}`}
        championId={entry.championId}
        win={entry.win}
        kda={entry.kda}
      />
    ));
  return <View style={styles.entries}>{RecentMatchEntries}</View>;
};

RecentMatches.defaultProps = {
  matches: [],
};

RecentMatches.propTypes = {
  matches: PropTypes.array,
};

const styles = StyleSheet.create({
  entries: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
    marginLeft: 5,
    marginRight: 5,
  },
});

export default RecentMatches;
