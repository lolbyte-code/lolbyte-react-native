import {BLUE_TEAM, RED_TEAM} from '../Constants';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {backgrounds, colors, fonts} from '../Theme';

import CloseButton from './common/CloseButton';
import PropTypes from 'prop-types';
import React from 'react';
import Summoners from './currentGame/Summoners';
import VersusSvg from '../svg/versus.svg';
import {pages} from '../Constants';

const CurrentGame = (props) => {
  const currentGameData = props.route.params.currentGameData;
  const region = props.route.params.region;
  const currentSummoner = props.route.params.currentSummoner;
  const previousSummoners = props.route.params.previousSummoners;
  const previousPlusCurrentSummoners = [...previousSummoners];
  previousPlusCurrentSummoners.unshift(currentSummoner);

  const goBackParams = {
    summonerName: currentSummoner.summonerName,
    region: currentSummoner.region,
    previousSummoners: previousSummoners,
  };

  return (
    <ImageBackground source={props.backgroundImage} style={styles.background}>
      <CloseButton goBackPage={pages.profile} goBackParams={goBackParams} />
      <View style={styles.container}>
        <View style={styles.summonersContainer}>
          <Text style={styles.gameType}>{currentGameData.gameType}</Text>
          <Summoners
            entries={currentGameData.summoners.filter(
              (summoner) => summoner.teamId === BLUE_TEAM,
            )}
            region={region}
            previousSummoners={previousPlusCurrentSummoners}
          />
          <VersusSvg
            style={styles.versus}
            width={props.versusWidth}
            height={props.versusHeight}
          />
          <Summoners
            entries={currentGameData.summoners.filter(
              (summoner) => summoner.teamId === RED_TEAM,
            )}
            region={region}
            previousSummoners={previousPlusCurrentSummoners}
          />
        </View>
      </View>
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
    width: '100.03%',
  },
  summonersContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  gameType: {
    color: colors.green,
    fontSize: 30,
    fontFamily: fonts.regular,
    marginBottom: 10,
  },
});

export default CurrentGame;
