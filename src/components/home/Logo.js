import React from 'react';
import PropTypes from 'prop-types';
import LogoSvg from '../../svg/logo.svg';

const Logo = (props) => {
  return <LogoSvg height={props.height} width={props.width} />;
};

Logo.defaultProps = {
  height: 200,
  width: 200,
};

Logo.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
};

export default Logo;
