import {BLUE_TEAM, RED_TEAM} from '@app/Constants';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {backgrounds, colors, fonts} from '@app/Theme';

import CloseButton from '@app/components/common/ClosePageButton';
import PropTypes from 'prop-types';
import React from 'react';
import Summoners from '@app/components/currentGame/Summoners';
import VersusSvg from '@app/assets/svg/versus.svg';
import {pages} from '@app/Constants';

const CurrentGame = (props) => {
  const currentGameData = props.route.params.currentGameData;
  const currentSummoner = props.route.params.currentSummoner;
  const summonerRegion = props.route.params.summonerRegion;

  const goBackParams = {
    summonerName: currentSummoner,
    summonerRegion: summonerRegion,
  };

  return (
    <ImageBackground source={props.backgroundImage} style={styles.background}>
      <ScrollView style={styles.container}>
        <CloseButton
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
    </ImageBackground>
  );
};

CurrentGame.defaultProps = {
  backgroundImage: backgrounds.main,
  versusWidth: Dimensions.get('window').width - 10,
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
    // TODO: hacky AF
    width: '101%',
  },
  summonersContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  container: {
    flex: 1,
    marginTop: 15,
  },
  gameType: {
    color: colors.green,
    fontSize: 30,
    fontFamily: fonts.regular,
    marginBottom: 10,
  },
  closeButtonStyle: {
    marginTop: 30,
    marginLeft: 20,
  },
});

export default CurrentGame;