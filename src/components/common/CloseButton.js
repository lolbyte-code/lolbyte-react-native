import {StyleSheet, TouchableWithoutFeedback} from 'react-native';

import CloseButtonSvg from '../../svg/closeButton.svg';
import PropTypes from 'prop-types';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const CloseButton = (props) => {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate(props.goBackPage, props.goBackParams)}>
      <CloseButtonSvg
        style={styles.closeButton}
        width={props.closeButtonWidth}
        height={props.closeButtonHeight}
      />
    </TouchableWithoutFeedback>
  );
};

CloseButton.defaultProps = {
  closeButtonWidth: 40,
  closeButtonHeight: 40,
  goBackPage: '',
  goBackParams: {},
};

CloseButton.propTypes = {
  closeButtonWidth: PropTypes.number,
  closeButtonHeight: PropTypes.number,
  goBackPage: PropTypes.string,
  goBackParams: PropTypes.object,
};

const styles = StyleSheet.create({
  closeButton: {
    marginTop: 20,
    marginLeft: 20,
  },
});

export default CloseButton;
