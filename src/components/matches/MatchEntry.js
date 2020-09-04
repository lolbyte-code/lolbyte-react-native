import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';

import CollapsedMatchEntry from './CollapsedMatchEntry';
import ExpandedMatchEntry from './ExpandedMatchEntry';
import PropTypes from 'prop-types';
import React from 'react';

const MatchEntry = (props) => {
  const [collapsed, setCollapsed] = React.useState(true);

  const collapsedHandler = (isCollapsed) => {
    setCollapsed(isCollapsed);
  };

  return (
    <View>
      <View style={collapsed ? null : styles.hide}>
        <TouchableWithoutFeedback onPress={() => collapsedHandler(false)}>
          <View>
            <CollapsedMatchEntry {...props} />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View>
        <TouchableWithoutFeedback
          onPress={() => {
            props.changeSummonerHandler(props.originalSummonerName);
            collapsedHandler(true);
          }}>
          <View style={collapsed ? styles.hide : null}>
            <ExpandedMatchEntry {...props} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

MatchEntry.defaultProps = {
  // Collapsed props
  win: false,
  date: '',
  gameType: '',
  duration: '',
  items: [],
  spells: [],
  keystone: 0,
  championId: 0,
  kdaShort: '',
  kdaLong: '',
  championName: '',
  cs: '',

  // Expanded Props
  trinket: 0,
  level: '',
  damageContribution: '',
  killParticipation: '',
  summonerName: '',
  rank: '',
  gold: '',
  badges: [],
  team1Win: false,
  team2Win: false,
  team1Gold: '',
  team2Gold: '',
  team1BannedChamps: [],
  team2BannedChamps: [],
  team1Towers: 0,
  team1Dragons: 0,
  team1Barons: 0,
  team2Towers: 0,
  team2Dragons: 0,
  team2Barons: 0,
  team1Kda: '',
  team2Kda: '',
  matchId: '',
  playerData: {},
  changeSummonerHandler: () => {},
  originalSummonerName: '',
  spellImages: {
    0: {
      uri: require('../../img/spells/0.png'),
    },
    1: {
      uri: require('../../img/spells/1.png'),
    },
    3: {
      uri: require('../../img/spells/3.png'),
    },
    4: {
      uri: require('../../img/spells/4.png'),
    },
    6: {
      uri: require('../../img/spells/6.png'),
    },
    7: {
      uri: require('../../img/spells/7.png'),
    },
    11: {
      uri: require('../../img/spells/11.png'),
    },
    12: {
      uri: require('../../img/spells/12.png'),
    },
    13: {
      uri: require('../../img/spells/13.png'),
    },
    14: {
      uri: require('../../img/spells/14.png'),
    },
    21: {
      uri: require('../../img/spells/21.png'),
    },
    30: {
      uri: require('../../img/spells/30.png'),
    },
    31: {
      uri: require('../../img/spells/31.png'),
    },
    32: {
      uri: require('../../img/spells/32.png'),
    },
    33: {
      uri: require('../../img/spells/33.png'),
    },
    34: {
      uri: require('../../img/spells/34.png'),
    },
    35: {
      uri: require('../../img/spells/35.png'),
    },
    36: {
      uri: require('../../img/spells/36.png'),
    },
    39: {
      uri: require('../../img/spells/39.png'),
    },
    50: {
      uri: require('../../img/spells/50.png'),
    },
    51: {
      uri: require('../../img/spells/51.png'),
    },
    52: {
      uri: require('../../img/spells/52.png'),
    },
  },
  keystoneImages: {
    8005: {
      uri: require('../../img/runes/8005.png'),
    },
    8008: {
      uri: require('../../img/runes/8008.png'),
    },
    8010: {
      uri: require('../../img/runes/8010.png'),
    },
    8021: {
      uri: require('../../img/runes/8021.png'),
    },
    8112: {
      uri: require('../../img/runes/8112.png'),
    },
    8124: {
      uri: require('../../img/runes/8124.png'),
    },
    8128: {
      uri: require('../../img/runes/8128.png'),
    },
    8214: {
      uri: require('../../img/runes/8214.png'),
    },
    8229: {
      uri: require('../../img/runes/8229.png'),
    },
    8230: {
      uri: require('../../img/runes/8230.png'),
    },
    8351: {
      uri: require('../../img/runes/8351.png'),
    },
    8358: {
      uri: require('../../img/runes/8358.png'),
    },
    8360: {
      uri: require('../../img/runes/8360.png'),
    },
    8437: {
      uri: require('../../img/runes/8437.png'),
    },
    8439: {
      uri: require('../../img/runes/8439.png'),
    },
    8465: {
      uri: require('../../img/runes/8465.png'),
    },
    9923: {
      uri: require('../../img/runes/9923.png'),
    },
  },
};

MatchEntry.propTypes = {
  // Collapsed props
  win: PropTypes.bool,
  date: PropTypes.string,
  gameType: PropTypes.string,
  duration: PropTypes.string,
  items: PropTypes.array,
  spells: PropTypes.array,
  keystone: PropTypes.number,
  championId: PropTypes.number,
  kdaShort: PropTypes.string,
  kdaLong: PropTypes.string,
  championName: PropTypes.string,
  cs: PropTypes.string,

  // Expanded Props
  trinket: PropTypes.number,
  level: PropTypes.string,
  damageContribution: PropTypes.string,
  killParticipation: PropTypes.string,
  summonerName: PropTypes.string,
  rank: PropTypes.string,
  gold: PropTypes.string,
  badges: PropTypes.array,
  team1Win: PropTypes.bool,
  team2Win: PropTypes.bool,
  team1Gold: PropTypes.string,
  team2Gold: PropTypes.string,
  team1BannedChamps: PropTypes.array,
  team2BannedChamps: PropTypes.array,
  team1Towers: PropTypes.number,
  team1Dragons: PropTypes.number,
  team1Barons: PropTypes.number,
  team2Towers: PropTypes.number,
  team2Dragons: PropTypes.number,
  team2Barons: PropTypes.number,
  team1Kda: PropTypes.string,
  team2Kda: PropTypes.string,
  matchId: PropTypes.string,
  playerData: PropTypes.array,
  changeSummonerHandler: PropTypes.func,
  originalSummonerName: PropTypes.string,
  spellImages: PropTypes.object,
  keystoneImages: PropTypes.object,
};

const styles = StyleSheet.create({
  hide: {
    display: 'none',
  },
});

export default MatchEntry;
