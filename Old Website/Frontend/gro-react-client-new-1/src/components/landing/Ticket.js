import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Hidden } from 'react-grid-system';

const StyledContainer = styled.div`
  align-items: center;
  height: 100px;
  display: flex;
  justify-content: center;
`;

const StyledIcon = styled.img`
  height: 60px;
  float: left;
  margin-right: 10px;
`;

const StyledText = styled.span`
  font-family: Roboto, serif;
  font-size: 21px;
  color: #ffffff;
  margin: 0;

  @media all and (min-width: 990px) {
    font-size: 23px;
  }
`;

const Ticket = (props) => {
  return (
    <StyledContainer title={props.text}>
      <StyledIcon src={props.icon} />
      <Hidden xs sm>
        <StyledText>
          {props.text}
        </StyledText>
      </Hidden>
    </StyledContainer>
  );
};

Ticket.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string.isRequired
};

export default Ticket;
