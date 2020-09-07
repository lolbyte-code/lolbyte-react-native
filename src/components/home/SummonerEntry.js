import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {colors, fonts} from 'LolByte/src/Theme';

import EllipsisText from 'LolByte/src/components/common/EllipsisText';
import PropTypes from 'prop-types';
import React from 'react';
import {getProfileIcon} from 'LolByte/src/api/Url';
import {pages} from 'LolByte/src/Constants';
import {pushSearch} from 'LolByte/src/data/actions/SearchActions';
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
