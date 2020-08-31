import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {BLUE_TEAM} from '../CurrentGame';
import EllipsisText from '../common/EllipsisText';
import PropTypes from 'prop-types';
import React from 'react';
import {colors} from '../common/Theme';
import {getChampionIcon} from '../../api/Url';
import {useNavigation} from '@react-navigation/native';

const SummonerEntry = (props) => {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate('Profile', {
          summonerName: props.summonerName,
          region: props.summonerRegion,
        })
      }>
      <View style={styles.container}>
        <Image
          source={{
            // TODO: could default icon here (add prop)
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
    marginTop: 10,
    alignItems: 'center',
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
  },
  blueSummonerName: {
    color: colors.blue,
    fontSize: 12,
  },
  redSummonerName: {
    color: colors.red,
    fontSize: 12,
  },
  summonerRank: {
    color: colors.white,
    fontSize: 12,
  },
});

export default SummonerEntry;
