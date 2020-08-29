import React from 'react';
import {Text} from 'react-native';
import PropTypes from 'prop-types';

const EllipsisText = (props) => {
  return (
    <Text style={props.textStyle}>
      {props.text.length > props.maxLimit
        ? props.text.substring(0, props.maxLimit - 3) + '...'
        : props.text}
    </Text>
  );
};

EllipsisText.defaultProps = {
  text: '',
  maxLimit: 10,
  textStyle: null,
};

EllipsisText.propTypes = {
  text: PropTypes.string,
  maxLimit: PropTypes.number,
  textStyle: PropTypes.object,
};

export default EllipsisText;
