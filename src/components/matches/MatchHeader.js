import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '@app/Theme';

import CollapsedArrowSvg from '@app/assets/svg/collapsed.svg';
import ExpandedArrowSvg from '@app/assets/svg/expanded.svg';
import PropTypes from 'prop-types';
import React from 'react';

const MatchHeader = (props) => {
  return (
    <View style={props.win ? styles.headerWin : styles.headerLoss}>
      <Text style={styles.winText}>{props.win ? 'Win' : 'Loss'}</Text>
      <Text style={styles.date}>{props.date}</Text>
      <Text style={styles.gameType}>{props.gameType}</Text>
      <Text style={styles.duration}>{`${props.duration} min`}</Text>
      {props.collapsed ? (
        <CollapsedArrowSvg
          width={props.arrowWidth}
          height={props.arrowHeight}
        />
      ) : (
        <ExpandedArrowSvg width={props.arrowWidth} height={props.arrowHeight} />
      )}
    </View>
  );
};

MatchHeader.defaultProps = {
  win: false,
  date: '',
  gameType: '',
  duration: 0,
  arrowWidth: 12,
  arrowHeight: 12,
  collapsed: false,
};

MatchHeader.propTypes = {
  win: PropTypes.bool,
  date: PropTypes.string,
  gameType: PropTypes.string,
  duration: PropTypes.number,
  arrowWidth: PropTypes.number,
  arrowHeight: PropTypes.number,
  collapsed: PropTypes.bool,
};

const styles = StyleSheet.create({
  headerWin: {
    flexDirection: 'row',
    backgroundColor: colors.blue,
    justifyContent: 'space-around',
    padding: 5,
    alignItems: 'center',
    marginTop: 5,
  },
  headerLoss: {
    flexDirection: 'row',
    backgroundColor: colors.red,
    justifyContent: 'space-around',
    padding: 5,
    alignItems: 'center',
    marginTop: 5,
  },
  winText: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 14,
  },
  date: {
    color: colors.white,
    fontFamily: fonts.regular,
    fontSize: 14,
  },
  gameType: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 14,
  },
  duration: {
    color: colors.white,
    fontFamily: fonts.regular,
    fontSize: 14,
  },
});

export default MatchHeader;
