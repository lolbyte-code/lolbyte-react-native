import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {colors, fonts} from '../../Theme';

import PropTypes from 'prop-types';
import React from 'react';
import RegionArrowSvg from '../../svg/regionArrow.svg';
import {pages} from '../../Constants';
import {useNavigation} from '@react-navigation/native';

const RegionSelector = (props) => {
  const navigation = useNavigation();

  const selectRegionHandler = () => {
    navigation.navigate(pages.selectRegion);
  };

  return (
    <TouchableWithoutFeedback onPress={() => selectRegionHandler()}>
      <View style={styles.regionSelector}>
        <Text style={styles.regionText}>{props.selectedRegion} </Text>
        <RegionArrowSvg
          style={styles.regionArrow}
          width={props.regionArrowWidth}
          height={props.regionArrowHeight}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

RegionSelector.defaultProps = {
  selectedRegion: '',
  regionArrowWidth: 10,
  regionArrowHeight: 24,
};

RegionSelector.propTypes = {
  selectedRegion: PropTypes.string,
  regionArrowWidth: PropTypes.number,
  regionArrowHeight: PropTypes.number,
};

const styles = StyleSheet.create({
  regionSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.darkGrey,
    borderWidth: 10,
    borderRadius: 6,
    marginLeft: 5,
  },
  regionText: {
    color: colors.blue,
    backgroundColor: colors.darkGrey,
    fontSize: 20,
    fontFamily: fonts.regular,
  },
  regionArrow: {
    backgroundColor: colors.darkGrey,
  },
});

export default RegionSelector;
