import {
  ImageBackground,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import NotFoundSvg from '@app/assets/svg/notFound.svg';
import PropTypes from 'prop-types';
import React from 'react';
import SearchNav from '@app/components/common/SearchNav';
import {backgrounds} from '@app/Theme';
import {colors} from '@app/Theme';

const NotFound = (props) => {
  return (
    <ImageBackground source={props.backgroundImage} style={styles.background}>
      <SafeAreaView
        style={
          StatusBar.currentHeight && Platform.OS === 'android'
            ? {paddingBottom: StatusBar.currentHeight}
            : null
        }>
        {Platform.OS === 'android' && <StatusBar backgroundColor={colors.blue}></StatusBar>}
        <SearchNav />
        <View style={styles.container}>
          <NotFoundSvg
            width={props.notFoundWidth}
            height={props.notFoundHeight}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

NotFound.defaultProps = {
  backgroundImage: backgrounds.main,
  notFoundWidth: 300,
  notFoundHeight: 300,
};

NotFound.propTypes = {
  backgroundImage: PropTypes.node,
  notFoundWidth: PropTypes.number,
  notFoundHeight: PropTypes.number,
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.background,
  },
  container: {
    alignItems: 'center',
    flex: 1,
  },
});

export default NotFound;
