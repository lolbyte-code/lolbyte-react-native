import {ADD_FAV, REMOVE_FAV} from '../../reducers/SummonersReducer';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import FavoriteSelectedSvg from '../../svg/favoriteSelected.svg';
import FavoriteUnselectedSvg from '../../svg/favoriteUnselected.svg';
import PropTypes from 'prop-types';
import React from 'react';

const SummonerDetails = (props) => {
  const [selected, setSelected] = React.useState(false);
  const favoriteSummoners = useSelector(
    (state) => state.summoners.favoriteSummoners,
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    const favorited =
      typeof favoriteSummoners !== 'undefined' &&
      favoriteSummoners.some(
        (summoner) => summoner.summonerName === props.name,
      );
    setSelected(favorited);
  }, [props.name, favoriteSummoners]);
  return (
    <View style={styles.container}>
      <View style={styles.name}>
        <Text style={styles.summonerName}>{props.name}</Text>
        <TouchableWithoutFeedback
          onPress={() => {
            if (selected) {
              dispatch({type: REMOVE_FAV, summonerName: props.name});
              setSelected(false);
            } else {
              var summoner = {
                summonerName: props.name,
                summonerIcon: props.summonerIcon,
                summonerRegion: props.summonerRegion,
              };
              dispatch({type: ADD_FAV, summoner: summoner});
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
