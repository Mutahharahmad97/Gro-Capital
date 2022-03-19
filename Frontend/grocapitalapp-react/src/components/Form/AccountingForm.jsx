import { useState, useContext } from "react";
import { AppControlContext } from "../../context/AppControlContext";
import BackButton from "../navigations";
import patchFormStep from "../../services/Forms/patchFormStep";
import SideBar from "../SideBar/SideBar";
import { Link, useHistory } from "react-router-dom";
import logo from "../../static/logo.svg";
import quickbookslogo from "../../static/qb.svg";
import freshbookslogo from "../../static/FreshBooks_logo.svg";
import xerologo from "../../static/xero-logo.svg";
import { baseUrl } from "../../services/util/baseUrl";
import { GET_ALL_DATA_USER_URL } from "../../services/util/urls";


const AccountingForm = () => {
  const history = useHistory();
  const {
    Form4,
    setForm4State,
    Form3,
    setForm3State,
    Form2,
    setForm2State,
  } = useContext(AppControlContext);
  const [apiErrorState, setApiErrorState] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState("");

  const { setFormStep, setFormBackSteps, formBackSteps } = useContext(AppControlContext);

  const QuickBooksPopup = () => {
    let parameters = "location=1,width=800,height=650";
    parameters +=
      ",left=" +
      (window.screen.width - 800) / 2 +
      ",top=" +
      (window.screen.height - 650) / 2;
    window.open(
      process.env.NODE_ENV === "development"
        ? "http://localhost:8000/intuit/oauth"
        : "https://backend.grocapitalapp.com/intuit/oauth",
      "connectPopupQuickbooks",
      parameters
    );
    console.log("Fired")
  };

  const FreshbooksPopup = () => {
    let parameters = "location=1,width=800,height=650";
    parameters +=
      ",left=" +
      (window.screen.width - 800) / 2 +
      ",top=" +
      (window.screen.height - 650) / 2;
    window.open(
      process.env.NODE_ENV === "development"
        ? `http://localhost:8000/freshbooks_app/oauth/${localStorage.getItem("userProfileId")}`
        : `https://backend.grocapitalapp.com/freshbooks_app/oauth/${localStorage.getItem("userProfileId")}`,
      "connectPopupFreshbooks",
      parameters
    );
    console.log("Fired")
  };

  const Next = async () => {
    fetch(baseUrl() + GET_ALL_DATA_USER_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setForm2State({
          CorporateName: response.corporate_name,
          BusinessAs: response.business_as,
          SicCode: response.sic_code,
          DateOfEstablishment: response.date_of_establishment,
          TypeofOwnership: response.type_of_ownership,
          BusinessPhysicalAddress: response.business_physical_address,
          DUNS: response.duns,
          City: response.city,
          State: response.state,
          Zip: response.zip,
          BusinessPhone: response.business_phone,
          Extension: response.extension,
          EIN: response.ein,
        })
        setForm3State({
          SocialSecurityNumber: response.social_security_number,
          PersonalPhysicalAddress: response.personal_physical_address,
          HomeAddress1: response.home_address_1,
          HomeAddress2: response.home_address_2,
          City: response.personal_info_city,
          State: response.personal_info_state,
          Zip: response.personal_info_zip,
          TotalMonthlyExpenses: response.total_monthly_expenses,
          TotalMonthlyIncome: response.total_monthly_income,
          Birthday: response.birthday
        })
        setForm4State({
          FinancingType: response.finance,
        })
      })
    .catch((err) => console.log(err));
    if (formBackSteps > 0)
      setFormBackSteps(formBackSteps - 1);
    const patchFormStep_ = await patchFormStep(3);
    if (!patchFormStep_.success) {
      setApiErrorMessage(patchFormStep_.message);
      setApiErrorState(true);
    } else {
      setFormStep(3);
      history.push("/registration");
    }
  };

  return (
    <div id="registration-page">
      <section className="dashboard" style={{ overflow: "hidden" }}>
        <div className="wrap wrap-custom">
          <div className="dashboard__row">
            <div className="dashboard__content dashboard__content--sm form_custom">
              <div className="registration-header" style={{ margin: 0 }}>
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
                  <div className="registration-header__line active"></div>
                  <div className="registration-header__step"></div>
                </div>
              </div>
              {apiErrorState && (
                <div className="alert alert--error">
                  <p>{apiErrorMessage}</p>
                </div>
              )}
              <div className="col-12 col-mb">
                <div className="heading-container">
                  <div className="back-btn">
                    <span>{/* <i className="icon-angle-left"></i> */}</span>
                  </div>
                  <div className="title">
                    <h1>Accounting Setup</h1>
                  </div>
                </div>
                <div
                  className="white-box white-box--center"
                  style={{ textAlign: "start", padding: "3%" }}
                >
                  <div className="white-box__title">
                    <article
                      className="box__article"
                      style={{ maxWidth: "100%" }}
                    >
                      <p style={{ fontWeight: 400, color: "black" }}>
                        Next we are going to integrate our secure platform with
                        your online accounting software. This will allow us to
                        determine a more precise investability rate for you and
                        your company.
                      </p>
                      <h4 style={{ fontSize: "16px" }}>
                        Click on your accounting software application.
                      </h4>
                    </article>
                  </div>
                  <div className="row row--mb">
                    <div className="col-12 col-sm-4 col-mb">
                      <div
                        className="border-image-parent"
                        onClick={QuickBooksPopup}
                      >
                        <img
                          style={{ width: "180px", margin: "5px 0px" }}
                          src={quickbookslogo}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-4 col-mb">
                      <div
                        className="border-image-parent"
                        onClick={FreshbooksPopup}
                      >
                        <img
                          style={{ width: "180px" }}
                          src={freshbookslogo}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-4 col-mb">
                      <div className="border-image-parent-disabled">
                        <img
                          style={{ width: "90px", margin: "5px 0px" }}
                          src={xerologo}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="white-box__title"
                    style={{ marginTop: "7%", display: "flex" }}
                  >
                    <span>icon</span>
                    <article
                      className="box__article"
                      style={{ maxWidth: "100%" }}
                    >
                      <p
                        style={{
                          fontWeight: 400,
                          color: "black",
                          marginLeft: "10px",
                        }}
                      >
                        If you currently do not have an online accounting
                        service, please click below to upload your most recent
                        files.
                      </p>
                    </article>
                  </div>
                  <div className="drag-and-drop" style={{ padding: "25px" }}>
                    <p className="drop-down-text">
                      SIMPLY DRAG & DROP FILES HERE OR UPLOAD THEM CLICKING
                      HERE.
                    </p>
                    <span>
                      <em id="file-name"></em>
                      <a href="/" id="drag-and-drop-clear">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                        >
                          <g transform="translate(.414 .414)">
                            <path d="M12.2928932,0.292893219 C12.6834175,-0.0976310729 13.3165825,-0.0976310729 13.7071068,0.292893219 C14.0675907,0.65337718 14.0953203,1.22060824 13.7902954,1.61289944 L13.7071068,1.70710678 L1.70710678,13.7071068 C1.31658249,14.0976311 0.683417511,14.0976311 0.292893219,13.7071068 C-0.0675907428,13.3466228 -0.0953202783,12.7793918 0.209704612,12.3871006 L0.292893219,12.2928932 L12.2928932,0.292893219 Z" />
                            <path d="M0.292893219,0.292893219 C0.65337718,-0.0675907428 1.22060824,-0.0953202783 1.61289944,0.209704612 L1.70710678,0.292893219 L13.7071068,12.2928932 C14.0976311,12.6834175 14.0976311,13.3165825 13.7071068,13.7071068 C13.3466228,14.0675907 12.7793918,14.0953203 12.3871006,13.7902954 L12.2928932,13.7071068 L0.292893219,1.70710678 C-0.0976310729,1.31658249 -0.0976310729,0.683417511 0.292893219,0.292893219 Z" />
                          </g>
                        </svg>
                      </a>
                    </span>
                    <input type="file" id="drag-and-drop" />
                  </div>
                  <form action="#" className="registration">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "7%",
                      }}
                    >
                      {/* <div className="btn btn--full btn--green-thin">Back</div> */}
                      {/* <div
                        style={{ marginRight: "1%" }}
                        className="btn btn--full btn--green open-popup"
                      >
                        Back
                      </div> */}
                      <BackButton
                       step={2} 
                       form2={Form2}
                       setForm2={setForm2State}
                      />
                      <div
                        style={{ marginLeft: "1%" }}
                        className="btn btn--full btn--green open-popup"
                        onClick={Next}
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
                  </form>
                </div>
              </div>
            </div>
            <SideBar
              heading1="Welcome to"
              heading2="Gro. Capital"
              description="The registration is easy and won't take more than 5 mins. Please make sure you have company and bank details on-hand."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AccountingForm;
