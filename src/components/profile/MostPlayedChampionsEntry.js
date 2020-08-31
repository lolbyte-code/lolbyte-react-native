import {Image, StyleSheet, Text, View} from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';
import {getChampionIcon} from '../../api/Url';

const MostPlayedChampionsEntry = (props) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: getChampionIcon(props.championId),
        }}
        style={styles.championImage}
      />
      <Text style={styles.championName}>{props.championName}</Text>
      <Text style={styles.gamesPlayed}>{props.gamesPlayed}</Text>
    </View>
  );
};

MostPlayedChampionsEntry.defaultProps = {
  championId: 0,
  championName: '',
  gamesPlayed: '',
};

MostPlayedChampionsEntry.propTypes = {
  championId: PropTypes.number,
  championName: PropTypes.string,
  gamesPlayed: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    flex: 1,
  },
  championImage: {
    width: 106,
    height: 106,
    borderRadius: 53,
    borderWidth: 3,
    borderColor: '#B2B4BB',
  },
  championName: {
    color: '#22A8CE',
  },
  gamesPlayed: {
    color: 'white',
  },
});

export default MostPlayedChampionsEntry;
