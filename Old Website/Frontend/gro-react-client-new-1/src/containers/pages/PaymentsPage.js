import React from 'react';
//import styled from 'styled-components';
//import PropTypes from 'prop-types';
import PageTitle from 'components/PageTitle';
import Masonry from 'components/Mansonry';
import PaymentItem from 'components/PaymentItem';
import {payment} from 'utils/payment';

class PaymentsPage extends React.Component {

  state = {
    payments: []
  };

  componentWillMount() {
    payment.all().then(result => this.setState({payments: result}));
  }

  render() {
    return (
      <React.Fragment>
        <PageTitle>PAYMENTS</PageTitle>
        <Masonry>
          { this.state.payments.map((item, index) => 
            <PaymentItem key={index} status={item.status} date={item.date} sum={item.sum} />
          )}
        </Masonry>
      </React.Fragment>
    );
  }
}

PaymentsPage.propTypes = {};

export default PaymentsPage;
