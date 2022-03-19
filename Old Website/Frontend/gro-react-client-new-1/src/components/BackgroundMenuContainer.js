import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Background = styled.div`
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: -1;
  position: fixed;
  background-color: rgba(0, 0, 0, ${props => props.opacity || 0});
`;

const BackgroundMenuContainer = props => {
  return <Background onClick={props.handleOnClick} opacity={props.opacity} />;
};

BackgroundMenuContainer.propTypes = {
  handleOnClick: PropTypes.func,
  opacity: PropTypes.number
};

export default BackgroundMenuContainer;
