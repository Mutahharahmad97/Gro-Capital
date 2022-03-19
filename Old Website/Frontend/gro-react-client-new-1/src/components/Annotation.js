import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  width: 200px;
  font-size: 16px;
  text-align: left;
  color: #bdbdbd;
  margin: 10px auto 30px;
  
  @media (max-width: 767px) {
    text-align: center;
  }
`;

Container.displayName = 'Container';

const Annotation = (props) => {
  return (
    <Container>
      {props.children}
    </Container>
  );
};

Annotation.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default Annotation;
