import {Image, StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '@app/Theme';

import PropTypes from 'prop-types';
import React from 'react';
import {getChampionIcon} from '@app/api/Url';

const BannedChampsHeader = (props) => {
  var i = 0;
  const BannedChamps = props.bannedChamps.map((championId) => (
    <Image
      key={`bannedChamp_${i++}`}
      source={{uri: getChampionIcon(championId), cache: 'force-cache'}}
      style={styles.bannedChamp}
    />
  ));
  return (
    <View style={styles.container}>
      <Text style={styles.banText}>Bans:</Text>
      {BannedChamps}
    </View>
  );
};

BannedChampsHeader.defaultProps = {
  bannedChamps: [],
};

BannedChampsHeader.propTypes = {
  bannedChamps: PropTypes.array,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '50%',
    alignItems: 'center',
  },
  banText: {
    color: colors.white,
    fontFamily: fonts.regular,
  },
  bannedChamp: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    borderRadius: 10,
  },
});

export default BannedChampsHeader;
