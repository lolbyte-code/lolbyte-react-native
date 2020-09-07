import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {colors, fonts} from 'LolByte/src/Theme';
import {getChampionIcon, getItemIcon} from 'LolByte/src/api/Url';

import EllipsisText from 'LolByte/src/components/common/EllipsisText';
import PropTypes from 'prop-types';
import React from 'react';

const ParticipantEntry = (props) => {
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
            <Text style={styles.firstBloodText}>{badge.small}</Text>
          </View>
        );
      case 'k':
        return (
          <View key={'k'} style={styles.bestKdaContainer}>
            <Text style={styles.bestKdaText}>{badge.small}</Text>
          </View>
        );
      case 'w':
        return (
          <View key={'w'} style={styles.mostWardsContainer}>
            <Text style={styles.mostWardsText}>{badge.small}</Text>
          </View>
        );
      case 'd':
        return (
          <View key={'d'} style={styles.mostDamageContainer}>
            <Text style={styles.mostDamageText}>{badge.small}</Text>
          </View>
        );
      case 'g':
        return (
          <View key={'g'} style={styles.mostGoldContainer}>
            <Text style={styles.mostGoldText}>{badge.small}</Text>
          </View>
        );
      default:
        return (
          <View key={'m'} style={styles.multiKillContainer}>
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
        <View>
          <Image
            source={{uri: getChampionIcon(props.championId)}}
            style={props.win ? styles.championIconWin : styles.championIconLoss}
          />
          <View style={styles.spellsContainer}>{Spells}</View>
          <View style={styles.badgesContainer}>{Badges}</View>
        </View>
        <View style={styles.topRightContainer}>
          <View style={styles.topRightLowerContainer}>
            <EllipsisText
              maxLimit={11}
              text={props.summonerName}
              textStyle={
                props.win ? styles.summonerNameWin : styles.summonerNameLoss
              }
            />
            <Text style={styles.rank}>{props.rank}</Text>
          </View>
          <View style={styles.topRightUpperContainer}>
            <Text style={styles.kda}>{props.kda} </Text>
            <Text style={styles.cs}>{props.cs}</Text>
          </View>
          <View style={styles.bottomRightContainer}>
            <View style={styles.itemsContainer}>{Items}</View>
            <View style={styles.keystoneWardContainer}>
              <Image
                source={props.keystoneImages[props.keystone].uri}
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

ParticipantEntry.defaultProps = {
  championId: 0,
  kda: '',
  cs: '',
  summonerName: '',
  rank: '',
  items: [],
  badges: [],
  spells: [],
  spellImages: {},
  keystone: 0,
  keystoneImages: {},
  changeSummonerHandler: () => {},
};

ParticipantEntry.propTypes = {
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
  keystoneImages: PropTypes.object,
  changeSummonerHandler: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 2,
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
  topRightUpperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  topRightLowerContainer: {
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
  bottomRightContainer: {
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
  mostWardsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 12,
    height: 12,
    backgroundColor: colors.mostWards,
    borderRadius: 6,
    margin: 1,
  },
  mostDamageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 12,
    height: 12,
    backgroundColor: colors.mostDamage,
    borderRadius: 6,
    margin: 1,
  },
  multiKillContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 12,
    height: 12,
    backgroundColor: colors.multiKill,
    borderRadius: 6,
    margin: 1,
  },
  bestKdaContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 12,
    height: 12,
    backgroundColor: colors.bestKda,
    borderRadius: 6,
    margin: 1,
  },
  firstBloodContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 12,
    height: 12,
    backgroundColor: colors.firstBlood,
    borderRadius: 6,
    margin: 1,
  },
  mostGoldContainer: {
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

export default ParticipantEntry;
