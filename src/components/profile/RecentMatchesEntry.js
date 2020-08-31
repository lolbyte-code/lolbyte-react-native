import {Image, StyleSheet, Text, View} from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';
import {colors} from '../common/Theme';
import {getChampionIcon} from '../../api/Url';

const RecentMatchesEntry = (props) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: getChampionIcon(props.championId),
        }}
        style={props.win ? styles.championImageWin : styles.championImageLoss}
      />
      <Text style={styles.win}>{props.win ? 'W' : 'L'}</Text>
      <Text style={styles.kda}>{props.kda}</Text>
    </View>
  );
};

RecentMatchesEntry.defaultProps = {
  championId: 0,
  win: false,
  kda: '',
};

RecentMatchesEntry.propTypes = {
  championId: PropTypes.number,
  win: PropTypes.bool,
  kda: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    flex: 1,
  },
  championImageWin: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: colors.blue,
  },
  championImageLoss: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: colors.red,
  },
  win: {
    color: colors.white,
    top: -20,
  },
  kda: {
    color: colors.white,
    top: -15,
  },
});

export default RecentMatchesEntry;
