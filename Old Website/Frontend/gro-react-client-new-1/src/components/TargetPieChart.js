/* eslint-disable import/extensions */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import dotImg from 'images/chart/point.png';
import targetImg from 'images/chart/target.png';
import BasePieChart from "components/BasePieChart";

const Container = styled.div`
  position: relative;
  width: ${props => props.type === 'small' ? 200 : 315 }px;
  margin: 0 auto;
  font-family: ${props => props.theme.fontFamily};
`;

const Point = styled.div`
  border-radius: 50%;
  background-color: ${props => props.backgroundColor || 'rgb(188,188,188)'};
  position: absolute;
  top: ${props => props.top}%;
  left: ${props => props.left}%;
`;

const Dot = Point.extend`
  width: ${props => props.type === 'small' ? 16 : 22}px;
  height: ${props => props.type === 'small' ? 16 : 22}px;
  z-index: 2;
`;

const Target = Point.extend`
  width: ${props => props.type === 'small' ? 28 : 34}px;
  z-index: 3;
`;

const dots = {
  big: [
    {top: 82, left: 27},
    {top: 68, left: 14},
    {top: 47, left: 8.5},
    {top: 28, left: 14},
    {top: 9, left: 47},
    {top: 28, left: 78},
    {top: 47, left: 83},
    {top: 68, left: 78},
    {top: 82, left: 65}
  ],
  small: [
    {top: 75, left: 32},
    {top: 63, left: 19},
    {top: 46, left: 13},
    {top: 28, left: 19},
    {top: 14, left: 47},
    {top: 28, left: 73.5},
    {top: 47, left: 79},
    {top: 63, left: 74},
    {top: 75, left: 62}
  ]
};

const targets = {
  big: [
    {top: 7, left: 44},
    {top: 47, left: 82}
  ],
  small: [
    {top: 11, left: 45},
    {top: 44, left: 76}
  ]
};

const Level = styled.div`
  width: ${props => props.type === 'small' ? 26 : 35}px;
  height: ${props => props.type === 'small' ? 27: 35}px;
  border-radius: 50%;
  background-color: ${props => props.backgroundColor ? props.backgroundColor : '#f54133'};
  color: white;
  top: ${props => props.top - 3}%;
  left: ${props => props.left - 3}%;
  position: absolute;
  z-index: 4;
  text-align: center;
  font-size: ${props => props.type === 'small' ? 19 : 20}px;
  font-weight: 500;
  line-height: ${props => props.type === 'small' ? 27 : 35}px;
`;

const LevelCenter = styled.div`
  position: absolute;
  top: calc(50% - ${props => props.type === 'small' ? 28 : 40}px);
  left: calc(50% - ${props => props.type === 'small' ? 18 : 37}px);
  & p {
    color: ${props => props.theme.lightBlack};
    font-size: ${props => props.type === 'small' ? 28 : 42 }px;
    margin: -2px 0 0 ${props => props.type === 'small' ? 15 : 20}px;
  }
  & div {
    width: 0;
    height: 0;
    border: ${props => props.type === 'small' ? 8 : 13}px solid transparent;
    border-bottom: ${props => props.type === 'small' ? 15 : 24}px solid #f54133;
    position: relative;
    top: 0;
	}
	& div:after {
	  content: '';
    position: absolute;
    left: -${props => props.type === 'small' ? 8 : 13}px; 
    top: ${props => props.type === 'small' ? 15: 24}px;
    width: 0;
    height: 0;
    border: ${props => props.type === 'small' ? 8 : 13}px solid transparent;
    border-top: ${props => props.type === 'small' ? 15 : 24}px solid #f54133;
	}
`;

const TargetPieChart = (props) => {
  let allColors = [
    '#F44336',
    '#FF9800',
    '#FFEE58',
    '#D4E157',
    '#AED581',
    '#7CB342',
    '#689F38',
    '#33691E',
    '#4cbadb',
    '#efefef',
  ];

  const type = props.type || 'small';
  const currentLevelValue = Math.floor((props.levelValue * (dots[type].length - 1)) / 100);

  let _test = [];
  let _progress_val = 0;

  for (let i = 1; i <= currentLevelValue - 1; i++) {

    switch(i) {
      case 1:
      case 2:
      case 3:
        _progress_val = 4;
        break;
      case 6:
      case 8:
        _progress_val = 4;
        break;
      case 7:
        _progress_val = 3;
        break;
      case 4:
      case 5:
        _progress_val = 6; 
        break;
    }

    _test.push({
      value: _progress_val
    });
  }

  _test.push({
    value: props.levelValue - (currentLevelValue * 12)
  });

  _test.push({
    value: 100 - props.levelValue
  });

  let colors = allColors.slice(0, currentLevelValue);

  if (currentLevelValue < dots[type].length) colors.push('#efefef');

  return (
    <Container type={type}>
      <LevelCenter type={type}><div><p>{props.score}</p></div></LevelCenter>
      { dots[type].map((dot, i) => (
          <React.Fragment key={i}>
            <Dot 
              key={i} 
              type={type} 
              src={dotImg} 
              top={dot.top} 
              left={dot.left} 
              onClick={props.getOnTargetClickedHandler ? props.getOnTargetClickedHandler(i) : null}
            />
            { i === props.levelValue && (
              <Level
                type={type} 
                top={dot.top} 
                left={dot.left}
                backgroundColor={allColors[i]}
                >
                {i}
              </Level>
            )}
          </React.Fragment>
        ))
      }
      { targets[type].map((target, i) =>
        <Target key={i} type={type} src={targetImg} top={target.top} left={target.left} />
      )}
      <BasePieChart {...props} data={_test} colors={colors}/>
    </Container>
  );
};

TargetPieChart.propTypes = {
  type: PropTypes.string,
  step: PropTypes.number,
  score: PropTypes.number,
  level: PropTypes.number,
  levelValue: PropTypes.number,
  getOnTargetClickedHandler: PropTypes.function,
};

export default TargetPieChart;