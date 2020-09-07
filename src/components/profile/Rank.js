import {Image, StyleSheet, View} from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';

const Rank = (props) => {
  return (
    <View style={styles.container}>
      <Image source={props.images[props.tier].uri} style={styles.rank} />
    </View>
  );
};

Rank.defaultProps = {
  tier: '',
  images: {
    unranked: {
      uri: require('LolByte/src/assets/img//ranks/unranked.png'),
    },
    iron: {
      uri: require('LolByte/src/assets/img//ranks/iron.png'),
    },
    bronze: {
      uri: require('LolByte/src/assets/img//ranks/bronze.png'),
    },
    silver: {
      uri: require('LolByte/src/assets/img//ranks/silver.png'),
    },
    gold: {
      uri: require('LolByte/src/assets/img//ranks/gold.png'),
    },
    platinum: {
      uri: require('LolByte/src/assets/img//ranks/platinum.png'),
    },
    diamond: {
      uri: require('LolByte/src/assets/img//ranks/diamond.png'),
    },
    master: {
      uri: require('LolByte/src/assets/img//ranks/master.png'),
    },
    grandmaster: {
      uri: require('LolByte/src/assets/img//ranks/grandmaster.png'),
    },
    challenger: {
      uri: require('LolByte/src/assets/img//ranks/challenger.png'),
    },
  },
};

Rank.propTypes = {
  tier: PropTypes.string,
  images: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 200,
  },
  rank: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
});

export default Rank;
