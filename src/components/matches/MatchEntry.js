import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import CollapsedMatchEntry from '@app/components/matches/CollapsedMatchEntry';
import ExpandedMatchEntry from '@app/components/matches/ExpandedMatchEntry';
import PropTypes from 'prop-types';
import React from 'react';
import {fetchMatchData} from '@app/data/actions/ApiActions';

const MatchEntry = (props) => {
  const dispatch = useDispatch();

  const matchData = useSelector((state) => state.api.matchData);

  const [collapsed, setCollapsed] = React.useState(true);
  const [currentSummoner, setCurrentSummoner] = React.useState({
    name: props.currentSummonerName,
    match: null,
  });

  React.useEffect(() => {
    setCurrentSummoner({
      name: props.currentSummonerName,
      match: props.matchId,
    });
  }, [props.currentSummonerName, props.matchId]);

  const changeCurrentSummonerHandler = (summoner) => {
    setCurrentSummoner(summoner);
  };

  const selectedSummoner = matchData.isFetching
    ? null
    : matchData.data.players.filter(
        (player) => player.name === currentSummoner.name,
      )[0];

  /*
    Cached matches load faster than remotely fetched matches and may
    cause a re-ordering of the match list as they are lazily loaded.
    If a user selects a match during lazy load with cached matches,
    this ensures the selectedMatch state is in sync with the collapsed
    state.
  */
  React.useEffect(() => {
    if (props.selectedMatch !== null) {
      if (props.selectedMatch === props.matchId) {
        setCollapsed(false);
      } else {
        setCollapsed(true);
      }
    }
  }, [props.selectedMatch, props.matchId]);

  return (
    <View style={props.containerStyle}>
      <View
        style={
          collapsed ||
          (!collapsed && (matchData.isFetching || !selectedSummoner))
            ? null
            : styles.hide
        }>
        <TouchableWithoutFeedback
          onPress={() => {
            if (!props.pressable) {
              return;
            }
            setCollapsed(false);
            props.changeSelectedMatchHandler(props.matchId);
            dispatch(
              fetchMatchData(
                props.matchId,
                props.summonerRegion,
                props.summonerId,
              ),
            );
          }}>
          <View>
            <CollapsedMatchEntry
              isFetching={
                !collapsed && (matchData.isFetching || !selectedSummoner)
              }
              {...props}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      {matchData.isFetching || !selectedSummoner ? null : (
        <View>
          <TouchableWithoutFeedback
            onPress={() => {
              if (!props.pressable) {
                return;
              }
              setCollapsed(true);
              setCurrentSummoner({
                name: props.currentSummonerName,
                match: props.matchId,
              });
              props.changeSelectedMatchHandler(null);
            }}>
            <View style={collapsed ? styles.hide : null}>
              <ExpandedMatchEntry
                {...props}
                win={selectedSummoner.win}
                items={selectedSummoner.items}
                spells={selectedSummoner.spells}
                keystone={selectedSummoner.keystone}
                playerData={matchData.data.players}
                championId={selectedSummoner.champId}
                kdaShort={`${selectedSummoner.kills}/${selectedSummoner.deaths}/${selectedSummoner.assists}`}
                kdaLong={`${(
                  (selectedSummoner.kills + selectedSummoner.assists) /
                  Math.max(selectedSummoner.deaths, 1)
                ).toFixed(1)} KDA`}
                championName={selectedSummoner.champName}
                cs={selectedSummoner.cs}
                level={selectedSummoner.level}
                damageContribution={selectedSummoner.damageContribution}
                killParticipation={selectedSummoner.killParticipation}
                summonerName={selectedSummoner.name}
                rank={selectedSummoner.rank}
                gold={selectedSummoner.gold}
                badges={selectedSummoner.badges}
                trinket={selectedSummoner.trinket}
                team1Win={matchData.data.blueTeam.win}
                team2Win={matchData.data.redTeam.win}
                team1Gold={matchData.data.blueTeam.gold}
                team2Gold={matchData.data.redTeam.gold}
                team1BannedChamps={matchData.data.blueTeam.bans}
                team2BannedChamps={matchData.data.redTeam.bans}
                team1Towers={matchData.data.blueTeam.towers}
                team1Dragons={matchData.data.blueTeam.dragons}
                team1Barons={matchData.data.blueTeam.barons}
                team2Towers={matchData.data.redTeam.towers}
                team2Dragons={matchData.data.redTeam.dragons}
                team2Barons={matchData.data.redTeam.barons}
                team1Kda={`${matchData.data.blueTeam.kills}/${matchData.data.blueTeam.deaths}/${matchData.data.blueTeam.assists}`}
                team2Kda={`${matchData.data.redTeam.kills}/${matchData.data.redTeam.deaths}/${matchData.data.redTeam.assists}`}
                changeSummonerHandler={changeCurrentSummonerHandler}
                selectedSummonerName={selectedSummoner.name}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      )}
    </View>
  );
};

MatchEntry.defaultProps = {
  pressable: true,
  selectedMatch: null,
  win: false,
  date: '',
  gameType: '',
  duration: 0,
  items: [],
  spells: [],
  keystone: 0,
  championId: 0,
  kdaShort: '',
  kdaLong: '',
  championName: '',
  cs: '',
  matchId: 0,
  changeSummonerHandler: () => {},
  changeSelectedMatchHandler: () => {},
  containerStyle: {},
  currentSummonerName: '',
  summonerId: '',
  summonerRegion: '',
  spellImages: {
    0: {
      uri: require('@app/assets/img/spells/0.png'),
    },
    1: {
      uri: require('@app/assets/img/spells/1.png'),
    },
    3: {
      uri: require('@app/assets/img/spells/3.png'),
    },
    4: {
      uri: require('@app/assets/img/spells/4.png'),
    },
    6: {
      uri: require('@app/assets/img/spells/6.png'),
    },
    7: {
      uri: require('@app/assets/img/spells/7.png'),
    },
    11: {
      uri: require('@app/assets/img/spells/11.png'),
    },
    12: {
      uri: require('@app/assets/img/spells/12.png'),
    },
    13: {
      uri: require('@app/assets/img/spells/13.png'),
    },
    14: {
      uri: require('@app/assets/img/spells/14.png'),
    },
    21: {
      uri: require('@app/assets/img/spells/21.png'),
    },
    30: {
      uri: require('@app/assets/img/spells/30.png'),
    },
    31: {
      uri: require('@app/assets/img/spells/31.png'),
    },
    32: {
      uri: require('@app/assets/img/spells/32.png'),
    },
    33: {
      uri: require('@app/assets/img/spells/33.png'),
    },
    34: {
      uri: require('@app/assets/img/spells/34.png'),
    },
    35: {
      uri: require('@app/assets/img/spells/35.png'),
    },
    36: {
      uri: require('@app/assets/img/spells/36.png'),
    },
    39: {
      uri: require('@app/assets/img/spells/39.png'),
    },
    50: {
      uri: require('@app/assets/img/spells/50.png'),
    },
    51: {
      uri: require('@app/assets/img/spells/51.png'),
    },
    52: {
      uri: require('@app/assets/img/spells/52.png'),
    },
  },
  keystoneImages: {
    0: {
      uri: require('@app/assets/img/runes/0.png'),
    },
    8005: {
      uri: require('@app/assets/img/runes/8005.png'),
    },
    8008: {
      uri: require('@app/assets/img/runes/8008.png'),
    },
    8010: {
      uri: require('@app/assets/img/runes/8010.png'),
    },
    8021: {
      uri: require('@app/assets/img/runes/8021.png'),
    },
    8112: {
      uri: require('@app/assets/img/runes/8112.png'),
    },
    8124: {
      uri: require('@app/assets/img/runes/8124.png'),
    },
    8128: {
      uri: require('@app/assets/img/runes/8128.png'),
    },
    8214: {
      uri: require('@app/assets/img/runes/8214.png'),
    },
    8229: {
      uri: require('@app/assets/img/runes/8229.png'),
    },
    8230: {
      uri: require('@app/assets/img/runes/8230.png'),
    },
    8351: {
      uri: require('@app/assets/img/runes/8351.png'),
    },
    8358: {
      uri: require('@app/assets/img/runes/8358.png'),
    },
    8359: {
      uri: require('@app/assets/img/runes/8359.png'),
    },
    8360: {
      uri: require('@app/assets/img/runes/8360.png'),
    },
    8437: {
      uri: require('@app/assets/img/runes/8437.png'),
    },
    8439: {
      uri: require('@app/assets/img/runes/8439.png'),
    },
    8465: {
      uri: require('@app/assets/img/runes/8465.png'),
    },
    9923: {
      uri: require('@app/assets/img/runes/9923.png'),
    },
  },
};

MatchEntry.propTypes = {
  pressable: PropTypes.bool,
  selectedMatch: PropTypes.number,
  win: PropTypes.bool,
  date: PropTypes.string,
  gameType: PropTypes.string,
  duration: PropTypes.number,
  items: PropTypes.array,
  spells: PropTypes.array,
  keystone: PropTypes.number,
  championId: PropTypes.number,
  kdaShort: PropTypes.string,
  kdaLong: PropTypes.string,
  championName: PropTypes.string,
  cs: PropTypes.number,
  matchId: PropTypes.number,
  playerData: PropTypes.array,
  changeSummonerHandler: PropTypes.func,
  changeSelectedMatchHandler: PropTypes.func,
  containerStyle: PropTypes.object,
  currentSummonerName: PropTypes.string,
  summonerId: PropTypes.string,
  summonerRegion: PropTypes.string,
  spellImages: PropTypes.object,
  keystoneImages: PropTypes.object,
};

const styles = StyleSheet.create({
  hide: {
    display: 'none',
  },
});

export default MatchEntry;
