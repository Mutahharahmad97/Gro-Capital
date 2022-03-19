import { useState, useEffect, useContext } from "react";
import { AppControlContext } from "../../context/AppControlContext";
import { Link, useHistory } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import logo from "../../static/logo.svg";
import Plaid from "./Plaid";
import LoadingOverlay from "react-loading-overlay";
import patchFormStep from "../../services/Forms/patchFormStep";
import bankList from "../../static/uploads/banksList.png"
import BackButton from "../navigations";

const PlaidForm = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [apiErrorState, setApiErrorState] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState("");
  const { setFormStep, setFormBackSteps, formBackSteps } = useContext(AppControlContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const Skip = async () => {
    const patchFormStep_ = await patchFormStep(4);
    setFormBackSteps(formBackSteps > 0 ? formBackSteps-1:formBackSteps);
    if (!patchFormStep_.success) {
      setApiErrorMessage(patchFormStep_.message);
      setApiErrorState(true);
    } else {
      setFormStep(4);
      history.push("/registration");
    }
  };

  return (
    <LoadingOverlay active={loading} spinner text="Loading Plaid. Please Wait!">
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
                    <div className="registration-header__line"></div>
                    <div className="registration-header__step"></div>
                    <div className="registration-header__line"></div>
                    <div className="registration-header__step"></div>
                    <div className="registration-header__line"></div>
                    <div className="registration-header__step"></div>
                  </div>
                </div>
                {apiErrorState && (
                  <div className="alert alert--error">
                    <p>{apiErrorMessage}</p>
                  </div>
                )}
                <div action="#" className="registration">
                  <div className="registration__top">
                    <h1>Bank Information</h1>
                    <div className="box__img">
                      <img src={bankList} alt="" />
                      {/* <p style={{textAlign:"center",fontSize:"16px"}}>
                      Gro securely connects to your institution and analyzes <br />
                      your transactions to determine your investability.
                      </p> */}
                    </div>
                  </div>
                  <Plaid
                      setApiErrorState={setApiErrorState}
                      setApiErrorMessage={setApiErrorMessage}
                    />
                  <div style={{display:"flex",marginTop:"2%"}}>
                    <BackButton
                      step={3}
                    />
                    <div
                      onClick={Skip}
                      className="btn btn--full btn--green open-popup"
                      style={{marginLeft:"1%"}}
                    >
                      Next/Skip
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
                </div>
              </div>
              <SideBar
                heading1="Let's build"
                heading2="your company profile"
                description="Gro securely connects to your institution and analyzes your transactions to determine your investability."
              />
            </div>
          </div>
        </section>
      </div>
    </LoadingOverlay>
  );
};

export default PlaidForm;
