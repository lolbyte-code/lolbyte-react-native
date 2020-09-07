import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {
  addFavoriteSummoner,
  removeFavoriteSummoner,
} from 'LolByte/src/data/actions/SummonersActions';
import {colors, fonts} from 'LolByte/src/Theme';
import {useDispatch, useSelector} from 'react-redux';

import FavoriteSelectedSvg from 'LolByte/src/assets/svg/favoriteSelected.svg';
import FavoriteUnselectedSvg from 'LolByte/src/assets/svg/favoriteUnselected.svg';
import PropTypes from 'prop-types';
import React from 'react';

const SummonerDetails = (props) => {
  const [favorited, setFavorited] = React.useState(false);
  const favoriteSummoners = useSelector(
    (state) => state.summoners.favoriteSummoners,
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    const isFavorited =
      favoriteSummoners &&
      favoriteSummoners.some(
        (summoner) => summoner.summonerName === props.summonerName,
      );
    setFavorited(isFavorited);
  }, [props.summonerName, favoriteSummoners]);

  const pressFavoriteHandler = () => {
    if (favorited) {
      dispatch(removeFavoriteSummoner(props.summonerName));
    } else {
      dispatch(
        addFavoriteSummoner({
          summonerName: props.summonerName,
          summonerIcon: props.summonerIcon,
          summonerRegion: props.summonerRegion,
        }),
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.summonerDetails}>
        <Text style={styles.summonerName}>{props.summonerName}</Text>
        <TouchableWithoutFeedback onPress={pressFavoriteHandler}>
          {favorited ? (
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
      <Text style={styles.summonerLevel}>Level {props.summonerLevel}</Text>
    </View>
  );
};

SummonerDetails.defaultProps = {
  summonerName: '',
  summonerLevel: 0,
  summonerRegion: '',
  favoriteSvgHeight: 40,
  favoriteSvgWidth: 40,
};

SummonerDetails.propTypes = {
  summonerName: PropTypes.string,
  summonerLevel: PropTypes.number,
  summonerRegion: PropTypes.string,
  favoriteSvgHeight: PropTypes.number,
  favoriteSvgWidth: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  summonerDetails: {
    flexDirection: 'row',
  },
  summonerName: {
    color: colors.white,
    fontSize: 35,
    fontFamily: fonts.regular,
  },
  summonerLevel: {
    color: colors.white,
    fontSize: 20,
    fontFamily: fonts.regular,
  },
  favoriteSvg: {
    marginLeft: 5,
  },
});

export default SummonerDetails;
