import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledButton = styled.button`
  height: 45px;
  min-width: 200px;
  padding: 0 15px;
  border: 3px solid ${props => props.borderColor};
  border-radius: 8px;
  background-color: ${props => props.bgColor};
  color: ${props => props.textColor || "white"};
  font-weight: bold;
  font-size: 17px;
  font-family: Roboto, serif;
  position: relative;
 
  &:focus {
    outline: none;
  }
  
  opacity: ${props => props.disabled ? '0.3':'1'};
  cursor: ${props => props.disabled ? 'default':'pointer'};
`;

const Icon = styled.img`
  position: absolute;
  right: 10px;
  top: 10px;
  width: 30px;
`;

const Button = (props) => {
  const bgColor =  props.bgColor || "#f5f5f5;";
  const borderColor = props.borderColor || bgColor;
  return(
    <StyledButton className={props.className}
                  textColor={props.textColor}
                  bgColor={bgColor}
                  borderColor={borderColor}
                  disabled={props.disabled || false}
                  onClick={props.onClick}>
      {props.text}
      {<Icon src={props.icon}/>}
    </StyledButton>
  );
};

Button.propTypes = {
  bgColor: PropTypes.string,
  borderColor: PropTypes.string,
  textColor: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  icon: PropTypes.string,
  dataNav: PropTypes.string
};

export default Button;
