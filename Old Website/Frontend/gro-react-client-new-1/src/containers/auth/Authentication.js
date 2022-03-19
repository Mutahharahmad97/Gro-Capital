import React, { Component } from 'react';
import styled from 'styled-components';
import { Container, Row, Col, Visible } from 'react-grid-system';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Redirect, Link } from 'react-router-dom';
import MdCheck from 'react-icons/lib/md/check';
import axios from 'axios';

import SocialAuth from 'containers/SocialAuth';

import SocialButton from 'components/auth/SocialButton';
import LoginInput from 'components/auth/LoginInput';
import Button from 'components/Button';

import { authActions } from 'actions/authActions';

import { socialAuthVars, apiVars } from 'config/env';
import { checkEmail, checkPassword } from 'utils';

const StyledAuthContainer = styled.div`
  font-family: Roboto, serif;
  max-width: 480px;
  margin: auto;
`;

const StyledTitle = styled.h1`
  color: #424242;
  font-size: 28px;
  font-weight: 300;
  letter-spacing: 2px;
  text-align: center;
  margin: 0;
`;

const StyledContainerDescription = styled.div`
  width: 340px;
  margin: 0px auto 30px;
`;

const StyledDescription = styled.p`
  height: 54px;
  color: #bdbdbd;
  font-size: 18px;
  font-weight: 300;
  padding-left: 40px;
`;

const StyledIcon = styled(MdCheck)`
  float: left;
  height: 54px;
  color: #8bc34a;
  font-size: 30px;
`;

class AuthPage extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      disabled: false,
      redirectToReferrer: false
    };
  }

  componentWillReceiveProps({ loggedIn }) {
    if (loggedIn) {
      this.setState({ redirectToReferrer: true });
    }
  }

  handleOnChange = (value, field) =>
    this.setState({ [field]: value }, () => this.checkValidity());

  checkValidity = () => {
    this.setState({
      disabled: !(
        checkEmail(this.state.email) && checkPassword(this.state.password)
      )
    });
  };

  getToken = (accessToken, provider, uid) => {
    let params = {
      accessToken
    };

    if (provider === 'google') {
      params = { access_token: accessToken };
    }

    // if (provider === 'facebook') {
    //   params = { access_token: accessToken };
    // }

    if (uid) params[`${provider}_uid`] = uid;

    axios
      .post(`${apiVars.url}/social_media/${provider}/userInfo`, { ...params })
      .then(response => {
        const socialResponse = {
          auth_token: response.data.data.auth_token,
          userId: response.data.data.userId,
          message: response.data.message,
          status: response.data.status
        };
        const register =
          response.data.message.indexOf('was added!') > -1 ||
          response.data.message.indexOf('create new user') > -1;
        this.props.actions.login(null, null, register, socialResponse);
      });

    // this.props.actions.login('temp', 'temp');
  };

  login = () =>
    this.props.actions.login(this.state.email, this.state.password);

  render() {
    let { from } = this.props.location.state || {
      from: { pathname: '/get-started' }
    };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      const profile = localStorage.getItem('profile');
      if (JSON.parse(profile).status === 'applied') {
        from = { pathname: '/dashboard' };
      }
      return <Redirect to={from} />;
    }

    return (
      <StyledAuthContainer>
        <StyledTitle>
          {this.props.popup ? 'FIRST, ' : ''}SIGNUP OR LOGIN
        </StyledTitle>
        <StyledContainerDescription>
          <StyledIcon />
          <StyledDescription>
            Creating an account is free and won’t affect your personal credit.
          </StyledDescription>
        </StyledContainerDescription>
        <SocialAuth
          appId={socialAuthVars['facebook'].appId}
          vendor={'facebook'}
          setToken={this.getToken}
        >
          <SocialButton
            icon={'facebook'}
            text="SIGN ON WITH FACEBOOK"
            color="#3C5A9A"
          />
        </SocialAuth>
        <SocialAuth
          appId={socialAuthVars['google'].appId}
          vendor={'google'}
          setToken={this.getToken}
        >
          <SocialButton
            icon={'google'}
            text="SIGN ON WITH GOOGLE"
            color="#8BC34A"
          />
        </SocialAuth>
        <SocialAuth
          noInit
          appId={socialAuthVars['linkedin'].appId}
          vendor={'linkedin'}
          setToken={this.getToken}
        >
          <SocialButton
            icon={'linkedin'}
            text="SIGN ON WITH LINKEDIN"
            color="#0172B1"
          />
        </SocialAuth>
        <LoginInput
          inputType="email"
          label={'Or enter your email address'}
          placeholder={'Enter Email'}
          value={this.state.email}
          onChange={e => this.handleOnChange(e.target.value, 'email')}
          bgColor={this.props.popup ? 'white' : '#f5f5f5'}
        />
        <LoginInput
          inputType={'password'}
          label={'And enter a password'}
          placeholder={'Enter Password'}
          value={this.state.password}
          onChange={e => this.handleOnChange(e.target.value, 'password')}
          bgColor={this.props.popup ? 'white' : '#f5f5f5'}
        />
        <Container style={{ textAlign: 'center' }}>
          <Row>
            <Col xs={12} sm={6}>
              <Link to="/signup">
                <Button text="CREATE ACCOUNT" bgColor={'#8BC34A'} />
              </Link>
              <Visible xs>
                <div style={{ height: '15px' }} />
              </Visible>
            </Col>
            <Col xs={12} sm={6}>
              <Button
                disabled={this.state.disabled}
                text="LOGIN"
                borderColor={'#8BC34A'}
                textColor={'#8BC34A'}
                onClick={this.login}
              />
            </Col>
          </Row>
        </Container>
      </StyledAuthContainer>
    );
  }
}

AuthPage.propTypes = {
  handleOnClose: PropTypes.func,
  popup: PropTypes.bool,
  actions: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object
};

// const mapStateToProps = ({ auth }) => {
//   return {
//     loggedIn: auth.loggedIn
//   };
// }
function mapStateToProps({ auth }) {
  return {
    loggedIn: auth.loggedIn
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(authActions, dispatch) };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AuthPage)
);
