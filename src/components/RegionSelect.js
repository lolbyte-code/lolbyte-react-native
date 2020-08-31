import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {backgrounds, colors} from './common/Theme';

import CloseButtonSvg from '../svg/closeButton.svg';
import PropTypes from 'prop-types';
import React from 'react';
import {pages} from '../Constants';
import {useNavigation} from '@react-navigation/native';

const RegionSelect = (props) => {
  const navigation = useNavigation();

  const Regions = props.regions.map((region) => (
    <TouchableWithoutFeedback
      key={`region_${region.label}`}
      onPress={() => {
        navigation.navigate(pages.home, {
          region: region.value,
        });
      }}>
      <Text style={styles.labelStyle}>{region.label}</Text>
    </TouchableWithoutFeedback>
  ));
  return (
    <ImageBackground source={props.backgroundImage} style={styles.background}>
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <CloseButtonSvg
          style={styles.closeButton}
          width={props.closeButtonWidth}
          height={props.closeButtonHeight}
        />
      </TouchableWithoutFeedback>
      <View style={styles.container}>{Regions}</View>
    </ImageBackground>
  );
};

RegionSelect.defaultProps = {
  backgroundImage: backgrounds.region,
  regions: [
    {
      label: 'North America',
      value: 'na',
    },
    {
      label: 'EU West',
      value: 'euw',
    },
    {
      label: 'EU Nordic & East',
      value: 'eun',
    },
    {
      label: 'Republic of Korea',
      value: 'kr',
    },
    {
      label: 'Latin America North',
      value: 'lan',
    },
    {
      label: 'Latin America South',
      value: 'las',
    },
    {
      label: 'Brazil',
      value: 'br',
    },
    {
      label: 'Oceania',
      value: 'oce',
    },
    {
      label: 'Turkey',
      value: 'tr',
    },
    {
      label: 'Russia',
      value: 'ru',
    },
    {
      label: 'Japan',
      value: 'jp',
    },
  ],
  closeButtonWidth: 40,
  closeButtonHeight: 40,
};

RegionSelect.propTypes = {
  backgroundImage: PropTypes.node,
  regions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  closeButtonWidth: PropTypes.number,
  closeButtonHeight: PropTypes.number,
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    // TODO: hacky AF
    width: '100.03%',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  labelStyle: {
    color: colors.blue,
    fontSize: 25,
    margin: 4,
  },
  closeButton: {
    marginTop: 20,
    marginLeft: 20,
  },
});

export default RegionSelect;
