import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SimplePieChart from 'components/SimplePieChart';
import ScorePie from 'components/ScorePie';

const Container = styled.div`
  width: 220px;
  height: 700px;
  box-shadow: 2px 2px 10px -2px rgba(0,0,0,0.25);
  background-color: white;
  float: left;
  position: relative;
  z-index: 1;
  font-family: ${props => props.theme.fontFamily};
  padding-top: 30px;
`;

const Title = styled.div`
  text-align: center;
  font-weight: 500;
  font-size: 19px;
  margin-top: 20px;
`;

const StatusContainer = styled.div`
  text-align: center;
  padding: 0 25px;
  margin: -30px 0 100px 0;
`;

const StatusItem = styled.div`
  width: 50%;
  float: left;
  & div {
    font-size: 14px;
    color: ${props => props.theme.greyColor};
    margin-top: -8px;
  }
`;

const Investability = (props) => {
  return (
    <Container className={props.className}>
      <Title>Investability</Title>
      <ScorePie levelValue={props.score}/>
      <StatusContainer>
        <StatusItem>
          <div style={{marginLeft: '15px'}}>0</div>
        </StatusItem>
        <StatusItem>
          <div style={{marginLeft: '-15px'}}>800</div>
        </StatusItem>
      </StatusContainer>
      <Title>{props.title}</Title>
      <SimplePieChart current={props.current+1} total={props.parts}/>
    </Container>
  );
};

Investability.propTypes = {
  className: PropTypes.string,
  current: PropTypes.number,
  parts: PropTypes.number,
  score: PropTypes.number,
  title: PropTypes.string
};

export default Investability;
