import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../Theme';

import PropTypes from 'prop-types';
import React from 'react';
import Svg0 from '../../svg/0.svg';
import Svg10 from '../../svg/10.svg';
import Svg100 from '../../svg/100.svg';
import Svg15 from '../../svg/15.svg';
import Svg20 from '../../svg/20.svg';
import Svg25 from '../../svg/25.svg';
import Svg30 from '../../svg/30.svg';
import Svg35 from '../../svg/35.svg';
import Svg40 from '../../svg/40.svg';
import Svg45 from '../../svg/45.svg';
import Svg5 from '../../svg/5.svg';
import Svg50 from '../../svg/50.svg';
import Svg55 from '../../svg/55.svg';
import Svg60 from '../../svg/60.svg';
import Svg65 from '../../svg/65.svg';
import Svg70 from '../../svg/70.svg';
import Svg75 from '../../svg/75.svg';
import Svg80 from '../../svg/80.svg';
import Svg85 from '../../svg/85.svg';
import Svg90 from '../../svg/90.svg';
import Svg95 from '../../svg/95.svg';

const getPercentSvg = (percent, height, width) => {
  switch (percent) {
    case 0:
      return <Svg0 height={height} width={width} />;
    case 5:
      return <Svg5 height={height} width={width} />;
    case 10:
      return <Svg10 height={height} width={width} />;
    case 15:
      return <Svg15 height={height} width={width} />;
    case 20:
      return <Svg20 height={height} width={width} />;
    case 25:
      return <Svg25 height={height} width={width} />;
    case 30:
      return <Svg30 height={height} width={width} />;
    case 35:
      return <Svg35 height={height} width={width} />;
    case 40:
      return <Svg40 height={height} width={width} />;
    case 45:
      return <Svg45 height={height} width={width} />;
    case 50:
      return <Svg50 height={height} width={width} />;
    case 55:
      return <Svg55 height={height} width={width} />;
    case 60:
      return <Svg60 height={height} width={width} />;
    case 65:
      return <Svg65 height={height} width={width} />;
    case 70:
      return <Svg70 height={height} width={width} />;
    case 75:
      return <Svg75 height={height} width={width} />;
    case 80:
      return <Svg80 height={height} width={width} />;
    case 85:
      return <Svg85 height={height} width={width} />;
    case 90:
      return <Svg90 height={height} width={width} />;
    case 95:
      return <Svg95 height={height} width={width} />;
    case 100:
      return <Svg100 height={height} width={width} />;
  }
};

const PlayerStats = (props) => {
  var PercentSvg = getPercentSvg(
    props.percent,
    props.percentHeight,
    props.percentWidth,
  );
  return (
    <View style={styles.container}>
      <View style={styles.percent}>{PercentSvg}</View>
      <View style={styles.statDetails}>
        <Text style={styles.kdaShort}>{props.kdaShort}</Text>
        <Text style={styles.kdaLong}>{props.kdaLong}</Text>
        <Text style={styles.wards}>{props.wards}</Text>
      </View>
    </View>
  );
};

PlayerStats.defaultProps = {
  percent: 0,
  percentHeight: 100,
  percentWidth: 100,
  kdaShort: '',
  kdaLong: '',
  wards: '',
};

PlayerStats.propTypes = {
  percent: PropTypes.number,
  percentHeight: PropTypes.number,
  percentWidth: PropTypes.number,
  kdaShort: PropTypes.string,
  kdaLong: PropTypes.string,
  wards: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  percent: {
    alignItems: 'center',
  },
  statDetails: {
    alignItems: 'center',
  },
  kdaShort: {
    fontSize: 23,
    color: colors.blue,
    fontFamily: fonts.bold,
  },
  kdaLong: {
    fontSize: 20,
    color: colors.white,
    fontFamily: fonts.bold,
  },
  wards: {
    fontSize: 15,
    color: colors.white,
    fontFamily: fonts.regular,
  },
});

export default PlayerStats;
