import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {colors, fonts} from 'LolByte/src/Theme';
import {getItemIcon, getSplash} from 'LolByte/src/api/Url';
import {useDispatch, useSelector} from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import React from 'react';
import {pages} from 'LolByte/src/Constants';
import {pushSearch} from 'LolByte/src/data/actions/SearchActions';
import {useNavigation} from '@react-navigation/native';

const ExpandedMatchSummary = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const searches = useSelector((state) => state.searches);

  const navigateToProfileHandler = () => {
    const summoner = {
      summonerName: props.summonerName,
      summonerRegion: searches[0].summonerRegion,
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
    switch (badge.small) {
      case 'f':
        return (
          <View key={'f'} style={styles.firstBloodContainer}>
            <Text style={styles.firstBloodText}>{badge.big}</Text>
          </View>
        );
      case 'k':
        return (
          <View key={'k'} style={styles.bestKdaContainer}>
            <Text style={styles.bestKdaText}>{badge.big}</Text>
          </View>
        );
      case 'w':
        return (
          <View key={'w'} style={styles.mostWardsContainer}>
            <Text style={styles.mostWardsText}>{badge.big}</Text>
          </View>
        );
      case 'd':
        return (
          <View key={'d'} style={styles.mostDamageContainer}>
            <Text style={styles.mostDamageText}>{badge.big}</Text>
          </View>
        );
      case 'g':
        return (
          <View key={'g'} style={styles.mostGoldContainer}>
            <Text style={styles.mostGoldText}>{badge.big}</Text>
          </View>
        );
      default:
        return (
          <View key={'m'} style={styles.multiKillContainer}>
            <Text style={styles.multiKillText}>{badge.big}</Text>
          </View>
        );
    }
  });
  return (
    <ImageBackground
      source={{
        uri: getSplash(props.championId),
      }}
      style={styles.championSplash}>
      <LinearGradient
        start={props.gradientStart}
        end={props.gradientEnd}
        colors={props.gradientColors}>
        <View style={styles.topContainer}>
          <View style={styles.itemsContainer}>{Items}</View>
          <View>{Spells}</View>
          <View>
            <Image
              source={props.keystoneImages[props.keystone].uri}
              style={styles.keystone}
            />
            <Image
              source={{uri: getItemIcon(props.trinket)}}
              style={styles.keystone}
            />
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.kdaShort}>{props.kdaShort}</Text>
            <Text style={styles.level}>{props.level}</Text>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <TouchableWithoutFeedback onPress={navigateToProfileHandler}>
            <View style={styles.summonerContainer}>
              <Text style={styles.summonerName}>{props.summonerName}</Text>
              <Text style={styles.rank}>{props.rank}</Text>
              <Text style={styles.championName}>{props.championName}</Text>
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.rightContainer}>
            <Text style={styles.damageContribution}>
              {props.damageContribution}
            </Text>
            <Text style={styles.killParticipation}>
              {props.killParticipation}
            </Text>
            <View style={styles.rightInnerContainer}>
              <Text style={styles.gold}>{props.gold.replace(',', '')} </Text>
              <Text style={styles.kdaLong}>{props.kdaLong} </Text>
              <Text style={styles.cs}>{props.cs.replace(/,/g, '')}</Text>
            </View>
            <View style={styles.badgesInnerContainer}>{Badges}</View>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

ExpandedMatchSummary.defaultProps = {
  items: [],
  spells: [],
  keystone: 0,
  trinket: 0,
  kdaShort: '',
  level: '',
  summonerName: '',
  rank: '',
  championName: '',
  damageContribution: '',
  killParticipation: '',
  gold: '',
  kdaLong: '',
  cs: '',
  badges: [],
  championId: 0,
  gradientStart: {x: 0, y: 1},
  gradientEnd: {x: 0, y: 0},
  gradientColors: ['rgba(0,0,0,1)', 'transparent'],
  spellImages: {},
  keystoneImages: {},
};

ExpandedMatchSummary.propTypes = {
  items: PropTypes.array,
  spells: PropTypes.array,
  keystone: PropTypes.number,
  trinket: PropTypes.number,
  level: PropTypes.string,
  summonerName: PropTypes.string,
  rank: PropTypes.string,
  championName: PropTypes.string,
  damageContribution: PropTypes.string,
  killParticipation: PropTypes.string,
  gold: PropTypes.string,
  kdaLong: PropTypes.string,
  cs: PropTypes.string,
  badges: PropTypes.array,
  championId: PropTypes.number,
  gradientStart: PropTypes.object,
  gradientEnd: PropTypes.object,
  gradientColors: PropTypes.array,
  spellImages: PropTypes.object,
  keystoneImages: PropTypes.object,
};

const styles = StyleSheet.create({
  championSplash: {
    width: '100%',
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
    marginLeft: 5,
  },
  itemsContainer: {
    flexDirection: 'row',
  },
  item: {
    width: 34,
    height: 34,
  },
  spell: {
    width: 17,
    height: 17,
  },
  keystone: {
    width: 17,
    height: 17,
  },
  rightContainer: {
    flex: 1,
    marginRight: 3,
  },
  rightInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  bottomContainer: {
    marginLeft: 5,
    flexDirection: 'row',
    marginRight: 5,
  },
  kdaShort: {
    textAlign: 'right',
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 25,
  },
  level: {
    textAlign: 'right',
    color: colors.white,
    fontFamily: fonts.light,
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
  kdaLong: {
    fontSize: 13,
    color: colors.white,
    fontFamily: fonts.light,
  },
  cs: {
    color: colors.white,
    fontFamily: fonts.regular,
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
    color: colors.white,
    fontFamily: fonts.regular,
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
