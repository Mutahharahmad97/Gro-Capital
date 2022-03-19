import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledPieChart = styled(PieChart)`
  margin: 0 auto;
`;

const BasePieChart = (props) => {
  // const step = props.step || 0;
  // const data = [{value: steps[step]}, {value: 100 - steps[step]}];
  const type = props.type || 'small';
  return (
    <StyledPieChart width={type === 'small' ? 200 : 315} height={type === 'small' ? 200 : 300}>
      <Pie
        dataKey={'value'}
        data={props.data}
        cx={type === 'small' ? 95 : 150}
        cy={type === 'small' ? 95 : 150}
        startAngle={240}
        endAngle={-60}
        innerRadius={type === 'small' ? 50 : 110}
        outerRadius={type === 'small' ? 70 : 125}
      >
        { props.data.map((entry, index) => {
          // let _fill = props.colors[index % props.colors.length];
          // if (index === props.data.length - 1) _fill = props.colors[props.colors.length - 1];
          return <Cell key={index} fill={props.colors[index % props.colors.length]}/>;
        })
        }
      </Pie>
    </StyledPieChart>
  );
};

BasePieChart.propTypes = {
  data: PropTypes.array.isRequired,
  colors: PropTypes.array.isRequired,
  type: PropTypes.string
};

export default BasePieChart;
