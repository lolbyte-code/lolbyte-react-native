import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {colors, fonts} from '@app/Theme';

import {BLUE_TEAM} from '@app/Constants';
import EllipsisText from '@app/components/common/EllipsisText';
import PropTypes from 'prop-types';
import React from 'react';
import {getChampionIcon} from '@app/api/Url';
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
        <Image
          source={{
            uri: getChampionIcon(props.championId),
            cache: 'force-cache',
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
        />
        <Text style={styles.summonerRank}>{props.summonerRank}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

SummonerEntry.defaultProps = {
  championId: 0,
  summonerName: '',
  summonerRank: '',
  summonerTeamId: 0,
  selectedSummoner: false,
  summonerRegion: '',
};

SummonerEntry.propTypes = {
  championId: PropTypes.number,
  summonerName: PropTypes.string,
  summonerRank: PropTypes.string,
  summonerTeamId: PropTypes.number,
  selectedSummoner: PropTypes.bool,
  summonerRegion: PropTypes.string,
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
    fontSize: 10,
    fontFamily: fonts.regular,
  },
});

export default SummonerEntry;
