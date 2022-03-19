import React from 'react';
import styled from 'styled-components';
//import PropTypes from 'prop-types';
import BarChart from 'react-bar-chart';

const Chart = styled.div`
  position: relative;
  width: 600px;
  margin: 30px auto;
  background-color: #dfdfdf;

  & rect {
    fill: rgb(52,102,204);
  }

  rect:hover {
    fill: rgb(52,102,204, 0.5);

  }

  .x.axis .tick:nth-child(2n) {
    display: none;
  }

  path {
    display: none;
  }
`;
const margin = {top: 20, right: 20, bottom: 30, left: 40};
const data = [
  {text: 320, value: 26.77},
  {text: 340, value: 25.81},
  {text: 360, value: 24.84},
  {text: 380, value: 23.87},
  {text: 400, value: 22.9},
  {text: 420, value: 21.85},
  {text: 440, value: 20.39},
  {text: 460, value: 19.42},
  {text: 480, value: 18.45},
  {text: 500, value: 17.47},
  {text: 520, value: 16.46},
  {text: 540, value: 15.49},
  {text: 560, value: 14.52},
  {text: 580, value: 14.03},
  {text: 600, value: 13.06},
  {text: 620, value: 12.13},
  {text: 640, value: 11.05},
  {text: 660, value: 10.56},
  {text: 680, value: 10.7},
  {text: 700, value: 9.58},
  {text: 720, value: 8.08},
  {text: 740, value: 7.46},
  {text: 760, value: 6.83},
  {text: 780, value: 6.19},
  {text: 800, value: 5.31},
];

const Title = styled.p`
  display: inline-block;
  margin-left: 45px;
`;

const Description = styled.p`
  margin-right: 20px;
  float: right;
  display: inline-block;
  font-size: 12px;
`;

const LoanFees = styled.div`
  position: absolute;
  top: calc(50% - 10px);
  left: 12px;
  transform: rotate(-90deg);
  font-size: 14px;
`;

const GroScore = styled.div`
  font-size: 14px;
  margin-top: -10px;
  text-align: center;
`;

class RatesPage extends React.Component {

  handleBarClick = () => {
  };

  render() {
    return (
      <React.Fragment>
        <Chart>
          <Title>Gro Score and Associated Loan Fees</Title>
          <Description>Gro Score / Loan Fees</Description>
          <BarChart ylabel=""
                    width={600}
                    height={500}
                    margin={margin}
                    data={data}
                    onBarClick={this.handleBarClick}/>
          <LoanFees>Loan fees</LoanFees>
          <GroScore>Gro Score</GroScore>
        </Chart>
      </React.Fragment>
    );
  }
}

RatesPage.propTypes = {};

export default RatesPage;
