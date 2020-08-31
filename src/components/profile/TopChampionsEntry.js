import {Image, StyleSheet, Text, View} from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';
import {getChampionIcon} from '../../api/Url';

const TopChampionsEntry = (props) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: getChampionIcon(props.championId),
        }}
        style={styles.championImage}
      />
      <Text style={styles.championName}>{props.championName}</Text>
      <Text style={styles.championLevel}>{props.championLevel}</Text>
      <Text style={styles.championPoints}>{props.championPoints}</Text>
    </View>
  );
};

TopChampionsEntry.defaultProps = {
  championId: 0,
  championName: '',
  championLevel: '',
  championPoints: '',
};

TopChampionsEntry.propTypes = {
  championId: PropTypes.number,
  championName: PropTypes.string,
  championLevel: PropTypes.string,
  championPoints: PropTypes.string,
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
    color: 'teal',
  },
  championLevel: {
    color: 'white',
  },
  championPoints: {
    color: 'white',
  },
});

export default TopChampionsEntry;
