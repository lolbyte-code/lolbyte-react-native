import {StyleSheet, View} from 'react-native';

import MatchEntry from './MatchEntry';
import PropTypes from 'prop-types';
import React from 'react';
import {formatTimestamp} from '../../utils/Time';

const Matches = (props) => {
  const [currentSummonerName, setCurrentSummonerName] = React.useState({
    name: props.currentSummoner,
    match: null,
  });

  React.useEffect(() => {
    setCurrentSummonerName({
      name: props.currentSummoner,
      match: null,
    });
  }, [props.currentSummoner]);

  const changeCurrentSummonerHandler = (summonerName) => {
    setCurrentSummonerName(summonerName);
  };

  var i = 0;
  const sortedMatches = props.matchEntries.sort(
    (a, b) => b.matchDate - a.matchDate,
  );
  const MatchEntries = sortedMatches.map((match) => {
    const selectedSummonerName =
      currentSummonerName.match && currentSummonerName.match === match.matchId
        ? currentSummonerName.name
        : props.currentSummoner;
    const selectedSummoner = match.players.filter(
      (player) => player.summonerName === selectedSummonerName,
    )[0];

    if (!selectedSummoner) {
      return null;
    }

    return (
      <MatchEntry
        key={`matchEntry_${i++}`}
        matchId={match.matchId}
        playerData={match.players}
        date={formatTimestamp(match.matchDate)}
        gameType={match.matchQueueType}
        duration={match.matchDuration}
        win={match[`team${String(selectedSummoner.teamId).substring(0, 1)}Win`]}
        items={selectedSummoner.items}
        spells={selectedSummoner.spells}
        keystone={selectedSummoner.perk}
        championId={selectedSummoner.championId}
        kdaShort={selectedSummoner.kdaLong}
        kdaLong={selectedSummoner.kdaShort}
        championName={selectedSummoner.championName}
        cs={selectedSummoner.cs}
        level={selectedSummoner.level}
        damageContribution={selectedSummoner.damageContribution}
        killParticipation={selectedSummoner.killParticipation}
        summonerName={selectedSummoner.summonerName}
        rank={selectedSummoner.rank}
        gold={selectedSummoner.gold}
        badges={selectedSummoner.badges}
        trinket={selectedSummoner.trinket}
        team1Win={match.team1Win}
        team2Win={match.team2Win}
        team1Gold={match.teams[0].gold}
        team2Gold={match.teams[1].gold}
        team1BannedChamps={match.teams[0].bans}
        team2BannedChamps={match.teams[1].bans}
        team1Towers={match.teams[0].towerKills}
        team1Dragons={match.teams[0].dragonKills}
        team1Barons={match.teams[0].baronKills}
        team2Towers={match.teams[1].towerKills}
        team2Dragons={match.teams[1].dragonKills}
        team2Barons={match.teams[1].baronKills}
        team1Kda={match.teams[0].kda}
        team2Kda={match.teams[1].kda}
        changeSummonerHandler={changeCurrentSummonerHandler}
        originalSummonerName={props.currentSummoner}
      />
    );
  });
  return (
    <View>
      <View style={styles.matchEntries}>{MatchEntries}</View>
    </View>
  );
};

Matches.defaultProps = {
  matchEntries: [],
  currentSummoner: '',
};

Matches.propTypes = {
  matchEntries: PropTypes.array,
  currentSummoner: PropTypes.string,
};

const styles = StyleSheet.create({
  matchEntries: {},
});

export default Matches;
