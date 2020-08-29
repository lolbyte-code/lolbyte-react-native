import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {
  addToStorage,
  hasInStorage,
  removeFromStorage,
} from '../../utils/Storage';

import FavoriteSelectedSvg from '../../svg/favoriteSelected.svg';
import FavoriteUnselectedSvg from '../../svg/favoriteUnselected.svg';
import PropTypes from 'prop-types';
import React from 'react';

const SummonerDetails = (props) => {
  const [selected, setSelected] = React.useState(false);
  React.useEffect(() => {
    hasInStorage(
      '@favoriteSummoners',
      (value) => value.summonerName === props.name,
    );
  }, [props.name]);
  return (
    <View style={styles.container}>
      <View style={styles.name}>
        <Text style={styles.summonerName}>{props.name}</Text>
        <TouchableWithoutFeedback
          onPress={() => {
            if (selected) {
              removeFromStorage(
                '@favoriteSummoners',
                (value) => value.summonerName === props.name,
              );
              setSelected(false);
            } else {
              var summoner = {
                summonerName: props.name,
                summonerIcon: props.summonerIcon,
                summonerRegion: props.summonerRegion,
              };
              addToStorage('@favoriteSummoners', summoner);
              setSelected(true);
            }
          }}>
          {selected ? (
            <FavoriteSelectedSvg
              height={props.favoriteSvgHeight}
              width={props.favoriteSvgWidth}
              style={styles.favoriteSvg}
            />
          ) : (
            <FavoriteUnselectedSvg
              height={props.favoriteSvgHeight}
              width={props.favoriteSvgWidth}
              style={styles.favoriteSvg}
            />
          )}
        </TouchableWithoutFeedback>
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
