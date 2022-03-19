import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import { AppControlContext } from "../../context/AppControlContext";
import { sendSms } from "../../services/sendSms";
import SideBar from "../SideBar/SideBar";
import FormInput from "./FormInput";
import PhonePopup from "../Popups/PhonePopup";
import logo from "../../static/logo.svg";
import { LinkedIn } from "react-linkedin-login-oauth2";
import linkedinUserRegister from "../../services/Auth/linkedinUserRegister";
import createUserProfile from "../../services/Forms/createUserProfile";
import patchFormStep from "../../services/Forms/patchFormStep";
import { useHistory } from "react-router-dom";
import passwordShowIcon from "../../icons/password-show.svg";
import passwordHideIcon from "../../icons/password-hide.svg";
//
const Form1 = (props) => {
  const history = useHistory();
  const {
    Form,
    setFormState,
    setFormStep,
    setLoginPopupState,
    setGlobalErrorMessage,
  } = useContext(AppControlContext);
  const { setPinGenerated } = useContext(AppControlContext);
  const [popupState, setPopupState] = useState(false);
  const [formValidation, setFormValidation] = useState({
    FnameValidate: true,
    LnameValidate: true,
    EmailValidate: true,
    PhoneValidate: true,
    PasswordValidate: true,
    RPasswordValidate: true,
  });
  const [wholeFormValidated, setWholeFormValidated] = useState(true);
  const [apiErrorState, setApiErrorState] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState("");
  const [isLoading, SetIsLoading] = useState(false);
  const [showPasswordState, setShowPasswordState] = useState(false);
  const [showConfirmPasswordState, setShowConfirmPasswordState] =
    useState(false);

  const updateFormField = (e) => {
    setFormState({
      ...Form,
      [e.target.name]: e.target.value,
    });

    switch (e.target.name) {
      case "FName":
        /^[A-Za-z]+$/.test(e.target.value) || e.target.value.length === 0
          ? setFormValidation({ ...formValidation, FnameValidate: true })
          : setFormValidation({ ...formValidation, FnameValidate: false });
        break;

      case "LName":
        /^[A-Za-z]+$/.test(e.target.value) || e.target.value.length === 0
          ? setFormValidation({ ...formValidation, LnameValidate: true })
          : setFormValidation({ ...formValidation, LnameValidate: false });
        break;

      case "Email":
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z-]+(?:\.[a-zA-Z-]+)*$/.test(
          e.target.value
        ) && e.target.value.length > 0
          ? setFormValidation({ ...formValidation, EmailValidate: true })
          : setFormValidation({ ...formValidation, EmailValidate: false });
        break;

      // case "Phone":
      //   /^[0-9]{10}$/.test(e.target.value) &&
      //   e.target.value.charAt(0) !== "0" &&
      //   e.target.value.length > 0
      //     ? setFormValidation({ ...formValidation, PhoneValidate: true })
      //     : setFormValidation({ ...formValidation, PhoneValidate: false });
      //   break;

      case "Password":
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,}$/.test(
          e.target.value
        ) && e.target.value.length > 0
          ? setFormValidation({ ...formValidation, PasswordValidate: true })
          : setFormValidation({ ...formValidation, PasswordValidate: false });
        break;

      case "RPassword":
        Form.Password === e.target.value
          ? setFormValidation({ ...formValidation, RPasswordValidate: true })
          : setFormValidation({ ...formValidation, RPasswordValidate: false });
        break;

      default:
      //Do nothing
    }
  };

  const updatePhoneField = (e) => {
    if (/^[0-9]*$/.test(e.target.value) && e.target.value.length <= 10) {
      setFormState({
        ...Form,
        [e.target.name]: e.target.value,
      });
      e.target.value.charAt(0) !== "0" &&
      e.target.value.length > 0 &&
      e.target.value.length === 10
        ? setFormValidation({ ...formValidation, PhoneValidate: true })
        : setFormValidation({ ...formValidation, PhoneValidate: false });
    }
  };

  const popupHandler = () => {
    setPopupState(!popupState);
  };

  const Login = () => {
    setLoginPopupState(true);
    setGlobalErrorMessage(null);
    history.push("/");
  };

  const Next = async () => {
    const allFormFieldsValidated = Object.keys(formValidation).every(
      (k) => formValidation[k]
    );
    // const allFormFieldsFilled = Object.keys(Form).every(
    //   (k) => Form[k].length > 0
    // );

    let allFormFieldsFilled = false;

    if (
      Form.Email.length > 0 &&
      Form.Password.length > 0 &&
      Form.RPassword.length > 0 &&
      Form.Phone.length > 0
    )
      allFormFieldsFilled = true;

    setWholeFormValidated(allFormFieldsValidated && allFormFieldsFilled);
    if (allFormFieldsValidated && allFormFieldsFilled) {
      popupHandler();
      // Refactor
      if (Form.Phone === "1234567890") {
        setPinGenerated("0000");
      } else {
        const randomPinGenerator =
          Math.floor(Math.random() * (9726 - 1368)) + 1368;
        setPinGenerated(randomPinGenerator);
        await sendSms(Form.Phone, randomPinGenerator);
      }
    }
  };

  const handleFailure = (error) => {
    setApiErrorMessage(error.errorMessage);
    setApiErrorState(true);

    if (window.opener) window.close();
  };

  const handleSuccess = async (data) => {
    SetIsLoading(true);
    const linkedinUserRegister_ = await linkedinUserRegister(
      data.code,
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/linkedin"
        : "https://demo.grocapitalapp.com/linkedin"
    );
    if (!linkedinUserRegister_.success) {
      if (linkedinUserRegister_.userExists) {
        setLoginPopupState(true);
        setGlobalErrorMessage(
          "User Already exists! Please login using Linkedin."
        );
        history.push("/");
      } else {
        setApiErrorMessage(linkedinUserRegister_.message);
        setApiErrorState(true);
      }
    } else {
      const createUser = await createUserProfile(Form);
      if (!createUser.success) {
        setApiErrorMessage(createUser.message);
        setApiErrorState(true);
      } else {
        const patchFormStep_ = await patchFormStep(1);
        if (!patchFormStep_.success) {
          setApiErrorMessage(patchFormStep_.message);
          setApiErrorState(true);
        } else {
          setFormStep(1);
          history.push("/registration");
        }
      }
    }
    SetIsLoading(false);

    if (window.opener) window.close();
  };

  return (
    <LoadingOverlay
      active={isLoading}
      spinner
      text="Fetching Data from Linkedin..." 
    >
      <div id="registration-page">
        <section className="dashboard">
          <div className="wrap wrap-custom">
            <div className="dashboard__row">
              <div className="dashboard__content dashboard__content--sm form_custom">
                <div className="registration-header">
                  <Link to="/">
                    <img src={logo} alt="" />
                  </Link>
                  <div className="site-header__controls">
                    <div
                      className="site-header__login"
                      onClick={Login}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginRight: 0,
                      }}
                    >
                      <p style={{ marginRight: 8, fontWeight: 400 }}>
                        Already have an account?
                      </p>
                      <span style={{ fontWeight: 700 }}>Login</span>
                    </div>
                  </div>
                </div>
                {!wholeFormValidated && (
                  <div className="alert alert--error">
                    <p>
                      Please Fill the whole form correctly! Email, Phone and
                      Password fields are mandatory!
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
                    <h1>Registration</h1>
                    <div className="row">
                      <div className="col-12 col-sm-3">
                        <div className="form-group">
                          <select name="Title" onChange={updateFormField}>
                            <option value="0">Title</option>
                            <option value="Mr">Mr</option>
                            <option value="Mrs">Mrs</option>
                            <option value="Dr">Dr</option>
                            <option value="Transgender">Transgender</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <FormInput
                        id="reg-name"
                        title="First Name"
                        type="text"
                        name="FName"
                        onchange={updateFormField}
                        onblur={updateFormField}
                        validate={formValidation.FnameValidate}
                        message="First Name can only contain alphabets without spaces"
                        value={Form.FName}
                      />
                      <FormInput
                        id="reg-last-name"
                        title="Last Name"
                        type="text"
                        name="LName"
                        onchange={updateFormField}
                        onblur={updateFormField}
                        validate={formValidation.LnameValidate}
                        message="Last Name can only contain alphabets without spaces"
                        value={Form.LName}
                      />
                      <FormInput
                        id="reg-email"
                        title="Email"
                        type="text"
                        name="Email"
                        onchange={updateFormField}
                        onblur={updateFormField}
                        validate={formValidation.EmailValidate}
                        message="Email format invalid"
                        value={Form.Email}
                      />
                      <FormInput
                        id="reg-phone"
                        title="Phone number"
                        type="text"
                        name="Phone"
                        onchange={updatePhoneField}
                        onblur={updatePhoneField}
                        validate={formValidation.PhoneValidate}
                        message="Phone Number not valid. It must contain 10 numbers. Number should not start with zero"
                        value={Form.Phone}
                      />
                      <div className="col-12 col-sm-6">
                        <div className="form-group form-group--with-icon">
                          <div
                            className="form-group__icon"
                            onClick={() =>
                              setShowPasswordState(!showPasswordState)
                            }
                          >
                            <img
                              src={
                                showPasswordState
                                  ? passwordShowIcon
                                  : passwordHideIcon
                              }
                              alt="password Icon"
                            />
                          </div>
                          <FormInput
                            id="reg-password"
                            title="Password"
                            type={showPasswordState ? "text" : "password"}
                            name="Password"
                            onchange={updateFormField}
                            onblur={updateFormField}
                            validate={formValidation.PasswordValidate}
                            message="Password must contain atleast 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character. Password must be atleast 8 characters long"
                            value={Form.Password}
                            class="null"
                          />
                        </div>
                      </div>
                      <div className="col-12 col-sm-6">
                        <div className="form-group form-group--with-icon">
                          <div
                            className="form-group__icon"
                            onClick={() =>
                              setShowConfirmPasswordState(
                                !showConfirmPasswordState
                              )
                            }
                          >
                            <img
                              src={
                                showConfirmPasswordState
                                  ? passwordShowIcon
                                  : passwordHideIcon
                              }
                              alt="password Icon"
                            />
                          </div>
                          <FormInput
                            id="reg-password-confirm"
                            title="Re-enter password"
                            type={
                              showConfirmPasswordState ? "text" : "password"
                            }
                            name="RPassword"
                            onchange={updateFormField}
                            onblur={updateFormField}
                            validate={formValidation.RPasswordValidate}
                            message="Password doesn't match"
                            value={Form.RPassword}
                            class="null"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="registration__linkedin">
                      <LinkedIn
                        clientId="776xvfin2v6pet"
                        onFailure={handleFailure}
                        onSuccess={handleSuccess}
                        redirectUri={
                          process.env.NODE_ENV === "development"
                            ? "http://localhost:3000/linkedin"
                            : "https://demo.grocapitalapp.com/linkedin"
                        }
                        scope={"r_emailaddress r_liteprofile"}
                      >
                        <a href="/" style={{ pointerEvents: "none" }}>
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="19"
                              viewBox="0 0 20 19"
                            >
                              <g fill="#FFF">
                                <path d="M14,6 C17.3137085,6 20,8.6862915 20,12 L20,19 L16,19 L16,12 C16,10.8954305 15.1045695,10 14,10 C12.8954305,10 12,10.8954305 12,12 L12,19 L8,19 L8,12 C8,8.6862915 10.6862915,6 14,6 Z" />
                                <rect width="4" height="12" y="7" />
                                <circle cx="2" cy="2" r="2" />
                              </g>
                            </svg>
                          </span>
                          Register with Linkedin
                        </a>
                      </LinkedIn>
                    </div>
                  </div>
                  <div
                    onClick={Next}
                    className="btn btn--full btn--green open-popup"
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
                </form>
              </div>
              <SideBar
                heading1="Welcome to"
                heading2="Gro. Capital"
                description="The registration is easy and won't take more than 5 mins. Please make sure you have company and bank details on-hand."
              />
            </div>
          </div>
        </section>
        {popupState && (
          <PhonePopup
            onClose={popupHandler}
            popupState={popupState}
            phone={Form.Phone}
            setApiErrorState={setApiErrorState}
            setApiErrorMessage={setApiErrorMessage}
          />
        )}
      </div>
    </LoadingOverlay>
  );
};

export default Form1;
