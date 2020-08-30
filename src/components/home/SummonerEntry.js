import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import EllipsisText from '../common/EllipsisText';
import PropTypes from 'prop-types';
import React from 'react';
import {getProfileIcon} from '../../api/Url';
import {useNavigation} from '@react-navigation/native';

const SummonerEntry = (props) => {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate('Profile', {
          summonerName: props.summonerName,
          region: props.summonerRegion,
        })
      }>
      <View style={styles.container}>
        <Image
          source={{
            // TODO: could default icon here (add prop)
            uri: getProfileIcon(props.summonerIcon),
          }}
          style={styles.summonerIcon}
        />
        <EllipsisText
          text={props.summonerName}
          textStyle={styles.summonerName}
          maxLimit={13}
        />
        <Text style={styles.summonerRegion}>
          {props.summonerRegion.toUpperCase()}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

SummonerEntry.defaultProps = {
  summonerIcon: '1',
  summonerName: 'Unknown',
  summonerRegion: 'NA',
};

SummonerEntry.propTypes = {
  summonerIcon: PropTypes.string,
  summonerName: PropTypes.string,
  summonerRegion: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    alignItems: 'center',
  },
  summonerIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#B2B4BB',
  },
  summonerName: {
    color: 'teal',
    fontSize: 12,
  },
  summonerRegion: {
    color: 'white',
    fontSize: 12,
  },
});

export default SummonerEntry;
