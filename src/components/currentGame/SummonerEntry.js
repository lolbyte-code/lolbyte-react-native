import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {colors, fonts} from '../../Theme';

import {BLUE_TEAM} from '../../Constants';
import EllipsisText from '../common/EllipsisText';
import PropTypes from 'prop-types';
import React from 'react';
import {getChampionIcon} from '../../api/Url';
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
      region: props.summonerRegion,
    };
    dispatch(pushSearch(summoner));
    navigation.navigate(pages.results, summoner);
  };

  return (
    <TouchableWithoutFeedback onPress={navigateToProfileHandler}>
      <View style={styles.container}>
        <Image
          source={{
            uri: getChampionIcon(props.championId),
          }}
          style={
            props.summonerTeamId === BLUE_TEAM
              ? styles.blueChampionIcon
              : styles.redChampionIcon
          }
        />
        <EllipsisText
          text={props.summonerName}
          textStyle={
            props.selectedSummoner
              ? props.summonerTeamId === BLUE_TEAM
                ? styles.blueSummonerName
                : styles.redSummonerName
              : styles.notSelectedSummonerName
          }
          maxLimit={10}
        />
        <Text style={styles.summonerRank}>{props.summonerRank}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

SummonerEntry.defaultProps = {
  championId: 0,
  summonerName: '',
  summonerRegion: '',
  summonerRank: '',
  summonerTeamId: 100,
  selectedSummoner: false,
};

SummonerEntry.propTypes = {
  championId: PropTypes.number,
  summonerName: PropTypes.string,
  summonerRegion: PropTypes.string,
  summonerRank: PropTypes.string,
  summonerTeamId: PropTypes.number,
  selectedSummoner: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 2,
  },
  blueChampionIcon: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 2,
    borderColor: colors.blue,
  },
  redChampionIcon: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 2,
    borderColor: colors.red,
  },
  notSelectedSummonerName: {
    color: colors.white,
    fontSize: 12,
    fontFamily: fonts.regular,
  },
  blueSummonerName: {
    color: colors.blue,
    fontSize: 12,
    fontFamily: fonts.regular,
  },
  redSummonerName: {
    color: colors.red,
    fontSize: 12,
    fontFamily: fonts.regular,
  },
  summonerRank: {
    color: colors.white,
    fontSize: 12,
    fontFamily: fonts.regular,
  },
});

export default SummonerEntry;
