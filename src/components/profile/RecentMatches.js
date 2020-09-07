import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';
import RecentMatchesEntry from '@app/components/profile/RecentMatchesEntry';

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
  return (
    <TouchableWithoutFeedback onPress={props.selectMatchesHeader}>
      <View style={styles.recentMatches}>{RecentMatchEntries}</View>
    </TouchableWithoutFeedback>
  );
};

RecentMatches.defaultProps = {
  recentMatches: [],
  selectMatchesHeader: () => {},
};

RecentMatches.propTypes = {
  recentMatches: PropTypes.array,
  selectMatchesHeader: PropTypes.func,
};

const styles = StyleSheet.create({
  recentMatches: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default RecentMatches;
