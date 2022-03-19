import React from 'react';
import styled from 'styled-components';
import Navigation from 'containers/navigation/Navigation';

const PlaceholderWrapper = styled.div`
  height: 60px;
`;
const StyledWrapper = styled.div`
  font-family: ${props => props.theme.fontFamily};
  height: 60px;
  line-height: 60px;
  box-shadow: 0 3px 14px 0 rgba(0,0,0,0.25);
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(255,255,255,0.98);
  width: 100%;
  z-index: 5;
`;

const Header = () => {
  return (
    <PlaceholderWrapper>
      <StyledWrapper>
        <Navigation/>
      </StyledWrapper>
    </PlaceholderWrapper>
  );
};

export default Header;
