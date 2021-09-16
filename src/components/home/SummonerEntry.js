import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {colors, fonts} from '@app/Theme';

import EllipsisText from '@app/components/common/EllipsisText';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';
import React from 'react';
import {getProfileIcon} from '@app/api/Url';
import {pages} from '@app/Constants';
import {pushSearch} from '@app/data/actions/SearchActions';
import {resetProfileData} from '@app/data/actions/ApiActions';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const SummonerEntry = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const navigateToProfileHandler = () => {
    resetProfileData(dispatch);
    const summoner = {
      summonerName: props.summonerName,
      summonerRegion: props.summonerRegion,
    };
    dispatch(pushSearch(summoner));
    navigation.navigate(pages.results, summoner);
  };

  return (
    <TouchableWithoutFeedback onPress={navigateToProfileHandler}>
      <View style={styles.container}>
        <FastImage
          source={{
            uri: getProfileIcon(props.summonerIcon),
          }}
          style={styles.summonerIcon}
        />
        <EllipsisText
          text={props.summonerName}
          textStyle={styles.summonerName}
          maxLimit={11}
        />
        <Text style={styles.summonerRegion}>
          {props.summonerRegion.toUpperCase()}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

SummonerEntry.defaultProps = {
  summonerIcon: 0,
  summonerName: '',
  summonerRegion: '',
};

SummonerEntry.propTypes = {
  summonerIcon: PropTypes.number,
  summonerName: PropTypes.string,
  summonerRegion: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 5,
  },
  summonerIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: colors.lightGrey,
    marginBottom: 5,
  },
  summonerName: {
    color: colors.blue,
    fontSize: 12,
    fontFamily: fonts.regular,
  },
  summonerRegion: {
    color: colors.white,
    fontSize: 12,
    fontFamily: fonts.regular,
  },
});

export default SummonerEntry;
