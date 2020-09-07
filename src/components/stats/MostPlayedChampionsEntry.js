import {Image, StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '@app/Theme';

import PropTypes from 'prop-types';
import React from 'react';
import {getChampionIcon} from '@app/api/Url';

const MostPlayedChampionsEntry = (props) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: getChampionIcon(props.championId),
        }}
        style={styles.championImage}
      />
      <Text style={styles.championName}>{props.championName}</Text>
      <Text style={styles.gamesPlayed}>{props.gamesPlayed}</Text>
    </View>
  );
};

MostPlayedChampionsEntry.defaultProps = {
  championId: 0,
  championName: '',
  gamesPlayed: '',
};

MostPlayedChampionsEntry.propTypes = {
  championId: PropTypes.number,
  championName: PropTypes.string,
  gamesPlayed: PropTypes.string,
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
