import {StyleSheet, View} from 'react-native';

import FavoritesHeader from './FavoritesHeader';
import GestureRecognizer from 'react-native-swipe-gestures';
import Header from '../common/Header';
import PropTypes from 'prop-types';
import React from 'react';
import Summoners from './Summoners';
import {useSelector} from 'react-redux';

const FAVORITES_SELECTED = 'favorites';
const SEARCHES_SELECTED = 'recentSearches';

const SavedSearches = (props) => {
  const favoriteSummoners = useSelector(
    (state) => state.summoners.favoriteSummoners,
  );
  const recentSummoners = useSelector(
    (state) => state.summoners.recentSummoners,
  );

  const [selectedHeader, setSelectedHeader] = React.useState(
    FAVORITES_SELECTED,
  );

  const selectFavoritesHandler = () => {
    setSelectedHeader(FAVORITES_SELECTED);
  };
  const selectRecentSearchesHandler = () => {
    setSelectedHeader(SEARCHES_SELECTED);
  };

  return (
    <View>
      <View style={styles.headers}>
        <FavoritesHeader
          onPressHandler={selectFavoritesHandler}
          selected={selectedHeader === FAVORITES_SELECTED}
        />
        <Header
          onPressHandler={selectRecentSearchesHandler}
          selected={selectedHeader === SEARCHES_SELECTED}
          title={props.recentSearchesHeader}
        />
      </View>
      <GestureRecognizer
        onSwipeLeft={() => selectRecentSearchesHandler()}
        onSwipeRight={() => selectFavoritesHandler()}>
        <Summoners
          entries={
            selectedHeader === FAVORITES_SELECTED
              ? favoriteSummoners
              : recentSummoners
          }
        />
      </GestureRecognizer>
    </View>
  );
};

SavedSearches.defaultProps = {
  recentSearchesHeader: 'Recent Searches',
};

SavedSearches.propTypes = {
  recentSearchesHeader: PropTypes.string,
};

const styles = StyleSheet.create({
  headers: {
    justifyContent: 'space-evenly',
    marginTop: 35,
    flexDirection: 'row',
  },
});

export default SavedSearches;
