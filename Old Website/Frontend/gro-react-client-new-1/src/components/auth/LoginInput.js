import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledWrapper = styled.div`
  width: 320px;
  margin: 25px auto;
`;

const StyledLabel = styled.label`
  width: 100%;
  height: 24px;
  line-height: 24px;
  font-size: 16px;
  font-weight: 300;
  color: #bdbdbd;
  display: block;
  margin-bottom: 3px;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 30px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid #e8e8e8;
  background-color: ${props => props.bgColor};
  padding: 0 10px;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #777;
  }
`;

const LoginInput = props => {
  return (
    <StyledWrapper className={props.className}>
      <StyledLabel>{props.label}</StyledLabel>
      <StyledInput
        type={props.inputType}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
        bgColor={props.bgColor || 'white'}
      />
    </StyledWrapper>
  );
};

LoginInput.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  bgColor: PropTypes.string
};

export default LoginInput;
