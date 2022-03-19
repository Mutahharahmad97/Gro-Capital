import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import FaFacebook from 'react-icons/lib/fa/facebook';
import FaGoogle from 'react-icons/lib/fa/google';
import FaLinkedin from 'react-icons/lib/fa/linkedin';

const StyledButton = styled.div`
  align-items: center;
  justify-content: center;
  position: relative;
  width: 300px;
  height: 48px;
  padding: 12px 10px;
  display: flex;
  margin: 20px auto;
  background-color: ${props => props.color || 'white'};
  border-color: ${props => props.color || 'white'};
  border-radius: 8px;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  color: white;
  text-indent: 15px;
  user-select: none;
  cursor: pointer;
`;

const StyledIcon = styled.span`
  position: absolute;
  left: 0;
  font-size: 25px;
  line-height: 20px;
`;

const SocialButton = ({ color, customIcon, icon, text, ...rest }) => {
  const iconOf = {
    facebook: <FaFacebook />,
    google: <FaGoogle />,
    linkedin: <FaLinkedin />
  };

  return (
    <StyledButton color={color} {...rest}>
      {icon && <StyledIcon>{customIcon || iconOf[icon]}</StyledIcon>}
      {text}
    </StyledButton>
  );
};

SocialButton.propTypes = {
  icon: PropTypes.string,
  customIcon: PropTypes.element,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  vendor: PropTypes.string
};

export default SocialButton;
