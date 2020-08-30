import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';

import FavoriteSvg from '../../svg/favoriteSelected.svg';
import PropTypes from 'prop-types';
import React from 'react';

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
        <FavoriteSvg
          height={props.favoriteSvgHeight}
          width={props.favoriteSvgWidth}
          style={styles.favoriteSvg}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

FavoritesHeader.defaultProps = {
  title: 'Favorites',
  favoriteSvgHeight: 25,
  favoriteSvgWidth: 25,
  onPressHandler: {},
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
    borderBottomColor: 'teal',
  },
  titleNotSelected: {
    color: 'grey',
    fontSize: 20,
  },
  titleSelected: {
    color: 'teal',
    fontSize: 20,
  },
  favoriteSvg: {
    marginLeft: 5,
  },
});

export default FavoritesHeader;
