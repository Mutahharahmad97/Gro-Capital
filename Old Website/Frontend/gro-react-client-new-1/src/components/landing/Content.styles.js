import styled from 'styled-components';
import Button from "components/Button";
import {Row} from "react-grid-system";

export const GetStarted = styled.div`
  text-align: center;
  margin-top: 30px;
  font-family: Roboto, serif;
`;

export const Title = styled.div`
  font-size: 54px;
  color: #424242;
  font-weight: 300;
  margin-bottom: 10px;
  line-height: 55px;
  ${props => props.marginTop ? `margin-top: ${props.marginTop}` : ''};

  @media (min-width: 720px) {
    text-align: ${props => props.align || 'left'};
    margin-top: 0;
  }

  @media (max-width: 767px) {
    font-size: 48px;
  }
`;

export const Subtitle = styled.div`
  font-size: 23px;
  font-weight: 300;
  color: #424242;
  margin-bottom: 20px;
  @media (min-width: 720px) {
    text-align: ${props => props.align};
  }
  
  @media (max-width: 767px) {
    font-size: 20px;
  }
`;

export const BiggerButton = styled(Button)`
  height: 60px;
  padding: 0 60px;
  font-weight: 600;
  font-size: 24px;
`;

export const CompaniesImg = styled.div`
  height: 76px;
  width: 100%;
  background: url(${props => props.src}) no-repeat center;
  background-size: contain;
  margin: 32px auto;
`;

export const Hr = styled.div`
  border-bottom: 1px solid #dcdcdd;
  width: 93%;
  margin: 65px auto;
`;

export const SectionTitle = styled.div`
  font-size: 56px;
  font-weight: 900;
  letter-spacing: 0.8px;
  text-align: center;
  color: #dcdcdd;
  margin-bottom: 80px;
  
  @media (max-width: 767px) {
    font-size: 51px;
  }
`;

export const WrapperContainer = styled.section`
  width: 100%;
  box-sizing: border-box;
  @media (min-width: 720px) {
    padding: 0 80px;
    text-align: right;
  }
`;

export const NoBgButton = styled.div`
  color: #8BC34A;
  font-size: 19px;
  cursor: pointer;
  font-weight: bold;
  line-height: 45px;
  text-decoration: none;
`;

export const Img = styled.img`
  width: 100%;
  @media (min-width: 720px) {
    float: ${props => props.direction || "left"};
    padding: 0 25px;
    box-sizing: border-box;
  }
`;

export const StyledRow = styled(Row)`
  ${props => props.margin ? `margin-top: 80px;` : ''}
  justify-content: ${props => props.justify || 'inherit'};
`;

export const Chart = styled.div`
  text-align: center;
  font-size: 23px;
  font-family: Roboto, sans-serif;
  font-weight: 300;
  margin-bottom: 30px;
  
  & img {
    width: 100%;
    padding: 30px 30px 0;
    box-sizing: border-box;
  }
`;

export const ChartNumber = styled.div`
  font-size: 54px;
`;

export const LogoContainer = styled.div`
  text-align: center;
  & img {
    width: 70px;
    margin: 0 25px;
    
    &:first-child {
      margin: 0 25px 0 0;
    }
  }
  @media (min-width: 767px) {
    text-align: left;
  }
`;

export const Map = styled.div`
  width: 100%;
  height: 420px;
  background: url(${props => props.src}) no-repeat top center;
  background-size: contain;
  box-sizing: border-box;
  margin: 85px 0;
  
  @media (max-width: 767px) {
    height: 160px;
  }
`;

export const StyledCol = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: ${props => props.justify || 'inherit'};
  overflow: visible;
  padding: 0 15px;
  position: relative;
  width: 100%; 
  
  @media all and (min-width: 990px) {
    align-items: ${props => props.leftAlign || props.rightAlign || props.align || 'flex-start'};
    flex: 0 0 ${props => (props.md * 100 / 12)}%;
    width: auto;
  }
`;