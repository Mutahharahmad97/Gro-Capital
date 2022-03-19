import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Container, Row } from 'react-grid-system';

import Header from 'components/ContentTop';
import Ticket from 'components/landing/Ticket';
// eslint-disable-next-line import/extensions
import headerBg from 'images/landing/header-background.jpg';
import {
  clockImg,
  improveImg,
  upToImg,
  noCardImg,
  playImg
} from 'images/landing/tickets/index';

const StyledNotices = styled.div`
  height: 100px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.35);
  position: absolute;
  bottom: 0;
`;

const StyledPlayImg = styled.img`
  margin-top: 40px;
  width: 100px;

  @media (max-width: 440px) {
    margin-top: 20px;
  }
`;

const StyledCol = styled.div`
  align-items: center;
  display: flex;
  flex: 1 0 0px;
  justify-content: center;
  width: 25%;
`;

const LandingHeader = () => {
  return (
    <Header
      headerImg={headerBg}
      imgCorrection={'150px'}
      title={'Capital. Guidance. Success.'}
      titleMarginTop={'-20px'}
      subtitle={
        'Get a business loan in minutes and steps to improve your investability.'
      }
      extraMiddle={<StyledPlayImg src={playImg} />}
      extraItems={
        <StyledNotices>
          <Container>
            <Row nogutter>
              <StyledCol>
                <Ticket icon={upToImg} text={'Up to $500,000'} />
              </StyledCol>
              <StyledCol>
                <Ticket icon={clockImg} text={'Apply in minutes'} />
              </StyledCol>
              <StyledCol>
                <Ticket icon={noCardImg} text={"Won't impact your credit"} />
              </StyledCol>
              <StyledCol>
                <Ticket icon={improveImg} text={'Improve your investability'} />
              </StyledCol>
            </Row>
          </Container>
        </StyledNotices>
      }
    />
  );
};

LandingHeader.propTypes = {
  handleOnOpen: PropTypes.func
};

export default LandingHeader;
