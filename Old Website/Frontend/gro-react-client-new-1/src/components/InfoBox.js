/* eslint "import/extensions": "off" */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import editIcon from 'images/editIcon.png';
import saveIcon from 'images/saveIcon.svg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  justify-content: space-between;
  margin: 25px 0;
  max-width: 100%;
  width: 100%;

  @media all and (min-width: 820px) {
    max-width: 48%;
    flex: 1 1 48%;
  }
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  @media all and (min-width: 820px) {
    flex-direction: ${props => props.row ? 'row' : 'column'};
  }
`;

const TitleContainer = styled.div`
  align-items: center;
  display: flex;
  margin: 0 0 20px;
`;

const Title = styled.h1`
  flex: 1;
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  padding: 0;
  text-align: center;
  text-transform: uppercase;
`;

const IconContainer = styled.span`
  cursor: pointer;
  flex: 0;
  outline: 0;
  height: 24px;

  &:focus {
    outline: 0;
  }
`;

const Icon = styled.img`
  ${props => props.invalid ? 'opacity: 0.3' : ''};
  height: 20px;
  width: 20px;
`;

const InfoBox = props => (
  <Container>
    <TitleContainer>
      <Title>{props.title}</Title>
      {props.icons &&
        <IconContainer>
          {props.isEnabled 
            ? <Icon invalid={props.invalid} src={saveIcon} onClick={props.onSaveClick} />
            : <Icon invalid={props.invalid} src={editIcon} onClick={props.onEditClick} />
          }
        </IconContainer>
      }
    </TitleContainer>
    <Content row={props.row}>
      {props.children}
    </Content>
  </Container>
);

InfoBox.propTypes = {
  title: PropTypes.string,
  saveHandler: PropTypes.func,
  children: PropTypes.node,
  row: PropTypes.bool,
  icons: PropTypes.bool,
  isEnabled: PropTypes.bool,
  onSaveClick: PropTypes.func,
  onEditClick: PropTypes.func,
  invalid: PropTypes.bool,
};

export default InfoBox;