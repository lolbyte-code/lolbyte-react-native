import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FavoriteSvg from '../../svg/favorite.svg';
import PropTypes from 'prop-types';

const SummonerDetails = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.name}>
        <Text style={styles.summonerName}>{props.name}</Text>
        <FavoriteSvg
          height={props.favoriteSvgHeight}
          width={props.favoriteSvgWidth}
          style={styles.favoriteSvg}
        />
      </View>
      <Text style={styles.summonerLevel}>Level {props.level}</Text>
    </View>
  );
};

SummonerDetails.defaultProps = {
  name: 'unknown',
  level: 0,
  favoriteSvgHeight: 40,
  favoriteSvgWidth: 40,
};

SummonerDetails.propTypes = {
  name: PropTypes.string,
  level: PropTypes.number,
  favoriteSvgHeight: PropTypes.number,
  favoriteSvgWidth: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '10%',
  },
  name: {
    flexDirection: 'row',
  },
  summonerName: {
    color: 'white',
    fontSize: 35,
  },
  summonerLevel: {
    color: 'white',
    fontSize: 20,
  },
  favoriteSvg: {
    marginLeft: 10,
  },
});

export default SummonerDetails;
