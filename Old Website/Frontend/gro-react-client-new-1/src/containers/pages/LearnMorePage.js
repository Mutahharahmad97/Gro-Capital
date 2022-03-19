/* eslint-disable import/extensions */
import React, { Component } from 'react';
import styled from 'styled-components';

import ContentTop from 'components/ContentTop';
import Box from "components/Box";
import Slider from "containers/Slider";
import Button from 'components/Button';
import Annotation from 'components/Annotation';

import bgImg from 'images/meeting.jpg';
import cashLine from 'images/icons/cash.svg';
import arrowRight from 'images/icons/arrow_right.svg';
import arrowLeft from 'images/icons/arrow_left.svg';
import companies from 'images/icons/companies.svg';
// import { push } from 'react-router-redux';
// import { Redirect } from 'react-router';

const MainContainer = styled.div`
  margin-top: -130px;

  @media (max-width: 520px) {
    margin-top: -110px;
  }

  @media (max-height: 600px) {
    margin-top: -30px;
  }
`;

const BoxImg = styled.img`
  height: 100px;
`;

const Description = styled.div`
  font-size: 23px;
  margin-top: 40px;
  font-weight: 300;
`;

const LearnMoreBox = styled(Box)`
  min-height: 500px;
`;

const Buttons = styled.div`
  & button {
    margin-top: 30px;
  }
`;

const Back = styled.img`
  width: 40px;
  display: block;
  margin: 20px 0 0 -20px;
  padding: 5px;
  cursor: pointer;
`;

class LearnMorePage extends Component {
  home = "/";
  getStarted = "/get-started";

  render() {
    return (
      <React.Fragment>
        <ContentTop
          headerImg={bgImg}
          imgCorrection={'283px'}
          title={"Line of Credit + Guidance"}
          subtitle={"We improve your investability and can get you a line of credit or even equity capital."}
        />
        <MainContainer>
          <Slider itemWidth={800} page={'learnMore'}>
            <LearnMoreBox>
              <BoxImg src={cashLine} />
              <Description>
                Gro provides eligible companies a line of credit based on how investable they are,
                and then we guide you to improve over time.
              </Description>
              <Buttons>
                <Button text={"NEXT"} borderColor={"#8BC34A"} textColor={"#8BC34A"} bgColor={"white"} icon={arrowRight} dataNav={"next"} /><br />
                <Button text="GET STARTED" bgColor={"#8BC34A"} onClick={this.getStarted} />
                <Annotation>
                  *Applying won’t affect your<br /> personal credit.
                </Annotation>
              </Buttons>
            </LearnMoreBox>
            <LearnMoreBox>
              <BoxImg src={companies} />
              <Description>
                Investability is simple a numerical assessment based on how many
                milestones you’ve accomplished that make your company stronger.
              </Description>
              <Buttons>
                <Button text={"NEXT"} borderColor={"#8BC34A"} textColor={"#8BC34A"} bgColor={"white"} icon={arrowRight} dataNav={"next"} /><br />
                <Button text="SEE EXAMPLES" bgColor={"#8BC34A"} />
                <Back dataNav={"prev"} src={arrowLeft} />
              </Buttons>
            </LearnMoreBox>
            <LearnMoreBox>
              <BoxImg src={cashLine} />
              <Description>
                Gro provides eligible companies a line of credit based on how investable they are,
                and then we guide you to improve over time.
              </Description>
              <Buttons>
                <Button text={"FINISHED"} borderColor={"#8BC34A"} textColor={"#8BC34A"} bgColor={"white"} onClick={this.home} /><br />
                <Button text="GET STARTED" bgColor={"#8BC34A"} />
                <Back dataNav={"prev"} src={arrowLeft} />
              </Buttons>
            </LearnMoreBox>
          </Slider>
        </MainContainer>
      </React.Fragment>
    );
  }
}

LearnMorePage.propTypes = {};

export default LearnMorePage;
