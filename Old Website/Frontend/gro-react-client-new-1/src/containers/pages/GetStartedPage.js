/* eslint-disable import/extensions */
import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import Slider from 'containers/Slider';
import Investability from 'containers/Investability';
import DriverLicenseDropzone from 'components/DriverLicenseDropzone';
import QuestionSelect from 'components/QuestionSelect';
import TargetPieChart from 'components/TargetPieChart';
import ClearBoth from 'components/ClearBoth';
import backImg from 'images/backArrow.png';
import rightTile from 'images/RightTile.png';
import arrowRight from 'images/rightWhiteArrow.png';
import companiesIllustrationImg from 'images/companiesIllustration.png';
// import personalProfileImg from 'images/personalProfile.png';
import QuickBooks from 'containers/QuickBooks';
import cashIcon from 'images/cashIcon.png';
import banksListImg from 'images/banksList.png';
import termIcon from 'images/termIcon.png';
import {getStartedData, sliderData, sliderTitles} from 'store/dataSource';
import {loanActions} from 'actions/loanActions';
import {sliderActions} from 'actions/sliderActions';
import {companyActions} from 'actions/companyActions';
import {menuActions} from 'actions/menuActions';
import {profileActions} from 'actions/profileActions';
import {scoreActions} from 'actions/scoreActions';

import {getDocuments} from 'utils/accounting';
import {getAccounts} from 'utils/banking';
import {updateUserStatus, updateUser} from 'utils/user';
import {applicationLinks} from '../../store/dataSource';
import {
  updateCompany,
  updateCompanyDetails,
  updateCompanyLoan,
  sendAccountingToken
} from 'utils/company';
import placesApi from 'utils/places';
// import { loanRequest } from "utils/loan";
// import SocialButton from 'components/auth/SocialButton';
import Plaid from 'containers/Plaid';
import '../../styles/global.css';
import {apiVars} from '../../config/env';
import newApplicatioNotification from '../../utils/milestones';

import {
  GetStartedBox,
  Back,
  CompaniesIllustration,
  CompanyInput,
  Content,
  InfoItem,
  Information,
  ItemImg,
  ItemText,
  Label,
  LeftSide,
  Next,
  Pagination,
  Question,
  RightSide,
  /*Skip,*/ SubQuestion,
  Value,
  BankList,
  TermIcon,
  TermItem,
  Validation,
  Validations,
  DunsNo,
  Other
} from './GetStartedPage.styles';
import BoxHeader from "./DashboardPage/BoxHeader";
import axios from "axios";

// import InputMask from "react-input-mask";
const myStyle = {
  color: "#fff",
  height: "20px"
};

const targetScoreData = [
  {
    minScore: 0,
    maxScore: 300,
    amount: 0,
    interestRate: 'N/A'
  },
  {
    minScore: 300,
    maxScore: 320,
    amount: 15000,
    interestRate: 24
  },
  {
    minScore: 320,
    maxScore: 440,
    amount: 30000,
    interestRate: 20
  },
  {
    minScore: 440,
    maxScore: 480,
    amount: 45000,
    interestRate: 18
  },
  {
    minScore: 480,
    maxScore: 560,
    amount: 60000,
    interestRate: 14
  },
  {
    minScore: 560,
    maxScore: 640,
    amount: 75000,
    interestRate: 10
  },
  {
    minScore: 640,
    maxScore: 720,
    amount: 90000,
    interestRate: 8
  },
  {
    minScore: 720,
    maxScore: 780,
    amount: 120000,
    interestRate: 6
  },
  {
    minScore: 780,
    maxScore: 800,
    amount: 150000,
    interestRate: 0
  }
];

export class GetStartedPage extends React.Component {
  constructor(props) {
    super(props);

    this.next.bind(this);
    this.prev.bind(this);
    this.state = {
      openQuickBook: false,
      validationLoan: false,
      validationCompany: false,
      validationEIN: false,
      validationBanking: false,
      validationAccounting: false,
      dunsNoRattingInvalid: false,
      validationDLFront: Boolean(props.userProfile.dl_front), // Driver license validation front
      validationDLBack: Boolean(props.userProfile.dl_back), // Driver license validation back
      einInvalid: false,
      dunsInvalid: false,
      binInvalid: false,
      selectedTarget: 0,
      validateZipcode: "",
      dunsNo: "",
      binNo: "",
      resultDunsNo: ""
    };
  }

  componentWillMount() {
    // Load existing company profile
    this.props.actions.loadCompany();

    // Load banks
    getAccounts().then(result => {
      if (result.data && result.data.length) {
        this.setState({validationBanking: true});
      }
    });

    // Load quickbooks docs
    if (localStorage.getItem('accountingToken')) this.setState({validationAccounting: true});
    getDocuments().then(result => {
      if (result.status === 200) {
        const documents = result.data;
        if (documents && documents.length) {
          this.setState({validationAccounting: true});
        }
      }
    });
  }

  componentDidMount() {
    if (this.props.lastStep > 0) {
      this.props.actions.updateSlide(parseInt(this.props.lastStep), 'getStarted');
      for (let i = 1; i <= this.props.lastStep; i++) {
        setTimeout(() => {
          this.next(i, true);
        }, 0);
      }
    } else {
      this.props.actions.getScore();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.check(nextProps);
    }
  }

  findCompany = () =>
    placesApi.find(this.setCompanyAddress);

  next = (step, shouldUpdateDB) => {
    this.check(this.props);
    switch (step) {
      case 1:
        if (!shouldUpdateDB) this.companyLoan();
        this.updateScore(50);
        break;
      case 4:
        if (!shouldUpdateDB) this.saveCompany();
        this.updateScore(100);
        break;
      case 5:
        if (!shouldUpdateDB) this.saveCompanyDetails();
        this.updateScore(150);
        break;
      case 7:
        this.updateScore(200);
        break;
      case 8:
        if (!shouldUpdateDB) sendAccountingToken();
        this.updateScore(250);
        break;
      case 9:
        this.updateScore(300);
        break;
      case 10:
        if (!shouldUpdateDB) this.PersonalInfo();
        break;
    }
    if (!shouldUpdateDB) this.saveLastStep(step);
    this.props.actions.updateStep(
      this.props.currentStep + 1,
      this.props.currentPart,
      'getStarted'
    );
  };

  prev = () => {
    this.saveLastStep(this.props.lastStep - 1);
    this.props.actions.updateStep(
      this.props.currentStep - 1,
      this.props.currentPart,
      'getStarted'
    );
  };

  saveLastStep = (step) => {
    this.props.actions.saveProfile({
      ...this.props.userProfile,
      last_step: step,
    });
  };

  saveCompany = () => {
    updateCompany(
      this.props.company_name,
      this.props.address,
      this.props.room,
      this.props.city,
      this.props.state,
      this.props.zipcode,
      this.props.company_phone,
      this.props.ein
    );
  };

  saveCompanyDetails = () => {
    updateCompanyDetails(
      this.props.ein,
      this.props.duns,
      this.props.structure,
      this.props.industry,
      this.props.industry_type_other,
      this.props.established_date,
      this.props.revenue.toString().replace(',', ''),
    );
  };

  companyLoan = () => {
    updateCompanyLoan(
      this.props.loan_amount_applied,
      this.props.amount,
      this.props.loan_type,
      this.props.loan_reason,
      this.props.loan_reason_other,
    );
  };

  PersonalInfo = () => {
    updateUser(
      this.props.firstName,
      this.props.lastName,
      this.props.email,
      this.props.birthday,
      this.props.driverLicense,
      this.props.ssn
    );
  };

  doneGetStarted = () => {
    newApplicatioNotification(
      getStartedData.loan_amount_applied.options.find(
        option => option.value == this.props.loan_amount_applied
      ).label,
      getStartedData.loan_type.options.find(
        option => option.value == this.props.loan_type
      ).label
    );
    this.props.actions.showFullProfileMenu();
    updateUserStatus('applied');
    this.props.history.push('/dashboard');
  };

  updateScore = score => {
    if (this.props.score < score) {
      this.props.actions.updateScore(score);
    }
  };

  check = props => {
    if (!props) return;
    if ('loan_amount_applied' in props) {
      this.setState({
        validationLoan:
          props.loan_amount_applied && props.loan_type && props.loan_reason
      });
    }
    if ('company_name' in props) {
      this.setState({
        validationCompany:
          props.company_name &&
          props.address &&
          props.city &&
          props.state &&
          props.zipcode &&
          props.company_phone.toString().length >= 6
            ? true
            : false
      });
    }
    if ('ein' in props) {
      this.setState({
        validationEIN:
          (/^\d{2}-\d{7}$/.test(props.ein) || /^\d{9}$/.test(props.duns)) &&
          props.structure &&
          props.industry &&
          /^(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])\/\d{4}$/.test(props.established_date) &&
          /^\d+(,\d{3,})*(\.\d{2})?$/.test(props.revenue)
      });
    }
  };

  validateInput = (input, value) => {
    if (input == 'ein') {
      this.setState({
        einInvalid: !/^\d{2}-\d{7}$/.test(value)
      });
    }
    if (input == 'duns') {
      this.setState({
        dunsInvalid: !/^\d{9}$/.test(value)
      });
    }
    if (input == 'established_date') {
      this.setState({
        dateInvalid: !/^(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])\/\d{4}$/.test(value)
      });
    }
    if (input == 'revenue') {
      this.setState({
        revenueInvalid: !(/^\d+(,\d{3,})*(\.\d{2})?$/.test(value) || value < 0)
      });
    }
  };

  getOnTargetClickedHandler = i => {
    return () => {
      this.setState({
        selectedTarget: i
      });
    };
  };

  setCompanyAddress = address => {
    this.props.actions.updateCompany(address.name, 'company_name');
    this.props.actions.updateCompany(address.address, 'address');
    this.props.actions.updateCompany(address.room, 'room');
    this.props.actions.updateCompany(address.city, 'city');
    this.props.actions.updateCompany(address.state, 'state');
    this.props.actions.updateCompany(address.zipcode, 'zipcode');
    this.props.actions.updateCompany(address.company_phone, 'company_phone');
  };

  setPersonalProfile = data =>
    console.log('data', data);

  handleKeyDown = evt => {
    // Disable tab key
    if (evt.keyCode === 9) {
      evt.preventDefault();
    }
  };

  handleCheckRating = () => {
    let dunsNo = this.state.dunsNo;
    if (dunsNo == '') {
      this.setState({
        dunsInvalid: true
      });
      return false;
    }
    const uid = localStorage.getItem("companyId");
    axios.put(apiVars.url + `/companies/${uid}`, {
      duns: parseInt(dunsNo),
    }).then((result) => {
      console.log(result);
    }, () => {
    });

    axios.get(apiVars.url + `/dnb/rating/${dunsNo}`).then((result) => {
      let response = JSON.parse(JSON.stringify(result));
      if (response.data.status == 0) {
        this.setState({resultDunsNo: response.data.message, dunsNoRattingInvalid: true});
      } else {
        console.log(response.data);
        this.setState({
          resultDunsNo: response.data.data.DNBStandardRating.DNBStandardRating,
          dunsNoRattingInvalid: true
        });
      }
    }, (error) => {
      console.log(error);
    });
  };
  handleCheckScore = () => {
    let binNo = this.state.binNo;
    if (binNo == '') {
      this.setState({
        binInvalid: true
      });
      return false;
    }
    axios.post(apiVars.url + `/experian/score?bin=${binNo}`).then((result) => {
      console.log("result =>", result);
    });
  };

  render() {
    return (
      <React.Fragment>
        <Investability
          score={this.props.score}
          current={this.props.currentStep}
          parts={sliderData[this.props.currentPart]}
          title={sliderTitles[this.props.currentPart]}
        />
        <Content onKeyDown={this.handleKeyDown}>
          <Slider itemWidth={940} page={'getStarted'}>
            {/* Introduction */}
            <GetStartedBox>
              <LeftSide>
                <Question>
                  Welcome to Gro, an entirely unique approach to credit and
                  equity. How much capital does your company need?
                </Question>
                <QuestionSelect
                  styles={{marginTop: '30px;'}}
                  name={'amount'}
                  options={getStartedData.loan_amount_applied.options}
                  placeholder={getStartedData.loan_amount_applied.placeholder}
                  selectedOption={this.props.loan_amount_applied}
                  handleChange={e => {
                    this.props.actions.updateCompany(
                      e.value,
                      'loan_amount_applied'
                    );
                  }
                  }
                />
                {
                  this.props.loan_amount_applied == 0 ? <Other
                    type={'text'}
                    onChange={e => {
                      if (!/^[0-9-]{0,10}$/.test(e.target.value)) return;
                      this.props.actions.updateCompany(
                        e.target.value,
                        'amount'
                      );
                    }
                    }
                    value={this.props.amount}
                    placeholder={'Enter amount'}
                  /> : ""
                }
                <QuestionSelect
                  // style={{ marginTop: '30px;' }}
                  name={'type'}
                  options={getStartedData.loan_type.options}
                  placeholder={getStartedData.loan_type.placeholder}
                  selectedOption={this.props.loan_type}
                  handleChange={e =>
                    this.props.actions.updateCompany(e.value, 'loan_type')
                  }
                />
                <QuestionSelect
                  style={{marginTop: '30px;'}}
                  name={'purpose'}
                  options={getStartedData.loan_reason.options}
                  placeholder={getStartedData.loan_reason.placeholder}
                  selectedOption={this.props.loan_reason}
                  handleChange={e =>
                    this.props.actions.updateCompany(e.value, 'loan_reason')
                  }
                />
                {
                  this.props.loan_reason == 'other' ? <Other
                    type={'text'}
                    onChange={e => {
                      this.props.actions.updateCompany(
                        e.target.value,
                        'loan_reason_other'
                      );
                    }
                    }
                    value={this.props.loan_reason_other}
                    placeholder={'What do you need money for?'}
                  /> : ""
                }
                {/* <Skip>To skip to creating a personal profile, <Link to={"#skip"}>click here</Link></Skip> */}
              </LeftSide>
              <RightSide>
                <Pagination>Getting Started (1/2)</Pagination>
                <Information>
                  <InfoItem>
                    <ItemImg src={rightTile} pos={4}/>
                    <ItemText>
                      {/* The entire startup process should take about 10 minutes */}
                      The registration process should take about 10 minutes
                    </ItemText>
                    <div style={{clear: 'both'}}/>
                  </InfoItem>
                  <InfoItem>
                    <ItemImg src={rightTile} pos={-84}/>
                    <ItemText paddingTop={10}>No credit card required</ItemText>
                    <div style={{clear: 'both'}}/>
                  </InfoItem>
                  <InfoItem>
                    <ItemImg src={rightTile} pos={-167}/>
                    <ItemText>Won't affect your personal credit score</ItemText>
                    <div style={{clear: 'both'}}/>
                  </InfoItem>
                  <InfoItem>
                    <ItemImg src={rightTile} pos={-250}/>
                    <ItemText>
                      You're only ever charged if you withdraw money from your
                      loan
                    </ItemText>
                    <div style={{clear: 'both'}}/>
                  </InfoItem>
                </Information>
                <Next
                  disabled={!this.state.validationLoan}
                  handleOnClick={() => this.next(1)}
                  text={'START'}
                  bgColor={'#8BC34A'}
                  dataNav={'next'}
                  icon={arrowRight}
                />
              </RightSide>
            </GetStartedBox>
            {/* Introduction 2*/}
            <GetStartedBox>
              <LeftSide>
                <Question>
                  Gro scores your company's growth potential as well as credit
                  worthiness. We initially provide capital at preferred interest
                  rates based on our assessment of the business' financial
                  picture. After reaching a certain level, your business might
                  qualify for a direct investment from Gro.
                </Question>
                <TargetPieChart
                  type={'big'}
                  levelValue={this.state.selectedTarget}
                  score={targetScoreData[this.state.selectedTarget].maxScore}
                  getOnTargetClickedHandler={this.getOnTargetClickedHandler}
                />
                <Back
                  handleOnClick={this.prev}
                  src={backImg}
                  dataNav={'prev'}
                />
              </LeftSide>
              <RightSide>
                <Pagination>Getting Started (2/2)</Pagination>
                <Information>
                  <Label>Target Score</Label>
                  <Value>
                    {targetScoreData[this.state.selectedTarget].minScore}
                  </Value>
                  <Label>Target Amount</Label>
                  <Value>
                    ${targetScoreData[this.state.selectedTarget].amount}
                  </Value>
                  <Label>Target Interest Rate</Label>
                  <Value>
                    {targetScoreData[this.state.selectedTarget].interestRate}%
                  </Value>
                  <Label>Current Score</Label>
                  <Value>{this.props.score}</Value>
                  <Label>Applied Amount</Label>
                  <Value>${this.props.loan_amount_applied || 'N/A'}</Value>
                  <Label>Current Rate</Label>
                  <Value>{this.props.currentRate || 'N/A'}</Value>
                </Information>
                <Next
                  disabled={!this.state.validationLoan}
                  handleOnClick={() => this.next(2)}
                  text={'NEXT'}
                  bgColor={'#8BC34A'}
                  dataNav={'next'}
                  icon={arrowRight}
                />
              </RightSide>
            </GetStartedBox>
            {/* Company profile */}
            <GetStartedBox>
              <LeftSide>
                <Question>
                  Up next, you’ll create your company profile. As you increase
                  your investability, your withdrawal amount will increase and
                  your interest rate will drop.
                </Question>
                <CompaniesIllustration src={companiesIllustrationImg}/>
                <SubQuestion>
                  Only takes about 2 minutes and your data is saved every time
                  you hit next, so you can resume your application by clicking
                  the right hand menu if your session is interrupted.
                </SubQuestion>
                <Back
                  handleOnClick={this.prev}
                  src={backImg}
                  dataNav={'prev'}
                />
              </LeftSide>
              <RightSide>
                <Pagination>Company Profile (1/3)</Pagination>
                <Information>
                  <SubQuestion style={{marginTop: '20px'}}>
                    <p>Have handy:</p>
                    <p> - EIN</p>
                    <p> - Shareholder Ownership</p>
                    <p> - Logo</p>
                  </SubQuestion>
                </Information>
                <Next
                  disabled={!this.state.validationLoan}
                  handleOnClick={() => this.next(3)}
                  text={'NEXT'}
                  bgColor={'#8BC34A'}
                  dataNav={'next'}
                  icon={arrowRight}
                />
              </RightSide>
            </GetStartedBox>
            {/* Company name */}
            <GetStartedBox>
              <LeftSide>
                <Question>Tell us about your company?</Question>
                <CompanyInput
                  type={'text'}
                  value={this.props.company_name}
                  onChange={e => {
                    this.props.actions.updateCompany(
                      e.target.value,
                      'company_name'
                    );
                    this.findCompany();
                  }}
                  placeholder={'Enter Company Name'}
                  id="companyName"
                />
                <CompanyInput
                  type={'text'}
                  value={this.props.address}
                  onChange={e =>
                    this.props.actions.updateCompany(e.target.value, 'address')
                  }
                  placeholder={'Enter Company Address'}
                />
                <CompanyInput
                  type={'text'}
                  value={this.props.room}
                  onChange={e =>
                    this.props.actions.updateCompany(e.target.value, 'room')
                  }
                  placeholder={'Enter Room Number'}
                />
                <CompanyInput
                  type={'text'}
                  value={this.props.city}
                  onChange={e =>
                    this.props.actions.updateCompany(e.target.value, 'city')
                  }
                  placeholder={'Enter City'}
                />
                <QuestionSelect
                  name={'state'}
                  options={getStartedData.state.options}
                  placeholder={getStartedData.state.placeholder}
                  selectedOption={this.props.state}
                  handleChange={e => {
                    this.props.actions.updateCompany(e.value, 'state');
                    this.check();
                  }}
                />
                {/* <CompanyInput
                  type={'text'}
                  value={this.props.state}
                  onChange={e =>
                    this.props.actions.updateCompany(e.target.value, 'state')
                  }
                  style={{ width: '40%', marginRight: '10%' }}
                  placeholder={'Enter State'}
                /> */}
                <CompanyInput
                  type={'text'}
                  value={this.state.validateZipcode !== "" ? this.state.validateZipcode : this.props.zipcode}
                  onChange={e => {
                    if (!/^[0-9-]{0,10}$/.test(e.target.value)) return;
                    this.props.actions.updateCompany(e.target.value, 'zipcode');
                  }}
                  maxLength={'6'}
                  style={{width: '48%', marginRight: '4%'}}
                  placeholder={'Enter Zipcode'}
                />
                <CompanyInput
                  type={'tel'}
                  value={this.props.company_phone}
                  onChange={e =>
                    this.props.actions.updateCompany(
                      e.target.value,
                      'company_phone'
                    )
                  }
                  style={{width: '48%'}}
                  placeholder={'Business Phone'}
                />
                <Back
                  handleOnClick={this.prev}
                  src={backImg}
                  dataNav={'prev'}
                />
              </LeftSide>
              <RightSide>
                <Pagination>Company Profile (2/3)</Pagination>
                <Information>
                  <SubQuestion style={{marginTop: '20px'}}>
                    <p>We'll confirm your EIN coming up next</p>
                  </SubQuestion>
                </Information>
                <Next
                  disabled={!this.state.validationCompany}
                  handleOnClick={() => this.next(4)}
                  text={'NEXT'}
                  bgColor={'#8BC34A'}
                  dataNav={'next'}
                  icon={arrowRight}
                />

                {this.state.validationCompany ? (
                  <div className="bottom">
                    <p className="small-print">
                      By clicking Next your agree to our{' '}
                      <Link to="/terms" target="_blank">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" target="_blank">
                        Privacy Policy
                      </Link>
                    </p>
                  </div>
                ) : (
                  <div/>
                )}
              </RightSide>
            </GetStartedBox>
            {/* Company EIN and DUNS */}
            <GetStartedBox height={600}>
              <LeftSide height={600}>
                <Question>
                  What is your business EIN (tax ID) and/or Dun & Bradstreet
                  DUNS Number?
                </Question>
                <CompanyInput
                  type={'text'}
                  value={this.props.ein}
                  onChange={e => {
                    if (e.target.value.length == 2) {
                      e.target.value += "-";
                    }
                    // console.log(e.target.value.replace(/(\d{2})(\d{7})/, "$1-$2"));
                    if (!/^[0-9-]{0,10}$/.test(e.target.value)) return;
                    this.props.actions.updateCompany(e.target.value, 'ein');
                    this.check();
                    this.validateInput('ein', e.target.value);
                  }}
                  placeholder={'Enter EIN'}
                  maxLength={'10'}
                  id="ein"
                />
                {/* <InputMask mask="99-99-9999" onChange={this.props.onChange} value={this.props.value} /> */}
                <Validation invalid={this.state.einInvalid}>
                  Please enter a valid format: XX-XXXXXXX (X is a digit)
                </Validation>
                <a
                  href={applicationLinks.ein}
                  className="input-link"
                  target="_blank"
                >
                  Click here to apply for an EIN
                </a>

                <CompanyInput
                  type={'text'}
                  value={this.props.bi_number ? this.props.bi_number : null}
                  onChange={e => {
                    this.setState({binNo: e.target.value});
                  }}
                  placeholder={'Enter Business Identification Number'}
                />
                <Validations invalid={this.state.binInvalid}>
                  Please enter Business Identification Number
                </Validations>
                <div className="half">
                  <div className="check-score">
                    <button onClick={this.handleCheckScore}>
                      Check Credit Score
                    </button>
                  </div>
                </div>

                <CompanyInput
                  type={'text'}
                  value={this.props.duns || ""}
                  onChange={e => {
                    if (!/^\d{0,9}$/.test(e.target.value)) return;
                    this.props.actions.updateCompany(e.target.value, 'duns');
                    this.check();
                    this.validateInput('duns', e.target.value);
                    this.setState({dunsNo: e.target.value});
                  }}
                  maxLength={'9'}
                  placeholder={'Enter DUNS Number'}
                />
                <Validations invalid={this.state.dunsInvalid}>
                  Please enter a valid DUNS Number (9 digits)
                </Validations>
                <div className="half">
                  <div className="check-rating">
                    <button onClick={this.handleCheckRating}>
                      Check Rating
                    </button>
                  </div>
                </div>

                <div className="half">
                  <a
                    href={applicationLinks.duns}
                    className="input-link"
                    target="_blank"
                  >
                    Click here to apply for a DUNS number
                  </a>
                </div>
                <DunsNo invalid={this.state.dunsNoRattingInvalid}>
                  Business Ratting: {this.state.resultDunsNo}
                </DunsNo>
                <div className="box-wrapper">
                  <QuestionSelect
                    style={{marginTop: '100px;'}}
                    name={'structure'}
                    options={getStartedData.company_structure.options}
                    placeholder={getStartedData.company_structure.placeholder}
                    selectedOption={this.props.structure}
                    handleChange={e => {
                      this.props.actions.updateCompany(e.value, 'structure');
                      this.check();
                    }}
                  />
                  <QuestionSelect
                    style={{marginTop: '30px;'}}
                    name={'industry'}
                    options={getStartedData.industry_type.options}
                    placeholder={getStartedData.industry_type.placeholder}
                    selectedOption={this.props.industry}
                    handleChange={e => {
                      this.props.actions.updateCompany(e.value, 'industry');
                      this.check();
                    }}
                  />
                  {
                    this.props.industry == 'other' ? <Other
                      type={'text'}
                      onChange={e => {
                        this.props.actions.updateCompany(
                          e.target.value,
                          'industry_type_other'
                        );
                      }
                      }
                      value={this.props.industry_type_other}
                      placeholder={'What do you need money for?'}
                    /> : ""
                  }
                </div>
                <div className="half">
                  <CompanyInput
                    type={'text'}
                    value={this.props.established_date}
                    onChange={e => {
                      this.props.actions.updateCompany(e.target.value, 'established_date');
                      this.check();
                      this.validateInput('established_date', e.target.value);
                    }}
                    style={{width: '98%'}}
                    placeholder={'Date Established'}
                  />
                  <Validation invalid={this.state.dateInvalid}>
                    Enter a valid date with format MM/DD/YYYY
                  </Validation>
                </div>
                <div className="half">
                  <CompanyInput
                    type={'text'}
                    value={this.props.revenue}
                    onChange={e => {
                      this.props.actions.updateCompany(
                        e.target.value,
                        'revenue'
                      );
                      this.check();
                      this.validateInput('revenue', e.target.value);
                    }}
                    style={{width: '100%'}}
                    placeholder={'Annual Revenue'}
                  />
                  <Validation invalid={this.state.revenueInvalid}>
                    Enter a valid amount (Ex: 200,000)
                  </Validation>
                </div>
                <Back
                  handleOnClick={this.prev}
                  src={backImg}
                  dataNav={'prev'}
                />
              </LeftSide>
              <RightSide>
                <Pagination>Company Profile (3/3)</Pagination>
                <Information>
                  <SubQuestion style={{marginTop: '20px'}}>
                    <p>We'll pull available data from these databases.</p>
                  </SubQuestion>
                </Information>
                <Next
                  disabled={!this.state.validationEIN}
                  handleOnClick={() => this.next(5)}
                  text={'NEXT'}
                  bgColor={'#8BC34A'}
                  dataNav={'next'}
                  icon={arrowRight}
                />
              </RightSide>
            </GetStartedBox>
            {/* Finances */}
            <GetStartedBox>
              <LeftSide>
                <Question>
                  Next, we’ll focus on your company's finances.
                </Question>
                <CompaniesIllustration src={cashIcon}/>
                <SubQuestion>
                  It should take about 1 minute and has 2 sets of questions.
                  Your data is saved every time you hit next, so you can pick
                  back up from where you left off if your session is
                  interrupted.
                </SubQuestion>
                <Back
                  handleOnClick={this.prev}
                  src={backImg}
                  dataNav={'prev'}
                />
              </LeftSide>
              <RightSide>
                <Pagination>Financial Information (1/3)</Pagination>
                <Information>
                  <SubQuestion style={{marginTop: '20px'}}>
                    <p>Have handy:</p>
                    <p> - Accounting information</p>
                    <p> - Banking information</p>
                  </SubQuestion>
                </Information>
                <Next
                  disabled={!this.state.validationEIN}
                  handleOnClick={() => this.next(6)}
                  text={'NEXT'}
                  bgColor={'#8BC34A'}
                  dataNav={'next'}
                  icon={arrowRight}
                />
              </RightSide>
            </GetStartedBox>
            {/* Finances - Plaid connect*/}
            <GetStartedBox>
              <LeftSide>
                <Question>Choose your primary bank for your company?</Question>
                <br/>
                <br/>
                <Plaid
                  validate={() => this.setState({validationBanking: true})}
                >
                  <BankList>
                    <img src={banksListImg} alt="Bank list"/>
                    <h2>Don't see your bank? Click to search for it</h2>
                    <p>
                      Gro securely connects to your institution and analyzes
                      your transactions to determine your investability.
                    </p>
                  </BankList>
                </Plaid>
                <Back
                  handleOnClick={this.prev}
                  src={backImg}
                  dataNav={'prev'}
                />
              </LeftSide>
              <RightSide>
                <Pagination>Financial Information (2/3)</Pagination>
                <Information>
                  <p>
                    If you don't see your bank listed here, click on the button
                    to search for it.
                    <br/>
                    <br/>
                    {/*If you still don't find it, you can upload the last 6 months of your bank statements.*/}
                  </p>
                  {this.state.validationBanking ? (
                    <Fragment>
                      <div className="success-message">
                        Primary bank account successfully linked!
                      </div>
                      <div className="second-banking">
                        If you'd like to add a secondary account click
                        <Plaid
                          validate={() =>
                            this.setState({validationBanking: true})
                          }
                        >
                          <span>here.</span>
                        </Plaid>
                      </div>
                    </Fragment>
                  ) : (
                    <div/>
                  )}
                </Information>
                <Next
                  // disabled={!this.state.validationBanking}
                  handleOnClick={() => this.next(7)}
                  text={'NEXT'}
                  bgColor={'#8BC34A'}
                  dataNav={'next'}
                  icon={arrowRight}
                />
              </RightSide>
            </GetStartedBox>
            {/* Driver's License information */}
            <GetStartedBox>
              <LeftSide>
                <Question bold>Drivers licence identity verification</Question>
                <SubQuestion>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </SubQuestion>
                <DriverLicenseDropzone
                  image={this.props.userProfile.dl_front}
                  onValidate={(validated) => this.setState({validationDLFront: validated})}
                />
                <DriverLicenseDropzone
                  isBack
                  image={this.props.userProfile.dl_back}
                  onValidate={(validated) => this.setState({validationDLBack: validated})}
                />
                <Back
                  handleOnClick={this.prev}
                  src={backImg}
                  dataNav={'prev'}
                />
              </LeftSide>
              <RightSide>
                <Pagination>Identity Verification (2/3)</Pagination>
                {this.state.validationDLFront && this.state.validationDLBack ? (
                  <Fragment>
                    <br/>
                    <br/>
                    <br/>
                    <div className="success-message">
                      Drivers licence has been successfully uploaded
                    </div>
                  </Fragment>
                ) : (
                  <div/>
                )}
                <Next
                  // disabled={!this.state.validationDLFront || !this.state.validationDLBack}
                  handleOnClick={() => this.next(8)}
                  text={'NEXT'}
                  bgColor={'#8BC34A'}
                  dataNav={'next'}
                  icon={arrowRight}
                />
              </RightSide>
            </GetStartedBox>
            {/* Quickbooks - Quickbooks connect*/}
            <GetStartedBox>
              <LeftSide>
                <Question>Which accounting service do you use?</Question>
                <QuickBooks
                  validate={() => this.setState({validationAccounting: true})}
                />
                <Back
                  handleOnClick={this.prev}
                  src={backImg}
                  dataNav={'prev'}
                />
              </LeftSide>
              <RightSide>
                <Pagination>Financial Information (3/3)</Pagination>
                {this.state.validationAccounting ? (
                  <Fragment>
                    <br/>
                    <br/>
                    <br/>
                    <div className="success-message">
                      Primary accounting info successfully linked!
                    </div>
                    <div className="second-banking">
                      If you'd like to add a secondary account click
                      <QuickBooks
                        validate={() =>
                          this.setState({validationAccounting: true})
                        }
                      >
                        <span>here.</span>
                      </QuickBooks>
                    </div>
                  </Fragment>
                ) : (
                  <Information>
                    <p>
                      If you don't see your accounting service listed here,
                      click on the button to search for it.
                      <br/>
                      <br/>
                      If your accounting service isn't a current partner with
                      us, you can upload your accounting records.
                    </p>
                  </Information>
                )}
                <Next
                  // disabled={!this.state.validationAccounting}
                  handleOnClick={() => this.next(9)}
                  text={'NEXT'}
                  bgColor={'#8BC34A'}
                  dataNav={'next'}
                  icon={arrowRight}
                />
              </RightSide>
            </GetStartedBox>
            {/* Agree to Terms and Conditions*/}
            <GetStartedBox>
              <LeftSide>
                <Question>
                  In order to complete our initial review, you need to agree to
                  our terms.
                </Question>
                <TermItem>
                  <TermIcon src={termIcon}/>
                  <h2>I agree to share my company's data anonymously.</h2>
                  <h3>
                    Gro can help your compare your company to other companies
                    like yours, but in order to do so, you will also need to
                    share your company's info. Don't worry we will keep it all
                    anonymous unless you say otherwise. You can read more{' '}
                    <Link to={'/terms'} target="_blank">here</Link>
                  </h3>
                </TermItem>
                <TermItem>
                  <TermIcon src={termIcon}/>
                  <h2>I agree to Gro's rates and rate plan.</h2>
                  <h3>
                    Gro is unique in that we don't charge interest on loans, but
                    rather charge a fee for when you draw cash down from your
                    credit ceiling, You only are charged when you withdraw
                    money, and only have to pay back what you have taken out.
                    You can read more <Link to={'/rates'} target="_blank">here.</Link>
                  </h3>
                </TermItem>
                <TermItem>
                  <TermIcon src={termIcon}/>
                  <h2>All terms and conditions</h2>
                  <h3>
                    You can view all terms and conditions{' '}
                    <Link to={'/terms'} target="_blank">here.</Link>
                  </h3>
                </TermItem>
                <Back
                  handleOnClick={this.prev}
                  src={backImg}
                  dataNav={'prev'}
                />
              </LeftSide>
              <RightSide>
                <Pagination>Agree to Terms (1/1)</Pagination>
                <Information>
                  <SubQuestion style={{marginTop: '20px'}}>
                    We'll confirm your investability and line of credit next!
                    Don't worry, none of this affects your personal credit
                    score. If we need to take any action that would affect your
                    personal credit, we'll ask for your approval first.
                  </SubQuestion>
                </Information>
                <Next
                  // disabled={!this.state.validationCompany}
                  handleOnClick={() => this.next(10)}
                  text={'NEXT'}
                  bgColor={'#8BC34A'}
                  dataNav={'next'}
                  icon={arrowRight}
                />
              </RightSide>
            </GetStartedBox>
            {/* Personal profile */}
            <GetStartedBox>
              <LeftSide>
                <Question>Tell us about your personal information?</Question>
                {/* <Question>
                  Up next, you’ll create a personal profile. You'll use this to
                  browse your company and other companies.
                </Question>
                <CompaniesIllustration src={personalProfileImg} />
                <SubQuestion>
                  It should take less than 1 minute. Your data is saved every
                  time you hit next, so you can pick back up from where you left
                  off if your session is interrupted.
                </SubQuestion> */}
                <CompanyInput
                  type={'text'}
                  value={this.props.userProfile.first_name}
                  onChange={e => {
                    this.props.actions.updateUser(e.target.value, 'first_name');
                  }}
                  style={{width: '48%', marginRight: '4%'}}
                  placeholder={'Enter FirstName'}
                />
                <CompanyInput
                  type={'text'}
                  value={this.props.userProfile.last_name}
                  onChange={e =>
                    this.props.actions.updateUser(
                      e.target.value,
                      'last_name'
                    )
                  }
                  style={{width: '48%'}}
                  placeholder={'Enter LastName'}
                />
                <CompanyInput
                  type={'email'}
                  value={this.props.userProfile.email}
                  onChange={e =>
                    this.props.actions.updateUser(
                      e.target.value,
                      'email'
                    )
                  }
                  placeholder={'Enter Email'}
                />
                <CompanyInput
                  type={'text'}
                  value={this.props.userProfile.birthday}
                  onChange={e => {
                    this.props.actions.updateUser(
                      e.target.value,
                      'birthday'
                    );
                  }
                  }
                  placeholder={'Enter BirthDate'}
                />
                <CompanyInput
                  type={'text'}
                  value={this.props.userProfile.driverLicense}
                  onChange={e => {
                    this.props.actions.updateUser(
                      e.target.value,
                      'driverLicense'
                    );
                  }
                  }
                  placeholder={'Enter Driver License'}
                />
                <CompanyInput
                  type={'text'}
                  value={this.props.userProfile.ssn}
                  onChange={e => {
                    this.props.actions.updateUser(
                      e.target.value,
                      'ssn'
                    );
                  }
                  }
                  placeholder={'Enter Social Security Number'}
                />
                <Back
                  handleOnClick={this.prev}
                  src={backImg}
                  dataNav={'prev'}
                />
              </LeftSide>
              <RightSide>
                <Pagination>Personal Profile (1/2)</Pagination>
                <Information>
                  <SubQuestion style={{marginTop: '20px'}}>
                    <p>Have handy:</p>
                    <p> - Driver's License</p>
                    <p> - Social Security Number</p>
                  </SubQuestion>
                </Information>
                {/* <Next handleOnClick={this.next} text={"NEXT"} bgColor={"#8BC34A"} dataNav={"next"} icon={arrowRight}/> */}
                <Next
                  // disabled={!this.state.validationCompany}
                  onClick={() => {
                    this.doneGetStarted();
                  }}
                  text={'FINISH'}
                  bgColor={'#8BC34A'}
                />
              </RightSide>
            </GetStartedBox>
            {/* Personal profile - Social accounts */}
            {/* <GetStartedBox height={450}>
              <LeftSide height={450}>
                <Question>
                  Are there any other social media accounts you have
                  that you would like to link to your profile?
                </Question>
                <SocialButton icon={'facebook'} text="SIGN ON WITH FACEBOOK" color="#3C5A9A"/>
                <SocialButton icon={'google'} text="SIGN ON WITH GOOGLE" color="#8BC34A"/>
                <SocialButton icon={'linkedin'} text="SIGN ON WITH LINKEDIN" color="#0172B1"/>
                <Back handleOnClick={this.prev} src={backImg} dataNav={"prev"}/>
              </LeftSide>
              <RightSide>
                <Pagination>Personal Profile (2/2)</Pagination>
                <Information>
                  <SubQuestion style={{ marginTop: '20px'}}>
                    <p>
                      The more accounts you link, the more your investability
                      score may increase!<br/><br/>
                      You'll enter  personal details later
                    </p>
                  </SubQuestion>
                </Information>
                <Next onClick={this.doneGetStarted} text={"FINISH"} bgColor={"#8BC34A"}/>
              </RightSide>
            </GetStartedBox> */}
          </Slider>
        </Content>
        <ClearBoth/>
      </React.Fragment>
    );
  }
}

GetStartedPage.propTypes = {
  loan_amount_applied: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  amount: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  loan_type: PropTypes.string,
  targetLevel: PropTypes.string,
  currentLevel: PropTypes.string,
  currentRate: PropTypes.string,
  currentCeiling: PropTypes.string,
  actions: PropTypes.object,
  loan_reason: PropTypes.string,
  loan_reason_other: PropTypes.string,
  currentStep: PropTypes.number,
  currentPart: PropTypes.string,
  history: PropTypes.object,
  company_name: PropTypes.string,
  address: PropTypes.string,
  room: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  company_phone: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  structure: PropTypes.string,
  industry: PropTypes.string,
  industry_type_other: PropTypes.string,
  established_date: PropTypes.string,
  revenue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  score: PropTypes.number,
  zipcode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ein: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  duns: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  bi_number: PropTypes.bi_number,
  userProfile: PropTypes.shape({
    dl_front: PropTypes.string,
    dl_back: PropTypes.string,
  }),
  lastStep: PropTypes.number,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  birthday: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  driverLicense: PropTypes.number,
  ssn: PropTypes.number,
};

function mapStateToProps(state) {
  return {
    loan_amount_applied: '' + state.company.loan_amount_applied,
    amount: state.company.amount,
    loan_type: state.company.loan_type,
    targetLevel: state.loan.targetLevel,
    currentLevel: state.loan.currentLevel,
    currentRate: state.loan.currentRate,
    currentCeiling: state.loan.currentCeiling,
    loan_reason: state.company.loan_reason,
    loan_reason_other: state.company.other_loan_reason,
    currentStep: state.slider['getStarted'].currentStep,
    currentPart: state.slider['getStarted'].currentPart,
    company_name: state.company.company_name || '',
    company_phone: state.company.company_phone || '',
    ein: state.company.ein || '',
    duns: state.company.duns || '',
    bi_number: state.company.bi_number || '',
    address: state.company.address || '',
    room: state.company.room || '',
    city: state.company.city || '',
    state: state.company.state || '',
    structure: state.company.structure || '',
    industry: state.company.industry || '',
    industry_type_other: state.company.industry_type_other || '',
    established_date: state.company.established_date || '',
    revenue: state.company.revenue || '',
    zipcode: state.company.zipcode || '',
    score: state.score.value,
    userProfile: state.profile,
    lastStep: state.profile.last_step,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    ...loanActions,
    ...sliderActions,
    ...menuActions,
    ...companyActions,
    ...profileActions,
    ...scoreActions
  };
  return {actions: bindActionCreators(actions, dispatch)};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GetStartedPage);
