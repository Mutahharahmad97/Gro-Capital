import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  width: 245px;
  height: 700px;
  box-shadow: 2px 2px 10px -2px rgba(0,0,0,0.25);
  background-color: white;
  float: left;
  position: relative;
  z-index: 1;
`;

const Investability = (props) => {
  return (
    <Container className={props.className}>
      Investability
    </Container>
  );
};

Investability.propTypes = {
  className: PropTypes.string
};

export default Investability;
