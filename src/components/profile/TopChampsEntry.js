import {Image, StyleSheet, Text, View} from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';

const TopChampsEntry = (props) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: `https://cdn.communitydragon.org/latest/champion/${props.champId}/square`,
        }}
        style={styles.champImage}
      />
      <Text style={styles.champName}>{props.champName}</Text>
      <Text style={styles.champLevel}>{props.champLevel}</Text>
      <Text style={styles.champPoints}>{props.champPoints}</Text>
    </View>
  );
};

TopChampsEntry.defaultProps = {
  champId: 1,
  champName: 'Unknown',
  champLevel: 'Level: 1',
  champPoints: 'Points: 100',
};

TopChampsEntry.propTypes = {
  champId: PropTypes.number,
  champName: PropTypes.string,
  champLevel: PropTypes.string,
  champPoints: PropTypes.string,
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
  champLevel: {
    color: 'white',
  },
  champPoints: {
    color: 'white',
  },
});

export default TopChampsEntry;
