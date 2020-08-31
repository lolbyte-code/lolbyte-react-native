import {StyleSheet, View} from 'react-native';

import FavoritesHeader from './FavoritesHeader';
import GestureRecognizer from 'react-native-swipe-gestures';
import React from 'react';
import RecentSearchesHeader from './RecentSearchesHeader';
import Summoners from './Summoners';
import {useSelector} from 'react-redux';

const FAVORITES_SELECTED = 'favorites';
const SEARCHES_SELECTED = 'recentSearches';

const SavedSearches = () => {
  const favoriteSummoners = useSelector(
    (state) => state.summoners.favoriteSummoners,
  );
  const recentSummoners = useSelector(
    (state) => state.summoners.recentSummoners,
  );

  const [selectedHeader, setSelectedHeader] = React.useState(
    FAVORITES_SELECTED,
  );
  const [summoners, setSummoners] = React.useState(favoriteSummoners);

  const selectFavoritesHandler = () => {
    setSelectedHeader(FAVORITES_SELECTED);
    setSummoners(favoriteSummoners);
  };
  const selectRecentSearchesHandler = () => {
    setSelectedHeader(SEARCHES_SELECTED);
    setSummoners(recentSummoners);
  };

  return (
    <View>
      <View style={styles.headers}>
        <FavoritesHeader
          onPressHandler={selectFavoritesHandler}
          selected={selectedHeader === FAVORITES_SELECTED}
        />
        <RecentSearchesHeader
          onPressHandler={selectRecentSearchesHandler}
          selected={selectedHeader === SEARCHES_SELECTED}
        />
      </View>
      <GestureRecognizer
        onSwipeLeft={() => selectRecentSearchesHandler()}
        onSwipeRight={() => selectFavoritesHandler()}>
        <Summoners entries={summoners} />
      </GestureRecognizer>
    </View>
  );
};

const styles = StyleSheet.create({
  headers: {
    justifyContent: 'space-evenly',
    marginTop: 35,
    flexDirection: 'row',
  },
});

export default SavedSearches;
