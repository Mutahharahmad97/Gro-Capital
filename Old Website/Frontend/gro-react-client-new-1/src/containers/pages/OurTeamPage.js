import React from 'react';
import styled from 'styled-components';
//import PropTypes from 'prop-types';
import PageTitle from 'components/PageTitle';

const HeaderImg = styled.div`
  height: 300px;
  width: 100%;
  margin-top: -35px;
  background: url(${props => props.src}) no-repeat center;
  background-size: cover;
`;

const Hr = styled.div`
  border-bottom: 1px solid #dcdcdd;
  width: 93%;
  margin: 65px auto;
`;

// const Person = styled.div`
//   padding: 20px;
//   height: 200px;
//   max-width: 500px;
//   width: '100%';
//   margin: 10px auto;
// `;
const Image = styled.div`
  height: 200px;
  width: 200px;
  background: url(${props => props.src}) no-repeat center;
  background-size: cover;
  border-radius: 50%;
  margin: 10px 0;

  @media all and (min-width: 990px) {
    margin: 0 10px;
  }
`;
const Name = styled.div`
  font-size: 28px;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  font-family: Roboto;
  letter-spacing: 2px;
`;
const Title = styled.div`
  font-size: 20px;
  text-align: center;
  margin-top: 10px;
`;
const Description = styled.div`
  max-width: 500px;
  width: '100%';
  margin: 10px auto;
  line-height: 20px;
  letter-spacing: 1px;
  font-family: Roboto;
  font-weight: 300;
  font-size: 14px;
`;

const Person = styled.div`
  margin: 10px auto;
  max-width: 500px;
  padding: 20px;
`;

const PersonDetailsContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  @media all and (min-width: 990px) {
    flex-direction: row;
  }
`;

const PersonDetails = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const OurTeamPage = () => {
    return (
      <React.Fragment>
        <HeaderImg src={require('../../images/ourTeam-min.jpg')}/>
        <PageTitle style={{padding: 0, margin: 0}}>OUR TEAM</PageTitle>
        <Hr />
        {/* <Person>
          <PersonDetailsContainer>
            <Image align="right" src={require('../../images/team/blane.jpeg')}/>
            <PersonDetails>
              <Name>Blane Warrene</Name>
              <Title><i>Founder</i></Title>
            </PersonDetails>
          </PersonDetailsContainer>
          <Description>
            &nbsp;&nbsp;&nbsp;&nbsp;Recognized as an industry leader in financial services spanning marketing, compliance and technology. 
            Blane has worked in progressive roles for broker dealers, investment advisors and asset managers. 
            He founded, grew and sold Arkovi Social Media Archiving in 2012. <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;Blane also assisted in the growth and exit of MobileGuard to Smarsh in 2016. 
            Blane additionally serves on the board of the Dennison Railroad Depot Museum, a national historic landmark in Ohio.
          </Description>
        </Person> 
        <Hr /> */}
        <Person>
          <PersonDetailsContainer>
            <Image src={require('../../images/team/todd.jpg')}/>
            <PersonDetails>
              <Name>Todd Cohan</Name>
              <Title><i>Founder</i></Title>
            </PersonDetails>
          </PersonDetailsContainer>
          <Description>
            &nbsp;&nbsp;&nbsp;&nbsp;Mr. Cohan is a visionary entrepreneur with over 15 years of startup experience in information technology. 
            Prior to MobileGuard, Mr. Cohan successfully launched Metacom Technologies, which became the first 
            IBM Premier Business Partner for security solutions, which followed Mr. Cohan’s other startup – Sacure, a managed data security firm.
          </Description>
        </Person>
        <Hr />
        <Person>
          <PersonDetailsContainer>
            <Image align="right" src={require('../../images/team/troy.jpg')}/>
            <PersonDetails>
              <Name>Troy Do</Name>
              <Title><i>Engineer</i></Title>
            </PersonDetails>
          </PersonDetailsContainer>
        </Person>
        <Hr />
        <Person>
          <PersonDetailsContainer>
            <Image src={require('../../images/team/marius.png')}/>
            <PersonDetails>
              <Name>Furcic Marius</Name>
              <Title><i>Engineer</i></Title>
            </PersonDetails>
          </PersonDetailsContainer>
        </Person>
        <Hr />
        <Person>
          <PersonDetailsContainer>
            <Image align="right" src={require('../../images/team/duc.jpeg')}/>
            <PersonDetails>
              <Name>Duc Do</Name>
              <Title><i>Data Scientist</i></Title>
            </PersonDetails>
          </PersonDetailsContainer>
        </Person>
        <Hr />
        <Person>
          <PersonDetailsContainer>
            <Image src={require('../../images/team/Jack.jpeg')}/>
            <PersonDetails>
              <Name>Jack Litchfield</Name>
              <Title><i>Designer</i></Title>
            </PersonDetails>
          </PersonDetailsContainer>
        </Person>
      </React.Fragment>
    );
};

OurTeamPage.propTypes = {};

export default OurTeamPage;