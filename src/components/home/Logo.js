import LogoSvg from 'LolByte/src/assets/svg/logo.svg';
import PropTypes from 'prop-types';
import React from 'react';

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
