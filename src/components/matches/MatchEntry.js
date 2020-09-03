import CollapsedMatchEntry from './CollapsedMatchEntry';
import ExpandedMatchEntry from './ExpandedMatchEntry';
import PropTypes from 'prop-types';
import React from 'react';
import {View} from 'react-native';

const MatchEntry = (props) => {
  const [collapsed, setCollapsed] = React.useState(true);

  const arrowHandler = (c) => {
    setCollapsed(c);
  };

  return (
    <View>
      {collapsed ? (
        <CollapsedMatchEntry handler={arrowHandler} {...props} />
      ) : (
        <ExpandedMatchEntry
          handler={arrowHandler}
          {...props}
          allData={props.allData}
        />
      )}
    </View>
  );
};

MatchEntry.defaultProps = {
  level: 'Lvl 18',
  damage: 'Dmg Cont: 21%',
  killParticipation: 'Kill Part: 100%',
  summonerName: 'Imaqtpie',
  rank: 'Master',
  gold: '105.1k',
  badges: [
    {
      name: 'most damage',
      type: 1,
    },
    {
      name: 'quadra kill',
      type: 2,
    },
    {
      name: 'best KDA',
      type: 3,
    },
    {
      name: 'first blood',
      type: 4,
    },
    {
      name: 'most gold',
      type: 5,
    },
    {
      name: 'most wards',
      type: 6,
    },
  ],
  bannedChamps: [1, 1, 1, 1, 1],
  barons: 0,
  dragons: 0,
  towers: 0,
  allData: {},

  win: false,
  date: '',
  gameType: '',
  duration: '',
  items: [],
  spells: [],
  keystone: 0,
  championId: 0,
  gradientStart: {x: 0, y: 1},
  gradientEnd: {x: 0, y: 0},
  gradientColors: ['rgba(0,0,0,1)', 'transparent'],
  kdaShort: '',
  kdaLong: '',
  championName: '',
  cs: '',
};

MatchEntry.propTypes = {
  level: PropTypes.string,
  damage: PropTypes.string,
  killParticipation: PropTypes.string,
  summonerName: PropTypes.string,
  rank: PropTypes.string,
  gold: PropTypes.string,
  badges: PropTypes.array,
  bannedChamps: PropTypes.array,
  barons: PropTypes.number,
  dragons: PropTypes.number,
  towers: PropTypes.number,
  allData: PropTypes.object,

  win: PropTypes.bool,
  date: PropTypes.string,
  gameType: PropTypes.string,
  duration: PropTypes.string,
  items: PropTypes.array,
  spells: PropTypes.array,
  keystone: PropTypes.number,
  championId: PropTypes.number,
  gradientColors: PropTypes.array,
  kdaShort: PropTypes.string,
  kdaLong: PropTypes.string,
  championName: PropTypes.string,
  cs: PropTypes.string,
};

export default MatchEntry;
