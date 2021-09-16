import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '@app/Theme';

import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';
import React from 'react';
import {getChampionIcon} from '@app/api/Url';

const MostPlayedChampionsEntry = (props) => {
  return (
    <View style={styles.container}>
      <FastImage
        source={{
          uri: getChampionIcon(props.championId),
        }}
        style={styles.championImage}
      />
      <Text style={styles.championName}>{props.championName}</Text>
      <Text
        style={styles.gamesPlayed}>{`Games Played: ${props.gamesPlayed}`}</Text>
    </View>
  );
};

MostPlayedChampionsEntry.defaultProps = {
  championId: 0,
  championName: '',
  gamesPlayed: 0,
};

MostPlayedChampionsEntry.propTypes = {
  championId: PropTypes.number,
  championName: PropTypes.string,
  gamesPlayed: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  championImage: {
    width: 106,
    height: 106,
    borderRadius: 53,
    borderWidth: 3,
    borderColor: colors.lightGrey,
  },
  championName: {
    color: colors.blue,
    fontFamily: fonts.bold,
  },
  gamesPlayed: {
    color: colors.white,
    fontFamily: fonts.regular,
    fontSize: 13,
  },
});

export default MostPlayedChampionsEntry;
