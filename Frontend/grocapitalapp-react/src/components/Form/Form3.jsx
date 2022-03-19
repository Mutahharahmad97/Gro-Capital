import { Link } from "react-router-dom";
import { useState, useContext, useRef } from "react";
import { AppControlContext } from "../../context/AppControlContext";
import Calendar from "react-calendar";
import SideBar from "../SideBar/SideBar";
import FormInput from "./FormInput";
import logo from "../../static/logo.svg";
import { useHistory } from "react-router-dom";
import addPersonalInformation from "../../services/Forms/addPersonalInformation";
import patchFormStep from "../../services/Forms/patchFormStep";
import BackButton from "../navigations";
import updatePersonalInformation from "../../services/Dashboard/updatePersonalInformation";
import SelectSearch, { fuzzySearch } from "react-select-search";
import states from "./json/states";

const Form3 = (props) => {
  const history = useHistory();
  const { Form3, setForm3State } = useContext(AppControlContext);
  const { setFormStep, setFormBackSteps, formBackSteps } =
    useContext(AppControlContext);

  const [formValidation, setFormValidation] = useState({
    SocialSecurityNumberValidate: true,
    HomeAddress1Validate: true,
    HomeAddress2Validate: true,
    ZipValidate: true,
    CityValidate: true,
    TotalMonthlyIncomeValidate: true,
    TotalMonthlyExpensesValidate: true,
    BirthdayValidate: true,
  });
  const [wholeFormValidated, setWholeFormValidated] = useState(true);
  // const [wholeFormFilled, setWholeFormFilled] = useState(true);
  const [apiErrorState, setApiErrorState] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState("");
  const [calendarState, setCalendarState] = useState(false);
  const [calendarValue, setCalendarValue] = useState(new Date());
  const dateInputRef = useRef();

  const getAge = (dateString) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const updateFormField = (e) => {
    setForm3State({
      ...Form3,
      [e.target.name]: e.target.value,
    });

    switch (e.target.name) {
      // case "PersonalPhysicalAddress":
      //   /^\d+\s[A-z]+\s[A-z]+/i.test(e.target.value) ||
      //   e.target.value.length === 0
      //     ? setFormValidation({
      //         ...formValidation,
      //         PersonalPhysicalAddressValidate: true,
      //       })
      //     : setFormValidation({
      //         ...formValidation,
      //         PersonalPhysicalAddressValidate: false,
      //       });
      //   break;
      case "HomeAddress1":
        e.target.value.length > 0
          ? setFormValidation({
              ...formValidation,
              PersonalPhysicalAddressValidate: true,
            })
          : setFormValidation({
              ...formValidation,
              PersonalPhysicalAddressValidate: false,
            });
        break;
      case "HomeAddress2":
        e.target.value.length > 0
          ? setFormValidation({
              ...formValidation,
              PersonalPhysicalAddressValidate: true,
            })
          : setFormValidation({
              ...formValidation,
              PersonalPhysicalAddressValidate: false,
            });
        break;
      case "TotalMonthlyIncome":
        /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/i.test(
          e.target.value
        ) || e.target.value.length > 0
          ? setFormValidation({
              ...formValidation,
              TotalMonthlyIncomeValidate: true,
            })
          : setFormValidation({
              ...formValidation,
              TotalMonthlyIncomeValidate: false,
            });
        break;
      case "TotalMonthlyExpenses":
        /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/i.test(
          e.target.value
        ) || e.target.value.length === 0
          ? setFormValidation({
              ...formValidation,
              TotalMonthlyExpensesValidate: true,
            })
          : setFormValidation({
              ...formValidation,
              TotalMonthlyExpensesValidate: false,
            });
        break;

      case "Birthday":
        if (
          /^(\d{2})\/(\d{2})\/(\d{4})$/.test(e.target.value) &&
          e.target.value.length > 0
        ) {
          if (getAge(e.target.value) >= 18) {
            setFormValidation({
              ...formValidation,
              BirthdayValidate: true,
            });
          } else {
            setFormValidation({
              ...formValidation,
              BirthdayValidate: false,
            });
          }
        } else {
          setFormValidation({
            ...formValidation,
            BirthdayValidate: false,
          });
        }
        break;

      default:
      //Do nothing
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
    if (
      (e.target.value.length < 12 &&
        /^[0-9]+$/.test(parseInt(e.target.value))) ||
      e.target.value === ""
    ) {
      setForm3State({
        ...Form3,
        [e.target.name]:
        (e.target.value.length === 3 && e.target.value[2] !== "-") || (e.target.value.length === 6 && e.target.value[5] !== "-")
            ? e.target.value + "-"
            : e.keyCode === 8
            ? e.target.value.slice(0, -1)
            : e.target.value,
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
          });
    }
  };

  const updateMonetaryFields = (e) => {
    if (/^[0-9]*(,[0-9]*)*$/.test(e.target.value) || e.target.value === "") {
      let num = e.target.value
      let formattedNumber = new Intl.NumberFormat({style:'currency', currency:'USD'}).format(num.replaceAll(',',''))
      if (e.target.value.length < 16) 
        if (!isNaN(formattedNumber)){
          setForm3State({
            ...Form3,
            [e.target.name]: formattedNumber,
          });
        } else {
          setForm3State({
            ...Form3,
            [e.target.name]: formattedNumber,
          });
        }
      /^[0-9]*(,[0-9]*)*$/.test(e.target.value) && e.target.name === 'TotalMonthlyIncome'
        ? setFormValidation({
            ...formValidation,
            TotalMonthlyIncomeValidate: true,
          }) :
      /^[0-9]*(,[0-9]*)*$/.test(e.target.value) && e.target.name === 'TotalMonthlyExpenses'
        ? setFormValidation({
            ...formValidation,
            TotalMonthlyExpensesValidate: true,
          }) :
      e.target.name === 'TotalMonthlyIncome'
        ?setFormValidation({
          ...formValidation,
          TotalMonthlyIncomeValidate: false,
        }) :
      e.target.name === 'TotalMonthlyExpenses'
        && setFormValidation({
          ...formValidation,
          TotalMonthlyExpensesValidate: false,
        });
    }
  };

  const updateZipField = (e) => {
    if (/^\d{0,5}$/.test(e.target.value)) {
      setForm3State({
        ...Form3,
        [e.target.name]: e.target.value,
      });
      /^\d{5}$/.test(e.target.value) || e.target.value.length === 0
        ? setFormValidation({ ...formValidation, ZipValidate: true })
        : setFormValidation({ ...formValidation, ZipValidate: false });
    }
  };

  const updateCityField = (e) => {
    if (/^([a-zA-Z](\s|-)?)*(?:[\s-][a-zA-Z]+)*$/.test(e.target.value))
      setForm3State({
        ...Form3,
        [e.target.name]: e.target.value,
      });
  };

  const selectSearch = (value) => {
    setForm3State({
      ...Form3,
      State: value,
    });
  };

  const chooseDate = async (e) => {
    setCalendarValue(e);
    setCalendarState(!calendarState);
    let month =
      e.getMonth() + 1 < 10 ? `0${e.getMonth() + 1}` : e.getMonth() + 1;
    let date = e.getDate() < 10 ? `0${e.getDate()}` : e.getDate();
    let year = e.getFullYear();
    await setForm3State({
      ...Form3,
      Birthday: month + "/" + date + "/" + year,
    });
    dateInputRef.current.focus();
  };

  const Back = () => {
    setFormStep(2);
    history.push("/registration");
  };
  //
  const Next = async () => {
    const allFormFieldsValidated = Object.keys(formValidation).every(
      (k) => formValidation[k]
    );
    let wholeFormFilled = true;
    if (
      Form3.SocialSecurityNumber.length === 0 ||
      Form3.TotalMonthlyExpenses.length === 0 ||
      Form3.TotalMonthlyIncome.length === 0 ||
      Form3.Birthday === undefined ||
      Form3.Birthday.length === 0 ||
      Form3.HomeAddress1.length === 0 ||
      Form3.HomeAddress2.length === 0
    )
      wholeFormFilled = false;
    // const allFormFieldsFilled = Object.keys(Form3).every(
    //   (k) => Form3[k].length > 0
    // );
    // setWholeFormValidated(allFormFieldsValidated && allFormFieldsFilled);
    setWholeFormValidated(allFormFieldsValidated && wholeFormFilled);
    if (allFormFieldsValidated && wholeFormFilled) {
      let personalInformation = { success: false };
      if (formBackSteps <= 0) {
        personalInformation = await addPersonalInformation({
          ...Form3,
          stateCode: states[states.findIndex((state) => state.name === Form3.State)].code,
        });
      } else {
        setFormBackSteps(formBackSteps - 1);
        personalInformation = await updatePersonalInformation(Form3);
      }
      if (!personalInformation.success) {
        setApiErrorMessage(personalInformation.message);
        setApiErrorState(true);
      } else {
        const patchFormStep_ = await patchFormStep(5);
        if (!patchFormStep_.success) {
          setApiErrorMessage(patchFormStep_.message);
          setApiErrorState(true);
        } else {
          setFormStep(6);
          history.push("/registration");
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
                  <div className="registration-header__line active"></div>
                  <div className="registration-header__step"></div>
                  <div className="registration-header__line"></div>
                  <div className="registration-header__step"></div>
                  <div className="registration-header__line"></div>
                  <div className="registration-header__step"></div>
                </div>
              </div>
              {!wholeFormValidated && (
                <div className="alert alert--error">
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
                  <h1>Personal Information</h1>
                  <div className="row">
                    <FormInput
                      id="reg-scn"
                      title="Social Security Number"
                      type="text"
                      name="SocialSecurityNumber"
                      onchange={updateSsnField}
                      // onkeyup={updateFormFieldOnKeyUp}
                      onblur={updateSsnField}
                      onfocus={() => setCalendarState(false)}
                      validate={formValidation.SocialSecurityNumberValidate}
                      message="The format should be xxx-xx-xxxx"
                      value={Form3.SocialSecurityNumber}
                    />
                    <div className="col-12 col-sm-6">
                      <div className="form-group form-group--with-icon">
                        <div
                          className="form-group__icon"
                          onClick={() => setCalendarState(!calendarState)}
                        >
                          <i className="icon-calender"></i>
                        </div>
                        <FormInput
                          id="input-birthday"
                          title="Birthday"
                          type="text"
                          name="Birthday"
                          onchange={updateFormField}
                          onblur={updateFormField}
                          onfocus={(e) => {
                            updateFormField(e);
                            setCalendarState(false);
                          }}
                          validate={formValidation.BirthdayValidate}
                          message="Date format (MM/DD/YYYY). Age must be atleast 18."
                          value={Form3.Birthday}
                          class="null"
                          Ref={dateInputRef}
                          maxLength={10}
                        />
                        {calendarState && (
                          <Calendar
                            onChange={(e) => chooseDate(e)}
                            value={calendarValue}
                          />
                        )}
                      </div>
                    </div>
                    <FormInput
                      id="reg-address-1"
                      title="Home Address 1"
                      type="text"
                      name="HomeAddress1"
                      onchange={updateFormField}
                      onblur={updateFormField}
                      onfocus={() => setCalendarState(false)}
                      validate={formValidation.HomeAddress1Validate}
                      message="This field is required."
                      value={Form3.HomeAddress1}
                    />
                    <FormInput
                      id="reg-address-2"
                      title="Home Address 2"
                      type="text"
                      name="HomeAddress2"
                      onchange={updateFormField}
                      onblur={updateFormField}
                      onfocus={() => setCalendarState(false)}
                      validate={formValidation.HomeAddress2Validate}
                      message="This field is required."
                      value={Form3.HomeAddress2}
                    />
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <FormInput
                          id="City"
                          title="City"
                          type="text"
                          name="City"
                          onchange={updateCityField}
                          onblur={updateCityField}
                          onfocus={() => setCalendarState(false)}
                          validate={formValidation.CityValidate}
                          message="Alphabets only"
                          value={Form3.City}
                          class="null"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-3">
                      <div className="form-group">
                        <SelectSearch
                          options={states}
                          search
                          autoComplete="null"
                          value={Form3.State}
                          filterOptions={fuzzySearch}
                          onChange={selectSearch}
                          onFocus={() => setCalendarState(false)}
                          placeholder="State"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-3">
                      <div className="form-group">
                        <FormInput
                          id="reg-zip"
                          title="Zip"
                          type="text"
                          name="Zip"
                          onchange={updateZipField}
                          onblur={updateZipField}
                          onfocus={() => setCalendarState(false)}
                          validate={formValidation.ZipValidate}
                          message="must contain 5 digits"
                          value={Form3.Zip}
                          class="null"
                        />
                      </div>
                    </div>
                    <FormInput
                      id="reg-tmi"
                      title="Total Monthly Income"
                      type="text"
                      name="TotalMonthlyIncome"
                      onchange={updateMonetaryFields}
                      onblur={updateMonetaryFields}
                      onfocus={() => setCalendarState(false)}
                      validate={formValidation.TotalMonthlyIncomeValidate}
                      message="1200.00 / Numeric value only"
                      value={Form3.TotalMonthlyIncome}
                    />
                    <FormInput
                      id="reg-tme"
                      title="Total Monthly Expenses"
                      type="text"
                      name="TotalMonthlyExpenses"
                      onchange={updateMonetaryFields}
                      onblur={updateMonetaryFields}
                      onfocus={() => setCalendarState(false)}
                      validate={formValidation.TotalMonthlyExpensesValidate}
                      message="1200.00 / Numeric value only"
                      value={Form3.TotalMonthlyExpenses}
                    />
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <article
                    className="text"
                    style={{ paddingTop: 0, marginBottom: "60px" }}
                  >
                    <h2>
                      Checking your rate will not affect your credit score!
                    </h2>
                  </article>
                </div>
                <div style={{ display: "flex" }}>
                  {/* <div
                    style={{marginInline:"3px"}}
                    onClick={Back}
                    className="btn btn--full btn--green open-popup"
                  >
                    Back
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
                  </div> */}
                  <BackButton step={5} />
                  <div
                    style={{ marginLeft: "1%" }}
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
                </div>
              </form>
            </div>
            <SideBar
              heading1="Let's build"
              heading2="your personal profile"
              description="The more information we have about your personal credit, the better your investability score will be. Remember, checking your investability score will not impact your personal
              credit score"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Form3;
