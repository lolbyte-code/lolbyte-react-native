import {StyleSheet, View} from 'react-native';

import MatchEntry from './MatchEntry';
import PropTypes from 'prop-types';
import React from 'react';
import {formatTimestamp} from '../../utils/Time';

const Matches = (props) => {
  let i = 0;
  const sortedMatches = props.matches.sort((a, b) => b.matchDate - a.matchDate);
  const MatchEntries = sortedMatches.map((match) => {
    const selectedSummoner = match.players.filter(
      (player) => player.selectedSummoner === true,
    )[0];

    return (
      <MatchEntry
        key={`match_${i++}`}
        win={match[`team${String(selectedSummoner.teamId).substring(0, 1)}Win`]}
        date={formatTimestamp(match.matchDate)}
        gameType={match.matchQueueType}
        duration={match.matchDuration}
        items={selectedSummoner.items}
        spells={selectedSummoner.spells}
        keystone={8005}
        championId={selectedSummoner.championId}
        kdaShort={selectedSummoner.kdaLong}
        kdaLong={selectedSummoner.kdaShort}
        championName={selectedSummoner.championName}
        cs={selectedSummoner.cs}
      />
    );
  });
  return (
    <View>
      <View style={styles.matches}>{MatchEntries}</View>
    </View>
  );
};

Matches.defaultProps = {
  matches: [],
};

Matches.propTypes = {
  matches: PropTypes.array,
};

const styles = StyleSheet.create({
  matches: {},
});

export default Matches;
