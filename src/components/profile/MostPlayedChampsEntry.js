import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import PropTypes from 'prop-types';

const MostPlayedChampsEntry = (props) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: `https://cdn.communitydragon.org/latest/champion/${props.champId}/square`,
        }}
        style={styles.champImage}
      />
      <Text style={styles.champName}>{props.champName}</Text>
      <Text style={styles.gamesPlayed}>{props.gamesPlayed}</Text>
    </View>
  );
};

MostPlayedChampsEntry.defaultProps = {
  champId: 1,
  champName: 'Unknown',
  gamesPlayed: 'Games Played: 1',
};

MostPlayedChampsEntry.propTypes = {
  champId: PropTypes.number,
  champName: PropTypes.string,
  gamesPlayed: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    flex: 1,
  },
  champImage: {
    width: 106,
    height: 106,
    borderRadius: 53,
    borderWidth: 3,
    borderColor: '#B2B4BB',
  },
  champName: {
    color: 'teal',
  },
  gamesPlayed: {
    color: 'white',
  },
});

export default MostPlayedChampsEntry;
