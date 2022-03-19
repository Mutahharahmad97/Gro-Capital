import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  padding: 30px 30px 60px;
  box-shadow: 0 1px 15px 1px rgba(0,0,0,0.15);
  width: 100%;
  margin-bottom: 22px;
  box-sizing: border-box;
  background-color: white;
  position: relative;
  border-radius: 5px;
  overflow: hidden;
`;

const H2 = styled.h2`
  color: ${props => props.theme.darkerBlack};
  font-weight: 300;
  letter-spacing: 3px;
  text-align: center;
  margin-top: 0;
`;

const Hr = styled.div`
  border-bottom: 1px solid ${props => props.theme.greyColor};
  margin-bottom: 20px;
`;

const ChartImg = styled.img`
  position: absolute;
  width: 40px;
  cursor: pointer;
  top: 25px;
  left: ${props => props.level ? 90 : 32}px;
`;

const EditImg = styled.img`
  position: absolute;
  width: 33px;
  right: 35px;
  top: 30px;
  cursor: pointer;
`;

const FilterImg = styled.img`
  float: left;
  width: 25px;
  cursor: pointer;
`;

const CloseImg = styled.img`
  float: right;
  width: 25px;
  cursor: pointer;
`;

const Controls = styled.div`
  position: absolute;
  right: 30px;
  width: 80px;
  top: 33px;
`;

const Level = styled.div`
  display: inline-block;
  background-color: #ffec38;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  text-align: center;
  line-height: 40px;
  font-weight: 600;
  font-size: 26px;
  margin-right: 20px;
  position: absolute;
  top: 25px;
`;

const PageBox = (props) => {
    return (
      <Container>
        {props.level && <Level>{props.level}</Level>}
        {props.icon && <ChartImg level={!!props.level} src={props.icon}/>}
        {props.edit && <EditImg src={props.edit}/>}
        {props.title && <H2>{props.title}</H2>}
        <Controls>
          {props.close && <CloseImg src={props.close} />}
          {props.filter && <FilterImg src={props.filter} />}
        </Controls>
        {props.hr && <Hr/>}
        {props.children}
      </Container>
    );
};

PageBox.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  edit: PropTypes.string,
  close: PropTypes.string,
  filter: PropTypes.string,
  hr: PropTypes.bool,
  children: PropTypes.node,
  level: PropTypes.number
};

export default PageBox;
