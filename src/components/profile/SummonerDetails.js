import React from 'react';
import {StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';
import FavoriteUnselectedSvg from '../../svg/favoriteUnselected.svg';
import FavoriteSelectedSvg from '../../svg/favoriteSelected.svg';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';

const setFavoriteSummoners = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@favoriteSummoners', jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const getFavoriteSummoners = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@favoriteSummoners');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

const SummonerDetails = (props) => {
  const [selected, setSelected] = React.useState(false);
  React.useEffect(() => {
    getFavoriteSummoners().then((favoriteSummoners) => {
      if (favoriteSummoners === null) {
        return;
      }
      if (
        favoriteSummoners.some(
          (summoner) => summoner.summonerName === props.name,
        )
      ) {
        setSelected(true);
      }
    });
  }, [props.name]);
  return (
    <View style={styles.container}>
      <View style={styles.name}>
        <Text style={styles.summonerName}>{props.name}</Text>
        <TouchableWithoutFeedback
          onPress={() => {
            if (selected) {
              getFavoriteSummoners().then((favoriteSummoners) => {
                if (favoriteSummoners == null) {
                  return;
                }
                favoriteSummoners = favoriteSummoners.filter(
                  (summoner) => summoner.summonerName !== props.name,
                );
                setFavoriteSummoners(favoriteSummoners);
              });
              setSelected(false);
              return;
            }
            getFavoriteSummoners().then((favoriteSummoners) => {
              if (favoriteSummoners == null) {
                favoriteSummoners = [];
              }
              favoriteSummoners = favoriteSummoners.slice(0, 8);
              if (
                favoriteSummoners.some(
                  (summoner) => summoner.summonerName === props.name,
                )
              ) {
                return;
              }
              favoriteSummoners.unshift({
                summonerName: props.name,
                summonerIcon: props.summonerIcon,
                summonerRegion: props.summonerRegion,
              });
              setFavoriteSummoners(favoriteSummoners);
              setSelected(true);
            });
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
