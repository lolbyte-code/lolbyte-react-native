import {Image, StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '@app/Theme';

import PropTypes from 'prop-types';
import React from 'react';
import {getChampionIcon} from '@app/api/Url';

const TopChampionsEntry = (props) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: getChampionIcon(props.championId),
        }}
        style={
          props.championLevel === 7
            ? styles.championImageLevel7
            : props.championLevel === 6
            ? styles.championImageLevel6
            : props.championLevel === 5
            ? styles.championImageLevel5
            : styles.championImageDefault
        }
      />
      <Text style={styles.championName}>{props.championName}</Text>
      <Text
        style={styles.championLevel}>{`Level: ${props.championLevel}`}</Text>
      <Text
        style={styles.championPoints}>{`Points: ${props.championPoints}`}</Text>
    </View>
  );
};

TopChampionsEntry.defaultProps = {
  championId: 0,
  championName: '',
  championLevel: 0,
  championPoints: 0,
};

TopChampionsEntry.propTypes = {
  championId: PropTypes.number,
  championName: PropTypes.string,
  championLevel: PropTypes.number,
  championPoints: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  championImageLevel7: {
    width: 106,
    height: 106,
    borderRadius: 53,
    borderWidth: 3,
    borderColor: colors.masteryLevel7,
  },
  championImageLevel6: {
    width: 106,
    height: 106,
    borderRadius: 53,
    borderWidth: 3,
    borderColor: colors.masteryLevel6,
  },
  championImageLevel5: {
    width: 106,
    height: 106,
    borderRadius: 53,
    borderWidth: 3,
    borderColor: colors.masteryLevel5,
  },
  championImageDefault: {
    width: 106,
    height: 106,
    borderRadius: 53,
    borderWidth: 3,
    borderColor: colors.masteryLevelDefault,
  },
  championName: {
    color: colors.blue,
    fontFamily: fonts.bold,
  },
  championLevel: {
    color: colors.white,
    fontFamily: fonts.regular,
    fontSize: 13,
  },
  championPoints: {
    color: colors.white,
    fontFamily: fonts.regular,
    fontSize: 13,
  },
});

export default TopChampionsEntry;
