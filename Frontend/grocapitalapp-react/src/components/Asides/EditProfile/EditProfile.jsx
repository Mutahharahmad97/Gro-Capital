import { useContext, useState, createRef, useEffect, useRef } from "react";
import { AppControlContext } from "../../../context/AppControlContext";
import FormInput from "../../Form/FormInput";
import editUserProfile from "../../../services/Forms/editUserProfile";
import { mediaUrl } from "../../../services/util/baseUrl";
// import Calendar from "react-calendar";

const EditProfile = (props) => {
  const {
    editProfileAsideState,
    setEditProfileAsideState,
    Form,
    Form3,
    avatar,
  } = useContext(AppControlContext);
  const [editProfileForm, setEditProfileForm] = useState({
    Email: "",
    Password: "",
    Birthday: "",
    // License: "4741121003",
    SocialSecurityNumber: "",
  });

  const [formValidation, setFormValidation] = useState({
    EmailValidate: true,
    PasswordValidate: true,
    BirthdayValidate: true,
    SocialSecurityNumberValidate: true,
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [avatarImage, setAvatarImage] = useState(null);
  const [userImage, setUserImage] = useState(null);
  // const [calendarValue, setCalendarValue] = useState(new Date());
  // const [calendarState, setCalendarState] = useState(false);
  const dateInputRef = useRef();

  const imageUpload = createRef();
  const imageUploadHandler = (e) => {
    const image = e.target.files[0];

    if (image && image.name.match(/\.(jpg|jpeg|png)$/)) {
      setAvatarImage(e.target.files[0]);
      setUserImage(URL.createObjectURL(e.target.files[0]));
      setErrorMessage(null);
    } else setErrorMessage("Invalid Image File!");
  };

  const updateFormField = (e) => {
    setEditProfileForm({
      ...editProfileForm,
      [e.target.name]: e.target.value,
    });

    switch (e.target.name) {
      case "Email":
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z-]+(?:\.[a-zA-Z-]+)*$/.test(
          e.target.value
        ) && e.target.value.length > 0
          ? setFormValidation({ ...formValidation, EmailValidate: true })
          : setFormValidation({ ...formValidation, EmailValidate: false });
        break;

      case "Password":
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,}$/.test(
          e.target.value
        ) || e.target.value.length === 0
          ? setFormValidation({ ...formValidation, PasswordValidate: true })
          : setFormValidation({ ...formValidation, PasswordValidate: false });
        break;

      case "Birthday":
        /^(\d{2})\/(\d{2})\/(\d{4})$/.test(e.target.value) &&
        e.target.value.length > 0
          ? setFormValidation({
              ...formValidation,
              BirthdayValidate: true,
            })
          : setFormValidation({
              ...formValidation,
              BirthdayValidate: false,
            });
        break;

      default:
      // Do Nothing
    }
  };

  // const updateFormFieldOnKeyUp = (e) => {
  //   switch (e.target.name) {
  //     case "SocialSecurityNumber":
  //       if (e.target.value.length === 3 || e.target.value.length === 6)
  //         setEditProfileForm({
  //           ...editProfileForm,
  //           [e.target.name]:
  //             e.keyCode === 8
  //               ? e.target.value.slice(0, -1)
  //               : e.target.value + "-",
  //         });

  //       /^\d{3}-?\d{2}-?\d{4}$/.test(e.target.value) &&
  //       e.target.value.length > 0
  //         ? setFormValidation({
  //             ...formValidation,
  //             SocialSecurityNumberValidate: true,
  //           })
  //         : setFormValidation({
  //             ...formValidation,
  //             SocialSecurityNumberValidate: false,
  //           });
  //       break;

  //     default:
  //     // Nothing
  //   }
  // };

  const updateSsnField = (e) => {
    if (e.target.value.length < 12 && /^[0-9]+$/.test(parseInt(e.target.value))){
      setEditProfileForm({
        ...editProfileForm,
          [e.target.name]:
          (e.target.value.length === 3 || e.target.value.length === 6)
              ? (e.target.value + "-") :
              e.keyCode === 8 ? (e.target.value.slice(0,-1))
              : e.target.value
        });
      /^\d{3}-?\d{2}-?\d{4}$/.test(e.target.value) ||
      e.target.value.length === 0
        ? setFormValidation({
            ...formValidation,
            SocialSecurityNumberValidate: true,
          })
        : setFormValidation({
            ...formValidation,
            SocialSecurityNumberValidate: false,
          })
    };
  };

  // const chooseDate = async (e) => {
  //   setCalendarValue(e);
  //   setCalendarState(!calendarState);
  //   let month =
  //     e.getMonth() + 1 < 10 ? `0${e.getMonth() + 1}` : e.getMonth() + 1;
  //   let date = e.getDate() < 10 ? `0${e.getDate()}` : e.getDate();
  //   let year = e.getFullYear();
  //   await setEditProfileForm({
  //     ...editProfileForm,
  //     Birthday: month + "/" + date + "/" + year,
  //   });
  //   dateInputRef.current.focus();
  // };

  const editProfileAsideStateHandler = () => {
    if (editProfileAsideState) {
      setErrorMessage(null);
      setEditProfileForm({ ...editProfileForm, Password: "" });
    }

    setEditProfileAsideState(!editProfileAsideState);
  };

  const editProfileSubmitHandler = async () => {
    const allFormFieldsValidated = Object.keys(formValidation).every(
      (k) => formValidation[k]
    );

    if (allFormFieldsValidated) {
      const editProfile = await editUserProfile({
        avatar: avatarImage,
        email: editProfileForm.Email,
        password: editProfileForm.Password,
        // birthday: editProfileForm.Birthday,
        driver_license_number: editProfileForm.License,
        social_security_number: editProfileForm.SocialSecurityNumber,
      });

      !editProfile.success
        ? setErrorMessage("An Error occurred! Please try again.")
        : setErrorMessage("Successfully Updated!");
    } else setErrorMessage("Fill the form correctly!");
  };

  useEffect(() => {
    setEditProfileForm({
      ...editProfileForm,
      Email: Form.Email,
      SocialSecurityNumber: Form3.SocialSecurityNumber,
      Birthday: Form3.Birthday,
    });
  }, [Form, Form3]);

  return (
    <aside
      id="sidebar-profile"
      className={`${props.activeState ? "sidebar active" : "sidebar"}`}
    >
      <div className="sidebar__title">
        <h2>Edit Profile</h2>
        <div onClick={editProfileAsideStateHandler} className="sidebar__close">
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
      </div>
      <div className="user-profile">
        <div>
          <div className="user-profile__avatar">
            {avatar !== "" || userImage ? (
              // <img src={userImage} alt="User" />
              <img
                src={userImage ? userImage : mediaUrl() + avatar}
                alt="User"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 30 30"
                className="avatar-icon"
              >
                <g fill="none" fillRule="evenodd" transform="translate(1 1)">
                  <circle cx="14" cy="14" r="14" />
                  <path
                    fill="#CFCFCF"
                    fillRule="nonzero"
                    d="M14,0 C6.2680135,0 0,6.2680135 0,14 C0,21.7319865 6.2680135,28 14,28 C21.7319865,28 28,21.7319865 28,14 C28,6.2680135 21.7319865,0 14,0 Z M14,2 C20.627417,2 26,7.372583 26,14 C26,20.627417 20.627417,26 14,26 C7.372583,26 2,20.627417 2,14 C2,7.372583 7.372583,2 14,2 Z"
                  />
                  <g transform="translate(9 6)">
                    <circle cx="5" cy="5" r="5" />
                    <path
                      fill="#CFCFCF"
                      fillRule="nonzero"
                      d="M5,-1.11022302e-16 C2.23857625,-1.11022302e-16 -1.11022302e-16,2.23857625 -1.11022302e-16,5 C-1.11022302e-16,7.76142375 2.23857625,10 5,10 C7.76142375,10 10,7.76142375 10,5 C10,2.23857625 7.76142375,-1.11022302e-16 5,-1.11022302e-16 Z M5,2 C6.65685425,2 8,3.34314575 8,5 C8,6.65685425 6.65685425,8 5,8 C3.34314575,8 2,6.65685425 2,5 C2,3.34314575 3.34314575,2 5,2 Z"
                    />
                  </g>
                  <path
                    fill="#CFCFCF"
                    fillRule="nonzero"
                    d="M14.028,17.501 C16.6098382,17.501 19.3161865,18.3132408 22.0028801,19.6600317 C22.9330203,20.1262941 23.7952091,20.6253984 24.5696067,21.125269 L25.0410584,21.436869 L25.4882248,21.7507024 L25.5660156,21.8085156 L24.3619844,23.4054844 L24.1301506,23.2379295 L23.7803285,22.9992308 L23.4849558,22.805606 C22.7684941,22.3431328 21.968261,21.8798934 21.1066199,21.4479683 C18.6739385,20.2285092 16.2499118,19.501 14.028,19.501 L13.9150787,19.5016333 C11.7206232,19.526179 9.31949744,20.2508946 6.90264737,21.4498298 C6.03107104,21.8821957 5.22029515,22.3459156 4.49334493,22.8088996 L4.06212326,23.0898138 L3.83797601,23.2419724 L3.60199791,23.409986 L2.41000209,21.804014 L2.68818826,21.60551 L2.94167071,21.4331281 L3.41896757,21.1219754 C4.20303297,20.6226156 5.07483521,20.1239918 6.01385263,19.6581702 C8.52016727,18.4148541 11.0358993,17.6269093 13.4427331,17.5148043 L13.8927094,17.5017584 L14.028,17.501 Z"
                  />
                </g>
              </svg>
            )}
            <span
              className="user-profile__upload-photo"
              style={{ cursor: "pointer" }}
              onClick={() => imageUpload.current.click()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="15"
                viewBox="0 0 17 15"
              >
                <g fill="#FFF" transform="translate(1 1)">
                  <path d="M5.455,-1 L5.33088799,-0.992280139 C5.04466427,-0.956509114 4.78537356,-0.798216952 4.6230749,-0.55488794 L3.556,1.045 L1.364,1.045 C0.0583988514,1.045 -1,2.10339885 -1,3.409 L-1,10.909 C-1,12.2146011 0.0583988514,13.273 1.364,13.273 L13.636,13.273 C14.9416011,13.273 16,12.2146011 16,10.909 L16,3.409 L15.9945516,3.2472285 C15.9114583,2.01773431 14.8882855,1.0459171 13.6377331,1.04500027 L11.444,1.045 L10.3779251,-0.55488794 C10.1924409,-0.832978239 9.88027324,-1 9.546,-1 L5.455,-1 Z M5.989,1 L9.011,1 L10.0780749,2.59988794 C10.2635591,2.87797824 10.5757268,3.045 10.91,3.045 L13.637,3.045 C13.8371942,3.04514704 14,3.20807226 14,3.409 L14,10.909 C14,11.1100316 13.8370316,11.273 13.636,11.273 L1.364,11.273 C1.16296835,11.273 1,11.1100316 1,10.909 L1,3.409 C1,3.20796835 1.16296835,3.045 1.364,3.045 L4.091,3.045 L4.21511201,3.03728014 C4.50133573,3.00150911 4.76062644,2.84321695 4.9229251,2.59988794 L5.989,1 Z" />
                  <path d="M7.5,3.273 C5.56700338,3.273 4,4.84000338 4,6.773 C4,8.70599662 5.56700338,10.273 7.5,10.273 C9.43299662,10.273 11,8.70599662 11,6.773 C11,4.84000338 9.43299662,3.273 7.5,3.273 Z M7.5,5.273 C8.32842712,5.273 9,5.94457288 9,6.773 C9,7.60142712 8.32842712,8.273 7.5,8.273 C6.67157288,8.273 6,7.60142712 6,6.773 C6,5.94457288 6.67157288,5.273 7.5,5.273 Z" />
                </g>
              </svg>
            </span>
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              name="avatar"
              id="custom-file"
              ref={imageUpload}
              onChange={imageUploadHandler}
            />
          </div>
          <div className="popup__txt" style={{ color: "red" }}>
            {errorMessage}
          </div>
          <FormInput
            id="input-email"
            title="Email"
            type="text"
            name="Email"
            onchange={updateFormField}
            onblur={updateFormField}
            message="Email format invalid"
            value={editProfileForm.Email}
            validate={formValidation.EmailValidate}
            class="col-12"
            customStyle={{ padding: 0 }}
          />
          <FormInput
            id="input-password"
            title="Change Password"
            type="password"
            name="Password"
            onchange={updateFormField}
            onblur={updateFormField}
            value={editProfileForm.Password}
            validate={formValidation.PasswordValidate}
            message="Password must contain atleast 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character. Password must be atleast 8 characters long"
            class="col-12"
            customStyle={{ padding: 0 }}
          />
          <div className="col-12" style={{ padding: 0 }}>
            <div className="form-group form-group--with-icon">
              {/* <div
                className="form-group__icon"
                onClick={() => setCalendarState(!calendarState)}
              >
                <i className="icon-calender"></i>
              </div> */}
              <FormInput
                id="input-birthday"
                title="Birthday"
                type="text"
                name="Birthday"
                onchange={updateFormField}
                onblur={updateFormField}
                onfocus={updateFormField}
                validate={formValidation.BirthdayValidate}
                message="This field is uneditable!"
                value={editProfileForm.Birthday}
                class="col-12"
                customStyle={{ padding: 0 }}
                Ref={dateInputRef}
                maxLength={10}
                disabled
              />
              {/* {calendarState && (
                <Calendar
                  onChange={(e) => chooseDate(e)}
                  value={calendarValue}
                />
              )} */}
            </div>
          </div>
          {/* <FormInput
            id="input-driver-license"
            title="Driver's license number"
            type="text"
            name="License"
            onchange={updateFormField}
            onblur={updateFormField}
            value={editProfileForm.License}
            validate={true}
            class="col-12"
            customStyle={{ padding: 0 }}
          /> */}
          <FormInput
            id="input-ssn"
            title="Social Security Number"
            type="text"
            name="SocialSecurityNumber"
            onchange={updateSsnField}
            onkeyup={updateSsnField}
            onblur={updateSsnField}
            value={editProfileForm.SocialSecurityNumber}
            validate={formValidation.SocialSecurityNumberValidate}
            message="Social Security Number format invalid"
            class="col-12"
            customStyle={{ padding: 0 }}
          />
          <div
            className="btn btn--green-thin btn--full btn--mb"
            onClick={editProfileAsideStateHandler}
          >
            Cancel
          </div>
          <div
            className={`btn btn--green btn--full`}
            onClick={editProfileSubmitHandler}
          >
            Save
          </div>
        </div>
      </div>
    </aside>
  );
};

export default EditProfile;
