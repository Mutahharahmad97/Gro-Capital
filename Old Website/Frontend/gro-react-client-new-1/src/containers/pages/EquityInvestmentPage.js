import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import "react-accessible-accordion/dist/fancy-example.css";
import PageTitle from "components/PageTitle";
import { Other, Textarea } from "./GetStartedPage.styles";
import QuestionSelect from "components/QuestionSelect";
import { equityInvestmentData } from "store/dataSource";
import arrowRight from "images/rightWhiteArrow.png";
import Button from "components/Button";
import { investmentActions } from "actions/investmentActions";

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

const ParagraphTitle = styled.span`
  color: ${props => props.theme.darkerBlack};
  font-size: 14px;
  letter-spacing: 1px;
  margin-top: 10px;
`;

const Send = styled(Button)`
  height: 50px;
  font-size: 20px;
  margin: 20px 0;

  & img {
    width: 22px;
    margin-top: 5px;
  }
`;

// const EquityInvestment = () => {
class EquityInvestment extends React.Component {
  state = {
    name: "",
    email: "",
    position: "",
    experience: "",
    industry: "",
    external_network: "",
    target_market: "",
    market_structure: "",
    traction: "",
    partnership_status: "",
    developed_idea: "",
    business: "",
    money: "",
    competitive_advantages: "",
    summary: "",
    profile_pitch_video: "",
    team: "",
    problems: "",
    products: "",
    target: "",
    businessmodel: "",
    customer: "",
    sales: "",
    competitors: "",
    competitive: "",
    upload_video: ""
  };

  handleSubmit = () => this.props.actions.updateInvestment(this.state);

  render() {
    return (
      <Container>
        <PageTitle>Equity Investment</PageTitle>
        <ParagraphTitle>Enter Name</ParagraphTitle>
        <Other
          type={"text"}
          value={this.props.name}
          onChange={e => {
            this.setState({ name: e.target.value });
          }}
          placeholder={"Enter Name"}
          style={{ margin: "9px 0 20px 0" }}
          id="name"
          required
        />
        <ParagraphTitle>Enter Email</ParagraphTitle>
        <Other
          type="email"
          value={this.props.email}
          onChange={e => {
            this.setState({ email: e.target.value });
          }}
          placeholder={"Enter Email"}
          style={{ margin: "9px 0 20px 0" }}
          id="email"
          required
        />
        <ParagraphTitle>Enter Position</ParagraphTitle>
        <Other
          type={"text"}
          value={this.props.position}
          onChange={e => {
            this.setState({ position: e.target.value });
          }}
          placeholder={"Enter Position"}
          style={{ margin: "9px 0 20px 0" }}
          id="position"
        />
        <ParagraphTitle>Experience & Expertise</ParagraphTitle>
        <Textarea
          type={"text"}
          value={this.props.experience}
          onChange={e => {
            this.setState({ experience: e.target.value });
          }}
          placeholder={"Enter Experience & Expertise"}
          style={{ margin: "9px 0 20px 0" }}
          id="experience"
        />
        <ParagraphTitle>
          What is your management team’s depth of industry understanding?
          (Please Select One)
        </ParagraphTitle>
        <QuestionSelect
          name={"industry"}
          options={equityInvestmentData.industry.options}
          placeholder={equityInvestmentData.industry.placeholder}
          selectedOption={
            this.props.industry ? this.props.industry : this.state.industry
          }
          handleChange={e => {
            // this.props.actions.updateInvestment(
            //   e.value,
            //   'industry'
            // );
            this.setState({ industry: e.value });
          }}
        />
        <br />
        <ParagraphTitle>
          What is the strength of your management team’s external network?
          (Please Select One)
        </ParagraphTitle>
        <QuestionSelect
          name={"external_network"}
          options={equityInvestmentData.external_network.options}
          placeholder={equityInvestmentData.external_network.placeholder}
          selectedOption={
            this.props.external_network
              ? this.props.external_network
              : this.state.external_network
          }
          handleChange={e => {
            // this.props.actions.updateInvestment(
            //   e.value,
            //   'external_network'
            // );
            this.setState({ external_network: e.value });
          }}
        />
        <br />
        <ParagraphTitle>
          What is your target market’s annual spend on the problem you are
          solving? (Please Select One)
        </ParagraphTitle>
        <QuestionSelect
          name={"target_market"}
          options={equityInvestmentData.target_market.options}
          placeholder={equityInvestmentData.target_market.placeholder}
          selectedOption={
            this.props.target_market
              ? this.props.target_market
              : this.state.target_market
          }
          handleChange={e => {
            // this.props.actions.updateInvestment(
            //   e.value,
            //   'target_market'
            // );
            this.setState({ target_market: e.value });
          }}
        />
        <br />
        <ParagraphTitle>
          What is the structure of the market? (Please Select One)
        </ParagraphTitle>
        <QuestionSelect
          name={"market_structure"}
          options={equityInvestmentData.market_structure.options}
          placeholder={equityInvestmentData.market_structure.placeholder}
          selectedOption={
            this.props.market_structure
              ? this.props.market_structure
              : this.state.market_structure
          }
          handleChange={e => {
            // this.props.actions.updateInvestment(
            //   e.value,
            //   'market_structure'
            // );
            this.setState({ market_structure: e.value });
          }}
        />
        <br />
        <ParagraphTitle>
          How is your traction? (Please Select One)
        </ParagraphTitle>
        <QuestionSelect
          name={"traction"}
          options={equityInvestmentData.traction.options}
          placeholder={equityInvestmentData.traction.placeholder}
          selectedOption={
            this.props.traction ? this.props.traction : this.state.traction
          }
          handleChange={e => {
            // this.props.actions.updateInvestment(
            //   e.value,
            //   'traction'
            // );
            this.setState({ traction: e.value });
          }}
        />
        <br />
        <ParagraphTitle>
          What is your partnership status? (Please Select One)
        </ParagraphTitle>
        <QuestionSelect
          name={"partnership_status"}
          options={equityInvestmentData.partnership_status.options}
          placeholder={equityInvestmentData.partnership_status.placeholder}
          selectedOption={
            this.props.partnership_status
              ? this.props.partnership_status
              : this.state.partnership_status
          }
          handleChange={e => {
            // this.props.actions.updateInvestment(
            //   e.value,
            //   'partnership_status'
            // );
            this.setState({ partnership_status: e.value });
          }}
        />
        <br />
        <ParagraphTitle>
          How far have you developed your idea? (Please Select One)
        </ParagraphTitle>
        <QuestionSelect
          name={"developed_idea"}
          options={equityInvestmentData.developed_idea.options}
          placeholder={equityInvestmentData.developed_idea.placeholder}
          selectedOption={
            this.props.developed_idea
              ? this.props.developed_idea
              : this.state.developed_idea
          }
          handleChange={e => {
            // this.props.actions.updateInvestment(
            //   e.value,
            //   'developed_idea'
            // );
            this.setState({ developed_idea: e.value });
          }}
        />
        <br />
        <ParagraphTitle>
          How much time have you spent on the business? (Please Select One)
        </ParagraphTitle>
        <QuestionSelect
          name={"business"}
          options={equityInvestmentData.business.options}
          placeholder={equityInvestmentData.business.placeholder}
          selectedOption={
            this.props.business ? this.props.business : this.state.business
          }
          handleChange={e => {
            // this.props.actions.updateInvestment(
            //   e.value,
            //   'business'
            // );
            this.setState({ business: e.value });
          }}
        />
        <br />
        <ParagraphTitle>
          How much money have you in the business? (Please Select One)
        </ParagraphTitle>
        <QuestionSelect
          name={"money"}
          options={equityInvestmentData.money.options}
          placeholder={equityInvestmentData.money.placeholder}
          selectedOption={
            this.props.money ? this.props.money : this.state.money
          }
          handleChange={e => {
            // this.props.actions.updateInvestment(
            //   e.value,
            //   'money'
            // );
            this.setState({ money: e.value });
          }}
        />
        <br />
        <ParagraphTitle>
          Which of these competitive advantages have you received? (Please
          Select One)
        </ParagraphTitle>
        <QuestionSelect
          style={{ margin: "9px 0 20px 0;" }}
          name={"competitive_advantages"}
          options={equityInvestmentData.competitive_advantages.options}
          placeholder={equityInvestmentData.competitive_advantages.placeholder}
          selectedOption={
            this.props.competitive_advantages
              ? this.props.competitive_advantages
              : this.state.competitive_advantages
          }
          handleChange={e => {
            // this.props.actions.updateInvestment(
            //   e.value,
            //   'competitive_advantages'
            // );
            this.setState({ competitive_advantages: e.value });
          }}
        />
        <br />
        <ParagraphTitle>Company Summary</ParagraphTitle>
        <Textarea
          type={"text"}
          value={this.props.summary}
          onChange={e => {
            this.setState({ summary: e.target.value });
          }}
          placeholder={
            "Tell the world who you are and what makes your company special."
          }
          style={{ margin: "9px 0 20px 0" }}
          id="summary"
        />
        <ParagraphTitle>
          Increase the impact of your profile by uploading a short pitch video.
        </ParagraphTitle>
        <br />
        <input
          type="file"
          name="profile_pitch_video"
          onChange={e =>
            this.setState({ profile_pitch_video: e.target.files[0] })
          }
        />
        <br />
        <br />
        <ParagraphTitle>Management Team</ParagraphTitle>
        <Textarea
          type={"text"}
          value={this.props.team}
          onChange={e => {
            this.setState({ team: e.target.value });
          }}
          placeholder={
            "Management Team Who are the members of your management team and how will their experience aid in your success?"
          }
          style={{ margin: "9px 0 20px 0" }}
          id="team"
        />
        <ParagraphTitle>Customer Problems</ParagraphTitle>
        <Textarea
          type={"text"}
          value={this.props.problems}
          onChange={e => {
            this.setState({ problems: e.target.value });
          }}
          placeholder={
            "What customer problem does your product and/or service solve?"
          }
          style={{ margin: "9px 0 20px 0" }}
          id="problems"
        />
        <ParagraphTitle>Products & Services</ParagraphTitle>
        <Textarea
          type={"text"}
          value={this.props.products}
          onChange={e => {
            this.setState({ products: e.target.value });
          }}
          placeholder={
            "Describe the product or service that you will sell and how it solves the customer problem, listing the main value proposition for each product/service."
          }
          style={{ margin: "9px 0 20px 0" }}
          id="products"
        />
        <ParagraphTitle>Target Market</ParagraphTitle>
        <Textarea
          type={"text"}
          value={this.props.target}
          onChange={e => {
            this.setState({ target: e.target.value });
          }}
          placeholder={
            "Define the important geographic, demographic, and/or psychographic characteristics of the market within which your customer segments exist."
          }
          style={{ margin: "9px 0 20px 0" }}
          id="target"
        />
        <ParagraphTitle>Business Model</ParagraphTitle>
        <Textarea
          type={"text"}
          value={this.props.businessmodel}
          onChange={e => {
            this.setState({ businessmodel: e.target.value });
          }}
          placeholder={
            "What strategy will you employ to build, deliver, and retain company value (e.g., profits)?"
          }
          style={{ margin: "9px 0 20px 0" }}
          id="businessmodel"
        />
        <ParagraphTitle>Customer Segments</ParagraphTitle>
        <Textarea
          type={"text"}
          value={this.props.customer}
          onChange={e => {
            this.setState({ customer: e.target.value });
          }}
          placeholder={
            "Outline your targeted customer segments. These are the specific subsets of your target market that you will focus on to gain traction."
          }
          style={{ margin: "9px 0 20px 0" }}
          id="customer"
        />
        <ParagraphTitle>Sales & Marketing Strategy</ParagraphTitle>
        <Textarea
          type={"text"}
          value={this.props.sales}
          onChange={e => {
            this.setState({ sales: e.target.value });
          }}
          placeholder={
            "What is your customer acquisition and retention strategy? Detail how you will promote, sell and create customer loyalty for your products and services."
          }
          style={{ margin: "9px 0 20px 0" }}
          id="sales"
        />
        <ParagraphTitle>Competitors</ParagraphTitle>
        <Textarea
          type={"text"}
          value={this.props.competitors}
          onChange={e => {
            this.setState({ competitors: e.target.value });
          }}
          placeholder={
            "Describe the competitive landscape and your competitors’ strengths and weaknesses. If direct competitors don’t exist, describe the existing alternatives."
          }
          style={{ margin: "9px 0 20px 0" }}
          id="competitors"
        />
        <ParagraphTitle>Competitive Advantage</ParagraphTitle>
        <Textarea
          type={"text"}
          value={this.props.competitive}
          onChange={e => {
            this.setState({ competitive: e.target.value });
          }}
          placeholder={
            "What is your company’s competitive or unfair advantage? This can include patents, first mover advantage, unique expertise, or proprietary processes/technology."
          }
          style={{ margin: "9px 0 20px 0" }}
          id="competitive"
        />
        <ParagraphTitle>Upload Pitch Video</ParagraphTitle>
        <br />
        <input
          type="file"
          name="upload_video"
          onChange={e => this.setState({ upload_video: e.target.files[0] })}
        />
        <br />
        <Send
          // disabled={!this.state.validationLoan}
          onClick={this.handleSubmit}
          style={{ height: "50px" }}
          text={"SEND"}
          bgColor={"#8BC34A"}
          dataNav={"submit"}
          icon={arrowRight}
        />
      </Container>
    );
  }
}

EquityInvestment.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  position: PropTypes.string,
  experience: PropTypes.string,
  industry: PropTypes.string,
  external_network: PropTypes.string,
  target_market: PropTypes.string,
  market_structure: PropTypes.string,
  traction: PropTypes.string,
  partnership_status: PropTypes.string,
  developed_idea: PropTypes.string,
  business: PropTypes.string,
  money: PropTypes.string,
  competitive_advantages: PropTypes.string,
  summary: PropTypes.string,
  team: PropTypes.string,
  problems: PropTypes.string,
  products: PropTypes.string,
  target: PropTypes.string,
  businessmodel: PropTypes.string,
  customer: PropTypes.string,
  sales: PropTypes.string,
  competitors: PropTypes.string,
  competitive: PropTypes.string,
  actions: PropTypes.object,
  investmentActions: PropTypes.object
};

function mapStateToProps(state) {
  return {
    industry: state.investment.industry,
    external_network: state.investment.external_network,
    target_market: state.investment.target_market,
    market_structure: state.investment.market_structure,
    traction: state.investment.traction,
    partnership_status: state.investment.partnership_status,
    developed_idea: state.investment.developed_idea,
    business: state.investment.business,
    money: state.investment.money,
    competitive_advantages: state.investment.competitive_advantages,
    summary: state.investment.summary,
    team: state.investment.team,
    problems: state.investment.problems,
    products: state.investment.products,
    target: state.investment.target,
    businessmodel: state.investment.businessmodel,
    customer: state.investment.customer,
    sales: state.investment.sales,
    competitors: state.investment.competitors,
    competitive: state.investment.competitive
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    ...investmentActions
  };
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(EquityInvestment);
