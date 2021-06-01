import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {colors, fonts} from '@app/Theme';
import {getChampionIcon, getItemIcon} from '@app/api/Url';
import {useDispatch, useSelector} from 'react-redux';

import PropTypes from 'prop-types';
import React from 'react';
import {pages} from '@app/Constants';
import {pushSearch} from '@app/data/actions/SearchActions';
import {resetProfileData} from '@app/data/actions/ApiActions';
import {useNavigation} from '@react-navigation/native';

const ExpandedMatchSummary = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const searches = useSelector((state) => state.searches);

  const navigateToProfileHandler = () => {
    resetProfileData(dispatch);
    const summoner = {
      summonerName: props.summonerName,
      summonerRegion: searches[0].summonerRegion,
      refreshed: true,
    };
    dispatch(pushSearch(summoner));
    navigation.navigate(pages.results, summoner);
  };

  var i = 0;
  const Items = props.items.map((item) => (
    <Image
      key={`item_${i++}`}
      source={{uri: getItemIcon(item.id)}}
      style={styles.item}
    />
  ));
  const Spells = props.spells.map((spell) => (
    <Image
      key={`spell_${i++}`}
      source={props.spellImages[spell].uri}
      style={styles.spell}
    />
  ));
  const Badges = props.badges.map((badge) => {
    switch (badge) {
      case 'FIRST_BLOOD':
        return (
          <View key={'f'} style={styles.firstBloodContainer}>
            <Text style={styles.firstBloodText}>first blood</Text>
          </View>
        );
      case 'HIGHEST_KDA':
        return (
          <View key={'k'} style={styles.bestKdaContainer}>
            <Text style={styles.bestKdaText}>highest kda</Text>
          </View>
        );
      case 'MOST_WARDS':
        return (
          <View key={'w'} style={styles.mostWardsContainer}>
            <Text style={styles.mostWardsText}>most wards</Text>
          </View>
        );
      case 'MOST_DAMAGE':
        return (
          <View key={'d'} style={styles.mostDamageContainer}>
            <Text style={styles.mostDamageText}>most damage</Text>
          </View>
        );
      case 'MOST_GOLD':
        return (
          <View key={'g'} style={styles.mostGoldContainer}>
            <Text style={styles.mostGoldText}>most gold</Text>
          </View>
        );
      case 'PENTA_KILL':
        return (
          <View key={'p'} style={styles.multiKillContainer}>
            <Text style={styles.multiKillText}>penta kill</Text>
          </View>
        );
      case 'QUADRA_KILL':
        return (
          <View key={'q'} style={styles.multiKillContainer}>
            <Text style={styles.multiKillText}>quadra kill</Text>
          </View>
        );
      default:
        return (
          <View key={'t'} style={styles.multiKillContainer}>
            <Text style={styles.multiKillText}>triple kill</Text>
          </View>
        );
    }
  });
  return (
    <ImageBackground
      source={props.win ? props.backgroundWin : props.backgroundLoss}
      style={styles.background}>
      <View style={styles.topContainer}>
        <View style={styles.topLeftContainer}>
          <TouchableWithoutFeedback onPress={navigateToProfileHandler}>
            <Image
              source={{uri: getChampionIcon(props.championId)}}
              style={
                props.win
                  ? styles.championPortraitWin
                  : styles.championPortraitLoss
              }
            />
          </TouchableWithoutFeedback>
          <View
            style={
              props.win
                ? styles.keystoneContainerWin
                : styles.keystoneContainerLoss
            }>
            <Image
              source={props.keystoneImages[props.keystone].uri}
              style={styles.keystone}
            />
          </View>
          <View style={styles.matchDetailsContainer}>
            <Text style={styles.championName}>{props.championName}</Text>
            <Text style={styles.kdaShort}>{props.kdaShort}</Text>
            <View style={styles.matchDetailsInnerContainer}>
              <Text style={styles.kdaLong}>{props.kdaLong} </Text>
              <Text style={styles.cs}>{`${props.cs} CS`} </Text>
              <Text style={styles.gold}>{`${(props.gold / 1000).toFixed(
                1,
              )}k Gold`}</Text>
            </View>
          </View>
        </View>
        <View style={styles.topRightContainer}>
          <View style={styles.itemsContainer}>{Items}</View>
          <View style={styles.spellsKeystoneTrinket}>
            {Spells}
            <Image
              source={{uri: getItemIcon(props.trinket)}}
              style={styles.trinket}
            />
            <Text style={styles.level}>{`Lvl ${props.level}`}</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableWithoutFeedback onPress={navigateToProfileHandler}>
          <View style={styles.summonerContainer}>
            <Text style={styles.summonerName}>{props.summonerName}</Text>
            <Text style={styles.rank}>{props.rank}</Text>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.rightContainer}>
          <Text style={styles.damageContribution}>
            {`Damage Contribution: ${props.damageContribution}%`}
          </Text>
          <Text style={styles.killParticipation}>
            {`Kill Participation: ${props.killParticipation}%`}
          </Text>
          <View style={styles.badgesInnerContainer}>{Badges}</View>
        </View>
      </View>
    </ImageBackground>
  );
};

ExpandedMatchSummary.defaultProps = {
  items: [],
  spells: [],
  keystone: 0,
  trinket: 0,
  kdaShort: '',
  level: 0,
  summonerName: '',
  rank: '',
  championName: '',
  damageContribution: 0,
  killParticipation: 0,
  gold: 0,
  kdaLong: '',
  cs: 0,
  badges: [],
  championId: 0,
  spellImages: {},
  keystoneImages: {},
  win: false,
  backgroundWin: require('@app/assets/img/backgrounds/matchSummaryVictory.png'),
  backgroundLoss: require('@app/assets/img/backgrounds/matchSummaryDefeat.png'),
};

ExpandedMatchSummary.propTypes = {
  items: PropTypes.array,
  spells: PropTypes.array,
  keystone: PropTypes.number,
  trinket: PropTypes.number,
  level: PropTypes.number,
  summonerName: PropTypes.string,
  rank: PropTypes.string,
  championName: PropTypes.string,
  damageContribution: PropTypes.number,
  killParticipation: PropTypes.number,
  gold: PropTypes.number,
  kdaLong: PropTypes.string,
  cs: PropTypes.number,
  badges: PropTypes.array,
  championId: PropTypes.number,
  spellImages: PropTypes.object,
  keystoneImages: PropTypes.object,
  win: PropTypes.bool,
  backgroundWin: PropTypes.node,
  backgroundLoss: PropTypes.node,
};

const styles = StyleSheet.create({
  background: {
    resizeMode: 'stretch',
  },
  topContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 10,
  },
  topLeftContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  matchDetailsContainer: {
    alignItems: 'flex-start',
    marginLeft: -12,
  },
  matchDetailsInnerContainer: {
    flexDirection: 'row',
  },
  championPortraitWin: {
    borderColor: colors.blue,
    borderWidth: 3,
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  championPortraitLoss: {
    borderColor: colors.red,
    borderWidth: 2,
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  topRightContainer: {
    alignItems: 'flex-end',
    marginRight: 8,
    marginTop: 5,
  },
  summonerContainer: {
    marginLeft: 5,
    marginTop: 3,
  },
  spellsKeystoneTrinket: {
    flexDirection: 'row',
    marginTop: 5,
  },
  itemsContainer: {
    flexDirection: 'row',
  },
  item: {
    width: 29,
    height: 29,
  },
  spell: {
    width: 17,
    height: 17,
  },
  keystoneContainerWin: {
    right: 20,
    top: 25,
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.blue,
    backgroundColor: colors.background,
  },
  keystoneContainerLoss: {
    right: 20,
    top: 25,
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.red,
    backgroundColor: colors.background,
  },
  keystone: {
    width: 20,
    height: 20,
  },
  trinket: {
    width: 17,
    height: 17,
  },
  rightContainer: {
    flex: 1,
    marginRight: 3,
  },
  bottomContainer: {
    marginLeft: 5,
    flexDirection: 'row',
    marginRight: 5,
    marginBottom: 5,
  },
  level: {
    textAlign: 'right',
    color: colors.white,
    fontFamily: fonts.light,
    marginLeft: 5,
    fontSize: 12,
  },
  damageContribution: {
    textAlign: 'right',
    color: colors.white,
    fontFamily: fonts.regular,
  },
  killParticipation: {
    textAlign: 'right',
    color: colors.white,
    fontFamily: fonts.regulr,
  },
  championName: {
    color: colors.white,
    fontFamily: fonts.regular,
  },
  kdaShort: {
    textAlign: 'right',
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 22,
  },
  kdaLong: {
    color: colors.lightGrey,
    fontFamily: fonts.regular,
    fontSize: 13,
  },
  cs: {
    color: colors.lightGrey,
    fontFamily: fonts.bold,
    fontSize: 13,
  },
  summonerName: {
    fontSize: 20,
    color: colors.white,
    fontFamily: fonts.bold,
  },
  rank: {
    color: colors.white,
    fontFamily: fonts.bold,
  },
  gold: {
    color: colors.lightGrey,
    fontFamily: fonts.regular,
    fontSize: 13,
  },
  badgesInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  mostWardsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 57,
    height: 12,
    backgroundColor: colors.mostWards,
    borderRadius: 6,
    margin: 1,
  },
  mostDamageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 68,
    height: 12,
    backgroundColor: colors.mostDamage,
    borderRadius: 6,
    margin: 1,
  },
  multiKillContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 52,
    height: 12,
    backgroundColor: colors.multiKill,
    borderRadius: 6,
    margin: 1,
  },
  bestKdaContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 59,
    height: 12,
    backgroundColor: colors.bestKda,
    borderRadius: 6,
    margin: 1,
  },
  firstBloodContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 55,
    height: 12,
    backgroundColor: colors.firstBlood,
    borderRadius: 6,
    margin: 1,
  },
  mostGoldContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 52,
    height: 12,
    backgroundColor: colors.mostGold,
    borderRadius: 6,
    margin: 1,
  },
  mostDamageText: {
    fontSize: 10,
    color: colors.black,
    fontFamily: fonts.bold,
  },
  multiKillText: {
    fontSize: 10,
    color: colors.black,
    fontFamily: fonts.bold,
  },
  bestKdaText: {
    fontSize: 10,
    color: colors.black,
    fontFamily: fonts.bold,
  },
  firstBloodText: {
    fontSize: 10,
    color: colors.black,
    fontFamily: fonts.bold,
  },
  mostGoldText: {
    fontSize: 10,
    color: colors.black,
    fontFamily: fonts.bold,
  },
  mostWardsText: {
    fontSize: 10,
    color: colors.black,
    fontFamily: fonts.bold,
  },
});

export default ExpandedMatchSummary;
