import React from "react";
//import styled from 'styled-components';
import PropTypes from "prop-types";
import PlaidLink from "react-plaid-link";
import axios from "axios";
import { apiVars } from "config/env";

class Plaid extends React.Component {
  handleOnSuccess = public_token => {
    const uid = localStorage.getItem("userId");
    axios
      .post(apiVars.url + "/banking/send_public_token", { uid, public_token })
      .then(
        () => this.props.validate(),
        () => {
          alert("Something went wrong");
          this.props.validate();
        }
      );
  };

  handleOnExit = () => {};

  render() {
    return (
      <PlaidLink
        clientName="Grocap"
        env="development"
        product={["auth", "transactions"]}
        publicKey="b1186880c7b5a7eda54882fe8eff5d"
        onExit={this.handleOnExit}
        onSuccess={this.handleOnSuccess}
      >
        {this.props.children}
      </PlaidLink>
    );
  }
}

Plaid.propTypes = {
  children: PropTypes.node,
  validate: PropTypes.func
};

export default Plaid;
