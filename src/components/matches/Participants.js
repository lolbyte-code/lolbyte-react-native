import {StyleSheet, View} from 'react-native';

import {BLUE_TEAM} from 'LolByte/src/Constants';
import ParticipantEntry from 'LolByte/src/components/matches/ParticipantEntry';
import PropTypes from 'prop-types';
import React from 'react';

const Participants = (props) => {
  const ParticipantEntries = props.playerData.map((player) => {
    return (
      <ParticipantEntry
        cs={player.cs.replace(',', '')}
        championId={player.championId}
        kda={player.kdaLong}
        summonerName={player.summonerName}
        rank={player.rank}
        items={player.items}
        badges={player.badges}
        spells={player.spells}
        trinket={player.trinket}
        keystone={player.perk}
        win={player.teamId === BLUE_TEAM ? props.team1Win : props.team2Win}
        changeSummonerHandler={props.changeSummonerHandler}
        matchId={props.matchId}
        spellImages={props.spellImages}
        keystoneImages={props.keystoneImages}
      />
    );
  });
  const teamSize = props.playerData.length / 2;
  const arr = new Array(teamSize).fill(0);
  var i = 0;
  const ParticipantsContainer = arr.map((it) => {
    return (
      <View key={`partEntry_${i}`} style={styles.participants}>
        {ParticipantEntries[i]}
        {ParticipantEntries[i++ + teamSize]}
      </View>
    );
  });
  return <View>{ParticipantsContainer}</View>;
};

Participants.defaultProps = {
  playerData: [],
  team1Win: false,
  team2Win: false,
  spellImages: {},
  keystoneImages: {},
  changeSummonerHandler: () => {},
};

Participants.propTypes = {
  playerData: PropTypes.array,
  team1Win: PropTypes.bool,
  team2Win: PropTypes.bool,
  spellImages: PropTypes.object,
  keystoneImages: PropTypes.object,
  changeSummonerHandler: PropTypes.func,
};

const styles = StyleSheet.create({
  participants: {
    flexDirection: 'row',
  },
});

export default Participants;
