import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import MostPlayedChampsEntry from './MostPlayedChampsEntry';

const MostPlayedChamps = (props) => {
  if (!props.data.length) {
    return null;
  }
  return (
    <View>
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.entries}>
        <MostPlayedChampsEntry
          champId={props.data[0].championId}
          champName={props.data[0].championName}
          gamesPlayed={props.data[0].championGamesPlayed}
        />
        <MostPlayedChampsEntry
          champId={props.data[1].championId}
          champName={props.data[1].championName}
          gamesPlayed={props.data[1].championGamesPlayed}
        />
        <MostPlayedChampsEntry
          champId={props.data[2].championId}
          champName={props.data[2].championName}
          gamesPlayed={props.data[2].championGamesPlayed}
        />
      </View>
    </View>
  );
};

MostPlayedChamps.defaultProps = {
  title: 'Most Played (Recent)',
  data: [
    {
      championId: 523,
      championName: 'Aphelios',
      championGamesPlayed: 'Games Played: 8',
    },
    {
      championId: 429,
      championName: 'Kalista',
      championGamesPlayed: 'Games Played: 3',
    },
    {
      championId: 235,
      championName: 'Senna',
      championGamesPlayed: 'Games Played: 2',
    },
  ],
};

MostPlayedChamps.propTypes = {
  title: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      championId: PropTypes.number,
      championName: PropTypes.string,
      championGamesPlayed: PropTypes.string,
    }),
  ),
};

const styles = StyleSheet.create({
  entries: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    color: 'grey',
    fontSize: 15,
    marginLeft: 15,
  },
});

export default MostPlayedChamps;
