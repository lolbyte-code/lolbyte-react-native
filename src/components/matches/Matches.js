import MatchEntry from '@app/components/matches/MatchEntry';
import PropTypes from 'prop-types';
import React from 'react';
import {View} from 'react-native';
import {formatTimestamp} from '@app/utils/Time';

const Matches = (props) => {
  const [currentSummoner, setCurrentSummoner] = React.useState({
    name: props.currentSummonerName,
    match: null,
  });

  const [selectedMatch, setSelectedMatch] = React.useState(null);

  React.useEffect(() => {
    setCurrentSummoner({
      name: props.currentSummonerName,
      match: null,
    });
  }, [props.currentSummonerName]);

  const changeCurrentSummonerHandler = (summonerName) => {
    setCurrentSummoner(summonerName);
  };

  const changeSelectedMatchHandler = (match) => {
    setSelectedMatch(match);
  };

  var i = 0;
  const sortedMatches = props.matchEntries.sort(
    (a, b) => b.matchDate - a.matchDate,
  );
  const MatchEntries = sortedMatches.map((match) => {
    const selectedSummonerName =
      currentSummoner.match === match.matchId
        ? currentSummoner.name
        : props.currentSummonerName;
    const selectedSummoner = match.players.filter(
      (player) => player.summonerName === selectedSummonerName,
    )[0];

    if (!selectedSummoner) {
      return null;
    }

    const pressable = !selectedMatch || selectedMatch === match.matchId;

    const matchEntryStyle =
      selectedMatch && selectedMatch !== match.matchId
        ? {opacity: 0.4, marginTop: 15}
        : {marginTop: 15};

    return (
      <MatchEntry
        key={`matchEntry_${i++}`}
        matchId={match.matchId}
        selectedMatch={selectedMatch}
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
        changeSelectedMatchHandler={changeSelectedMatchHandler}
        currentSummonerName={props.currentSummonerName}
        pressable={pressable}
        containerStyle={matchEntryStyle}
      />
    );
  });
  return <View>{MatchEntries}</View>;
};

Matches.defaultProps = {
  matchEntries: [],
  currentSummonerName: '',
};

Matches.propTypes = {
  matchEntries: PropTypes.array,
  currentSummonerName: PropTypes.string,
};

export default Matches;
