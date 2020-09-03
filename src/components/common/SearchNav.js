import {
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {colors, fonts} from '../../Theme';

import BackSvg from '../../svg/back.svg';
import HomeSvg from '../../svg/home.svg';
import PropTypes from 'prop-types';
import React from 'react';
import {pages} from '../../Constants';
import {useNavigation} from '@react-navigation/native';

const SearchNav = (props) => {
  const navigation = useNavigation();

  const [summonerNameQuery, setSummonerNameQuery] = React.useState('');

  const searchSummonerHandler = () => {
    const previousSummoners = props.previousSummoners;
    previousSummoners.unshift(props.currentSummoner);
    navigation.navigate(pages.results, {
      summonerName: summonerNameQuery,
      region: props.region,
      previousSummoners: previousSummoners,
    });
  };

  const goHomeHandler = () => {
    navigation.navigate(pages.home);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate(props.goBackPage, props.goBackParams)
        }>
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
  region: '',
  backWidth: 20,
  backHeight: 20,
  homeWidth: 40,
  homeHeight: 40,
  placeholder: 'enter summoner name',
  placeholderTextColor: colors.lightGrey,
  autoCorrect: false,
  goBackPage: '',
  goBackParams: {},
  previousSummoners: [],
  currentSummoner: {},
};

SearchNav.propTypes = {
  region: PropTypes.string,
  backWidth: PropTypes.number,
  backHeight: PropTypes.number,
  homeWidth: PropTypes.number,
  homeHeight: PropTypes.number,
  placeholder: PropTypes.string,
  autoCorrect: PropTypes.bool,
  placeholderTextColor: PropTypes.string,
  goBackPage: PropTypes.string,
  goBackParams: PropTypes.object,
  previousSummoners: PropTypes.array,
  currentSummoner: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 35,
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
