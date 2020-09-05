import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {colors, fonts} from '../../Theme';

import PropTypes from 'prop-types';
import React from 'react';
import RegionArrowSvg from '../../svg/summonerRegionArrow.svg';
import {pages} from '../../Constants';
import {useNavigation} from '@react-navigation/native';

const RegionSelector = (props) => {
  const navigation = useNavigation();

  const selectRegionHandler = () => {
    navigation.navigate(pages.selectRegion);
  };

  return (
    <TouchableWithoutFeedback onPress={selectRegionHandler}>
      <View style={styles.summonerRegionSelector}>
        <Text style={styles.summonerRegionText}>{props.selectedRegion} </Text>
        <RegionArrowSvg
          style={styles.summonerRegionArrow}
          width={props.summonerRegionArrowWidth}
          height={props.summonerRegionArrowHeight}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

RegionSelector.defaultProps = {
  selectedRegion: '',
  summonerRegionArrowWidth: 10,
  summonerRegionArrowHeight: 24,
};

RegionSelector.propTypes = {
  selectedRegion: PropTypes.string,
  summonerRegionArrowWidth: PropTypes.number,
  summonerRegionArrowHeight: PropTypes.number,
};

const styles = StyleSheet.create({
  summonerRegionSelector: {
    flexDirection: 'row',
    borderColor: colors.darkGrey,
    borderWidth: 10,
    borderRadius: 6,
  },
  summonerRegionText: {
    color: colors.blue,
    backgroundColor: colors.darkGrey,
    fontSize: 20,
    fontFamily: fonts.regular,
  },
  summonerRegionArrow: {
    backgroundColor: colors.darkGrey,
  },
});

export default RegionSelector;
