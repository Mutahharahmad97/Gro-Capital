import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AppControlContext } from "../../context/AppControlContext";
import SideBar from "../SideBar/SideBar";
import FormInput from "./FormInput";
import logo from "../../static/logo.svg";
import { useHistory } from "react-router-dom";
import addKpiMetrics from "../../services/Forms/addKpiMetrics";
import patchFormStep from "../../services/Forms/patchFormStep";
import BackButton from "../navigations";

import { freshbooksBaseUrl } from "../util/baseUrl";
import { PROFIT_LOSS_URL } from "../util/urls";

import getFreshbooksProfitLoss from "../../services/Freshbooks/GetFreshbooksProfitLoss";

const Form5 = (props) => {
  const history = useHistory();
  const { Form5, setForm5State } = useContext(AppControlContext);
  const [formValidation, setFormValidation] = useState({
    YTDRevenueValidate: true,
    YTDProfitValidate: true,
    CurrentARValidate: true,
    CurrentAPValidate: true,
    CurrentBankBalanceValidate: true,
  });
  const [wholeFormValidated, setWholeFormValidated] = useState(true);
  const [apiErrorState, setApiErrorState] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState("");




  const updateFormField = (e) => {
    setForm5State({
      ...Form5,
      [e.target.name]: e.target.value,
    });

    switch (e.target.name) {
      case "YTDRevenue":
        /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/i.test(
          e.target.value
        ) || e.target.value.length === 0
          ? setFormValidation({ ...formValidation, YTDRevenueValidate: true })
          : setFormValidation({ ...formValidation, YTDRevenueValidate: false });
        break;
      case "YTDProfit":
        /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/i.test(
          e.target.value
        ) || e.target.value.length === 0
          ? setFormValidation({ ...formValidation, YTDProfitValidate: true })
          : setFormValidation({ ...formValidation, YTDProfitValidate: false });
        break;
      case "CurrentAR":
        /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/i.test(
          e.target.value
        ) || e.target.value.length === 0
          ? setFormValidation({ ...formValidation, CurrentARValidate: true })
          : setFormValidation({ ...formValidation, CurrentARValidate: false });
        break;
      case "CurrentAP":
        /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/i.test(
          e.target.value
        ) || e.target.value.length === 0
          ? setFormValidation({ ...formValidation, CurrentAPValidate: true })
          : setFormValidation({ ...formValidation, CurrentAPValidate: false });
        break;
      case "CurrentBankBalance":
        /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/i.test(
          e.target.value
        ) || e.target.value.length === 0
          ? setFormValidation({
              ...formValidation,
              CurrentBankBalanceValidate: true,
            })
          : setFormValidation({
              ...formValidation,
              CurrentBankBalanceValidate: false,
            });
        break;

      default:
      //Do nothing
    }
  };

  const Next = async () => {
    const allFormFieldsValidated = Object.keys(formValidation).every(
      (k) => formValidation[k]
    );
    // const allFormFieldsFilled = Object.keys(Form5).every(
    //   (k) => Form5[k].length > 0
    // );
    // setWholeFormValidated(allFormFieldsValidated && allFormFieldsFilled);
    setWholeFormValidated(allFormFieldsValidated);
    if (allFormFieldsValidated) {
      const kpiMetrics = await addKpiMetrics(Form5);

      if (!kpiMetrics.success) {
        setApiErrorMessage(kpiMetrics.message);
        setApiErrorState(true);
      } else {
        const patchFormStep_ = await patchFormStep(7);
        if (!patchFormStep_.success) {
          setApiErrorMessage(patchFormStep_.message);
          setApiErrorState(true);
        } else {
          history.push("/dashboard");
        }
      }
    }
  };


  return (
    <div id="registration-page">
      <section className="dashboard">
        <div className="wrap wrap-custom">
          <div className="dashboard__row">
            <div className="dashboard__content dashboard__content--sm form_custom">
              <div className="registration-header">
                <Link to="/">
                  <img src={logo} alt="" />
                </Link>
                <div className="registration-header__steps">
                  <div className="registration-header__step active"></div>
                  <div className="registration-header__line full"></div>
                  <div className="registration-header__step active"></div>
                  <div className="registration-header__line full"></div>
                  <div className="registration-header__step active"></div>
                  <div className="registration-header__line full"></div>
                  <div className="registration-header__step active"></div>
                  <div className="registration-header__line full"></div>
                  <div className="registration-header__step active"></div>
                </div>
              </div>
              {!wholeFormValidated && (
                <div class="alert alert--error">
                  <p>Please Fill the whole form correctly!</p>
                </div>
              )}
              {apiErrorState && (
                <div className="alert alert--error">
                  <p>{apiErrorMessage}</p>
                </div>
              )}
              <form action="#" className="registration">
                <div className="registration__top">
                  <h1>KPI Metrics</h1>
                  <div className="row">
                    <FormInput
                      id="reg-ytdr"
                      title="YTD Revenue"
                      type="number"
                      name="YTDRevenue"
                      onchange={updateFormField}
                      onblur={updateFormField}
                      validate={formValidation.YTDRevenueValidate}
                      message="YTD Revenue format invalid"
                      value={Form5.YTDRevenue}
                    />
                    <FormInput
                      id="reg-ytdp"
                      title="YTD Profit"
                      type="number"
                      name="YTDProfit"
                      onClick={updateFormField}
                      onblur={updateFormField}
                      validate={formValidation.YTDProfitValidate}
                      message="YTD Profit format invalid"
                      value={Form5.YTDProfit}
                    />
                    <FormInput
                      id="reg-car"
                      title="Current AR"
                      type="number"
                      name="CurrentAR"
                      onchange={updateFormField}
                      onblur={updateFormField}
                      validate={formValidation.CurrentARValidate}
                      message="Current AR format invalid"
                      value={Form5.CurrentAR}
                    />
                    <FormInput
                      id="reg-ca"
                      title="Current AP"
                      type="number"
                      name="CurrentAP"
                      onchange={updateFormField}
                      onblur={updateFormField}
                      validate={formValidation.CurrentAPValidate}
                      message="Current AP format invalid"
                      value={Form5.CurrentAP}
                    />
                    <FormInput
                      id="reg-cbb"
                      title="Current Bank Balance"
                      type="number"
                      name="CurrentBankBalance"
                      onchange={updateFormField}
                      onblur={updateFormField}
                      validate={formValidation.CurrentBankBalanceValidate}
                      message="Current Bank Balance format invalid"
                      value='222'
                    />
                  </div>
                </div>
                <div style={{display:"flex"}}>
                  <BackButton
                    step={5}
                  />
                  <div
                    onClick={Next}
                    className="btn btn--full btn--green open-popup"
                    style={{marginLeft:"1%"}}
                  >
                    Next
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="21"
                      viewBox="0 0 12 21"
                    >
                      <path
                        d="M-0.293106781,-0.293106781 C0.0673771804,-0.653590743 0.634608236,-0.681320278 1.02689944,-0.376295388 L1.12110678,-0.293106781 L10.9652136,9.551 L1.12110678,19.3951068 C0.730582489,19.7856311 0.0974175106,19.7856311 -0.293106781,19.3951068 C-0.653590743,19.0346228 -0.681320278,18.4673918 -0.376295388,18.0751006 L-0.293106781,17.9808932 L8.136,9.551 L-0.293106781,1.12110678 C-0.653590743,0.76062282 -0.681320278,0.193391764 -0.376295388,-0.198899443 L-0.293106781,-0.293106781 Z"
                        transform="translate(1 1)"
                      />
                    </svg>
                  </div>
                </div>
              </form>
            </div>
            <SideBar
              heading1="Let's build"
              heading2="your company profile"
              description="The more information we have about your business the more chances we will find you necessary financial help."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Form5;
