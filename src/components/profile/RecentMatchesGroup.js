import {StyleSheet, View} from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';
import RecentMatchesEntry from '@app/components/profile/RecentMatchesEntry';
import {getSafeAreaWidth} from '@app/utils/Device';

const RecentMatchesGroup = (props) => {
  var i = 0;
  const RecentMatchEntries = props.recentMatches.map((entry) => (
    <RecentMatchesEntry
      key={`recentMatchEntry_${i++}`}
      championId={entry.champId}
      win={entry.win}
      kda={`${entry.kills}/${entry.deaths}/${entry.assists}`}
      selectMatchesHeader={props.selectMatchesHeader}
    />
  ));
  return (
    <View
      style={{
        ...styles.recentMatchesContainer,
        width: getSafeAreaWidth(),
      }}>
      {RecentMatchEntries}
    </View>
  );
};

RecentMatchesGroup.defaultProps = {
  recentMatches: [],
  selectMatchesHeader: () => {},
};

RecentMatchesGroup.propTypes = {
  recentMatches: PropTypes.array,
  selectMatchesHeader: PropTypes.func,
};

const styles = StyleSheet.create({
  recentMatchesContainer: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
});

export default RecentMatchesGroup;
