import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {colors, fonts} from '@app/Theme';

import PropTypes from 'prop-types';
import React from 'react';
import {getChampionIcon} from '@app/api/Url';

const RecentMatchesEntry = (props) => {
  return (
    <TouchableWithoutFeedback onPress={props.selectMatchesHeader}>
      <View style={styles.container}>
        <Image
          source={{
            uri: getChampionIcon(props.championId),
            cache: 'force-cache',
          }}
          style={props.win ? styles.championImageWin : styles.championImageLoss}
        />
        <Text style={styles.kda}>{props.kda}</Text>
        <View style={props.win ? styles.winContainer : styles.lossContainer}>
          <Text style={styles.win}>{props.win ? 'W' : 'L'}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

RecentMatchesEntry.defaultProps = {
  championId: 0,
  win: false,
  kda: '',
  selectMatchesHeader: () => {},
};

RecentMatchesEntry.propTypes = {
  championId: PropTypes.number,
  win: PropTypes.bool,
  kda: PropTypes.string,
  selectMatchesHeader: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  championImageWin: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 3,
    borderColor: colors.blue,
  },
  championImageLoss: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 3,
    borderColor: colors.red,
  },
  winContainer: {
    borderWidth: 1,
    borderRadius: 9,
    borderColor: colors.blue,
    backgroundColor: colors.blue,
    alignItems: 'center',
    top: -82,
    right: 24,
    width: 18,
    height: 18,
  },
  lossContainer: {
    borderWidth: 1,
    borderRadius: 9,
    borderColor: colors.red,
    backgroundColor: colors.red,
    alignItems: 'center',
    top: -82,
    right: 24,
    width: 18,
    height: 18,
  },
  win: {
    fontSize: 12,
    color: colors.white,
    fontFamily: fonts.bold,
  },
  kda: {
    color: colors.white,
    fontFamily: fonts.regular,
  },
});

export default RecentMatchesEntry;
