import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';

import InGameSvg from '../../svg/inGame.svg';
import PropTypes from 'prop-types';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const InGameIndicator = (props) => {
  const navigation = useNavigation();

  const inGameClickHandler = () => {
    navigation.navigate('Current Game', {
      currentGameData: props.currentGameData,
      region: props.region,
    });
  };

  return (
    <View style={props.inGame ? styles.show : styles.hide}>
      <TouchableWithoutFeedback onPress={() => inGameClickHandler()}>
        <InGameSvg width={props.width} height={props.height} />
      </TouchableWithoutFeedback>
    </View>
  );
};

InGameIndicator.defaultProps = {
  inGame: false,
  currentGameData: {},
  region: '',
  width: 100,
  height: 20,
};

InGameIndicator.propTypes = {
  inGame: PropTypes.bool,
  currentGameData: PropTypes.object,
  region: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

const styles = StyleSheet.create({
  show: {
    alignItems: 'center',
    marginTop: 10,
  },
  hide: {
    display: 'none',
  },
});

export default InGameIndicator;
