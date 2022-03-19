/* eslint-disable import/extensions */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import checkImg from 'images/resourceCheck.png';
import uncheckImg from 'images/resourceUncheck.png';

const Container = styled.div`
  padding: 20px 35px;
  border-radius: 5px;
  p {
    color: ${props => props.complete ? "#ecf4e4" : props.theme.lightBlack};
  }
  background-color: ${props => props.complete ? props.theme.lightGreenColor : "white"};
  font-family: ${props => props.theme.fontFamily};
`;

const Description = styled.p`
  font-size: 20px;
  line-height: 25px;
  margin: 10px 0;
  font-weight: 300;
`;

const DiamondContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 33%;
  div {
    background-color: ${props => props.complete ? "white" : props.theme.greyColor};
    transform: scaleY(1.5) rotateZ(45deg);
    height: 25px;
    width: 25px;
    position: relative;
  }
  p {
    position: absolute;
    color: ${props => props.complete ? props.theme.greenColor : "white"};;
    top: -10px;
    font-size: 14px;
    left: -3px;
    font-weight: 500;
    width: 30px;
    text-align: center;
  }
`;

const Footer = styled.div`
  margin-top: 20px;
  position: relative;
  padding: 30px 30px 10px;
  display: flex;
`;

const CheckUncheck = styled.div`
  width: 33%;
  img {
    width: 52px;
    margin-top: -13px;
  }
`;

const More = styled.div`
  color: ${props => props.complete ? "white" : props.theme.greenColor};
  font-size: 21px;
  width: 33%;
  display: inline-block;
  font-weight: 600;
  text-align: right;
  cursor: pointer;
`;

const ResourceItem = (props) => {
  const complete = props.status || false;
  return (
    <Container complete={complete}>
      <Description>{ props.text }</Description>
      <Footer>
        <DiamondContainer complete={complete}>
          <div/><p>+{props.points || 3}</p>
        </DiamondContainer>
        <CheckUncheck>
          <img src={complete ? checkImg : uncheckImg}/>
        </CheckUncheck>
        <More complete={complete}>MORE</More>
      </Footer>
    </Container>
  );
};

ResourceItem.propTypes = {
  status: PropTypes.bool,
  text: PropTypes.string,
  points: PropTypes.number
};

export default ResourceItem;
