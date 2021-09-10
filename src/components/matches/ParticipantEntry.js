import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {colors, fonts} from '@app/Theme';
import {getChampionIcon, getItemIcon} from '@app/api/Url';

import EllipsisText from '@app/components/common/EllipsisText';
import PropTypes from 'prop-types';
import React from 'react';

const ParticipantEntry = (props) => {
  var i = 0;
  const Items = props.items.map((item) => (
    <Image
      key={`item_${i++}`}
      source={{uri: getItemIcon(item.id), cache: 'force-cache'}}
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
            <Text style={styles.firstBloodText}>f</Text>
          </View>
        );
      case 'HIGHEST_KDA':
        return (
          <View key={'k'} style={styles.bestKdaContainer}>
            <Text style={styles.bestKdaText}>k</Text>
          </View>
        );
      case 'MOST_WARDS':
        return (
          <View key={'w'} style={styles.mostWardsContainer}>
            <Text style={styles.mostWardsText}>w</Text>
          </View>
        );
      case 'MOST_DAMAGE':
        return (
          <View key={'d'} style={styles.mostDamageContainer}>
            <Text style={styles.mostDamageText}>d</Text>
          </View>
        );
      case 'MOST_GOLD':
        return (
          <View key={'g'} style={styles.mostGoldContainer}>
            <Text style={styles.mostGoldText}>g</Text>
          </View>
        );
      case 'PENTA_KILL':
        return (
          <View key={'p'} style={styles.multiKillContainer}>
            <Text style={styles.multiKillText}>5</Text>
          </View>
        );
      case 'QUADRA_KILL':
        return (
          <View key={'q'} style={styles.multiKillContainer}>
            <Text style={styles.multiKillText}>4</Text>
          </View>
        );
      default:
        return (
          <View key={'t'} style={styles.multiKillContainer}>
            <Text style={styles.multiKillText}>3</Text>
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
            source={{
              uri: getChampionIcon(props.championId),
              cache: 'force-cache',
            }}
            style={
              props.selected
                ? styles.championIconSelected
                : props.win
                ? styles.championIconWin
                : styles.championIconLoss
            }
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
            <Text style={styles.cs}>{`${props.cs} CS`}</Text>
          </View>
          <View style={styles.bottomRightContainer}>
            <View style={styles.itemsContainer}>{Items}</View>
            <View style={styles.keystoneWardContainer}>
              <Image
                source={props.keystoneImages[props.keystone].uri}
                style={styles.keystone}
              />
              <Image
                source={{uri: getItemIcon(props.trinket), cache: 'force-cache'}}
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
  cs: 0,
  summonerName: '',
  rank: '',
  items: [],
  badges: [],
  spells: [],
  spellImages: {},
  keystone: 0,
  keystoneImages: {},
  changeSummonerHandler: () => {},
  selected: false,
};

ParticipantEntry.propTypes = {
  championId: PropTypes.number,
  kda: PropTypes.string,
  cs: PropTypes.number,
  summonerName: PropTypes.string,
  rank: PropTypes.string,
  items: PropTypes.array,
  badges: PropTypes.array,
  spells: PropTypes.array,
  spellImages: PropTypes.object,
  keystone: PropTypes.number,
  keystoneImages: PropTypes.object,
  changeSummonerHandler: PropTypes.func,
  selected: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
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
  championIconSelected: {
    borderWidth: 3,
    borderColor: colors.white,
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
    width: 25,
    height: 25,
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
    width: 15,
    height: 15,
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
