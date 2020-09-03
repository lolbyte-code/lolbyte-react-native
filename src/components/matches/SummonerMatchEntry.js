import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {colors, fonts} from '../../Theme';
import {getChampionIcon, getItemIcon} from '../../api/Url';

import EllipsisText from '../common/EllipsisText';
import PropTypes from 'prop-types';
import React from 'react';

const SummonerMatchEntry = (props) => {
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
          <View key={'f'} style={styles.badgeContainerFirstBlood}>
            <Text style={styles.firstBloodText}>{badge.small}</Text>
          </View>
        );
      case 'k':
        return (
          <View key={'k'} style={styles.badgeContainerBestKda}>
            <Text style={styles.bestKdaText}>{badge.small}</Text>
          </View>
        );
      case 'w':
        return (
          <View key={'w'} style={styles.badgeContainerMostWards}>
            <Text style={styles.mostWardsText}>{badge.small}</Text>
          </View>
        );
      case 'd':
        return (
          <View key={'d'} style={styles.badgeContainerMostDamage}>
            <Text style={styles.mostDamageText}>{badge.small}</Text>
          </View>
        );
      case 'g':
        return (
          <View key={'g'} style={styles.badgeContainerMostGold}>
            <Text style={styles.mostGoldText}>{badge.small}</Text>
          </View>
        );
      default:
        return (
          <View key={'m'} style={styles.badgeContainerMultiKill}>
            <Text style={styles.multiKillText}>{badge.small}</Text>
          </View>
        );
    }
  });
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        props.changeSummonerHandler({
          name: props.summonerName,
          match: props.matchId,
        })
      }>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image
            source={{uri: getChampionIcon(props.championId)}}
            style={props.win ? styles.championIconWin : styles.championIconLoss}
          />
          <View style={styles.spellsContainer}>{Spells}</View>
          <View style={styles.badgesContainer}>{Badges}</View>
        </View>
        <View style={styles.topRightContainer}>
          <View style={styles.topRightContainerBottom}>
            <EllipsisText
              maxLimit={11}
              text={props.summonerName}
              textStyle={
                props.win ? styles.summonerNameWin : styles.summonerNameLoss
              }
            />
            <Text style={styles.rank}>{props.rank}</Text>
          </View>
          <View style={styles.topRightContainerTop}>
            <Text style={styles.kda}>{props.kda} </Text>
            <Text style={styles.cs}>{props.cs}</Text>
          </View>
          <View style={styles.itemsAndTrinketsContainer}>
            <View style={styles.itemsContainer}>{Items}</View>
            <View style={styles.keystoneWardContainer}>
              <Image
                source={props.runeImages[props.keystone].uri}
                style={styles.keystone}
              />
              <Image
                source={{uri: getItemIcon(props.trinket)}}
                style={styles.keystone}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

SummonerMatchEntry.defaultProps = {
  championId: 0,
  kda: '',
  cs: '',
  summonerName: '',
  rank: '',
  items: [],
  badges: [],
  spells: [1, 1],
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
  keystone: 8005,
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
  changeSummonerHandler: () => {},
};

SummonerMatchEntry.propTypes = {
  championId: PropTypes.number,
  kda: PropTypes.string,
  cs: PropTypes.string,
  summonerName: PropTypes.string,
  rank: PropTypes.string,
  items: PropTypes.array,
  badges: PropTypes.array,
  spells: PropTypes.array,
  spellImages: PropTypes.object,
  keystone: PropTypes.number,
  runeImages: PropTypes.object,
  changeSummonerHandler: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 2,
  },
  leftContainer: {
    alignItems: 'center',
  },
  championIconWin: {
    borderWidth: 3,
    borderColor: colors.blue,
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  championIconLoss: {
    borderWidth: 3,
    borderColor: colors.red,
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  topRightContainerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  topRightContainerBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  kda: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fonts.bold,
  },
  cs: {
    fontSize: 11,
    color: colors.white,
    fontFamily: fonts.regular,
  },
  summonerNameWin: {
    fontSize: 12,
    color: colors.blue,
    fontFamily: fonts.bold,
    marginRight: 2,
  },
  summonerNameLoss: {
    fontSize: 12,
    color: colors.red,
    fontFamily: fonts.bold,
    marginRight: 2,
  },
  rank: {
    fontSize: 10,
    color: colors.white,
    fontFamily: fonts.regular,
  },
  item: {
    width: 22,
    height: 22,
    margin: 1,
  },
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 90,
    marginTop: 5,
    justifyContent: 'center',
  },
  itemsAndTrinketsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  keystone: {
    width: 20,
    height: 20,
  },
  spellsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 3,
  },
  spell: {
    width: 20,
    height: 20,
    margin: 2,
  },
  badgesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  badgeContainerMostWards: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 12,
    height: 12,
    backgroundColor: colors.mostWards,
    borderRadius: 6,
    margin: 1,
  },
  badgeContainerMostDamage: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 12,
    height: 12,
    backgroundColor: colors.mostDamage,
    borderRadius: 6,
    margin: 1,
  },
  badgeContainerMultiKill: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 12,
    height: 12,
    backgroundColor: colors.multiKill,
    borderRadius: 6,
    margin: 1,
  },
  badgeContainerBestKda: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 12,
    height: 12,
    backgroundColor: colors.bestKda,
    borderRadius: 6,
    margin: 1,
  },
  badgeContainerFirstBlood: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 12,
    height: 12,
    backgroundColor: colors.firstBlood,
    borderRadius: 6,
    margin: 1,
  },
  badgeContainerMostGold: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 12,
    height: 12,
    backgroundColor: colors.mostGold,
    borderRadius: 6,
    margin: 1,
  },
  mostDamageText: {
    fontSize: 10,
    color: colors.darkGrey,
    fontFamily: fonts.bold,
  },
  multiKillText: {
    fontSize: 10,
    color: colors.white,
    fontFamily: fonts.bold,
  },
  bestKdaText: {
    fontSize: 10,
    color: colors.white,
    fontFamily: fonts.bold,
  },
  firstBloodText: {
    fontSize: 10,
    color: colors.white,
    fontFamily: fonts.bold,
  },
  mostGoldText: {
    fontSize: 10,
    color: colors.white,
    fontFamily: fonts.bold,
  },
  mostWardsText: {
    fontSize: 10,
    color: colors.white,
    fontFamily: fonts.bold,
  },
});

export default SummonerMatchEntry;
