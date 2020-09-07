import CloseButtonSvg from 'LolByte/src/assets/svg/closeButton.svg';
import PropTypes from 'prop-types';
import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const ClosePageButton = (props) => {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate(props.goBackPage, props.goBackParams)}>
      <CloseButtonSvg
        style={props.buttonStyle}
        width={props.closeButtonWidth}
        height={props.closeButtonHeight}
      />
    </TouchableWithoutFeedback>
  );
};

ClosePageButton.defaultProps = {
  goBackPage: '',
  goBackParams: {},
  buttonStyle: {},
  closeButtonWidth: 40,
  closeButtonHeight: 40,
};

ClosePageButton.propTypes = {
  goBackPage: PropTypes.string,
  goBackParams: PropTypes.object,
  buttonStyle: PropTypes.object,
  closeButtonWidth: PropTypes.number,
  closeButtonHeight: PropTypes.number,
};

export default ClosePageButton;
