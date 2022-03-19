import { useState, useContext, useEffect } from "react";
import { AppControlContext } from "../../context/AppControlContext";
import { useHistory } from "react-router-dom";
import login from "../../services/Auth/userLogin";
import resetPassword from "../../services/Auth/resetPassword";
import resetCodeVerification from "../../services/Auth/resetCodeVerification";
import changePassword from "../../services/Auth/changePassword";
import { LinkedIn } from "react-linkedin-login-oauth2";
import linkedinUserLogin from "../../services/Auth/linkedinUserLogin";
import getUserProfile from "../../services/Forms/getUserProfile";
import passwordShowIcon from "../../icons/password-show.svg";
import passwordHideIcon from "../../icons/password-hide.svg";

const LoginPopup = (props) => {
  const history = useHistory();
  const { setFormStep, globalErrorMessage, setGlobalErrorMessage } =
    useContext(AppControlContext);
  const popupState = props.popupState ? "popup active" : "popup";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [resetPasswordState, setResetPasswordState] = useState(false);

  const [enterCodeState, setEnterCodeState] = useState(false);
  const [recoveryCode, setRecoveryCode] = useState("");

  const [enterPasswordState, setEnterPasswordState] = useState(false);

  const [showPasswordState, setShowPasswordState] = useState(false);

  const allstatesReset = () => {
    setEnterCodeState(false);
    setResetPasswordState(false);
    setEnterPasswordState(false);
  };

  const handleFailure = (error) => {
    setErrorMessage(error.errorMessage);

    if (window.opener) window.close();
  };

  const handleSuccess = async (data) => {
    const linkedinUserLogin_ = await linkedinUserLogin(
      data.code,
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/linkedin"
        : "https://demo.grocapitalapp.com/linkedin"
    );
    if (!linkedinUserLogin_.success)
      setErrorMessage(linkedinUserLogin_.message);
    else {
      const getUserProfile_ = await getUserProfile();
      if (!getUserProfile_.success) {
        setErrorMessage(getUserProfile_.message);
      } else {
        if (getUserProfile_.response.form_step === 6)
          history.push("/dashboard");
        else if (
          getUserProfile_.response.form_step === null ||
          getUserProfile_.response.form_step < 1 ||
          getUserProfile_.response.form_step > 6
        ) {
          setErrorMessage("Some problem occurred with form steps!");
          localStorage.removeItem("token");
        } else {
          setFormStep(getUserProfile_.response.form_step);
          history.push("/registration");
        }
      }
    }

    if (window.opener) window.close();
  };

  const onLogin = async () => {
    setGlobalErrorMessage(null);
    if (email === "" || password === "" || password.trim().length === 0)
      setErrorMessage("Email or Password cannot be blank!");
    else {
      const userLogin = await login({ email, password });
      if (userLogin.success) {
        const getUserProfile_ = await getUserProfile();
        if (!getUserProfile_.success) {
          setErrorMessage(getUserProfile_.message);
        } else {
          if (getUserProfile_.response.form_step === 6)
            history.push("/dashboard");
          else if (
            getUserProfile_.response.form_step === null ||
            getUserProfile_.response.form_step < 1 ||
            getUserProfile_.response.form_step > 6
          ) {
            setErrorMessage("Some problem occurred with form steps!");
            localStorage.removeItem("token");
          } else {
            setFormStep(getUserProfile_.response.form_step);
            history.push("/registration");
          }
        }
      } else setErrorMessage(userLogin.message);
      //   userLogin.success
      //     ? history.push("/dashboard")
      //     : setErrorMessage(userLogin.message);
      // }
    }
  };

  const resetPasswordToggle = () => {
    setErrorMessage("");
    setResetPasswordState(true);
  };

  const onPasswordRecover = async () => {
    setErrorMessage("Verifying! Please Wait...");
    const passwordReset = await resetPassword({ email });
    if (passwordReset.success) {
      setEnterCodeState(true);
      setResetPasswordState(false);
    }
    setErrorMessage(passwordReset.message);
  };

  const verifyCode = async () => {
    const codeVerification = await resetCodeVerification({
      email,
      recoveryCode,
    });
    if (codeVerification.success) {
      setEnterCodeState(false);
      setResetPasswordState(false);
      setEnterPasswordState(true);
      setErrorMessage("");
    } else {
      setErrorMessage(codeVerification.message);
    }
  };

  const changePasswordHandler = async () => {
    if (password === confirmPassword) {
      if (
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,}$/.test(
          password
        ) &&
        password.length > 0 &&
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,}$/.test(
          confirmPassword
        ) &&
        confirmPassword.length > 0
      ) {
        const changePassword_ = await changePassword({
          email,
          recoveryCode,
          password,
        });

        if (changePassword_.success) {
          allstatesReset();
          setErrorMessage("Password Changed successfully!");
        } else {
          setErrorMessage(changePassword_.message);
        }
      } else
        setErrorMessage(
          "Password must contain atleast 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character. Password must be atleast 8 characters long"
        );
    } else {
      setErrorMessage("Password does not match!");
    }
  };

  useEffect(() => {
    if (globalErrorMessage) setErrorMessage(globalErrorMessage);
  }, [globalErrorMessage]);

  return (
    <div id="popup-company" className={popupState}>
      <div className="popup__box">
        <div className="popup__item popup__item--sm">
          <div
            className="popup__close"
            onClick={() => {
              props.onClose();
              allstatesReset();
              setErrorMessage("");
            }}
          >
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
          </div>

          <div className="popup__title popup__title--center">
            {resetPasswordState
              ? "Reset Password"
              : enterCodeState
              ? "Enter Code"
              : enterPasswordState
              ? "New Password"
              : "Login"}
          </div>
          <div className="popup__txt">
            {resetPasswordState
              ? "Enter your email for recovery code!"
              : enterCodeState
              ? "Enter your recovery code to change password!"
              : enterPasswordState
              ? "Enter your new passwords below!"
              : "Please enter your login credentials below!"}
          </div>

          {props.message && (
            <div className="popup__txt" style={{ color: "red" }}>
              {props.message}
            </div>
          )}

          {errorMessage.length > 1 && (
            <div className="popup__txt" style={{ color: "red" }}>
              {errorMessage}
            </div>
          )}

          {!enterCodeState && !enterPasswordState && (
            <div
              className={"col-12 col-sm-12"}
              style={{ marginBottom: "10px" }}
            >
              <div className="form-group" style={{ marginBottom: "15px" }}>
                <input
                  className={`${email.length > 0 ? "has-value" : ""}`}
                  type="text"
                  id="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      resetPasswordState ? onPasswordRecover() : onLogin();
                    }
                  }}
                />
                <label htmlFor="email">Email</label>
              </div>
            </div>
          )}

          {((!resetPasswordState && !enterCodeState) || enterPasswordState) && (
            <div className="col-12 col-sm-12">
              <div className="form-group form-group--with-icon">
                <div
                  className="form-group__icon"
                  onClick={() => setShowPasswordState(!showPasswordState)}
                >
                  <img
                    src={
                      showPasswordState ? passwordShowIcon : passwordHideIcon
                    }
                    alt="password Icon"
                  />
                </div>
                <input
                  className={`${password.length > 0 ? "has-value" : ""}`}
                  type={showPasswordState ? "text" : "password"}
                  id="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      enterPasswordState ? changePasswordHandler() : onLogin();
                    }
                  }}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          )}

          {enterPasswordState && (
            <div className={"col-12 col-sm-12"}>
              <div className="form-group">
                <input
                  className={`${confirmPassword.length > 0 ? "has-value" : ""}`}
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      changePasswordHandler();
                    }
                  }}
                />
                <label htmlFor="confirmPassword">Confirm Password</label>
              </div>
            </div>
          )}

          {enterCodeState && (
            <div
              className={"col-12 col-sm-12"}
              style={{ marginBottom: "10px" }}
            >
              <div className="form-group" style={{ marginBottom: "15px" }}>
                <input
                  className={`${recoveryCode.length > 0 ? "has-value" : ""}`}
                  type="number"
                  id="code"
                  name="code"
                  onChange={(e) =>
                    e.target.value.length < 5 && setRecoveryCode(e.target.value)
                  }
                  value={recoveryCode}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      verifyCode();
                    }
                  }}
                />
                <label htmlFor="Code">Verification Code</label>
              </div>
            </div>
          )}

          {!resetPasswordState && !enterCodeState && !enterPasswordState && (
            <div>
              <p
                onClick={resetPasswordToggle}
                style={{ color: "green", cursor: "pointer" }}
              >
                Forgot Password?
              </p>
            </div>
          )}

          <div>
            <div
              onClick={
                resetPasswordState
                  ? onPasswordRecover
                  : enterCodeState
                  ? verifyCode
                  : enterPasswordState
                  ? changePasswordHandler
                  : onLogin
              }
              className="btn btn--green btn--full"
            >
              {resetPasswordState
                ? "Send Code"
                : enterCodeState
                ? "Verify Code"
                : enterPasswordState
                ? "Change Password"
                : "Login"}
            </div>
          </div>

          {!resetPasswordState && !enterCodeState && !enterPasswordState && (
            <div
              className="registration__linkedin"
              style={{ paddingBottom: "0px" }}
            >
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
                  Login with Linkedin
                </a>
              </LinkedIn>
            </div>
          )}
        </div>
        <div className="popup__bg"></div>
      </div>
    </div>
  );
};

export default LoginPopup;