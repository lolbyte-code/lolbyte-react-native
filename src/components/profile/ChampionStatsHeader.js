import {StyleSheet, Text, View} from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';

const ChampionStatsHeader = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
};

ChampionStatsHeader.defaultProps = {
  title: 'Champion Statistics',
};

ChampionStatsHeader.propTypes = {
  title: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    marginLeft: 15,
    marginTop: 20,
  },
  title: {
    color: 'white',
    fontSize: 25,
  },
});

export default ChampionStatsHeader;
