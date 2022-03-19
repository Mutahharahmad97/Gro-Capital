/* eslint-disable import/extensions */
import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col, Hidden } from 'react-grid-system';
import { NavLink } from 'react-router-dom';
// import fbIcon from 'images/landing/footer/fb_icon.png';
// import lnIcon from 'images/landing/footer/ln_icon.png';

const FooterContainer = styled.div`
  background-color: #548c2c;
  min-height: 140px;
  font-family: Roboto, sans-serif;
  text-align: left;
  font-weight: 500;
`;

const GetLink = styled(NavLink)`
  color: #ffeb3b;
  font-size: 20px;
  text-decoration: none;
  margin: 0 10px;
  padding: 5px;
  display: inline-block;

  @media (max-width: 767px) {
    display: block;
  }
`;

const WhiteLink = GetLink.extend`
  color: white;
  margin: 0 10px;
`;

// const SocialContainer = styled.div`
//   position: absolute;
//   top: calc(50% - 18px);
//   right: 0;

//   & img {
//     height: 30px;
//   }

//   @media (max-width: 767px) {
//     top: calc(100% - 40px);
//     left: calc(50% - 34px);
//   }
// `;

const Copyright = styled.div`
  font-size: 15px;
  color: white;
  font-weight: 400;
  margin: 20px 0 20px 10px;
  @media (max-width: 767px) {
    text-align: center;
    line-height: 40px;
  }
`;

const AlignCenterSmCol = styled(Col)`
  @media (max-width: 767px) {
    text-align: center;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Container style={{ margin: '0 auto', padding: '30px 15px 20px' }}>
        <Row>
          <AlignCenterSmCol md={4} sm={12} style={{ paddingRight: 0 }}>
            {/* <GetLink to={"#"}>GET THE APP</GetLink>
              <GetLink to={"#"}>GET THE PLUGIN</GetLink> */}
            <Hidden xs sm>
              <Copyright style={{ marginTop: '10px' }}>
                Copyright Gro Capital Inc., {new Date().getFullYear()}
              </Copyright>
            </Hidden>
          </AlignCenterSmCol>
          <Col md={8} sm={12} style={{ textAlign: 'center' }}>
            {/* <WhiteLink to={"/faq"}>FAQ</WhiteLink> */}
            <WhiteLink to={'/terms'}>TERMS</WhiteLink>
            <WhiteLink to={'/privacy'}>PRIVACY</WhiteLink>
            {/* <WhiteLink to={"/contact-us"}>CONTACT US</WhiteLink> */}
          </Col>
        </Row>
        {/* <SocialContainer>
             <img src={fbIcon} alt="Facebook Icon" style={{marginRight: "20px"}}/>
            <img src={lnIcon} alt="Linkedin Icon"/>
           </SocialContainer> */}
        <Hidden md lg xl>
          <Copyright>
            Copyright Gro Capital Inc., {new Date().getFullYear()}
          </Copyright>
        </Hidden>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
