import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Container = styled.div`
  margin: 0 0 2em;
  height: 100px;
  width: 100%;
  text-align: center;
  padding: 1em;
  margin: 0 auto 1em;
  display: inline-block;
  vertical-align: middle;
  margin-top: calc(50vh - 50px);
`;

const Loader = styled.div`
  margin-top: 10px;
  margin-bottom: -20px;
`;

const Background = styled.div`
  display: ${props => props.show ? "block":"none"};
  width: 100%;
  height: 100vh;
  background-color: #ffffffe3;
  z-index: 1000;
  position: fixed;
  top: 0;
  font-family: ${props => props.theme.fontFamily};
`;

const Message = styled.div`
  font-size: 24px;
`;

const LoadingScreen = (props) => {
  return (
    <Background show={props.show}>
      <Container>
        <Message>
          {props.message || "Loading"}
          <Loader>
            <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
            width="24" height="30" viewBox="0 0 24 30">
                <rect y="13" width="4" height="5" fill="#548c2c">
                    <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0s"
                    dur="0.6s" repeatCount="indefinite" />
                    <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0s"
                    dur="0.6s" repeatCount="indefinite" />
                </rect>
                <rect x="10" y="13" width="4" height="5" fill="#548c2c">
                    <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.15s"
                    dur="0.6s" repeatCount="indefinite" />
                    <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.15s"
                    dur="0.6s" repeatCount="indefinite" />
                </rect>
                <rect x="20" y="13" width="4" height="5" fill="#548c2c">
                    <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.3s"
                    dur="0.6s" repeatCount="indefinite" />
                    <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.3s"
                    dur="0.6s" repeatCount="indefinite" />
                </rect>
            </svg>
          </Loader>
          <p style={{fontSize: '18px'}}>please wait</p>
        </Message>
      </Container>
    </Background>
  );
};

LoadingScreen.propTypes = {
  message: PropTypes.string,
  show: PropTypes.bool
};

function mapStateToProps({ loading }) {
  return {
    show: loading.show
  };
}

export default connect(mapStateToProps)(LoadingScreen);