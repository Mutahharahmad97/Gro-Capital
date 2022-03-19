import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  font-family: ${props => props.theme.fontFamily};
  box-shadow: 0 4px 30px 2px rgba(0,0,0,0.15);
  border-radius: 3px;
  background-color: white;
  padding: 50px;
  text-align: center;
`;

const Box = (props) => {
  return (
    <Container className={props.className}>
      {props.children}
    </Container>
  );
};

Box.propTypes = {
  children: PropTypes.array.isRequired,
  className: PropTypes.string
};

export default Box;
