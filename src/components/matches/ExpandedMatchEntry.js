import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {colors, fonts} from '../../Theme';
import {getChampionIcon, getItemIcon, getSplash} from '../../api/Url';

import ExpandedArrowSvg from '../../svg/expanded.svg';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import React from 'react';
import SummonerMatches from './SummonerMatches';

const ExpandedMatchEntry = (props) => {
  let i = 0;
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
          <View key={'f'} style={styles.badgeContainerFirstBlood}>
            <Text style={styles.firstBloodText}>{badge.big}</Text>
          </View>
        );
      case 'k':
        return (
          <View key={'k'} style={styles.badgeContainerBestKda}>
            <Text style={styles.bestKdaText}>{badge.big}</Text>
          </View>
        );
      case 'w':
        return (
          <View key={'w'} style={styles.badgeContainerMostWards}>
            <Text style={styles.mostWardsText}>{badge.big}</Text>
          </View>
        );
      case 'd':
        return (
          <View key={'d'} style={styles.badgeContainerMostDamage}>
            <Text style={styles.mostDamageText}>{badge.big}</Text>
          </View>
        );
      case 'g':
        return (
          <View key={'g'} style={styles.badgeContainerMostGold}>
            <Text style={styles.mostGoldText}>{badge.big}</Text>
          </View>
        );
      default:
        return (
          <View key={'m'} style={styles.badgeContainerMultiKill}>
            <Text style={styles.multiKillText}>{badge.big}</Text>
          </View>
        );
    }
  });
  const BannedChamps1 = props.bannedChamps1.map((championId) => (
    <Image
      key={`bannedChamp_${i++}`}
      source={{uri: getChampionIcon(championId)}}
      style={styles.bannedChamp}
    />
  ));
  const BannedChamps2 = props.bannedChamps2.map((championId) => (
    <Image
      key={`bannedChamp_${i++}`}
      source={{uri: getChampionIcon(championId)}}
      style={styles.bannedChamp}
    />
  ));
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          props.changeSummonerHandler(props.originalSummonerName);
          props.handler(true);
        }}>
        <View>
          <View style={props.win ? styles.headerWin : styles.headerLoss}>
            <Text style={styles.winText}>
              {props.win ? props.winText : props.lossText}
            </Text>
            <Text style={styles.date}>{props.date}</Text>
            <Text style={styles.gameType}>{props.gameType}</Text>
            <Text style={styles.duration}>{props.duration}</Text>
            <ExpandedArrowSvg
              width={props.arrowWidth}
              height={props.arrowHeight}
            />
          </View>
          <ImageBackground
            source={{
              uri: getSplash(props.championId),
            }}
            style={styles.championSplash}>
            <LinearGradient
              start={props.gradientStart}
              end={props.gradientEnd}
              colors={props.gradientColors}>
              <View style={styles.body}>
                <View style={styles.firstRow}>
                  <View style={styles.itemsContainer}>{Items}</View>
                  <View style={styles.spellsContainer}>{Spells}</View>
                  <View style={styles.keystoneWardContainer}>
                    <Image
                      source={props.runeImages[props.keystone].uri}
                      style={styles.keystone}
                    />
                    <Image
                      source={props.runeImages[props.keystone].uri}
                      style={styles.keystone}
                    />
                  </View>
                  <View style={styles.matchDetailsContainer}>
                    <Text style={styles.kdaShort}>{props.kdaShort}</Text>
                    <Text style={styles.level}>{props.level}</Text>
                  </View>
                </View>
                <View style={styles.secondRow}>
                  <View style={styles.summonerContainer}>
                    <Text style={styles.summonerName}>
                      {props.summonerName}
                    </Text>
                    <Text style={styles.rank}>{props.rank}</Text>
                    <Text style={styles.championName}>
                      {props.championName}
                    </Text>
                  </View>
                  <View style={styles.matchDetailsContainer}>
                    <Text style={styles.damage}>{props.damage}</Text>
                    <Text style={styles.killParticipation}>
                      {props.killParticipation}
                    </Text>
                    <View style={styles.secondary}>
                      <Text style={styles.gold}>
                        {props.gold.replace(',', '')}{' '}
                      </Text>
                      <Text style={styles.kdaLong}>{props.kdaLong} </Text>
                      <Text style={styles.cs}>
                        {props.cs.replace(/,/g, '')}
                      </Text>
                    </View>
                    <View style={styles.badgesInnerContainer}>{Badges}</View>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.smallBars}>
        <View style={props.team1Win ? styles.smallBarWin : styles.smallBarLose}>
          <Text style={styles.smallWin}>{props.team1Win ? 'W' : 'L'}</Text>
          <Image source={props.towerImage.uri} style={styles.objective} />
          <Text style={styles.objectiveText}>{props.towers1}</Text>
          <Image source={props.dragonImage.uri} style={styles.objective} />
          <Text style={styles.objectiveText}>{props.dragons1}</Text>
          <Image source={props.baronImage.uri} style={styles.objective} />
          <Text style={styles.objectiveText}>{props.barons1}</Text>
          <Text style={styles.teamKda}>{props.team1Kda}</Text>
          <Text style={styles.teamGold}>
            {props.team1Gold.replace(',', '')}
          </Text>
        </View>
        <View style={props.team2Win ? styles.smallBarWin : styles.smallBarLose}>
          <Text style={styles.smallWin}>{props.team2Win ? 'W' : 'L'}</Text>
          <Image source={props.towerImage.uri} style={styles.objective} />
          <Text style={styles.objectiveText}>{props.towers2}</Text>
          <Image source={props.dragonImage.uri} style={styles.objective} />
          <Text style={styles.objectiveText}>{props.dragons2}</Text>
          <Image source={props.baronImage.uri} style={styles.objective} />
          <Text style={styles.objectiveText}>{props.barons2}</Text>
          <Text style={styles.teamKda}>{props.team2Kda}</Text>
          <Text style={styles.teamGold}>
            {props.team2Gold.replace(',', '')}
          </Text>
        </View>
      </View>
      <View style={BannedChamps1.length > 0 ? styles.banBars : styles.hide}>
        <View style={styles.banBarWin}>
          <Text style={styles.banText}>Bans:</Text>
          {BannedChamps1}
        </View>
        <View style={styles.banBarLose}>
          <Text style={styles.banText}>Bans:</Text>
          {BannedChamps2}
        </View>
      </View>
      <SummonerMatches
        allData={props.allData}
        changeSummonerHandler={props.changeSummonerHandler}
        matchId={props.matchId}
      />
    </View>
  );
};

ExpandedMatchEntry.defaultProps = {
  level: '',
  damage: '',
  killParticipation: '',
  summonerName: '',
  rank: '',
  gold: '',
  team1Gold: '',
  team2Gold: '',
  badges: [],
  bannedChamps1: [],
  bannedChamps2: [],
  barons1: 0,
  dragons1: 0,
  towers1: 0,
  barons2: 0,
  dragons2: 0,
  towers2: 0,
  allData: {},
  team1Win: false,
  team2Win: false,
  team1Kda: '',
  team2Kda: '',
  changeSummonerHandler: () => {},
  originalSummonerName: '',

  win: false,
  date: '',
  gameType: '',
  duration: '',
  arrowWidth: 12,
  arrowHeight: 12,
  items: [],
  spells: [],
  keystone: 0,
  championId: 0,
  gradientStart: {x: 0, y: 1},
  gradientEnd: {x: 0, y: 0},
  gradientColors: ['rgba(0,0,0,1)', 'transparent'],
  kdaShort: '',
  kdaLong: '',
  championName: '',
  cs: '',
  winText: 'Win',
  lossText: 'Loss',
  region: '',
  previousSummoners: [],
  baronImage: {
    uri: require('../../img/objectives/baron.png'),
  },
  towerImage: {
    uri: require('../../img/objectives/tower.png'),
  },
  dragonImage: {
    uri: require('../../img/objectives/dragon.png'),
  },
  spellImages: {
    0: {
      uri: require('../../img/spells/0.png'),
    },
    1: {
      uri: require('../../img/spells/1.png'),
    },
    3: {
      uri: require('../../img/spells/3.png'),
    },
    4: {
      uri: require('../../img/spells/4.png'),
    },
    6: {
      uri: require('../../img/spells/6.png'),
    },
    7: {
      uri: require('../../img/spells/7.png'),
    },
    11: {
      uri: require('../../img/spells/11.png'),
    },
    12: {
      uri: require('../../img/spells/12.png'),
    },
    13: {
      uri: require('../../img/spells/13.png'),
    },
    14: {
      uri: require('../../img/spells/14.png'),
    },
    21: {
      uri: require('../../img/spells/21.png'),
    },
    30: {
      uri: require('../../img/spells/30.png'),
    },
    31: {
      uri: require('../../img/spells/31.png'),
    },
    32: {
      uri: require('../../img/spells/32.png'),
    },
    33: {
      uri: require('../../img/spells/33.png'),
    },
    34: {
      uri: require('../../img/spells/34.png'),
    },
    35: {
      uri: require('../../img/spells/35.png'),
    },
    36: {
      uri: require('../../img/spells/36.png'),
    },
    39: {
      uri: require('../../img/spells/39.png'),
    },
    50: {
      uri: require('../../img/spells/50.png'),
    },
    51: {
      uri: require('../../img/spells/51.png'),
    },
    52: {
      uri: require('../../img/spells/52.png'),
    },
  },
  runeImages: {
    8005: {
      uri: require('../../img/runes/8005.png'),
    },
    8008: {
      uri: require('../../img/runes/8008.png'),
    },
    8010: {
      uri: require('../../img/runes/8010.png'),
    },
    8021: {
      uri: require('../../img/runes/8021.png'),
    },
    8112: {
      uri: require('../../img/runes/8112.png'),
    },
    8124: {
      uri: require('../../img/runes/8124.png'),
    },
    8128: {
      uri: require('../../img/runes/8128.png'),
    },
    8214: {
      uri: require('../../img/runes/8214.png'),
    },
    8229: {
      uri: require('../../img/runes/8229.png'),
    },
    8230: {
      uri: require('../../img/runes/8230.png'),
    },
    8351: {
      uri: require('../../img/runes/8351.png'),
    },
    8358: {
      uri: require('../../img/runes/8358.png'),
    },
    8360: {
      uri: require('../../img/runes/8360.png'),
    },
    8437: {
      uri: require('../../img/runes/8437.png'),
    },
    8439: {
      uri: require('../../img/runes/8439.png'),
    },
    8465: {
      uri: require('../../img/runes/8465.png'),
    },
    9923: {
      uri: require('../../img/runes/9923.png'),
    },
  },
};

ExpandedMatchEntry.propTypes = {
  level: PropTypes.string,
  damage: PropTypes.string,
  killParticipation: PropTypes.string,
  summonerName: PropTypes.string,
  rank: PropTypes.string,
  gold: PropTypes.string,
  team1Gold: PropTypes.string,
  team2Gold: PropTypes.string,
  badges: PropTypes.array,
  bannedChamps1: PropTypes.array,
  bannedChamps2: PropTypes.array,
  barons1: PropTypes.number,
  dragons1: PropTypes.number,
  towers1: PropTypes.number,
  barons2: PropTypes.number,
  dragons2: PropTypes.number,
  towers2: PropTypes.number,
  allData: PropTypes.object,
  team1Win: PropTypes.bool,
  team2Win: PropTypes.bool,
  team1Kda: PropTypes.string,
  team2Kda: PropTypes.string,
  changeSummonerHandler: PropTypes.func,
  originalSummonerName: PropTypes.string,

  win: PropTypes.bool,
  date: PropTypes.string,
  gameType: PropTypes.string,
  duration: PropTypes.string,
  arrowWidth: PropTypes.number,
  arrowHeight: PropTypes.number,
  items: PropTypes.array,
  spells: PropTypes.array,
  keystone: PropTypes.number,
  championId: PropTypes.number,
  gradientColors: PropTypes.array,
  kdaShort: PropTypes.string,
  kdaLong: PropTypes.string,
  championName: PropTypes.string,
  cs: PropTypes.string,
  winText: PropTypes.string,
  lossText: PropTypes.string,
  region: PropTypes.string,
  previousSummoners: PropTypes.array,
  spellImages: PropTypes.object,
  runeImages: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerWin: {
    flexDirection: 'row',
    backgroundColor: colors.blue,
    justifyContent: 'space-around',
    padding: 5,
    marginTop: 12,
    alignItems: 'center',
  },
  headerLoss: {
    flexDirection: 'row',
    backgroundColor: colors.red,
    justifyContent: 'space-around',
    padding: 5,
    marginTop: 12,
    alignItems: 'center',
  },
  winText: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 14,
  },
  date: {
    color: colors.white,
    fontFamily: fonts.regular,
    fontSize: 14,
  },
  gameType: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 14,
  },
  duration: {
    color: colors.white,
    fontFamily: fonts.regular,
    fontSize: 14,
  },
  championSplash: {},
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 2,
  },
  item: {
    width: 34,
    height: 34,
  },
  spellsContainer: {
    marginTop: 4,
    marginLeft: 2,
  },
  spell: {
    width: 17,
    height: 17,
    marginBottom: 3,
  },
  keystoneWardContainer: {
    marginTop: 2,
    marginLeft: 2,
  },
  keystone: {
    width: 17,
    height: 17,
    marginBottom: 3,
  },
  matchDetailsContainer: {
    justifyContent: 'flex-end',
    flex: 1,
    marginRight: 3,
  },
  firstRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  secondRow: {
    marginLeft: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondary: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
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
  damage: {
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
  teamKda: {
    fontSize: 13,
    color: colors.white,
    fontFamily: fonts.regular,
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
  teamGold: {
    fontSize: 13,
    color: colors.white,
    fontFamily: fonts.regular,
  },
  badgesInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  badgeContainerMostWards: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 57,
    height: 12,
    backgroundColor: colors.mostWards,
    borderRadius: 6,
    margin: 1,
  },
  badgeContainerMostDamage: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 68,
    height: 12,
    backgroundColor: colors.mostDamage,
    borderRadius: 6,
    margin: 1,
  },
  badgeContainerMultiKill: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 52,
    height: 12,
    backgroundColor: colors.multiKill,
    borderRadius: 6,
    margin: 1,
  },
  badgeContainerBestKda: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 59,
    height: 12,
    backgroundColor: colors.bestKda,
    borderRadius: 6,
    margin: 1,
  },
  badgeContainerFirstBlood: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 55,
    height: 12,
    backgroundColor: colors.firstBlood,
    borderRadius: 6,
    margin: 1,
  },
  badgeContainerMostGold: {
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
  smallWin: {
    marginRight: 5,
    fontSize: 13,
    color: colors.white,
    fontFamily: fonts.regular,
  },
  smallBars: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
  },
  banBars: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  smallBarWin: {
    flexDirection: 'row',
    backgroundColor: colors.blue,
    justifyContent: 'space-evenly',
    width: '50%',
    alignItems: 'center',
    padding: 3,
  },
  hide: {
    display: 'none',
  },
  smallBarLose: {
    flexDirection: 'row',
    backgroundColor: colors.red,
    justifyContent: 'space-evenly',
    width: '50%',
    alignItems: 'center',
    padding: 3,
  },
  banBarWin: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '50%',
    alignItems: 'center',
  },
  banBarLose: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '50%',
    alignItems: 'center',
  },
  banText: {
    color: colors.white,
    fontFamily: fonts.regular,
  },
  bannedChamp: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    borderRadius: 10,
  },
  objective: {
    width: 12,
    height: 12,
  },
  objectiveText: {
    fontSize: 11,
    color: colors.white,
    fontFamily: fonts.regular,
    right: 2,
  },
});

export default ExpandedMatchEntry;
