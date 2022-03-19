import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {bindActionCreators} from "redux";
import styled from "styled-components";
import {Modal} from "antd";
import moment from "moment";

import {profileActions} from "actions/profileActions";
import {companyActions} from "actions/companyActions";
import {notificationActions} from "actions/notificationActions";

import ScorePie from "components/ScorePie";
import QuestionSelect from "components/QuestionSelect";
import QuickBooks from "containers/QuickBooks";
import Plaid from "containers/Plaid";

import {UploadField} from "@navjobs/upload";
import uploadFile from "utils/upload";
import {getStartedData} from "store/dataSource";
import {getBalanceSheetReport, getDocuments} from "utils/accounting";
import {getAccounts, deleteAccount} from "utils/banking";
import {
  getStakeholders,
  createStakeholder,
  deleteStakeholder,
  updateCompany,
  updateCompanyDetails,
  updateCompanyLoan
} from "utils/company";
import {getScore} from "utils/score";
import {Validation} from "../GetStartedPage.styles";

import Box from "./Box";
import BoxHeader from "./BoxHeader";
import BoxContent from "./BoxContent";
import CompanyInfoContent from "./CompanyInfoContent";
import DataTable from "./DataTable";
import FormField from "./FormField";
import LinkButton from "./LinkButton";
import PersonalInfoContent from "./PersonalInfoContent";
import QuickBooksReport from "./QuickBooksReport";
import SupportSection from "./SupportSection";
import Title from "./Title";
import NewStakeholderForm from "./NewStakeholderForm";

const Container = styled.div`
  display: flex;
  margin: 15px auto;
  max-width: 990px;
  width: 100%;

  @media all and (max-width: 820px) {
    display: block;
  }
`;

const Section = styled.div`
  flex: ${props => (props.left ? 2 : 1)};
`;

const ProfilePicture = styled.div`
  background: url(${props => props.src}) center no-repeat;
  background-size: cover;
  height: 100px;
  width: 100px;
  border-radius: 50%;
  margin: 0 auto;
`;

const UploadPhoto = styled(UploadField)`
  height: 128px;
  width: 128px;
`;

const StyledSelect = styled(QuestionSelect)`
  margin: 10px 5px !important;
`;

const UploadedFiles = styled.div`
  margin-top: 10px;
  h3 {
    margin-bottom: 0;
  }
  p {
    margin-bottom: 0;
  }
`;

class DashboardPage extends React.Component {
  state = {
    // Data
    bankAccounts: [],
    stakeholders: [],
    newStakeholder: {},
    isStakeholderCreating: false,
    score: 0,
    qbReport: {},

    // Fields
    profile: this.props.profile || "",
    first_name: this.props.first_name || "",
    last_name: this.props.last_name || "",
    email: this.props.email || "",
    birthday: this.props.birthday || "",
    driverLicense: this.props.driverLicense || "",
    ssn: this.props.ssn || "",

    company_name: this.props.company_name || "",
    ein: this.props.ein || "",
    duns: this.props.duns || "",
    rating: this.props.rating || "",
    last_time_rating_fetched: this.props.last_time_rating_fetched || "",
    address: this.props.address || "",
    city: this.props.city || "",
    state: this.props.state || "",
    zipcode: this.props.zipcode || "",
    loan_amount_applied: this.props.loan_amount_applied || "",
    loan_reason: this.props.loan_reason || "",
    loan_type: this.props.loan_type || "",
    uploadedFiles: [],

    dunsInvalid: false,
    einInvalid: false
  };

  componentWillMount() {
    this.props.actions.loadCompany();
    getScore().then(result => {
      this.setState({
        score: result.data.gro_score
      });
    });

    // Accounting (Quickbooks)
    this.qbConnected = Boolean(localStorage.getItem("accountingToken"));
    if (this.qbConnected) {
      this.loadQBReport();
    }
    this.loadQBDocuments();

    // Banking (bank accounts)
    this.loadBankAccounts();

    // Stakeholders (+10% equity)
    getStakeholders().then(result => {
      if (result.status === 200) {
        const stakeholders = result.data.data.stakeholders
          .sort((a, b) => b.percentage - a.percentage)
          .map(item => ({
            ...item,
            percentage: `${item.percentage}%`
          }));
        this.setState({stakeholders});
      }
    });
  }

  componentDidMount() {
    this.reader = new FileReader();
    this.reader.onload = event => {
      this.setState({
        loading: true
      });
      uploadFile(event.target.result)
        .then(response => response.json())
        .catch(() => {
          this.setState({
            loading: false
          });
          alert("Something went wrong");
        })
        .then(resp => {
          this.setState(
            {
              profile: resp.secure_url,
              loading: false
            },
            () => this.props.actions.saveProfile(this.state)
          );
        });
    };
  }

  componentWillReceiveProps(props) {
    if (this.props.company_name !== props.company_name) {
      this.setState({
        ...props
      });
    }

    // We need to recheck all values, we receive these props later
    for (let i = 0; i < this.userKeys.length; i++) {
      if (props[this.userKeys[i]] != this.props[this.userKeys[i]]) {
        this.setState({
          [this.userKeys[i]]: props[this.userKeys[i]]
        });
      }
    }
  }

  userKeys = [
    "first_name",
    "last_name",
    "email",
    "birthday",
    "driverLicense",
    "ssn",
    "profile"
  ];

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  onEditClick = key =>
    this.setState({
      [key]: !this.state[key]
    });

  onSaveClick = info => {
    let profile = {};
    switch (info) {
      case "PROFILE":
        this.userKeys.map(
          key =>
            (profile = {
              ...profile,
              [key]: this.state[key]
            })
        );
        this.props.actions.saveProfile(profile);
        break;
      case "COMPANY":
        updateCompany(
          this.state.company_name,
          this.state.address,
          this.state.city,
          this.state.state,
          this.state.zipcode
        );
        updateCompanyDetails(this.state.ein, this.state.duns);
        break;
      case "LOAN":
        updateCompanyLoan(
          this.props.loan_amount_applied,
          this.props.loan_type,
          this.props.loan_reason
        );
        break;
      case "STAKEHOLDER":
        this.state.stakeholders.forEach(item => {
          createStakeholder(
            {
              ...item,
              percentage: parseFloat(item.percentage)
            },
            true
          );
        });
        break;
    }
  };

  handleResponse = response => {
    this.setState({
      uploadedFiles: [...this.state.uploadedFiles, response.original_filename]
    });
  };

  validateInput = (input, value) => {
    if (input == "ein") {
      this.setState({
        einInvalid: !/^\d{2}-\d{7}$/.test(value)
      });
    }
    if (input == "duns") {
      this.setState({
        dunsInvalid: !/^\d{9}$/.test(value)
      });
    }
  };

  handleRemoveAccount = account => {
    deleteAccount(account.account_id).then(() => {
      const bankAccounts = this.state.bankAccounts.filter(
        item => item.account_id !== account.account_id
      );
      this.setState({bankAccounts});
    });
  };

  handleAddStakeholder = () =>
    this.setState({isStakeholderCreating: true, newStakeholder: {}});

  handleCloseStakeholder = () =>
    this.setState({isStakeholderCreating: false});

  handleCreateStakeholder = () => {
    const {newStakeholder, stakeholders} = this.state;
    const percentage = parseFloat(newStakeholder.percentage);
    if (percentage < 10) {
      this.props.actions.showAlert(
        "You cannot add stakeholders with less than 10% of equity!"
      );
      this.setState({isStakeholderCreating: false});
      return;
    }
    stakeholders.push({
      ...newStakeholder,
      percentage: newStakeholder.percentage.endsWith("%")
        ? newStakeholder.percentage
        : `${newStakeholder.percentage}%`
    });
    this.setState({isStakeholderCreating: false, stakeholders});
    createStakeholder({
      ...newStakeholder,
      percentage: parseFloat(newStakeholder.percentage)
    });
  };

  handleChangeStakeholder = (value, index) => {
    const stakeholders = this.state.stakeholders.slice();
    stakeholders[index].percentage = value.endsWith("%") ? value : `${value}%`;
    this.setState({stakeholders});
  };

  handleChangeNewStakeholder = e => {
    const newStakeholder = this.state.newStakeholder;
    newStakeholder[e.target.name] = e.target.value;
    this.setState({newStakeholder});
  };

  handleRemoveStakeholder = stakeholder => {
    deleteStakeholder(stakeholder);
    const stakeholders = this.state.stakeholders.filter(
      item => item !== stakeholder
    );
    this.setState({stakeholders});
  };

  handleRemoveQBReport = () => {
    this.setState({qbReport: {}});
    localStorage.removeItem("accountingToken");
    localStorage.removeItem("accountingRealmId");
  };

  blurSecret = str => {
    return str.toString().replace(/\d(?=\d{4})/g, "*");
  };

  loadBankAccounts = () => {
    getAccounts().then(result => {
      if (result.data && result.data.length) {
        const bankAccounts = result.data.map(item => {
          const {routing, number} = item;
          return {
            ...item,
            routing: this.blurSecret(routing),
            number: this.blurSecret(number)
          };
        });
        this.setState({bankAccounts});
      }
    });
  };

  loadQBReport = () => {
    getBalanceSheetReport().then(result => {
      const {data} = result;
      this.setState({
        qbReport: {
          reportName: data.report_name,
          startDate: data.startPeriod,
          account: data.account
        }
      });
    });
  };

  loadQBDocuments = () => {
    getDocuments().then(result => {
      if (result.status === 200) {
        const documents = result.data;
        this.setState({uploadedFiles: documents.map(item => item.name)});
      }
    });
  };

  render() {

    const {qbReport} = this.state;
    return (
      <Container>
        <Section left>
          <Box>
            <BoxHeader>
              <Title>Personal Information</Title>
              <LinkButton
                isEditing={this.state.isPersonalEnabled}
                onEdit={() => this.onEditClick("isPersonalEnabled")}
                onSave={() => {
                  this.onSaveClick("PROFILE");
                  this.onEditClick("isPersonalEnabled");
                }}
              />
            </BoxHeader>
            <BoxContent flex>
              <UploadPhoto
                onFiles={files => this.reader.readAsDataURL(files[0])}
                containerProps={{
                  className: "resume_import",
                  style: {
                    flex: 0,
                    padding: "10px 20px 6px 6px",
                    position: "relative"
                  }
                }}
                uploadProps={{accept: ".png, .gif, .jpg, .jpeg"}}
              >
                <ProfilePicture src={this.state.profile}/>
                {this.state.loading && (
                  <p
                    style={{
                      color: "#666",
                      margin: "2px 0 -11px 0",
                      textAlign: "center",
                      lineHeight: "13px",
                      height: "28px"
                    }}
                  >
                    uploading...
                  </p>
                )}
              </UploadPhoto>
              <PersonalInfoContent>
                <FormField
                  isEnabled={this.state.isPersonalEnabled}
                  label="First Name"
                  name="first_name"
                  onChange={this.onChange}
                  type="text"
                  value={this.state.first_name}
                />
                <FormField
                  isEnabled={this.state.isPersonalEnabled}
                  label="Last Name"
                  name="last_name"
                  onChange={this.onChange}
                  type="text"
                  value={this.state.last_name}
                />
                <FormField
                  isEnabled={this.state.isPersonalEnabled}
                  label="Email"
                  name="email"
                  onChange={this.onChange}
                  type="email"
                  value={this.state.email}
                />
                <FormField
                  isEnabled={this.state.isPersonalEnabled}
                  label="DOB"
                  name="birthday"
                  onChange={this.onChange}
                  type="date"
                  value={moment(this.state.birthday).format("MM/DD/YYYY")}
                />
                <FormField
                  isEnabled={this.state.isPersonalEnabled}
                  label="Driver License"
                  name="driverLicense"
                  onChange={this.onChange}
                  type="text"
                  value={this.state.driverLicense}
                />
                <FormField
                  isEnabled={this.state.isPersonalEnabled}
                  label="SSN"
                  name="ssn"
                  onChange={this.onChange}
                  type="text"
                  value={this.state.ssn}
                />
              </PersonalInfoContent>
            </BoxContent>
          </Box>
          <Box>
            <BoxHeader>
              <Title>Company Information</Title>
              <LinkButton
                isEditing={this.state.isCompanyEnabled}
                onEdit={() => this.onEditClick("isCompanyEnabled")}
                onSave={() => {
                  if (this.state.einInvalid) return;
                  if (this.state.dunsInvalid) return;
                  this.onSaveClick("COMPANY");
                  this.onEditClick("isCompanyEnabled");
                }}
              />
            </BoxHeader>
            <BoxContent>
              <CompanyInfoContent>
                <FormField
                  isEnabled={this.state.isCompanyEnabled}
                  label="Company Name"
                  name="company_name"
                  onChange={this.onChange}
                  type="text"
                  value={this.state.company_name}
                  width="30%"
                />
                <FormField
                  isEnabled={this.state.isCompanyEnabled}
                  label="EIN"
                  maxLength={10}
                  name="ein"
                  onChange={e => {
                    if (!/^[0-9-]{0,10}$/.test(e.target.value)) return;
                    this.props.actions.updateCompany(e.target.value, "ein");
                    this.onChange(e);
                    this.validateInput("ein", e.target.value);
                  }}
                  placeholder={"Enter EIN"}
                  type="text"
                  value={this.props.ein}
                  width="30%"
                />
                <FormField
                  isEnabled={this.state.isCompanyEnabled}
                  label="DUNS"
                  maxLength={9}
                  name="duns"
                  onChange={e => {
                    if (!/^\d{0,9}$/.test(e.target.value)) return;
                    this.props.actions.updateCompany(e.target.value, "duns");
                    this.onChange(e);
                    this.validateInput("duns", e.target.value);
                  }}
                  placeholder={"Enter DUNS Number"}
                  value={this.props.duns}
                  width="40%"
                />
                <FormField
                  label="Business Rating"
                  name="rating"
                  value={this.props.rating}
                  width="30%"
                />
                <FormField
                  label="Last Fetched Date"
                  name="last_time_rating_fetched"
                  value={this.props.last_time_rating_fetched}
                  width="30%"
                />
                <FormField
                  label="Experian Score"
                  name="rating"
                  value="-"
                  width="40%"
                />
                <FormField
                  isEnabled={this.state.isCompanyEnabled}
                  label="Street Address"
                  name="address"
                  onChange={this.onChange}
                  type="text"
                  value={this.state.address}
                  width="50%"
                />
                <FormField
                  isEnabled={this.state.isCompanyEnabled}
                  label="City"
                  name="city"
                  onChange={this.onChange}
                  type="text"
                  value={this.state.city}
                  width="20%"
                />
                <FormField
                  isEnabled={this.state.isCompanyEnabled}
                  label="State"
                  name="state"
                  onChange={this.onChange}
                  type="text"
                  value={this.state.state}
                  width="15%"
                />
                <FormField
                  isEnabled={this.state.isCompanyEnabled}
                  label="ZIP Code"
                  name="zipcode"
                  onChange={this.onChange}
                  type="text"
                  value={this.state.zipcode}
                  width="15%"
                />
                <Validation dashboard invalid={this.state.einInvalid}>
                  Please enter a valid format: XX-XXXXXXX (X represents a digit)
                </Validation>
                <Validation dashboard invalid={this.state.dunsInvalid}>
                  Please enter a valid DUNS Number (9 digits)
                </Validation>
              </CompanyInfoContent>
            </BoxContent>
          </Box>
          <Box>
            <BoxHeader>
              <Title>Banking Information</Title>
              <div className="action-buttons">
                <Plaid validate={this.loadBankAccounts}>Add Account</Plaid>
              </div>
            </BoxHeader>
            <BoxContent>
              <DataTable
                columns={[
                  {name: "name", label: "Account Name"},
                  {name: "routing", label: "Routing"},
                  {name: "number", label: "Account"}
                ]}
                rows={this.state.bankAccounts}
                onRemove={this.handleRemoveAccount}
              />
            </BoxContent>
          </Box>
          <Box>
            <BoxHeader>
              <Title>Accounting Information</Title>
            </BoxHeader>
            <BoxContent flex padded>
              <QuickBooksReport
                reportName={qbReport.reportName}
                startDate={qbReport.startDate}
                account={qbReport.account}
                onRemove={this.handleRemoveQBReport}
                validate={this.loadQBReport}
              />
              <QuickBooks
                isDashboard
                connected={true}
                handleResponse={this.handleResponse}
                validate={() => {
                }}
              />
            </BoxContent>
            {this.state.uploadedFiles.length > 0 && (
              <UploadedFiles>
                <h3>Uploaded documents:</h3>
                {this.state.uploadedFiles.map((file, index) => (
                  <p key={index}>{file}</p>
                ))}
              </UploadedFiles>
            )}
          </Box>
          <Box>
            <BoxHeader>
              <Title>Company Stakeholders</Title>
              <LinkButton
                isEditing={this.state.isStakeholderEnabled}
                onEdit={() => this.onEditClick("isStakeholderEnabled")}
                onSave={() => {
                  this.onEditClick("isStakeholderEnabled");
                  this.onSaveClick("STAKEHOLDER");
                }}
              />
              <div className="action-buttons">
                <button onClick={this.handleAddStakeholder}>
                  Add Stakeholder
                </button>
              </div>
            </BoxHeader>
            <BoxContent>
              <DataTable
                columns={[
                  {
                    name: "name",
                    label: "Name"
                  },
                  {
                    name: "percentage",
                    label: "% Owned",
                    className: "center",
                    isEditable: true
                  }
                ]}
                rows={this.state.stakeholders}
                isEditing={this.state.isStakeholderEnabled}
                onChange={this.handleChangeStakeholder}
                onRemove={this.handleRemoveStakeholder}
              />
            </BoxContent>
            <Modal
              title="Add New Stakeholder"
              visible={this.state.isStakeholderCreating}
              onOk={this.handleCreateStakeholder}
              onCancel={this.handleCloseStakeholder}
            >
              <NewStakeholderForm
                stakeholder={this.state.newStakeholder}
                onChange={this.handleChangeNewStakeholder}
              />
            </Modal>
          </Box>
        </Section>
        <Section>
          <Box>
            <BoxHeader>
              <Title>Investability</Title>
            </BoxHeader>
            <BoxContent>
              <ScorePie levelValue={this.state.score}/>
            </BoxContent>
          </Box>
          <Box>
            <BoxHeader>
              <Title>Capital Needed</Title>
              <LinkButton
                isEditing={this.state.isCapitalEnabled}
                onEdit={() => this.onEditClick("isCapitalEnabled")}
                onSave={() => {
                  this.onEditClick("isCapitalEnabled");
                  this.onSaveClick("LOAN");
                }}
              />
            </BoxHeader>
            <BoxContent>
              <CompanyInfoContent>
                <FormField
                  isEnabled={this.state.isCapitalEnabled}
                  label="Amount"
                  name="amount"
                  component={
                    <StyledSelect
                      name={"amount"}
                      options={getStartedData.loan_amount_applied.options}
                      placeholder={
                        getStartedData.loan_amount_applied.placeholder
                      }
                      selectedOption={this.props.loan_amount_applied}
                      handleChange={e =>
                        this.props.actions.updateCompany(
                          e.value,
                          "loan_amount_applied"
                        )
                      }
                    />
                  }
                  onChange={() => {
                  }}
                  value={
                    getStartedData.loan_amount_applied.values[
                      this.props.loan_amount_applied
                      ]
                  }
                  width="50%"
                />
                <FormField
                  isEnabled={this.state.isCapitalEnabled}
                  label="Type"
                  name="type"
                  component={
                    <StyledSelect
                      name={"type"}
                      options={getStartedData.loan_type.options}
                      placeholder={getStartedData.loan_type.placeholder}
                      selectedOption={this.props.loan_type}
                      handleChange={e =>
                        this.props.actions.updateCompany(e.value, "loan_type")
                      }
                    />
                  }
                  onChange={() => {
                  }}
                  value={getStartedData.loan_type.short[this.props.loan_type]}
                  width="50%"
                />
                <FormField
                  isEnabled={this.state.isCapitalEnabled}
                  label="Reason"
                  name="reason"
                  component={
                    <StyledSelect
                      name={"reason"}
                      options={getStartedData.loan_reason.options}
                      placeholder={getStartedData.loan_reason.placeholder}
                      selectedOption={this.props.loan_reason}
                      handleChange={e =>
                        this.props.actions.updateCompany(e.value, "loan_reason")
                      }
                    />
                  }
                  onChange={() => {
                  }}
                  value={
                    getStartedData.loan_reason.values[this.props.loan_reason]
                  }
                  width="100%"
                />
              </CompanyInfoContent>
            </BoxContent>
          </Box>
          <Box>
            <BoxHeader>
              <Title>Support</Title>
            </BoxHeader>
            <BoxContent>
              <SupportSection>
                <h3>Help Center</h3>
                <Link to="/faq" target="_blank">
                  <i className="fas fa-chevron-right"/>
                  &nbsp; Frequently Asked Questions
                </Link>
              </SupportSection>
              <SupportSection>
                <h3>Contact Us</h3>
                <a href="mailto:support@gro.capital">support@gro.capital</a>
              </SupportSection>
            </BoxContent>
          </Box>
        </Section>
      </Container>
    );
  }
}

DashboardPage.propTypes = {
  loan_amount_applied: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  loan_type: PropTypes.string,
  actions: PropTypes.object,
  profile: PropTypes.string,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  email: PropTypes.string,
  birthday: PropTypes.string,
  driverLicense: PropTypes.string,
  ssn: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  loan_reason: PropTypes.string,
  company_name: PropTypes.string,
  address: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,

  zipcode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ein: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  duns: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  rating: PropTypes.string,
  last_time_rating_fetched: PropTypes.string,
};

function mapStateToProps(state) {
  const {profile, company} = state;
  console.log("profile =>",profile);
  return {
    first_name: profile.first_name,
    last_name: profile.last_name,
    email: profile.email,
    ssn: profile.ssn,
    birthday: profile.birthday,
    driverLicense: profile.driverLicense,
    profile: profile.profile,

    company_name: company.company_name,
    ein: company.ein,
    duns: company.duns,
    rating: company.rating,
    last_time_rating_fetched: company.last_time_rating_fetched,
    address: company.address,
    city: company.city,
    state: company.state,
    zipcode: company.zipcode,
    loan_amount_applied: company.loan_amount_applied,
    loan_reason: company.loan_reason,
    loan_type: company.loan_type
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        ...profileActions,
        ...companyActions,
        ...notificationActions
      },
      dispatch
    )
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
