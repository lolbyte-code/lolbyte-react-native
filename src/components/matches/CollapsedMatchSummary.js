import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../Theme';
import {getItemIcon, getSplash} from '../../api/Url';

import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import React from 'react';

const CollapsedMatchSummary = (props) => {
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
        <View style={styles.container}>
          <View style={styles.equippedContainer}>
            <View style={styles.itemsContainer}>{Items}</View>
            <View style={styles.spellsContainer}>{Spells}</View>
            <Image
              source={props.keystoneImages[props.keystone].uri}
              style={styles.keystone}
            />
          </View>
          <View style={styles.bottomRightContainer}>
            <Text style={styles.kdaShort}>{props.kdaShort}</Text>
            <View style={styles.matchDetailsInnerContainer}>
              <Text style={styles.championName}>{props.championName} </Text>
              <Text style={styles.kdaLong}>{props.kdaLong} </Text>
              <Text style={styles.cs}>{props.cs.replace(/,/g, '')}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
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
  cs: '',
  gradientStart: {x: 0, y: 1},
  gradientEnd: {x: 0, y: 0},
  gradientColors: ['rgba(0,0,0,1)', 'transparent'],
  spellImages: {},
  keystoneImages: {},
};

CollapsedMatchSummary.propTypes = {
  items: PropTypes.array,
  spells: PropTypes.array,
  keystone: PropTypes.number,
  championId: PropTypes.number,
  kdaShort: PropTypes.string,
  kdaLong: PropTypes.string,
  championName: PropTypes.string,
  cs: PropTypes.string,
  gradientStart: PropTypes.object,
  gradientEnd: PropTypes.object,
  gradientColors: PropTypes.array,
  spellImages: PropTypes.object,
  keystoneImages: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  equippedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  championSplash: {
    width: '100%',
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
  keystone: {
    width: 30,
    height: 30,
  },
  bottomRightContainer: {
    marginTop: 45,
    justifyContent: 'flex-end',
    flex: 1,
    marginRight: 11,
  },
  matchDetailsInnerContainer: {
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
  championName: {
    color: colors.white,
    fontFamily: fonts.bold,
  },
  kdaLong: {
    color: colors.white,
    fontFamily: fonts.regular,
  },
  cs: {
    color: colors.white,
    fontFamily: fonts.bold,
  },
});

export default CollapsedMatchSummary;
