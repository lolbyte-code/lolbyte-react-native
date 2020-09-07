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
      uri: require('../../assets/img//ranks/unranked.png'),
    },
    iron: {
      uri: require('../../assets/img//ranks/iron.png'),
    },
    bronze: {
      uri: require('../../assets/img//ranks/bronze.png'),
    },
    silver: {
      uri: require('../../assets/img//ranks/silver.png'),
    },
    gold: {
      uri: require('../../assets/img//ranks/gold.png'),
    },
    platinum: {
      uri: require('../../assets/img//ranks/platinum.png'),
    },
    diamond: {
      uri: require('../../assets/img//ranks/diamond.png'),
    },
    master: {
      uri: require('../../assets/img//ranks/master.png'),
    },
    grandmaster: {
      uri: require('../../assets/img//ranks/grandmaster.png'),
    },
    challenger: {
      uri: require('../../assets/img//ranks/challenger.png'),
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
