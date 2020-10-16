import {BLUE_TEAM, RED_TEAM} from '@app/Constants';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {backgrounds, colors, fonts} from '@app/Theme';

import ClosePageButton from '@app/components/common/ClosePageButton';
import PropTypes from 'prop-types';
import React from 'react';
import Summoners from '@app/components/currentGame/Summoners';
import VersusSvg from '@app/assets/svg/versus.svg';
import {getSafeAreaWidth} from '@app/utils/Device';
import {pages} from '@app/Constants';
import {resetProfileData} from '@app/data/actions/ApiActions';
import {useDispatch} from 'react-redux';

const CurrentGame = (props) => {
  const dispatch = useDispatch();
  const currentGameData = props.route.params.currentGameData;
  const currentSummoner = props.route.params.currentSummoner;
  const summonerRegion = props.route.params.summonerRegion;

  const goBackParams = {
    summonerName: currentSummoner,
    summonerRegion: summonerRegion,
  };

  return (
    <ImageBackground source={props.backgroundImage} style={styles.background}>
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView style={styles.container}>
          <ClosePageButton
            preNavigate={() => resetProfileData(dispatch)}
            goBackPage={pages.results}
            goBackParams={goBackParams}
            buttonStyle={styles.closeButtonStyle}
          />
          <View style={styles.summonersContainer}>
            <Text style={styles.gameType}>{currentGameData.gameType}</Text>
            <Summoners
              summonerEntries={currentGameData.summoners.filter(
                (summoner) => summoner.teamId === BLUE_TEAM,
              )}
              summonerRegion={summonerRegion}
            />
            <VersusSvg
              style={styles.versus}
              width={props.versusWidth}
              height={props.versusHeight}
            />
            <Summoners
              summonerEntries={currentGameData.summoners.filter(
                (summoner) => summoner.teamId === RED_TEAM,
              )}
              summonerRegion={summonerRegion}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

CurrentGame.defaultProps = {
  backgroundImage: backgrounds.main,
  versusWidth: getSafeAreaWidth() - 10,
  versusHeight: 40,
  route: {},
};

CurrentGame.propTypes = {
  backgroundImage: PropTypes.node,
  versusWidth: PropTypes.number,
  versusHeight: PropTypes.number,
  route: PropTypes.object,
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.background,
  },
  summonersContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  container: {
    flex: 1,
  },
  safeAreaView: {
    flex: 1,
  },
  gameType: {
    color: colors.green,
    fontSize: 30,
    fontFamily: fonts.regular,
    marginBottom: 10,
  },
  closeButtonStyle: {
    marginTop: 20,
    marginLeft: 20,
  },
});

export default CurrentGame;
