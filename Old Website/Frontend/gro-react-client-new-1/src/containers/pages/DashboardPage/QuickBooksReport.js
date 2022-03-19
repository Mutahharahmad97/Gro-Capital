/* eslint "import/extensions": "off" */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';

import { apiVars } from 'config/env';

import qbReportIcon from 'images/quickbooks_report.png';
import quickBooksImg from 'images/quickBooks.png';

const Wrapper = styled.div`
  display: flex;
  position: relative;
  border: 1px solid #eeeeee;
  border-radius: 3px;
  background-color: #fafafa;
  width: 49%;
  margin-right: 2%;
  padding: 6px 8px 10px;

  img {
    width: 40px;
    height: 50px;
    margin-right: 10px;
  }

  .report-title {
    color: #424242;
    font-family: Roboto;
    font-size: 11px;
    font-weight: bold;
  }

  .report-content {
    flex: 1;
  }

  .report-fields {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
    width: 100%;

    .header {
      color: #bdbdbd;
      font-family: Roboto;
      font-size: 9px;
      font-weight: 500;
      line-height: 11px;
    }
    .value {
      color: #616161;
      font-family: Roboto;
      font-size: 10px;
      line-height: 11px;
    }
  }

  i {
    color: #e0e0e0;
    cursor: pointer;
    position: absolute;
    top: 5px;
    right: 5px;
  }
`;

const QuickBooksWrapper = styled.div`
  display: flex;
  position: relative;
  border: 1px solid #eeeeee;
  border-radius: 3px;
  background-color: #fafafa;
  width: 49%;
  margin-right: 2%;
  padding: 6px 8px 10px;
  cursor: pointer;
  height: 71px;

  img {
    max-width: 100%;
    max-height: 100%;
    margin: auto;
  }
`;

class QuickBooksReport extends Component {
  static propTypes = {
    reportName: PropTypes.string,
    startDate: PropTypes.string,
    account: PropTypes.string,
    onRemove: PropTypes.func.isRequired,
    validate: PropTypes.func
  };

  connect = () => {
    this.loginWindow = window.open(
      '',
      'Connect to QuickBooks',
      'status=1,width=600,height=650'
    );
    const req = axios.get(apiVars.url + '/accounting/connectToQuickbooks');
    req.then(response => {
      this.loginWindow.location = response.data.data;
      this.startChecking();
    });
  };

  startChecking = () => {
    const i = setInterval(() => {
      if (this.checkValidation()) {
        clearInterval(i);
      }
    }, 500);
  };

  checkValidation = () => {
    if (localStorage.getItem('accountingToken')) {
      this.props.validate();
      return true;
    }
    return false;
  };

  render() {
    const { reportName, startDate, account, onRemove } = this.props;

    if (!reportName) {
      return (
        <QuickBooksWrapper>
          <img onClick={this.connect} src={quickBooksImg} />
        </QuickBooksWrapper>
      );
    }

    return (
      <Wrapper>
        <img src={qbReportIcon} />
        <div className="report-content">
          <div className="report-title">QuickBooks Report</div>
          <div className="report-fields">
            <div>
              <div className="header">Report Name</div>
              <div className="value">{reportName}</div>
            </div>
            <div>
              <div className="header">Start Date</div>
              <div className="value">{startDate}</div>
            </div>
            <div>
              <div className="header">Account</div>
              <div className="value">{account}</div>
            </div>
          </div>
        </div>
        <i className="fas fa-times-circle" onClick={onRemove} />
      </Wrapper>
    );
  }
}

export default QuickBooksReport;
