import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isLoggedIn } from 'utils';
import LandingHeader from 'components/landing/LandingHeader';
import Content from 'components/landing/Content';
import Popup from 'components/Popup';
import Authentication from 'containers/auth/Authentication';
import { Redirect } from 'react-router-dom';

class LandingPage extends Component {
  constructor() {
    super();

    this.state = {
      authPopup: false
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.navClicked && !isLoggedIn()) {
      this.handleOnOpen();
    }
  };

  handleOnClose = () =>
    this.setState({ authPopup: false });

  handleOnOpen = () =>
    this.setState({ authPopup: true });

  render() {

    if (isLoggedIn()) return <Redirect to={{ pathname: '/dashboard' }} />;

    return (
      <React.Fragment>
        <LandingHeader />
        <Content />
        <div style={{ height: "240px" }} />
        {this.state.authPopup &&
          <Popup handleOnClose={this.handleOnClose}>
            <Authentication popup={true} />
          </Popup>
        }
      </React.Fragment>
    );
  }
}

LandingPage.propTypes = {
  auth: PropTypes.bool,
  navClicked: PropTypes.bool
};

// mapStateToProps = ({navigation}) => { navClicked: navigation.clicked}
function mapStateToProps({ navigation }) {
  return {
    navClicked: navigation.clicked
  };
}
export default connect(mapStateToProps)(LandingPage);
