import {BLUE_TEAM, RED_TEAM} from '../Constants';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {backgrounds, colors} from '../Theme';

import PropTypes from 'prop-types';
import React from 'react';
import Summoners from './currentGame/Summoners';
import VersusSvg from '../svg/versus.svg';

const CurrentGame = (props) => {
  const currentGameData = props.route.params.currentGameData;
  const region = props.route.params.region;
  return (
    <ImageBackground source={props.backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.gameType}>{currentGameData.gameType}</Text>
        <View style={styles.summonersContainer}>
          <Summoners
            entries={currentGameData.summoners.filter(
              (summoner) => summoner.teamId === BLUE_TEAM,
            )}
            region={region}
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
    margin: 5,
    marginTop: 15,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: '5%',
  },
  gameType: {
    color: colors.green,
    fontSize: 30,
  },
});

export default CurrentGame;
