import {
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';
import {backgrounds, colors, fonts} from '@app/Theme';

import ErrorSvg from '@app/assets/svg/error.svg';
import PropTypes from 'prop-types';
import React from 'react';
import SearchNav from '@app/components/common/SearchNav';

const Error = (props) => {
  const error = props.route.params.error;
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
        <ScrollView contentContainerStyle={styles.errorScreen}>
          <ErrorSvg width={props.errorWidth} height={props.errorHeight} />
          <Text style={styles.text}>{error}</Text>
        </ScrollView>
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
    alignContent: 'center',
  },
  text: {
    color: colors.lightGrey,
    fontFamily: fonts.regular,
    padding: 10,
  },
});

export default Error;
