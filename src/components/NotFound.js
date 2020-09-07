import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {backgrounds, colors} from '../Theme';

import PropTypes from 'prop-types';
import React from 'react';
import SearchNav from './common/SearchNav';
import {resetSummonerData} from '../data/actions/ApiActions';
import {useDispatch} from 'react-redux';

const NotFound = (props) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(resetSummonerData());
  }, [dispatch]);

  return (
    <ImageBackground source={props.backgroundImage} style={styles.background}>
      <SearchNav />
      <View style={styles.container}>
        <Text style={styles.text}>Summoner not found!</Text>
      </View>
    </ImageBackground>
  );
};

NotFound.defaultProps = {
  backgroundImage: backgrounds.main,
};

NotFound.propTypes = {
  backgroundImage: PropTypes.node,
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    // TODO: hacky AF
    width: '101%',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    marginTop: 15,
  },
  text: {
    color: colors.blue,
    fontSize: 30,
  },
});

export default NotFound;
