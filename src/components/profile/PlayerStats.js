import {StyleSheet, Text, View} from 'react-native';

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

const PlayerStats = (props) => {
  let PercentSvg = props.defaultPercent;
  switch (props.percent) {
    case 0:
      PercentSvg = (
        <Svg0 height={props.percentHeight} width={props.percentWidth} />
      );
      break;
    case 5:
      PercentSvg = (
        <Svg5 height={props.percentHeight} width={props.percentWidth} />
      );
      break;
    case 10:
      PercentSvg = (
        <Svg10 height={props.percentHeight} width={props.percentWidth} />
      );
      break;
    case 15:
      PercentSvg = (
        <Svg15 height={props.percentHeight} width={props.percentWidth} />
      );
      break;
    case 20:
      PercentSvg = (
        <Svg20 height={props.percentHeight} width={props.percentWidth} />
      );
      break;
    case 25:
      PercentSvg = (
        <Svg25 height={props.percentHeight} width={props.percentWidth} />
      );
      break;
    case 30:
      PercentSvg = (
        <Svg30 height={props.percentHeight} width={props.percentWidth} />
      );
      break;
    case 35:
      PercentSvg = (
        <Svg35 height={props.percentHeight} width={props.percentWidth} />
      );
      break;
    case 40:
      PercentSvg = (
        <Svg40 height={props.percentHeight} width={props.percentWidth} />
      );
      break;
    case 45:
      PercentSvg = (
        <Svg45 height={props.percentHeight} width={props.percentWidth} />
      );
      break;
    case 50:
      PercentSvg = (
        <Svg50 height={props.percentHeight} width={props.percentWidth} />
      );
      break;
    case 55:
      PercentSvg = (
        <Svg55 height={props.percentHeight} width={props.percentWidth} />
      );
      break;
    case 60:
      PercentSvg = (
        <Svg60 height={props.percentHeight} width={props.percentWidth} />
      );
      break;
    case 65:
      PercentSvg = (
        <Svg65 height={props.percentHeight} width={props.percentWidth} />
      );
      break;
    case 70:
      PercentSvg = (
        <Svg70 height={props.percentHeight} width={props.percentWidth} />
      );
      break;
    case 75:
      PercentSvg = (
        <Svg75 height={props.percentHeight} width={props.percentWidth} />
      );
      break;
    case 80:
      PercentSvg = (
        <Svg80 height={props.percentHeight} width={props.percentWidth} />
      );
      break;
    case 85:
      PercentSvg = (
        <Svg85 height={props.percentHeight} width={props.percentWidth} />
      );
      break;
    case 90:
      PercentSvg = (
        <Svg90 height={props.percentHeight} width={props.percentWidth} />
      );
      break;
    case 95:
      PercentSvg = (
        <Svg95 height={props.percentHeight} width={props.percentWidth} />
      );
      break;
    case 100:
      PercentSvg = (
        <Svg100 height={props.percentHeight} width={props.percentWidth} />
      );
      break;
  }
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
  defaultPercent: <Svg0 height={100} width={100} />,
  percent: 0,
  percentHeight: 100,
  percentWidth: 100,
  kdaShort: '',
  kdaLong: '',
  wards: '',
};

PlayerStats.propTypes = {
  defaultPercent: PropTypes.object,
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
  },
  percent: {
    flex: 1,
    alignItems: 'center',
  },
  statDetails: {
    flex: 1,
    alignItems: 'center',
  },
  kdaShort: {
    fontSize: 23,
    color: 'teal',
  },
  kdaLong: {
    fontSize: 20,
    color: 'white',
  },
  wards: {
    fontSize: 15,
    color: 'white',
  },
});

export default PlayerStats;
