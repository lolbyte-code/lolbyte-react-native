import React from 'react';
import {StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';
import PropTypes from 'prop-types';
import FavoriteSvg from '../../svg/favoriteSelected.svg';

const FavoritesHeader = (props) => {
  return (
    <TouchableWithoutFeedback onPress={() => props.onPressHandler('favorites')}>
      <View
        style={props.selected ? styles.containerSelected : styles.container}>
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
};

FavoritesHeader.propTypes = {
  title: PropTypes.string,
  favoriteSvgHeight: PropTypes.number,
  favoriteSvgWidth: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
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
