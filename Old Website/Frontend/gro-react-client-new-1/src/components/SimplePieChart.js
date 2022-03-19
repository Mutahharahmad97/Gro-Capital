import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";

import BasePieChart from 'components/BasePieChart';

const Container = styled.div`
  position: relative;
`;

const Pagination = styled.div`
  position: absolute;
  top: calc(50% - 24px);
  left: calc(50% - 21px);
  font-size: 30px;
  color: ${props => props.theme.lightBlack};
`;

const SimplePieChart = (props) => {
  const value = props.current * 100 / props.total; // calculate percentage
  const colors = ['#8cc549', '#efefef']; // green and grey colors
  const data = [{value}, {value: 100 - value}];

  return (
    <Container>
      <BasePieChart data={data} colors={colors}/>
      <Pagination>
        {props.current}/{props.total}
      </Pagination>
    </Container>
  );
};

SimplePieChart.propTypes = {
  value: PropTypes.number,
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

export default SimplePieChart;
