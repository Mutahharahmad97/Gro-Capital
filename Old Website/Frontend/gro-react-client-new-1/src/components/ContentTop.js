import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledTop = styled.div`
  height: calc(100vh - ${props => props.imgCorrection});
  width: 100%;
  background: url(${props => props.img}) no-repeat center;
  background-size: cover;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledMiddle = styled.div`
  width: 100%;
  min-height: 100px;
  margin-top: -45px;
  color: white;
  font-family: Roboto, serif;
  text-align: center;
`;

const StyledTitle = styled.div`
  font-size: 54px;
  font-weight: 900;
  margin-top: ${props => props.marginTop};
`;

const StyledSubtitle = styled.div`
  font-size: 24px;
  font-weight: 500;
  line-height: 22px;
`;

const ContentTop = (props) => {
  const marginTop = props.titleMarginTop || 'initial';
  return (
    <React.Fragment>
      <StyledTop img={props.headerImg} imgCorrection={props.imgCorrection}>
        <StyledMiddle>
          <StyledTitle marginTop={marginTop}>{props.title}</StyledTitle>
          <StyledSubtitle>{props.subtitle}</StyledSubtitle>
          {/* {props.extraMiddle} */}
        </StyledMiddle>
        {props.extraItems}
      </StyledTop>
    </React.Fragment>
  );
};

ContentTop.propTypes = {
  headerImg: PropTypes.string.isRequired,
  imgCorrection: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  extraMiddle: PropTypes.element,
  extraItems: PropTypes.element,
  titleMarginTop: PropTypes.string
};

export default ContentTop;
