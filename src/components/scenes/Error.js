import {
  ImageBackground,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {backgrounds, colors, fonts} from '@app/Theme';

import ErrorSvg from '@app/assets/svg/error.svg';
import PropTypes from 'prop-types';
import React from 'react';
import SearchNav from '@app/components/common/SearchNav';

const Error = (props) => {
  return (
    <ImageBackground source={props.backgroundImage} style={styles.background}>
      {Platform.OS === 'ios' && <SafeAreaView style={{backgroundColor: colors.blue}}>
        <StatusBar barStyle="light-content"></StatusBar>
      </SafeAreaView>}
      <SafeAreaView
        style={
          StatusBar.currentHeight && Platform.OS === 'android'
            ? {paddingBottom: StatusBar.currentHeight}
            : null
        }>
        {Platform.OS === 'android' && <StatusBar backgroundColor={colors.blue}></StatusBar>}
        <SearchNav />
        <View style={styles.errorScreen}>
          <ErrorSvg width={props.errorWidth} height={props.errorHeight} />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

Error.defaultProps = {
  backgroundImage: backgrounds.main,
  errorWidth: 300,
  errorHeight: 300,
};

Error.propTypes = {
  backgroundImage: PropTypes.node,
  errorWidth: PropTypes.number,
  errorHeight: PropTypes.number,
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.background,
  },
  errorScreen: {
    flex: 1,
    alignItems: 'center',
  },
});

export default Error;
