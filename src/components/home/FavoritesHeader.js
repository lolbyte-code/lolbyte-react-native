import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';

import FavoriteSvg from '../../svg/favoriteSelected.svg';
import PropTypes from 'prop-types';
import React from 'react';
import {colors} from '../common/Theme';

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
    borderBottomColor: colors.blue,
  },
  titleNotSelected: {
    color: colors.lightGrey,
    fontSize: 20,
  },
  titleSelected: {
    color: colors.blue,
    fontSize: 20,
  },
  favoriteSvg: {
    marginLeft: 5,
  },
});

export default FavoritesHeader;
