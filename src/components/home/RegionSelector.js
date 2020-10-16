import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {colors, fonts} from '@app/Theme';

import PropTypes from 'prop-types';
import React from 'react';
import {pages} from '@app/Constants';
import {useNavigation} from '@react-navigation/native';

const RegionSelector = (props) => {
  const navigation = useNavigation();

  const selectRegionHandler = () => {
    navigation.navigate(pages.selectRegion);
  };

  return (
    <TouchableWithoutFeedback onPress={selectRegionHandler}>
      <View style={styles.summonerRegionSelector}>
        <Text style={styles.summonerRegionText}>{props.selectedRegion}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

RegionSelector.defaultProps = {
  selectedRegion: '',
};

RegionSelector.propTypes = {
  selectedRegion: PropTypes.string,
};

const styles = StyleSheet.create({
  summonerRegionSelector: {
    flexDirection: 'row',
    borderColor: colors.darkGrey,
    borderWidth: 10,
    borderRadius: 6,
    height: 44,
    alignItems: 'center',
  },
  summonerRegionText: {
    color: colors.blue,
    backgroundColor: colors.darkGrey,
    fontSize: 20,
    fontFamily: fonts.regular,
  },
});

export default RegionSelector;
