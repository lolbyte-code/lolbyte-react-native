import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {colors, fonts} from '../../Theme';

import EllipsisText from '../common/EllipsisText';
import PropTypes from 'prop-types';
import React from 'react';
import {getProfileIcon} from '../../api/Url';
import {pages} from '../../Constants';
import {pushSearch} from '../../data/SearchActions';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const SummonerEntry = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const navigateToProfileHandler = () => {
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
        <Image
          source={{
            uri: getProfileIcon(props.summonerIcon),
          }}
          style={styles.summonerIcon}
        />
        <EllipsisText
          text={props.summonerName}
          textStyle={styles.summonerName}
          maxLimit={13}
        />
        <Text style={styles.summonerRegion}>
          {props.summonerRegion.toUpperCase()}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

SummonerEntry.defaultProps = {
  summonerIcon: '',
  summonerName: '',
  summonerRegion: '',
};

SummonerEntry.propTypes = {
  summonerIcon: PropTypes.string,
  summonerName: PropTypes.string,
  summonerRegion: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    alignItems: 'center',
  },
  summonerIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: colors.lightGrey,
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
