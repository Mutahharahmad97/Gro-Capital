/* eslint-disable import/extensions */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  padding: 20px 35px;
  border-radius: 5px;
  font-size: 14px;
  p {
    color: ${props => props.status == 'paid' ? props.theme.greenColor : "white" };
  }
  p:nth-child(2) {
    font-size: 24px;
    margin-top: -12px;
    font-weight: 300;
    margin-bottom: 10px;
    letter-spacing: 4px;
  }
  background-color: ${props => props.status == 'paid' ? "white" : "#f54133"};
  font-family: ${props => props.theme.fontFamily};
`;

const ResourceItem = (props) => {
  return (
    <Container status={props.status || 'due'}>
      <p>{ props.status == "paid" ? "Paid on " : "Due " }{ props.date }</p>
      <p>{ props.sum }</p>
    </Container>
  );
};

ResourceItem.propTypes = {
  status: PropTypes.string,
  date: PropTypes.string,
  sum: PropTypes.string
};

export default ResourceItem;
