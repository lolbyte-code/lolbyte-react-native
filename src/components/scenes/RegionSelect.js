import {DEFAULT_SCROLL_BAR, pages} from '@app/Constants';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {backgrounds, colors, fonts} from '@app/Theme';

import CloseButton from '@app/components/common/ClosePageButton';
import PropTypes from 'prop-types';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const RegionSelect = (props) => {
  const navigation = useNavigation();

  const SummonerRegions = props.summonerRegions.map((summonerRegion) => (
    <TouchableWithoutFeedback
      key={`summonerRegion_${summonerRegion.label}`}
      onPress={() => {
        navigation.navigate(pages.home, {
          summonerRegion: summonerRegion.value,
        });
      }}>
      <Text style={styles.labelStyle}>{summonerRegion.label}</Text>
    </TouchableWithoutFeedback>
  ));
  return (
    <ImageBackground source={props.backgroundImage} style={styles.background}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        indicatorStyle={DEFAULT_SCROLL_BAR}>
        <CloseButton
          goBackPage={pages.home}
          buttonStyle={styles.closeButtonStyle}
        />
        <View style={styles.summonerRegionsContainer}>{SummonerRegions}</View>
      </ScrollView>
    </ImageBackground>
  );
};

RegionSelect.defaultProps = {
  backgroundImage: backgrounds.summonerRegionSelect,
  summonerRegions: [
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
};

RegionSelect.propTypes = {
  backgroundImage: PropTypes.node,
  summonerRegions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  scrollContainer: {
    flex: 1,
  },
  summonerRegionsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  labelStyle: {
    color: colors.blue,
    fontSize: 25,
    margin: 4,
    fontFamily: fonts.regular,
  },
  closeButtonStyle: {
    marginTop: 45,
    marginLeft: 20,
  },
});

export default RegionSelect;
