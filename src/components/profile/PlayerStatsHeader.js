import {StyleSheet, Text, View} from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';

const PlayerStatsHeader = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.subtitle}>{props.subtitle}</Text>
    </View>
  );
};

PlayerStatsHeader.defaultProps = {
  title: 'Player Statistics',
  subtitle: 'Last 20 Matches',
};

PlayerStatsHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    margin: 15,
  },
  title: {
    color: 'white',
    fontSize: 25,
  },
  subtitle: {
    color: '#B2B4BB',
    fontSize: 15,
  },
});

export default PlayerStatsHeader;
