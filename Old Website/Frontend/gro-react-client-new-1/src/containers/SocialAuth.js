import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { socialAuth } from "utils/socialAuth";

const Wrapper = styled.div`
  opacity: ${props => props.disabled ? 0.5 : 1};
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
`;

class SocialAuth extends Component {

  state = {
    initialized: false,
  };

  componentDidMount() {

    // We need to create a copy of socialAuth object, otherwise we'll override the same object
    this.socialAuth = Object.assign({}, socialAuth);
    
    this.socialAuth.init(this.props.vendor, {appId: this.props.appId}, () => {
      this.setState({initialized: true});
    }, this.props.noInit);
  }

  socialAuth = [];

  handleLogin = () => {
    this.socialAuth.doLogin()
      .then(({token, uid = 0}) => {
        this.props.setToken(token, this.props.vendor, uid);
      });
  };

  render() {
    return (
      <React.Fragment>
        <Wrapper onClick={this.handleLogin} disabled={!this.state.initialized}>
          {this.props.children}
        </Wrapper>
      </React.Fragment>
    );
  }
}

SocialAuth.propTypes = {
  appId: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
  vendor: PropTypes.string.isRequired,
  setToken: PropTypes.func.isRequired,
  noInit: PropTypes.bool
};

export default SocialAuth;
