import {Image, StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../Theme';

import PropTypes from 'prop-types';
import React from 'react';
import {getChampionIcon} from '../../api/Url';

const TopChampionsEntry = (props) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: getChampionIcon(props.championId),
        }}
        style={
          props.championLevel === 'Level: 7'
            ? styles.championImageLevel7
            : props.championLevel === 'Level: 6'
            ? styles.championImageLevel6
            : props.championLevel === 'Level: 5'
            ? styles.championImageLevel5
            : styles.championImageDefault
        }
      />
      <Text style={styles.championName}>{props.championName}</Text>
      <Text style={styles.championLevel}>{props.championLevel}</Text>
      <Text style={styles.championPoints}>{props.championPoints}</Text>
    </View>
  );
};

TopChampionsEntry.defaultProps = {
  championId: 0,
  championName: '',
  championLevel: '',
  championPoints: '',
};

TopChampionsEntry.propTypes = {
  championId: PropTypes.number,
  championName: PropTypes.string,
  championLevel: PropTypes.string,
  championPoints: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    flex: 1,
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
