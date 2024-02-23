import {StyleSheet, View} from 'react-native';

import {BLUE_TEAM} from '@app/Constants';
import ParticipantEntry from '@app/components/matches/ParticipantEntry';
import PropTypes from 'prop-types';
import React from 'react';
import {colors} from '@app/Theme';

const Participants = (props) => {
  var i = 0;
  const ParticipantEntries = props.playerData.map((player) => {
    return (
      <ParticipantEntry
        key={`participantEntry_${i++}`}
        cs={player.cs}
        championId={player.champId}
        kda={`${player.kills}/${player.deaths}/${player.assists}`}
        summonerName={player.name}
        rank={player.rank}
        items={player.items}
        badges={player.badges}
        spells={player.spells}
        trinket={player.trinket}
        keystone={player.keystone}
        win={player.teamId === BLUE_TEAM ? props.team1Win : props.team2Win}
        changeSummonerHandler={props.changeSummonerHandler}
        matchId={props.matchId}
        selected={props.selectedSummonerId === player.id}
        summonerId={player.id}
      />
    );
  });
  const teamSize = props.playerData.length / 2;
  const arr = new Array(teamSize).fill(0);
  var i = 0;
  const ParticipantsContainer = arr.map(() => {
    return (
      <View key={`participantEntryContainer_${i}`}>
        <View style={styles.separatorContainer}>
          <View style={styles.separator} />
          <View style={styles.separator} />
        </View>
        <View style={styles.participants}>
          {ParticipantEntries[i]}
          {ParticipantEntries[i++ + teamSize]}
        </View>
      </View>
    );
  });
  return <View>{ParticipantsContainer}</View>;
};

Participants.defaultProps = {
  playerData: [],
  team1Win: false,
  team2Win: false,
  changeSummonerHandler: () => {},
  selectedSummonerId: '',
};

Participants.propTypes = {
  playerData: PropTypes.array,
  team1Win: PropTypes.bool,
  team2Win: PropTypes.bool,
  changeSummonerHandler: PropTypes.func,
  selectedSummonerId: PropTypes.string,
};

const styles = StyleSheet.create({
  participants: {
    flexDirection: 'row',
  },
  separatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  separator: {
    borderWidth: 1,
    borderColor: colors.darkGrey,
    width: '45%',
    marginLeft: 10,
    marginRight: 10,
  },
});

export default Participants;
