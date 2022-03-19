import React, { Component } from 'react';
import styled from 'styled-components';
import { Alert, Card, Input, DatePicker } from 'antd';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { compose } from 'recompose';

import SocialAuth from 'containers/SocialAuth';

import SocialButton from 'components/auth/SocialButton';
import Button from 'components/Button';

import { authActions } from 'actions/authActions';

import { socialAuthVars, apiVars } from 'config/env';

import Wrapper from './Wrapper';

const StyledCard = styled(Card)`
  box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.2);
  border: none;

  .ant-card-body {
    padding: 0;
    min-height: 481px;
    border-radius: 5px;
    background-color: #ffffff;

    @media (min-width: 658px) {
      display: flex;
      width: 613px;
    }
  }
`;

const LeftSide = styled.div`
  flex: 1;
  padding: 16px 29px;
  font-family: Roboto;

  .title {
    color: #1b1b1b;
    font-size: 16px;
    font-weight: 500;
  }

  .subTitle {
    color: #777777;
    font-size: 10px;
  }

  .forms {
    .name-wrapper {
      display: flex;
      padding-top: 10px;
    }
  }
`;

const RightSide = styled.div`
  background-color: #f5f5f5;
  font-family: Roboto;
  display: flex;
  flex-direction: column;
  align-items: center;

  &::placeholder {
    color: #c2c2c2;
    font-size: 12px;
  }

  .social-container {
    padding: 0 26px;
  }

  .caption {
    color: #a0a0a0;
    font-size: 12px;
    text-align: center;
    margin-top: 66px;
    width: 168px;
  }

  p {
    font-size: 9px;
    width: 139px;
    text-align: center;
    line-height: 9px;
    font-weight: 500;
    margin-top: 9px;

    span {
      a {
        color: #98c25f;
      }
    }
  }
`;

const StyledDatePicker = styled(DatePicker)`
  margin-top: 20px;
`;

const StyledInput = styled(Input)`
  margin-top: 20px;

  &::placeholder {
    color: #c2c2c2;
    font-size: 12px;
    font-family: Roboto;
  }
`;

const StyledInputPassword = styled(Input.Password)`
  margin-top: 20px;

  &::placeholder {
    color: #c2c2c2;
    font-size: 12px;
    font-family: Roboto;
  }
`;

const StyledSocialButton = styled(SocialButton)`
  width: 177px;
  height: 27px;
  font-size: 9px;
  color: #ffffff;
  padding: 5px 0;

  span {
    font-size: 14px;
    top: 4px;
    line-height: 14px;
  }
`;

const StyledButton = styled(Button)`
  width: 139px;
  height: 35px;
  min-width: 139px;
`;

const StyledAlert = styled(Alert)`
  font-size: 12px;
  margin-top: 5px;

  &.ant-alert.ant-alert-no-icon {
    padding: 3px 15px;
  }
`;

class SignupPage extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      login: PropTypes.func.isRequired,
      register: PropTypes.func.isRequired
    }).isRequired,
    location: PropTypes.object.isRequired
  };

  state = {
    passwordNotMatched: false
  };

  componentWillReceiveProps({ loggedIn }) {
    if (loggedIn) {
      this.setState({ redirectToReferrer: true });
    }
  }

  getToken = (accessToken, provider, uid) => {
    let params = {
      accessToken
    };

    if (provider === 'google') {
      params = { access_token: accessToken };
    }

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
  };

  onChange = name => e =>
    this.setState({ [name]: e.target.value });

  onRegister = () => {
    const {
      firstName,
      lastName,
      email,
      birthDate,
      password,
      confirmPassword
    } = this.state;
    if (password !== confirmPassword) {
      this.setState({ passwordNotMatched: true });
      return;
    } else {
      this.setState({ passwordNotMatched: false });
    }
    this.props.actions.register({
      firstName,
      lastName,
      email,
      birthDate,
      password
    });
  };

  onChangeDate = (_, dateString) =>
    this.setState({ birthDate: dateString });

  render() {
    const { passwordNotMatched } = this.state;

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
      <Wrapper>
        <StyledCard>
          <LeftSide>
            <div className="title">Tell us about your company</div>
            <div className="subTitle">
              Creating an account is free and won’t affect your personal credit.{' '}
            </div>
            <div className="forms">
              <div className="name-wrapper">
                <StyledInput
                  placeholder="First Name"
                  style={{ marginRight: 5, width: 'calc(50% - 5px)' }}
                  onChange={this.onChange('firstName')}
                />
                <StyledInput
                  placeholder="Last Name"
                  style={{ marginLeft: 5, width: 'calc(50% - 5px)' }}
                  onChange={this.onChange('lastName')}
                />
              </div>
              <StyledDatePicker
                format="MM/DD/YYYY"
                placeholder="Birthdate"
                onChange={this.onChangeDate}
              />
              <StyledInput
                placeholder="Email"
                onChange={this.onChange('email')}
                type="email"
              />
              <StyledInputPassword
                placeholder="Password"
                onChange={this.onChange('password')}
              />
              <StyledInputPassword
                placeholder="Confirm Password"
                onChange={this.onChange('confirmPassword')}
              />
              {passwordNotMatched && (
                <StyledAlert
                  message="The passwords should be matched."
                  type="error"
                />
              )}
            </div>
          </LeftSide>
          <RightSide>
            <h4 className="caption">Sign in with social media</h4>
            <div className="social-container">
              <SocialAuth
                appId={socialAuthVars['facebook'].appId}
                vendor={'facebook'}
                setToken={this.getToken}
              >
                <StyledSocialButton
                  icon={'facebook'}
                  text="SIGN ON WITH FACEBOOK"
                  color="#425995"
                />
              </SocialAuth>
              <SocialAuth
                appId={socialAuthVars['google'].appId}
                vendor={'google'}
                setToken={this.getToken}
              >
                <StyledSocialButton
                  icon={'google'}
                  text="SIGN ON WITH GOOGLE"
                  color="#98C25F"
                />
              </SocialAuth>
              <SocialAuth
                noInit
                appId={socialAuthVars['linkedin'].appId}
                vendor={'linkedin'}
                setToken={this.getToken}
              >
                <StyledSocialButton
                  icon={'linkedin'}
                  text="SIGN ON WITH LINKEDIN"
                  color="#3170AC"
                />
              </SocialAuth>
            </div>
            <h1 className="caption">
              After logging in you will begin the application process
            </h1>
            <StyledButton
              bgColor="#98C25F"
              textColor="#ffffff"
              text="CREATE"
              onClick={this.onRegister}
            />
            <p>
              By clicking “Create” you agree to our{' '}
              <span>
                <Link to="/terms" target="_blank">Terms of Service</Link>
              </span>{' '}and{' '}
              <span>
                <Link to="/privacy" target="_blank">Privacy Policy</Link>
              </span>
            </p>
          </RightSide>
        </StyledCard>
      </Wrapper>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    loggedIn: auth.loggedIn
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(authActions, dispatch) };
}

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SignupPage);
