import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {colors, fonts} from '../../Theme';

import FavoriteSelectedSvg from '../../svg/favoriteSelected.svg';
import FavoriteUnselectedSvg from '../../svg/favoriteUnselected.svg';
import PropTypes from 'prop-types';
import React from 'react';

// TODO: combine with Header in commons?
const FavoritesHeader = (props) => {
  return (
    <TouchableWithoutFeedback onPress={() => props.onPressHandler()}>
      <View
        style={
          props.selected
            ? styles.containerSelected
            : styles.containerNotSelected
        }>
        <Text
          style={
            props.selected ? styles.titleSelected : styles.titleNotSelected
          }>
          {props.title}
        </Text>
        {props.selected ? (
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
      </View>
    </TouchableWithoutFeedback>
  );
};

FavoritesHeader.defaultProps = {
  title: 'Favorites',
  favoriteSvgHeight: 25,
  favoriteSvgWidth: 25,
  onPressHandler: () => {},
  selected: true,
};

FavoritesHeader.propTypes = {
  title: PropTypes.string,
  favoriteSvgHeight: PropTypes.number,
  favoriteSvgWidth: PropTypes.number,
  onPressHandler: PropTypes.func,
  selected: PropTypes.bool,
};

const styles = StyleSheet.create({
  containerNotSelected: {
    flexDirection: 'row',
  },
  containerSelected: {
    flexDirection: 'row',
    paddingBottom: 5,
    borderBottomWidth: 5,
    borderBottomColor: colors.blue,
  },
  titleNotSelected: {
    color: colors.darkGrey,
    fontSize: 20,
    fontFamily: fonts.bold,
  },
  titleSelected: {
    color: colors.blue,
    fontSize: 20,
    fontFamily: fonts.bold,
  },
  favoriteSvg: {
    marginLeft: 5,
  },
});

export default FavoritesHeader;
