import {
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {clearSearches, popSearch, pushSearch} from '../../data/SearchActions';
import {colors, fonts} from '../../Theme';
import {useDispatch, useSelector} from 'react-redux';

import BackSvg from '../../svg/back.svg';
import HomeSvg from '../../svg/home.svg';
import PropTypes from 'prop-types';
import React from 'react';
import {pages} from '../../Constants';
import {useNavigation} from '@react-navigation/native';

const SearchNav = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const searches = useSelector((state) => state.searches);
  const [summonerNameQuery, setSummonerNameQuery] = React.useState('');

  const searchSummonerHandler = () => {
    if (summonerNameQuery === '') {
      return;
    }
    const summoner = {
      summonerName: summonerNameQuery,
      summonerRegion: searches[0].summonerRegion,
    };
    dispatch(pushSearch(summoner));
    navigation.navigate(pages.results, summoner);
  };

  const goHomeHandler = () => {
    dispatch(clearSearches());
    navigation.navigate(pages.home, {summonerName: ''});
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          dispatch(popSearch());
          if (searches.length === 0) {
            navigation.navigate(pages.home, {summonerName: ''});
          } else {
            navigation.navigate(pages.results, searches[0]);
          }
        }}>
        <BackSvg width={props.backWidth} height={props.backHeight} />
      </TouchableWithoutFeedback>
      <TextInput
        placeholder={props.placeholder}
        placeholderTextColor={props.placeholderTextColor}
        style={styles.input}
        autoCorrect={props.autoCorrect}
        onChangeText={(value) => setSummonerNameQuery(value)}
        onSubmitEditing={() => searchSummonerHandler()}
      />
      <TouchableWithoutFeedback onPress={goHomeHandler}>
        <HomeSvg width={props.homeWidth} height={props.homeHeight} />
      </TouchableWithoutFeedback>
    </View>
  );
};

SearchNav.defaultProps = {
  backWidth: 20,
  backHeight: 20,
  homeWidth: 40,
  homeHeight: 40,
  placeholder: 'enter summoner name',
  placeholderTextColor: colors.lightGrey,
  autoCorrect: false,
};

SearchNav.propTypes = {
  backWidth: PropTypes.number,
  backHeight: PropTypes.number,
  homeWidth: PropTypes.number,
  homeHeight: PropTypes.number,
  placeholder: PropTypes.string,
  autoCorrect: PropTypes.bool,
  placeholderTextColor: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 45,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: colors.blue,
  },
  input: {
    width: '66%',
    height: 44,
    padding: 10,
    backgroundColor: colors.darkBlue,
    borderRadius: 5,
    color: colors.lightGrey,
    fontFamily: fonts.regular,
  },
});

export default SearchNav;
