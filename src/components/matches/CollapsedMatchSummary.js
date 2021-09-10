import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '@app/Theme';
import {getChampionIcon, getItemIcon} from '@app/api/Url';

import PropTypes from 'prop-types';
import React from 'react';

const CollapsedMatchSummary = (props) => {
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
  return (
    <ImageBackground
      source={props.win ? props.backgroundWin : props.backgroundLoss}
      style={styles.background}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image
            source={{
              uri: getChampionIcon(props.championId),
              cache: 'force-cache',
            }}
            style={
              props.win
                ? styles.championPortraitWin
                : styles.championPortraitLoss
            }
          />
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
            <Text style={styles.kdaShort}>{props.kdaShort}</Text>
            <View style={styles.matchDetailsInnerContainer}>
              <Text style={styles.kdaLong}>{props.kdaLong} </Text>
              <Text style={styles.cs}>{props.cs} CS</Text>
            </View>
          </View>
        </View>
        <View style={styles.equippedContainer}>
          <View style={styles.spellsContainer}>{Spells}</View>
          <View style={styles.itemsContainer}>{Items}</View>
        </View>
      </View>
    </ImageBackground>
  );
};

CollapsedMatchSummary.defaultProps = {
  items: [],
  spells: [],
  keystone: 0,
  championId: 0,
  kdaShort: '',
  kdaLong: '',
  championName: '',
  cs: 0,
  spellImages: {},
  keystoneImages: {},
  win: false,
  backgroundWin: require('@app/assets/img/backgrounds/matchSummaryVictory.png'),
  backgroundLoss: require('@app/assets/img/backgrounds/matchSummaryDefeat.png'),
};

CollapsedMatchSummary.propTypes = {
  items: PropTypes.array,
  spells: PropTypes.array,
  keystone: PropTypes.number,
  championId: PropTypes.number,
  kdaShort: PropTypes.string,
  kdaLong: PropTypes.string,
  championName: PropTypes.string,
  cs: PropTypes.number,
  spellImages: PropTypes.object,
  keystoneImages: PropTypes.object,
  win: PropTypes.bool,
  backgroundWin: PropTypes.node,
  backgroundLoss: PropTypes.node,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  equippedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  background: {
    resizeMode: 'stretch',
  },
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 114,
  },
  item: {
    width: 34,
    height: 34,
    margin: 2,
  },
  spell: {
    width: 25,
    height: 25,
    margin: 2,
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
  championPortraitWin: {
    borderColor: colors.blue,
    borderWidth: 2,
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
  leftContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    marginTop: 10,
    marginLeft: 10,
  },
  matchDetailsContainer: {
    alignItems: 'flex-start',
    marginLeft: 8,
  },
  matchDetailsInnerContainer: {
    flexDirection: 'row',
  },
  kdaShort: {
    textAlign: 'right',
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 22,
  },
  championName: {
    color: colors.white,
    fontFamily: fonts.bold,
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
});

export default CollapsedMatchSummary;
