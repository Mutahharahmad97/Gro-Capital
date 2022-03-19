/* eslint-disable import/extensions */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import BasePieChart from "components/BasePieChart";

const Container = styled.div`
  position: relative;
  width: ${props => props.type === 'small' ? 200 : 315 }px;
  margin: 0 auto;
  font-family: ${props => props.theme.fontFamily};
`;

const LevelCenter = styled.div`
  position: absolute;
  top: calc(50% - ${props => props.type === 'small' ? 30 : 40}px);
  left: calc(50% - ${props => props.type === 'small' ? 28 : 37}px);
  text-align: center;
  & div {
    color: black;
    font-size: 12px;
  }
  & p {
    color: ${props => props.theme.lightBlack};
    font-size: ${props => props.type === 'small' ? 28 : 42 }px;
    /* margin: -2px 0 0 ${props => props.type === 'small' ? 15 : 20}px; */
    margin-top: 10px;
    width: 60px;
  }
`;

const maxValue = 800;

const ScorePie = (props) => {
  let colors = [
    '#F44336',
    '#FF9800',
    '#FFEE58',
    '#D4E157',
    '#AED581',
    '#7CB342',
    '#689F38',
    '#33691E',
    '#33691E',
  ];
  const type = props.type || 'small';
  const currentLevelValue = props.levelValue;

  const index = Math.floor(currentLevelValue / 100);

  let colorsValue = [colors[index]];
  
  if (currentLevelValue < maxValue) colorsValue.push('#efefef');

  const dataValues = [
    { value: currentLevelValue }, 
    { value: maxValue - currentLevelValue }
  ];

  return (
    <Container type={type}>
      <LevelCenter type={type}>
        <p>{props.levelValue}</p>
      </LevelCenter>
      <BasePieChart {...props} data={dataValues} colors={colorsValue}/>
    </Container>
  );
};

ScorePie.propTypes = {
  type: PropTypes.string,
  step: PropTypes.number,
  level: PropTypes.number,
  levelValue: PropTypes.number
};

export default ScorePie;
