import {StyleSheet, View} from 'react-native';

import CollapsedMatchSummary from '@app/components/matches/CollapsedMatchSummary';
import Loading from '@app/components/common/Loading';
import MatchHeader from '@app/components/matches/MatchHeader';
import PropTypes from 'prop-types';
import React from 'react';

const CollapsedMatchEntry = (props) => {
  return (
    <View>
      <MatchHeader
        win={props.win}
        date={props.date}
        gameType={props.gameType}
        duration={props.duration}
        collapsed={true}
      />
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
        win={props.win}
      />
      <View style={props.isFetching ? styles.loadingContainer : styles.hide}>
        <Loading loadingIndicatorSize={props.loadingIndicatorSize} />
      </View>
    </View>
  );
};

CollapsedMatchEntry.defaultProps = {
  isFetching: false,
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
  cs: 0,
  spellImages: {},
  loadingIndicatorSize: 'small',
};

CollapsedMatchEntry.propTypes = {
  isFetching: PropTypes.bool,
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
  spellImages: PropTypes.object,
  loadingIndicatorSize: PropTypes.string,
};

const styles = StyleSheet.create({
  loadingContainer: {
    marginTop: 5,
    marginBottom: 5,
  },
  hide: {
    display: 'none',
  },
});

export default CollapsedMatchEntry;
