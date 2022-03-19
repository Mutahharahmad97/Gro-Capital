import React from 'react';
import PropTypes from 'prop-types';
import Guest from 'containers/navigation/Guest';
import LoggedIn from 'containers/navigation/LoggedIn';
import {connect} from "react-redux";
import { withRouter } from 'react-router-dom';

class Navigation extends React.Component {
  render() {
    return (
      <React.Fragment>
        {this.props.isLoggedIn ? <LoggedIn/> : <Guest/>}
      </React.Fragment>
    );
  }
}

Navigation.propTypes = {
  isLoggedIn: PropTypes.bool
};

function mapStateToProps({ auth }) {
  return {
    isLoggedIn: auth.loggedIn
  };
}

export default withRouter(connect(mapStateToProps)(Navigation));

