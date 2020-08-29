import {StyleSheet, Text, View} from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';
import TopChampsEntry from './TopChampsEntry';

const TopChamps = (props) => {
  if (!props.data.length) {
    return null;
  }
  return (
    <View>
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.entries}>
        <TopChampsEntry
          champId={props.data[0].championId}
          champName={props.data[0].championName}
          champLevel={props.data[0].championLevel}
          champPoints={props.data[0].championPoints}
        />
        <TopChampsEntry
          champId={props.data[1].championId}
          champName={props.data[1].championName}
          champLevel={props.data[1].championLevel}
          champPoints={props.data[1].championPoints}
        />
        <TopChampsEntry
          champId={props.data[2].championId}
          champName={props.data[2].championName}
          champLevel={props.data[2].championLevel}
          champPoints={props.data[2].championPoints}
        />
      </View>
    </View>
  );
};

TopChamps.defaultProps = {
  title: 'Most Played (Mastery)',
  data: [{championId: 1}, {championId: 1}, {championId: 1}],
};

TopChamps.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
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

export default TopChamps;
