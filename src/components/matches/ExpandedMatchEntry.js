import {StyleSheet, View} from 'react-native';

import BannedChampsHeader from './BannedChampsHeader';
import ExpandedMatchSummary from './ExpandedMatchSummary';
import MatchHeader from './MatchHeader';
import Participants from './Participants';
import PropTypes from 'prop-types';
import React from 'react';
import TeamHeader from './TeamHeader';

const ExpandedMatchEntry = (props) => {
  return (
    <View>
      <View style={styles.matchHeaderContainer}>
        <MatchHeader
          win={props.win}
          date={props.date}
          gameType={props.gameType}
          duration={props.duration}
          collapsed={false}
        />
      </View>
      <ExpandedMatchSummary
        items={props.items}
        spells={props.spells}
        keystone={props.keystone}
        trinket={props.trinket}
        kdaShort={props.kdaShort}
        level={props.level}
        summonerName={props.summonerName}
        rank={props.rank}
        championName={props.championName}
        damageContribution={props.damageContribution}
        killParticipation={props.killParticipation}
        gold={props.gold}
        kdaLong={props.kdaLong}
        cs={props.cs}
        badges={props.badges}
        championId={props.championId}
        spellImages={props.spellImages}
        keystoneImages={props.keystoneImages}
      />
      <View style={styles.teamHeaders}>
        <View style={styles.teamHeaderContainer}>
          <TeamHeader
            win={props.team1Win}
            kda={props.team1Kda}
            gold={props.team1Gold}
            towers={props.team1Towers}
            dragons={props.team1Dragons}
            barons={props.team1Barons}
          />
        </View>
        <View style={styles.teamHeaderContainer}>
          <TeamHeader
            win={props.team2Win}
            kda={props.team2Kda}
            gold={props.team2Gold}
            towers={props.team2Towers}
            dragons={props.team2Dragons}
            barons={props.team2Barons}
          />
        </View>
      </View>
      <View
        style={
          props.team1BannedChamps.length > 0 ? styles.banBars : styles.hide
        }>
        <BannedChampsHeader bannedChamps={props.team1BannedChamps} />
        <BannedChampsHeader bannedChamps={props.team2BannedChamps} />
      </View>
      <Participants
        playerData={props.playerData}
        changeSummonerHandler={props.changeSummonerHandler}
        matchId={props.matchId}
        team1Win={props.team1Win}
        team2Win={props.team2Win}
        spellImages={props.spellImages}
        keystoneImages={props.keystoneImages}
      />
    </View>
  );
};

ExpandedMatchEntry.defaultProps = {
  win: false,
  date: '',
  gameType: '',
  duration: '',
  items: [],
  spells: [],
  keystone: 0,
  trinket: 0,
  kdaShort: '',
  level: '',
  damageContribution: '',
  killParticipation: '',
  gold: '',
  kdaLong: '',
  cs: '',
  summonerName: '',
  rank: '',
  championName: '',
  team1Win: false,
  team2Win: false,
  team1Barons: 0,
  team1Dragons: 0,
  team1Towers: 0,
  team2Barons: 0,
  team2Dragons: 0,
  team2Towers: 0,
  team1Kda: '',
  team2Kda: '',
  team1Gold: '',
  team2Gold: '',
  team1BannedChamps: [],
  team2BannedChamps: [],
  badges: [],
  playerData: {},
  championId: 0,
  spellImages: {},
  keystoneImages: {},
};

ExpandedMatchEntry.propTypes = {
  win: PropTypes.bool,
  date: PropTypes.string,
  gameType: PropTypes.string,
  duration: PropTypes.string,
  items: PropTypes.array,
  spells: PropTypes.array,
  keystone: PropTypes.number,
  trinket: PropTypes.number,
  kdaShort: PropTypes.string,
  level: PropTypes.string,
  damageContribution: PropTypes.string,
  killParticipation: PropTypes.string,
  gold: PropTypes.string,
  kdaLong: PropTypes.string,
  cs: PropTypes.string,
  summonerName: PropTypes.string,
  rank: PropTypes.string,
  championName: PropTypes.string,
  team1Win: PropTypes.bool,
  team2Win: PropTypes.bool,
  team1Barons: PropTypes.number,
  team1Dragons: PropTypes.number,
  team1Towers: PropTypes.number,
  team2Barons: PropTypes.number,
  team2Dragons: PropTypes.number,
  team2Towers: PropTypes.number,
  team1Kda: PropTypes.string,
  team2Kda: PropTypes.string,
  team1Gold: PropTypes.string,
  team2Gold: PropTypes.string,
  team1BannedChamps: PropTypes.array,
  team2BannedChamps: PropTypes.array,
  badges: PropTypes.array,
  playerData: PropTypes.array,
  championId: PropTypes.number,
  spellImages: PropTypes.object,
  keystoneImages: PropTypes.object,
};

const styles = StyleSheet.create({
  matchHeaderContainer: {
    marginTop: 12,
  },
  banBars: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  teamHeaders: {
    flexDirection: 'row',
    marginTop: 2,
    marginBottom: 7,
  },
  teamHeaderContainer: {
    width: '50%',
  },
  hide: {
    display: 'none',
  },
});

export default ExpandedMatchEntry;
