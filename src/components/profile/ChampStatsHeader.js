import {StyleSheet, Text, View} from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';

const ChampStatsHeader = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
};

ChampStatsHeader.defaultProps = {
  title: 'Champion Statistics',
};

ChampStatsHeader.propTypes = {
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

export default ChampStatsHeader;
