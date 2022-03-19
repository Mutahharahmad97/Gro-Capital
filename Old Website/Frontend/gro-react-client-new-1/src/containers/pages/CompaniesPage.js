import React from "react";
import DataTable from "./DashboardPage/DataTable";
import BoxContent from "./DashboardPage/BoxContent";
import styled from "styled-components";
import Box from "./DashboardPage/Box";
import axios from "axios";
import {apiVars} from "../../config/env";
import {Modal, Row, Col, Input, Button} from "antd";

import '../../styles/global.css';
import NewStakeholderForm from "./DashboardPage/NewStakeholderForm";
import {push} from "react-router-redux";

const Container = styled.div`
  max-width: 980px;
  width: 100%;
  font-family: ${props => props.theme.fontFamily};
  margin: 0 auto;
  min-height: calc(${window.innerHeight}px - 290px);

  .accordion {
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    .accordion__item {
      border-top: 1px solid rgba(0, 0, 0, 0.1);

      .accordion__title {
        padding: 0;
        &:hover {
          background-color: transparent;
        }

        &:focus {
          outline: none;
        }

        .accordion__arrow {
          margin-right: 10px;

          &::before,
          &::after {
            width: 15px;
            height: 4px;
          }

          &::before {
            left: 9px;
          }

          &::after {
            right: 9px;
          }
        }
      }

      .accordion__body {
        padding: 0 10px;
        margin-bottom: 20px;
      }
    }
  }
`;
// CompanyDAta b clear kravu pdse

class CompaniesList extends React.Component {
  state = {
    companyData: [],
    response: [],
    filteredData: [],
    isView: false,
    modelData: []
  };

  componentDidMount() {
    this.loadCompanies();
  }

  loadCompanies = () => {
    axios.get(apiVars.url + `/companies/`).then((result) => {
      let response = JSON.parse(JSON.stringify(result));
      if (response.data.status == "success") {
        this.setState({
          response: response.data.data.companies,
          filteredData: response.data.data.companies,
        });
      } else {
        //console.log(response.data);

      }
    }, (error) => {
      console.log(error);
    });
  };

  handleShowInfo = account => {
    var found = this.state.response.find(function (element) {
      return element.uid === account;
    });
    this.setState({
      isView: true,
      modelData: found,
      filteredData: [],
    });
  };

  handleCloseModal = () => {
    this.setState({
      isView: false,
      filteredData: [],
    });
  };


  // aa search nu fuc, 6e
  handleSearch = () => {
    let filteredData = [];
    this.setState({filteredData: [], companyData: []});
    let poetFilter = document.getElementById('searchVal').value;

    filteredData = this.state.response.filter((item) => {
      let company_name = item.company_name != null ? item.company_name.toLowerCase() : '';
      let loan_reason = item.loan_reason != null ? item.loan_reason.toLowerCase() : '';
        let poetName = company_name + item.company_phone + item.duns + loan_reason;
        return poetName.indexOf(
          poetFilter.toLowerCase()) !== -1;

    });
    this.setState({
      filteredData
    });
  };

  render() {
    //console.log("Test: ", this.state.filteredData);
    return (
      <div>
        {this.state.filteredData.length === 0 ? (
          this.state.filteredData > 0 ? '<div>Loading...</div>' : ''
        ) : (
          this.state.filteredData.map((items) => {
            this.state.companyData.push({
              uid: items.uid,
              company_name: items.company_name,
              company_phone: items.company_phone,
              duns: items.duns,
              loan_reason: items.loan_reason,
            });
          })
        )}
        <Box>
          <BoxContent>
            <div>
              <Row>
                <Col span={18}></Col>
                <Col span={5}>
                  <Input placeholder="Search" id="searchVal"/>
                </Col>
                <Col span={1}>
                  <Button type="primary" onClick={this.handleSearch}><i className="fa fa-search"></i></Button>
                </Col>
              </Row>
            </div>
            {this.state.companyData.length > 0 ?
            <DataTable
              columns={[
                {name: "uid", label: "#ID", className: "th-style hide-column"},
                {name: "company_name", label: "Company Name", className: "th-style"},
                {name: "company_phone", label: "Company Phone", className: "th-style"},
                {name: "duns", label: "DUNS No", className: "th-style"},
                {name: "loan_reason", label: "Loan Reason", className: "th-style"},
              ]}
              rows={this.state.companyData}
              onView={this.handleShowInfo}
            />
            : 'No any data found.'}
          </BoxContent>
          <Modal
            title="View Company Information"
            visible={this.state.isView}
            onOk={this.handleCloseModal}
            onCancel={this.handleCloseModal}
          >
            <Row>
              <Col span={12}><p><b>Company Name:</b> {this.state.modelData.company_name}</p></Col>
              <Col span={12}><p><b>Company Phone:</b> {this.state.modelData.company_phone}</p></Col>
            </Row>
            <Row>
              <Col span={12}><p><b>DUNS No:</b> {this.state.modelData.duns}</p></Col>
              <Col span={12}><p><b>Rating:</b> {this.state.modelData.rating}</p></Col>
            </Row>
            <Row>
              <Col span={24}><p><b>Accounting Account:</b> {this.state.modelData.accounting_account}</p></Col>
            </Row>
            <Row>
              <Col span={24}><p><b>Bank Account:</b> {this.state.modelData.bank_account}</p></Col>
            </Row>
            <Row>
              <Col span={24}><p><b>Annual Revenue:</b> {this.state.modelData.annual_revenue}</p></Col>
            </Row>
            <Row>
              <Col span={24}><p><b>Address:</b> {this.state.modelData.address}</p></Col>
            </Row>
            <Row>
              <Col span={8}><p><b>city:</b> {this.state.modelData.city}</p></Col>
              <Col span={8}><p><b>state:</b> {this.state.modelData.state}</p></Col>
              <Col span={8}><p><b>zipcode:</b> {this.state.modelData.zipcode}</p></Col>
            </Row>
            <Row>
              <Col span={12}><p><b>Ein:</b> {this.state.modelData.ein}</p></Col>
              <Col span={12}><p><b>Email Address:</b> {this.state.modelData.email_address}</p></Col>
            </Row>
            <Row>
              <Col span={24}><p><b>Industry:</b> {this.state.modelData.industry}</p></Col>
            </Row>
            <Row>
              <Col span={24}><p><b>Last Time Rating Fetched:</b> {this.state.modelData.last_time_rating_fetched}</p>
              </Col>
            </Row>
            <Row>
              <Col span={12}><p><b>Loan Amount Applied:</b> {this.state.modelData.loan_amount_applied}</p></Col>
              <Col span={12}><p><b>Loan Reason:</b> {this.state.modelData.loan_reason}</p></Col>
            </Row>
            <Row>
              <Col span={24}><p><b>Loan Type:</b> {this.state.modelData.loan_type}</p></Col>
            </Row>
            <Row>
              <Col span={24}><p><b>Structure:</b> {this.state.modelData.structure}</p></Col>
            </Row>
            <Row>
              <Col span={24}><p><b>Created At:</b> {this.state.modelData.created_at}</p></Col>
            </Row>
          </Modal>
        </Box>
      </div>
    );
  }
}

export default CompaniesList;
