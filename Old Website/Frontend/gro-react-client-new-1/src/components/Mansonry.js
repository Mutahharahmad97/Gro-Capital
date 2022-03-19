import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import MansonryComponent from 'react-masonry-component';

const Container = styled.div`
  width: 100vw;
  max-width: 1200px;
  padding: 10px;
  margin: 0 auto;
  box-sizing: border-box;
`;

const Item = styled.div`
  display: inline-block;
  background: #fff;
  width: 360px;
  margin-bottom: 20px;
  box-sizing: border-box;
  box-shadow: 0 2px 10px 2px #ccc;
  border-radius: 5px;
  @media (max-width: 400px) {
    width: 330px;
  }
  
`;

const Mansonry = (props) => {
  return(
    <Container>
      <MansonryComponent
        style={{margin: "0 auto"}}
        options={{transitionDuration: 0, gutter: 20, fitWidth: true}}
      >
        { props.children.map((item, index) => <Item key={index}>{item}</Item>) }
      </MansonryComponent>
    </Container>
  );
};

Mansonry.propTypes = {
  children: PropTypes.array
};

export default Mansonry;
