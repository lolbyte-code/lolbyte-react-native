import CollapsedMatchSummary from '@app/components/matches/CollapsedMatchSummary';
import MatchHeader from '@app/components/matches/MatchHeader';
import PropTypes from 'prop-types';
import React from 'react';
import {View} from 'react-native';

const CollapsedMatchEntry = (props) => {
  return (
    <View>
      <View>
        <MatchHeader
          win={props.win}
          date={props.date}
          gameType={props.gameType}
          duration={props.duration}
          collapsed={true}
        />
      </View>
      <CollapsedMatchSummary
        items={props.items}
        spells={props.spells}
        keystone={props.keystone}
        championId={props.championId}
        kdaShort={props.kdaShort}
        kdaLong={props.kdaLong}
        championName={props.championName}
        cs={props.cs}
        spellImages={props.spellImages}
        keystoneImages={props.keystoneImages}
      />
    </View>
  );
};

CollapsedMatchEntry.defaultProps = {
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
  spellImages: {},
  keystoneImages: {},
};

CollapsedMatchEntry.propTypes = {
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
  spellImages: PropTypes.object,
  keystoneImages: PropTypes.object,
};

export default CollapsedMatchEntry;
