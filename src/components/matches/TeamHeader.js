import {Image, StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../Theme';

import PropTypes from 'prop-types';
import React from 'react';

const TeamHeader = (props) => {
  return (
    <View style={props.win ? styles.winContainer : styles.loseContainer}>
      <Text style={styles.winText}>{props.win ? 'W' : 'L'}</Text>
      <Image source={props.towerImage.uri} style={styles.objective} />
      <Text style={styles.objectiveText}>{props.towers}</Text>
      <Image source={props.dragonImage.uri} style={styles.objective} />
      <Text style={styles.objectiveText}>{props.dragons}</Text>
      <Image source={props.baronImage.uri} style={styles.objective} />
      <Text style={styles.objectiveText}>{props.barons}</Text>
      <Text style={styles.kda}>{props.kda}</Text>
      <Text style={styles.gold}>{props.gold}</Text>
    </View>
  );
};

TeamHeader.defaultProps = {
  win: false,
  kda: '',
  gold: '',
  towers: 0,
  dragons: 0,
  barons: 0,
  towerImage: {
    uri: require('../../assets/img//objectives/tower.png'),
  },
  dragonImage: {
    uri: require('../../assets/img//objectives/dragon.png'),
  },
  baronImage: {
    uri: require('../../assets/img//objectives/baron.png'),
  },
};

TeamHeader.propTypes = {
  win: PropTypes.bool,
  kda: PropTypes.string,
  gold: PropTypes.string,
  towers: PropTypes.number,
  dragons: PropTypes.number,
  barons: PropTypes.number,
  towerImage: PropTypes.object,
  dragonImage: PropTypes.object,
  baronImage: PropTypes.object,
};

const styles = StyleSheet.create({
  winContainer: {
    flexDirection: 'row',
    backgroundColor: colors.blue,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 3,
  },
  loseContainer: {
    flexDirection: 'row',
    backgroundColor: colors.red,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 3,
  },
  winText: {
    marginRight: 5,
    fontSize: 13,
    color: colors.white,
    fontFamily: fonts.regular,
  },
  kda: {
    fontSize: 13,
    color: colors.white,
    fontFamily: fonts.regular,
  },
  gold: {
    fontSize: 13,
    color: colors.white,
    fontFamily: fonts.regular,
  },
  objective: {
    width: 12,
    height: 12,
  },
  objectiveText: {
    fontSize: 11,
    color: colors.white,
    fontFamily: fonts.regular,
    right: 2,
  },
});

export default TeamHeader;
