import { useState, useContext } from "react";
import { AppControlContext } from "../../context/AppControlContext";
import { Link } from "react-router-dom";
import Amounts from "./json/Amounts.json";
import SideBar from "../SideBar/SideBar";
import FinanceData from "./json/FinanceData";
import logo from "../../static/logo.svg";
import { useHistory } from "react-router-dom";
import addFinancialInformation from "../../services/Forms/addFinancialInformation";
import patchFormStep from "../../services/Forms/patchFormStep";
import "./Form.scss";
import BackButton from "../navigations";
import updateFinancialInformation from "../../services/Forms/updateFinancialInformation";

const Form4 = (props) => {
  const history = useHistory();
  const { Form4, setForm4State } = useContext(AppControlContext);
  const { chosenAmount, setChosenAmount } = useContext(AppControlContext);
  const { chosenFinance, setChosenFinance } = useContext(AppControlContext);
  const { currentAmountIndex, setCurrentAmountIndex } =
    useContext(AppControlContext);
  const { currentFinanceIndex, setCurrentFinanceIndex } =
    useContext(AppControlContext);
  const { setFormStep, setFormBackSteps, formBackSteps } = useContext(AppControlContext);
  // const { chosenCustomAmount, setChosenCustomAmount } =
  //   useContext(AppControlContext);
  // const [formValidation, setFormValidation] = useState({
  //   FinancingTypeValidate: true,
  // });
  const [wholeFormValidated, setWholeFormValidated] = useState(true);
  const [apiErrorState, setApiErrorState] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState("");

  const updateFormField = (e) => {
    setForm4State({
      ...Form4,
      [e.target.name]: e.target.value,
    });

    // switch (e.target.name) {
    //   case "FinancingType":
    //     e.target.value.length > 1 && e.target.value !== "0"
    //       ? setFormValidation({
    //           ...formValidation,
    //           FinancingTypeValidate: true,
    //         })
    //       : setFormValidation({
    //           ...formValidation,
    //           FinancingTypeValidate: false,
    //         });
    //     break;

    //   default:
    //   //do nothing
    // }
  };
  const AmountChanged = (id, amount) => {
    // if (amount === "Custom") setChosenAmount(chosenCustomAmount);
    // else setChosenAmount(amount);
    setChosenAmount(amount);
    setCurrentAmountIndex(id);
  };

  // const HandleCustomAmount = (event) => {
  //   if (/^([1-4]?[0-9]?[0-9]?){1}[k]?$/.test(event.target.value)){
  //     setChosenCustomAmount(event.target.value);
  //     setChosenAmount(event.target.value);
  //   }
  //   else {
  //     setWholeFormValidated(false);
  //   }
  // };

  const FinanceChanged = (id, amount) => {
    setCurrentFinanceIndex(id);
    setChosenFinance(amount);
  };

  const Next = async () => {
    let allFormFieldsValidated = false;
    // let allFormFieldsValidated = true;

    if (Form4.FinancingType !== '0' && Form4.FinancingType !== '')
      allFormFieldsValidated = true;
    setWholeFormValidated(allFormFieldsValidated);
    if (allFormFieldsValidated) {
      let financialInformation = {success:false}
      if (formBackSteps <= 0){
        financialInformation = await addFinancialInformation(
          Form4.FinancingType,
          chosenAmount,
          chosenFinance
        );
      } else {
        setFormBackSteps(formBackSteps - 1);
        financialInformation = await updateFinancialInformation(
          Form4.FinancingType,
          chosenAmount,
          chosenFinance
        );
      }

      if (!financialInformation.success) {
        setApiErrorMessage(financialInformation.message);
        setApiErrorState(true);
      } else {
        const patchFormStep_ = await patchFormStep(6);
        if (!patchFormStep_.success) {
          setApiErrorMessage(patchFormStep_.message);
          setApiErrorState(true);
        } else {
          setFormStep(6);
          history.push("/dashboard-progress");
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
                  <div className="registration-header__line active"></div>
                  <div className="registration-header__step"></div>
                  <div className="registration-header__line"></div>
                  <div className="registration-header__step"></div>
                </div>
              </div>
              {!wholeFormValidated && (
                <div className="alert alert--error">
                  <p>Please Fill the whole form correctly. The Financing
                     amount must contain a 'k' at the end. 
                  </p>
                </div>
              )}
              {apiErrorState && (
                <div className="alert alert--error">
                  <p>{apiErrorMessage}</p>
                </div>
              )}
              <form action="#" className="registration">
                <div className="registration__top">
                  <h1>Financial Information</h1>
                  <div className="row">
                    <div className="col-12">
                      <div className="form-group">
                        {/* <select name="" id="financing-type">
                          <option value="type">Type of financing needed</option>
                        </select> */}

                        <select
                          name="FinancingType"
                          id="financing-type"
                          onChange={updateFormField}
                          value={Form4.FinancingType}
                          // className={
                          //   formValidation.FinancingTypeValidate ? "" : "error"
                          // }
                        >
                          <option value="0">Type of financing needed</option>
                          <option value="Debt">Debt</option>
                          {/* <option value="Convertible Debt">
                            Convertible Debt
                          </option> */}
                          <option value="Equity">Equity</option>
                          <option value="Debt and Equity">Debt and Equity</option>
                          {/* <option value="Not Picky">Not Picky</option> */}
                        </select>
                        {/* {!formValidation.FinancingTypeValidate && (
                          <span className="has-error">* Required</span>
                        )} */}
                      </div>
                    </div>
                  </div>

                  <div className="registration">
                    <div className="registration__box">
                      <div className="registration__title">
                        How much money do you need?
                      </div>
                      <div className="registration__list disabled">
                        {Amounts.map((amount) => {
                          return (
                            <span
                              className={
                                amount.id === currentAmountIndex
                                  ? "registration__select active"
                                  : "registration__select"
                              }
                              key={amount.id}
                              onClick={() =>
                                AmountChanged(amount.id, amount.Amount)
                              }
                            >
                              {/* {amount.id === Amounts.length &&
                              amount.id === currentAmountIndex ? (
                                <input
                                  className="custom-amount"
                                  onChange={HandleCustomAmount}
                                  value={chosenCustomAmount}
                                />
                              ) : (
                                <h3>{amount.Amount}</h3>
                              )} */}
                              <h3>{amount.Amount}</h3>
                            </span>
                          );
                        })}
                      </div>
                      <input type="hidden" name="money" value="" />
                    </div>
                    <div className="registration__box">
                      <div className="registration__title">
                        What do you need financing for?
                      </div>
                      <div className="registration__list disabled">
                        {FinanceData.map(({ id, src, title }) => {
                          return (
                            <span
                              className={
                                id === currentFinanceIndex
                                  ? "registration__select active"
                                  : "registration__select"
                              }
                              key={id}
                              onClick={() => FinanceChanged(id, title)}
                            >
                              <div className="registration__select-icon">
                                <i className={src} />
                              </div>
                              <p>{title}</p>
                            </span>
                          );
                        })}
                      </div>
                      <input type="hidden" name="what" value="" />
                    </div>
                  </div>
                </div>
                <div style={{display:"flex"}}>
                  <BackButton
                    step={6}
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

export default Form4;
