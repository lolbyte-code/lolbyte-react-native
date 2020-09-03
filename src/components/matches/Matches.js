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
        level={selectedSummoner.level}
        damage={selectedSummoner.damageContribution}
        killParticipation={selectedSummoner.killParticipation}
        summonerName={selectedSummoner.summonerName}
        rank={selectedSummoner.rank}
        gold={selectedSummoner.gold}
        team1Gold={match.teams[0].gold}
        team2Gold={match.teams[1].gold}
        badges={selectedSummoner.badges}
        bannedChamps1={match.teams[0].bans}
        bannedChamps2={match.teams[1].bans}
        towers1={match.teams[0].towerKills}
        dragons1={match.teams[0].dragonKills}
        barons1={match.teams[0].baronKills}
        towers2={match.teams[1].towerKills}
        dragons2={match.teams[1].dragonKills}
        barons2={match.teams[1].baronKills}
        team1Win={match.team1Win}
        team2Win={match.team2Win}
        team1Kda={match.teams[0].kda}
        team2Kda={match.teams[1].kda}
        allData={match}
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
