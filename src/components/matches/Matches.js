import MatchEntry from '@app/components/matches/MatchEntry';
import PropTypes from 'prop-types';
import React from 'react';
import {View} from 'react-native';
import {formatTimestamp} from '@app/utils/Time';

const Matches = (props) => {
  const [selectedMatch, setSelectedMatch] = React.useState(null);

  const changeSelectedMatchHandler = (match) => {
    setSelectedMatch(match);
  };

  var i = 0;
  const MatchEntries = props.matches.map((match) => {
    const pressable = !selectedMatch || selectedMatch === match.id;

    const matchEntryStyle =
      selectedMatch && selectedMatch !== match.id ? {opacity: 0.4} : null;

    return (
      <MatchEntry
        key={`matchEntry_${i++}`}
        matchId={match.id}
        selectedMatch={selectedMatch}
        date={formatTimestamp(match.timestamp)}
        gameType={match.queueName}
        duration={match.duration}
        win={match.win}
        items={match.items}
        spells={match.spells}
        keystone={match.keystone}
        championId={match.champId}
        kdaShort={`${match.kills}/${match.deaths}/${match.assists}`}
        kdaLong={`${(
          (match.kills + match.assists) /
          Math.max(match.deaths, 1)
        ).toFixed(1)} KDA`}
        cs={match.cs}
        changeSelectedMatchHandler={changeSelectedMatchHandler}
        currentSummonerName={props.currentSummonerName}
        pressable={pressable}
        containerStyle={matchEntryStyle}
        summonerId={props.summonerId}
        summonerRegion={props.summonerRegion}
      />
    );
  });
  return <View>{MatchEntries}</View>;
};

Matches.defaultProps = {
  matches: [],
  currentSummonerName: '',
  summonerId: '',
  summonerRegion: '',
};

Matches.propTypes = {
  matches: PropTypes.array,
  currentSummonerName: PropTypes.string,
  summonerId: PropTypes.string,
  summonerRegion: PropTypes.string,
};

export default Matches;
