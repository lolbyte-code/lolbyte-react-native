import {StyleSheet, View} from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';
import SummonerEntry from './SummonerEntry';

const Summoners = (props) => {
  let x = 0;
  const Entries = props.data.map((entry) => (
    <SummonerEntry
      key={x++}
      summonerIcon={entry.summonerIcon}
      summonerName={entry.summonerName}
      summonerRegion={entry.summonerRegion}
    />
  ));
  return (
    <View style={styles.container}>
      <View style={styles.entries}>{Entries}</View>
    </View>
  );
};

Summoners.defaultProps = {
  data: [],
};

Summoners.propTypes = {
  data: PropTypes.array,
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    height: 95,
  },
  entries: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default Summoners;
