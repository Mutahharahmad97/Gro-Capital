import styled from 'styled-components';
import Box from 'components/Box';
import Button from 'components/Button';

export const GetStartedBox = styled(Box)`
  min-height: ${props => props.height || 600}px;
  padding: 0;
  position: relative;
  margin-top: ${props => (600 - (props.height || 600)) / 2}px;

  .second-banking {
    text-align: center;
    margin-top: 20px;

    div {
      display: inline-block;

      span {
        color: #8bc34a;
        font-size: 16px;
        margin-left: 5px;
      }

      button {
        background: transparent !important;
        border: none !important;
        border-radius: 0 !important;

        span {
          color: #8bc34a;
          font-size: 16px;
        }
      }
    }
  }
`;

export const Content = styled.div`
  margin-top: 30px;
  width: calc(100% - 220px);
  /* width: 100%; */
  float: right;
`;

export const RightSide = styled.div`
  width: 37%;
  background-color: whitesmoke;
  float: right;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  padding: 30px;
  box-sizing: border-box;
  text-align: left;
  color: ${props => props.theme.lightBlack};
`;

export const LeftSide = styled.div`
  width: 63%;
  float: left;
  padding: 30px;
  box-sizing: border-box;
  position: relative;
  min-height: ${props => props.height || 600}px;
`;

export const Question = styled.div`
  font-size: 20px;
  font-weight: ${props => props.bold ? 500 : 300};
  text-align: left;
  color: ${props => props.theme.darkerBlack};
  padding: 0 8px 20px 10px;
`;

export const SubQuestion = Question.extend`
  font-size: 16px;
  line-height: 20px;

  & p {
    margin-top: 0;
    margin-bottom: 5px;
  }
`;

export const Back = styled.div`
  background: url(${props => props.src}) no-repeat center;
  height: 40px;
  width: 40px;
  position: absolute;
  bottom: 50px;
  left: 50px;
  box-sizing: border-box;
  cursor: pointer;
`;

export const Next = styled(Button)`
  height: 50px;
  position: absolute;
  bottom: 50px;
  right: 50px;
  font-size: 20px;

  & img {
    width: 22px;
    margin-top: 5px;
  }
`;

export const Skip = styled.div`
  position: absolute;
  bottom: 65px;
  right: 20px;
  font-size: 15px;
  float: right;
  color: #868686;

  & a {
    color: #868686;
  }
`;

export const Pagination = styled.div`
  color: ${props => props.theme.lightGreyColor};
  text-align: right;
`;

export const Information = styled.div`
  padding: 20px;
`;

export const InfoItem = styled.div`
  margin-top: 20px;
`;

export const ItemImg = styled.div`
  background: url(${props => props.src}) no-repeat;
  background-size: cover;
  background-position-y: ${props => props.pos}px;
  height: 60px;
  width: 50px;
  float: left;
  display: inline-block;
`;

export const ItemText = styled.div`
  text-align: left;
  font-size: 14px;
  float: left;
  display: inline-block;
  width: 130px;
  margin-left: 22px;
  padding-top: ${props => props.paddingTop || 0}px;
  color: ${props => props.theme.lightBlack};
`;

export const Label = styled.div`
  font-size: 14px;
  margin-top: 15px;
  font-weight: 300;
`;

export const Value = styled.div`
  font-size: 20px;
`;

export const CompaniesIllustration = styled.img`
  width: 180px;
  height: 180px;
  margin: 0 auto 30px;
`;

export const CompanyInput = styled.input`
  border-radius: 4px;
  text-indent: 15px;
  padding: 5px;
  height: 42px;
  width: 100%;
  font-size: 18px;
  margin-top: 25px;
  font-weight: 300;
  color: ${props => props.theme.darkerBlack};
  border: 1px solid #ccc;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${props => props.theme.lightGreyColor};
  }
`;

export const BankList = styled.div`
  cursor: pointer;
  img {
    width: 100%;
  }
  p {
    color: ${props => props.theme.darkerBlack};
    font-size: 16px;
  }
`;

export const TermItem = styled.div`
  position: relative;
  text-align: left;
  padding: 0 40px;

  h3 {
    font-size: 14px;
    font-weight: 300;
    margin-top: -10px;
    color: ${props => props.theme.lightBlack};
  }
  h2 {
    font-size: 19px;
    font-weight: 400;
  }
`;

export const TermIcon = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  width: 35px;
`;

export const Validation = styled.div`
  visibility: ${props => (props.invalid ? 'visible' : 'hidden')};
  display: ${props => (props.invalid ? 'block' : 'none')};
  color: red;
  font-size: 12px;
  text-align: left;
  text-indent: -10px;
  height: 20px;
  width: 90%;
  margin: ${props => (!props.dashboard ? '0 auto -20px auto' : '0 15px')};
`;

export const Validations = styled.div`
  visibility: ${props => (props.invalid ? 'visible' : 'hidden')};
  display: ${props => (props.invalid ? 'block' : 'none')};
  color: red;
  font-size: 12px;
  text-align: left;
  text-indent: -10px;
  height: 20px;
  width: 90%;
  margin: ${props => (!props.dashboard ? '0 auto -7px auto' : '0 15px')};
`;

export const Other = styled.input`
  margin: 20px 0 0 0;
  height: 42px;
  width: 100%;
  bottom: 0;
  left: 0;
  lineHeight: 34px;
  right:0;
  top: 0;
  maxWidth: 100%;
  whiteSpace: nowrap;
  border-radius: 4px;
  text-indent: 15px;
  padding: 5px;
  font-size: 18px;
  font-weight: 300;
  color: ${props => props.theme.darkerBlack};
  border: 1px solid #ccc;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${props => props.theme.lightGreyColor};
  }
`;

export const Textarea = styled.textarea`
  margin: 30px 0 0 0;
  height: 100px;
  width: 100%;
  bottom: 0;
  left: 0;
  lineHeight: 34px;
  right:0;
  top: 0;
  maxWidth: 100%;
  whiteSpace: nowrap;
  border-radius: 4px;
  text-indent: 15px;
  padding: 5px;
  font-size: 18px;
  font-weight: 300;
  color: ${props => props.theme.darkerBlack};
  border: 1px solid #ccc;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${props => props.theme.lightGreyColor};
  }
`;

export const Send = styled(Button)`
  height: 50px;
  bottom: 50px;
  right: 50px;
  font-size: 20px;
  position: absolute;

  & img {
    width: 22px;
    margin-top: 5px;
  }
`;


export const DunsNo = styled.label`
  float: left;
  width: 100%;
  margin-bottom:10px;
   display: ${props => (props.invalid ? 'block' : 'none')};
`;
