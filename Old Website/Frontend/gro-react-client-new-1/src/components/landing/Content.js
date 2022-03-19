/* eslint-disable import/extensions */
import React from 'react';
import {Container, Row, Col, Hidden} from 'react-grid-system';
import {GetStarted, BiggerButton, StyledCol, /*CompaniesImg,*/ Hr, Img, SectionTitle, StyledRow,
  Subtitle, Title, WrapperContainer, /*Chart, ChartNumber,*/ LogoContainer, Map} from './Content.styles';
import { Link, withRouter } from 'react-router-dom';
import HowMuchBox from './howmuch/HowMuchBox';

// import Testimonials from 'components/landing/Testimonials';
import Button from 'components/Button';
import Annotation from 'components/Annotation';
import * as img from 'images/landing/index';
// import * as imgChart from 'images/landing/charts/index';
// import marius from 'images/marius.jpg';

const Content = withRouter(({ history }) => 

  // const testimonials = [
  //   { img: marius, text: "“Without Gro, I’d be ages behind, making mistakes left and right. It’s been my money and my guide.“",
  //     name: "Cuba Gooding Jr.", title: "CEO, Firebreak"
  //   },
  //   { img: marius, text: "“Without Gro, I’d be ages behind, making mistakes left and right. It’s been my money and my guide.“",
  //     name: "John Something", title: "CMO, Nowhere"
  //   },
  //   { img: marius, text: "“Without Gro, I’d be ages behind, making mistakes left and right. It’s been my money and my guide.“",
  //     name: "Harry Potter", title: "CTO, Everywhere"
  //   }
  // ];

   (
    <GetStarted>
      <Container>
        <Row>
          <Col md={5} offset={{md: 1}}>
            <Subtitle align={"center"}>
              Apply for a line of credit, or start improving your company’s investability.
            </Subtitle>
            <Link to="/get-started">
              <BiggerButton text="GET STARTED" bgColor={"#8BC34A"}/>
            </Link>
            <Annotation>
              *Applying won’t affect your<br/> personal credit.
            </Annotation>
          </Col>
          <Col md={5}>
            <Subtitle>
              Any one can lend you money. But can they also help you grow?
            </Subtitle>
            <Link to={'/learn-more'}>
              <BiggerButton text={"LEARN MORE"} borderColor={"#8BC34A"} textColor={"#8BC34A"}/>
            </Link>
          </Col>
        </Row>
      </Container>
      <WrapperContainer>
        {/* <CompaniesImg src={img.featuredIn}/> */}
        <Hr/>
        <Container>
          <SectionTitle>HOW GRO WORKS</SectionTitle>
          <StyledRow align={"center"}>
            <Col md={6}>
              <Title align={"right"} marginTop={"25px"}>Access to Credit</Title>
              <Subtitle align={"right"}>We provide a line of credit of up to<Hidden xs><br/></Hidden> $500,000. Apply in minutes! (It won’t <Hidden xs><br/></Hidden>impact your personal credit).</Subtitle>
              <Link to="/login">
                    <Button text={"APPLY FOR CREDIT"} bgColor={"#8BC34A"}/>
                  </Link>
            </Col>
            <Col md={4}>
              <HowMuchBox onChange={()=>history.push('/login')} />
            </Col>
          </StyledRow>
          <StyledRow align={"center"} margin>
            <Col md={6}>
              <Img src={img.investability} alt="Investability"/>
            </Col>
            <StyledCol leftAlign={"flex-start"} md={6}>
              <Title align={"left"}>Improve Your<br/> Investability</Title>
              <Subtitle align={"left"}>As you improve your investability, your rate<Hidden xs><br/></Hidden> drops and your line of credit increases.<Hidden xs><br/></Hidden> The higher your investability score, the<Hidden xs><br/></Hidden> more likely we may invest!</Subtitle>
              <Row align={"center"}>
                <StyledCol justify={"center"} offset={{ xs: 0 }}>
                  <Link to="/login">
                    <Button text={"REGISTER YOUR COMPANY"} bgColor={"#8BC34A"}/>
                  </Link>
                </StyledCol>
                {/* <Col md={6} style={{textAlign: "left"}}>
                  <NoBgButton >FIND COMPANIES</NoBgButton>
                </Col> */}
              </Row>
            </StyledCol>
          </StyledRow>
          <StyledRow align={"center"} margin>
            <Col md={6}>
              <Title align={"right"}>Guidance and Resources</Title>
              <Subtitle align={"right"}>We give you suggested steps to become<Hidden xs><br/></Hidden> more investable, have a glossary for<Hidden xs><br/></Hidden> complex terms, and so much more.</Subtitle>
              <StyledRow justify={"flex-end"}>
                <StyledCol rightAlign={"flex-end"}>
                  <Link to="/login" style={{ margin: '0 0 24px' }}>
                    <Button text={"CREATE A COMPANY"} bgColor={"#8BC34A"}/>
                  </Link>
                </StyledCol>
                {/* <Col md={5}>
                  <NoBgButton>FIND COMPANIES</NoBgButton>
                </Col> */}
              </StyledRow>
            </Col>
            <Col md={6}>
              <Img src={img.guidance} alt="Guidance and Resources"/>
            </Col>
          </StyledRow>
        </Container>
        {/* <Hr/>
        <Container>
          <SectionTitle>TESTIMONIALS</SectionTitle>
          <Testimonials items={testimonials} />
        </Container>
        <Hr/>
        <Container>
          <SectionTitle>WE'VE FUNDED</SectionTitle>
          <CompaniesImg src={img.fundedCompanies}/>
          <StyledRow>
            <Col md={4} sm={12}>
              <Chart>
                <img src={imgChart.withdrawn} alt="Withdrawn"/>
                <ChartNumber>$143M</ChartNumber>
                <div>Withdrawn to date</div>
              </Chart>
            </Col>
            <Col md={4} sm={12}>
              <Chart>
                <img src={imgChart.companies} alt="Companies"/>
                <ChartNumber>1,461</ChartNumber>
                <div>Companies we’ve funded.</div>
              </Chart>
            </Col>
            <Col md={4} sm={12}>
              <Chart>
                <img src={imgChart.improve} alt="Improve"/>
                <ChartNumber>94%</ChartNumber>
                <div>of companies improve<Hidden xs><br/></Hidden>their investability.</div>
              </Chart>
            </Col>
          </StyledRow>
        </Container> */}
        <Hr/>
        <Container>
          <StyledRow align={"center"} margin>
            <Col md={6}>
              <Img src={img.phoneArea} alt="Phone Area"/>
            </Col>
            <Col md={6}>
              <Title marginTop={"24px"} align={"left"}>Gro on the Go</Title>
              <Subtitle align={"left"}>
                Withdraw money, get advice, assess your<Hidden xs><br/></Hidden>
                finances, and more from anywhere you are<Hidden xs><br/></Hidden>
                with The Gro app.<Hidden xs><br/></Hidden><br/> Coming Soon to App Store and Google Play!
              </Subtitle>
              <LogoContainer>
                <img src={img.apple} alt={"Apple logo"}/>
                <img src={img.android} alt={"Android logo"}/>
              </LogoContainer>
            </Col>
          </StyledRow>
          <StyledRow align={"center"} margin>
            <Col md={5}>
              <Title align={"right"}>Gro Online</Title>
              <Subtitle align={"right"}>
                With our free Gro Chrome Extension, you can get more currated tools to help you grow faster and rate sites around the web.
              </Subtitle>
              <StyledRow justify={"flex-end"}>
                <StyledCol rightAlign={"flex-end"} style={{ margin: '0 0 24px' }}>
                  <Button text={"COMING SOON"} bgColor={"#8BC34A"}/>
                </StyledCol>
              </StyledRow>
            </Col>
            <Col md={7}>
              <Img src={img.computerArea} alt="Computer area"/>
            </Col>
          </StyledRow>
        </Container>
        <Hr/>
        <Container>
          <Map src={img.map} />
          <Row>
            <Col md={9}>
              <Subtitle align={"left"} style={{fontSize: "24px"}}>
                If you need simple to understand credit or suggested steps on how to<Hidden xs><br/></Hidden>
                improve your company’s investability, then Gro is the perfect tool for your company.<Hidden xs><br/></Hidden>
                Get started for free, no credit card required, and only pay whenever you need capital.
              </Subtitle>
            </Col>
            <Col md={3} style={{textAlign: "center"}}>
              <Link to="/get-started"><Button text={"GET STARTED"} bgColor={"#8BC34A"}/></Link>
              <Annotation style={{marginLeft: "25px"}}>
                *Applying won’t affect your<br/> personal credit.
              </Annotation>
            </Col>
          </Row>
        </Container>
      </WrapperContainer>
    </GetStarted>
  ));

export default Content;
