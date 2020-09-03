import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';
import {backgrounds, colors} from '../../Theme';

import PropTypes from 'prop-types';
import React from 'react';

const Loading = (props) => {
  return (
    <ImageBackground source={props.backgroundImage} style={styles.background}>
      <View style={styles.loadingScreen}>
        <ActivityIndicator
          color={props.loadingIndicatorColor}
          size={props.loadingIndicatorSize}
        />
      </View>
    </ImageBackground>
  );
};

Loading.defaultProps = {
  backgroundImage: backgrounds.main,
  loadingIndicatorColor: colors.blue,
  loadingIndicatorSize: 'large',
};

Loading.propTypes = {
  backgroundImage: PropTypes.node,
  loadingIndicatorColor: PropTypes.string,
  loadingIndicatorSize: PropTypes.string,
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    // TODO: hacky AF
    width: '101%',
  },
  loadingScreen: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Loading;