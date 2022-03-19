import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// eslint-disable-next-line import/extensions
import close from 'images/icons/x.svg';

const StyledPopup = styled.div`
  position: relative;
  padding: 15px 30px 30px;
  background-color: white;
  border-radius: 5px;
  overflow-y: auto;
`;

const StyledBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const StyledCloseButton = styled.img`
  position: absolute;
  right: 10px;
  top: 10px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-tap-highlight-color: transparent;
`;

const Popup = (props) => {
  return(
    <StyledBackground onClick={props.handleOnClose}>
      <StyledPopup onClick={(e) => e.stopPropagation()}>
        <StyledCloseButton src={close} onClick={props.handleOnClose} />
        {props.children}
      </StyledPopup>
    </StyledBackground>
  );
};

Popup.propTypes = {
  children: PropTypes.element.isRequired,
  handleOnClose: PropTypes.func.isRequired
};

export default Popup;
