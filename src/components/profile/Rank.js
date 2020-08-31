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
  tier: 'unranked',
  images: {
    unranked: {
      uri: require('../../img/ranks/unranked.png'),
    },
    iron: {
      uri: require('../../img/ranks/iron.png'),
    },
    bronze: {
      uri: require('../../img/ranks/bronze.png'),
    },
    silver: {
      uri: require('../../img/ranks/silver.png'),
    },
    gold: {
      uri: require('../../img/ranks/gold.png'),
    },
    platinum: {
      uri: require('../../img/ranks/platinum.png'),
    },
    diamond: {
      uri: require('../../img/ranks/diamond.png'),
    },
    master: {
      uri: require('../../img/ranks/master.png'),
    },
    grandmaster: {
      uri: require('../../img/ranks/grandmaster.png'),
    },
    challenger: {
      uri: require('../../img/ranks/challenger.png'),
    },
  },
};

Rank.propTypes = {
  tier: PropTypes.string,
  items: PropTypes.shape(
    PropTypes.shape({
      uri: PropTypes.node,
    }),
  ),
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
