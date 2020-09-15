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
          }}
          style={props.win ? styles.championImageWin : styles.championImageLoss}
        />
        <Text style={styles.kda}>{props.kda}</Text>
        <Text style={styles.win}>{props.win ? 'W' : 'L'}</Text>
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
    borderWidth: 2,
    borderColor: colors.blue,
  },
  championImageLoss: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 2,
    borderColor: colors.red,
  },
  win: {
    color: colors.white,
    top: -37,
    fontFamily: fonts.regular,
  },
  kda: {
    color: colors.white,
    fontFamily: fonts.regular,
  },
});

export default RecentMatchesEntry;
