import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {colors, fonts} from '../../Theme';
import {getItemIcon, getSplash} from '../../api/Url';

import CollapsedArrowSvg from '../../svg/regionArrow.svg';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import React from 'react';

const CollapsedMatchEntry = (props) => {
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
  return (
    <TouchableWithoutFeedback onPress={() => props.handler(false)}>
      <View style={styles.container}>
        <View style={props.win ? styles.headerWin : styles.headerLoss}>
          <Text style={styles.winText}>
            {props.win ? props.winText : props.lossText}
          </Text>
          <Text style={styles.date}>{props.date}</Text>
          <Text style={styles.gameType}>{props.gameType}</Text>
          <Text style={styles.duration}>{props.duration}</Text>
          <CollapsedArrowSvg
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
              <View style={styles.itemsContainer}>{Items}</View>
              <View style={styles.spellsContainer}>{Spells}</View>
              <Image
                source={props.runeImages[props.keystone].uri}
                style={styles.keystone}
              />
              <View style={styles.matchDetailsContainer}>
                <Text style={styles.kdaShort}>{props.kdaShort}</Text>
                <View style={styles.secondary}>
                  <Text style={styles.championName}>{props.championName} </Text>
                  <Text style={styles.kdaLong}>{props.kdaLong} </Text>
                  <Text style={styles.cs}>{props.cs.replace(/,/g, '')}</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

CollapsedMatchEntry.defaultProps = {
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

CollapsedMatchEntry.propTypes = {
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
  body: {
    flexDirection: 'row',
  },
  championSplash: {},
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 120,
    marginTop: 3,
    justifyContent: 'center',
  },
  item: {
    width: 34,
    height: 34,
  },
  spellsContainer: {
    marginTop: 5,
    marginLeft: 2,
  },
  spell: {
    width: 30,
    height: 30,
    marginBottom: 3,
  },
  keystone: {
    width: 30,
    height: 30,
    marginTop: 20,
  },
  matchDetailsContainer: {
    marginTop: 45,
    justifyContent: 'flex-end',
    flex: 1,
    marginRight: 15,
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

export default CollapsedMatchEntry;
