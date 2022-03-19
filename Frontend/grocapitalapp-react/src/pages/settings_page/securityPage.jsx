import FormInput from "../../components/Form/FormInput";
import { useState } from "react";
import { baseUrl } from "../../services/util/baseUrl";
import passwordShowIcon from "../../icons/password-show.svg";
import passwordHideIcon from "../../icons/password-hide.svg";

const SecurityPage = (props) => {
  const [formValidation, setFormValidation] = useState({
    PasswordValidate: true,
    CPasswordValidate: true,
  });
  const [passwordResetForm, setPasswordResetForm] = useState({
    OldPassword: "",
    NewPassword: "",
    ConfirmNewPassword: "",
  });

  const [showOldPasswordState, setShowOldPasswordState] = useState(false);
  const [showNewPasswordState, setShowNewPasswordState] = useState(false);
  const [showConfirmPasswordState, setShowConfirmPasswordState] =
    useState(false);

  const updateFormField = (e) => {
    setPasswordResetForm({
      ...passwordResetForm,
      [e.target.name]: e.target.value,
    });

    switch (e.target.name) {
      case "NewPassword":
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,}$/.test(
          e.target.value
        ) && e.target.value.length > 0
          ? setFormValidation({ ...formValidation, PasswordValidate: true })
          : setFormValidation({ ...formValidation, PasswordValidate: false });
        break;

      case "ConfirmNewPassword":
        passwordResetForm.NewPassword === e.target.value
          ? setFormValidation({ ...formValidation, CPasswordValidate: true })
          : setFormValidation({ ...formValidation, CPasswordValidate: false });
        break;

      default:
      //Do nothing
    }
  };
  const updatePassword = async () => {
    if (formValidation.PasswordValidate && formValidation.CPasswordValidate) {
      const requestData = {
        old_password: passwordResetForm.OldPassword,
        new_password: passwordResetForm.NewPassword,
      };
      const response = await fetch(baseUrl() + "auth/settings/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(requestData),
      });
      if (response.ok) {
        return { success: true, message: "success" };
      } else if (response.status === 401) {
        const error = await response.json();
        return { success: false, message: error.detail };
      } else {
        const error = await response.json();
        return {
          success: false,
          message:
            '"' + Object.keys(error)[0] + '": ' + error[Object.keys(error)[0]],
        };
      }
    }
  };

  return (
    <div id="settings-pages">
      <div className="account_info_heading">
        <h1>Security</h1>
      </div>
      <section className="account_info_form">
        <div className="account_info_form__fields">
          <form action="#" className="registration">
            <div className="row">
              <div className="col-12 col-sm-6">
                <div className="form-group form-group--with-icon">
                  <div
                    className="form-group__icon"
                    onClick={() =>
                      setShowOldPasswordState(!showOldPasswordState)
                    }
                  >
                    <img
                      src={
                        showOldPasswordState
                          ? passwordShowIcon
                          : passwordHideIcon
                      }
                      alt="password Icon"
                    />
                  </div>
                  <FormInput
                    id="set-old-password"
                    title="Old password"
                    type={showOldPasswordState ? "text" : "password"}
                    name="OldPassword"
                    onchange={updateFormField}
                    // onkeyup={updateFormFieldOnKeyUp}
                    //   onblur={updateSsnField}
                    validate={true}
                    class="null"
                    //   message="The format should be xxx-xx-xxxx"
                    // value={`${Form.FName} ${Form.LName}`}
                    value={passwordResetForm.OldPassword}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-6"></div>
              <div className="col-12 col-sm-6">
                <div className="form-group form-group--with-icon">
                  <div
                    className="form-group__icon"
                    onClick={() =>
                      setShowNewPasswordState(!showNewPasswordState)
                    }
                  >
                    <img
                      src={
                        showNewPasswordState
                          ? passwordShowIcon
                          : passwordHideIcon
                      }
                      alt="password Icon"
                    />
                  </div>
                  <FormInput
                    id="set-new-password"
                    title="New password"
                    type={showNewPasswordState ? "text" : "password"}
                    name="NewPassword"
                    onchange={updateFormField}
                    //   onblur={updateTotalMonthlyIncomeField}
                    validate={formValidation.PasswordValidate}
                    message="Password must contain atleast 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character. Password must be atleast 8 characters long"
                    value={passwordResetForm.NewPassword}
                    class="null"
                  />
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <div className="form-group form-group--with-icon">
                  <div
                    className="form-group__icon"
                    onClick={() =>
                      setShowConfirmPasswordState(!showConfirmPasswordState)
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
                    id="confirm-pass"
                    title="Confirm new password"
                    type={showConfirmPasswordState ? "text" : "password"}
                    name="ConfirmNewPassword"
                    //onblur={updateTotalMonthlyExpensesField}
                    onchange={updateFormField}
                    validate={formValidation.CPasswordValidate}
                    message="Password doesn't match"
                    value={passwordResetForm.ConfirmNewPassword}
                    class="null"
                  />
                </div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div
                onClick={updatePassword}
                className="btn btn--green account_info_form__btn"
              >
                Change password
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};
export default SecurityPage;
