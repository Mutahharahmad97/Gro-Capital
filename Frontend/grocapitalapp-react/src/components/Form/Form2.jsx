import { Link } from "react-router-dom";
import { useState, useContext, useRef } from "react";
import { AppControlContext } from "../../context/AppControlContext";
import SideBar from "../SideBar/SideBar";
import FormInput from "./FormInput";
import CompanyPopup from "../Popups/CompanyPopup";
import Calendar from "react-calendar";
import SelectSearch, { fuzzySearch } from "react-select-search";
import logo from "../../static/logo.svg";
import states from "./json/states";
import BackButton from "../navigations";
import "react-calendar/dist/Calendar.css";

const Form2 = (props) => {
  const { Form2, setForm2State } = useContext(AppControlContext);
  const [popupState, setPopupState] = useState(false);
  const [formValidation, setFormValidation] = useState({
    CorporateNameValidate: true,
    BusinessAsValidate: true,
    SicCodeValidate: true,
    DateOfEstablishmentValidate: true,
    TypeofOwnershipValidate: true,
    DUNSValidate: true,
    BusinessPhysicalAddressValidate: true,
    BusinessPhoneValidate: true,
    ExtensionValidate: true,
    ZipValidate: true,
    CityValidate: true,
    EINValidation: true,
  });
  const [wholeFormValidated, setWholeFormValidated] = useState(true);
  const [calendarState, setCalendarState] = useState(false);
  const [calendarValue, setCalendarValue] = useState(new Date());
  const dateInputRef = useRef();
  const [apiErrorState, setApiErrorState] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState("");

  const updateFormField = (e) => {
    setForm2State({
      ...Form2,
      [e.target.name]: e.target.value,
    });
    switch (e.target.name) {
      case "CorporateName":
        /^[A-Za-z + ?]+$/.test(e.target.value) && e.target.value.length > 0
          ? setFormValidation({
              ...formValidation,
              CorporateNameValidate: true,
            })
          : setFormValidation({
              ...formValidation,
              CorporateNameValidate: false,
            });
        break;

      case "BusinessAs":
        /^[A-Za-z + ?]+$/.test(e.target.value) || e.target.value.length === 0
          ? setFormValidation({ ...formValidation, BusinessAsValidate: true })
          : setFormValidation({ ...formValidation, BusinessAsValidate: false });
        break;

      // case "SicCode":
      //   /\d{3}/.test(e.target.value) || e.target.value.length > 0
      //     ? setFormValidation({ ...formValidation, SicCodeValidate: true })
      //     : setFormValidation({ ...formValidation, SicCodeValidate: false });
      //   break;

      case "DateOfEstablishment":
        if (e.target.value.length === 0)
          setFormValidation({
            ...formValidation,
            DateOfEstablishmentValidate: true,
          });
        else if (!/^(\d{2})\/(\d{2})\/(\d{4})$/.test(e.target.value)) {
          setFormValidation({
            ...formValidation,
            DateOfEstablishmentValidate: false,
          });
        } else {
          const date = e.target.value.split("/");
          if (
            date[0] >= 1 &&
            date[0] <= 12 &&
            date[1] >= 1 &&
            date[1] <= 31 &&
            date[2] >= 1 &&
            date[2] <= new Date().getFullYear()
          ) {
            setFormValidation({
              ...formValidation,
              DateOfEstablishmentValidate: true,
            });
          } else
            setFormValidation({
              ...formValidation,
              DateOfEstablishmentValidate: false,
            });
        }
        break;

      case "TypeofOwnership":
        e.target.value.length > 1 || e.target.value === "0"
          ? setFormValidation({
              ...formValidation,
              TypeofOwnershipValidate: true,
            })
          : setFormValidation({
              ...formValidation,
              TypeofOwnershipValidate: false,
            });
        break;

      // case "DUNS":
      //   // REFACTOR: Validation number changed from 10 to 9 so DUNS and BIN number matches.
      //   /^\d{9}$/.test(e.target.value) ||
      //   e.target.value.length >= 0
      //     ? setFormValidation({ ...formValidation, DUNSValidate: true })
      //     : setFormValidation({ ...formValidation, DUNSValidate: false });
      //   break;

      case "BusinessPhysicalAddress":
        /^[A-Za-z0-9# ]*$/i.test(e.target.value) || e.target.value.length === 0
          ? setFormValidation({
              ...formValidation,
              BusinessPhysicalAddressValidate: true,
            })
          : setFormValidation({
              ...formValidation,
              BusinessPhysicalAddressValidate: false,
            });
        break;

      case "City":
        /^[A-Za-z ]*$/.test(e.target.value) || e.target.value.length === 0
          ? setFormValidation({ ...formValidation, CityValidate: true })
          : setFormValidation({ ...formValidation, CityValidate: false });
        break;

      // case "BusinessPhone":
      //   (/^\d{10}$/.test(e.target.value) && e.target.value.charAt(0) !== "0")
      //   || e.target.value.length === 0
      //     ? setFormValidation({
      //         ...formValidation,
      //         BusinessPhoneValidate: true,
      //       })
      //     : setFormValidation({
      //         ...formValidation,
      //         BusinessPhoneValidate: false,
      //       });
      //   break;

      // case "Extension":
      //   (/^\d{2}$/.test(e.target.value) && e.target.value.charAt(0) !== "0") ||
      //   e.target.value.length === 0
      //     ? setFormValidation({ ...formValidation, ExtensionValidate: true })
      //     : setFormValidation({ ...formValidation, ExtensionValidate: false });
      //   break;

      default:
      // do nothing
    }
  };

  const updateEINField = (e) => {
    if (
      (e.target.value.length < 11 &&
        /^[0-9]*$/.test(parseInt(e.target.value))) ||
      e.target.value === ""
    ) {
      setForm2State({
        ...Form2,
        [e.target.name]:
        (e.target.value.length === 2 && e.target.value[1] !== "-")
            ? e.target.value + "-"
            : (e.keyCode === 8 || (e.target.value.length === 3 && e.target.value[2] === "-"))
            ? e.target.value.slice(0, -1)
            : e.target.value,
      });
      /^\d{2}-?\d{7}$/.test(e.target.value) ||
      e.target.value.length === 0
        ? setFormValidation({
            ...formValidation,
            EINValidation: true,
          })
        : setFormValidation({
            ...formValidation,
            EINValidation: false,
          });
    }
  };
  const updateDunsField = (e) => {
    if (/^\d{0,9}$/.test(e.target.value)) {
      if (e.target.value.length === 9 && e.target.value === "000000000")
        setFormValidation({
          ...formValidation,
          DUNSValidate: false,
        });
      else {
        setFormValidation({
          ...formValidation,
          DUNSValidate: true,
        });
      }
      setForm2State({
        ...Form2,
        [e.target.name]: e.target.value,
      });
    }
  };

  const updateZipField = (e) => {
    if (/^\d{0,5}$/.test(e.target.value)) {
      setForm2State({
        ...Form2,
        [e.target.name]: e.target.value,
      });
      if (/^\d{5}$/.test(e.target.value) || e.target.value.length === 0) {
        setFormValidation({ ...formValidation, ZipValidate: true });
      }
      if (e.target.value.length === 5 && e.target.value === "00000")
        setFormValidation({ ...formValidation, ZipValidate: false });
    }
  };

  const updateCityField = (e) => {
    if (/^[A-Za-z ]*$/.test(e.target.value))
      setForm2State({
        ...Form2,
        [e.target.name]: e.target.value,
      });
  };

  const updateExtensionField = (e) => {
    if (/^\d{0,10}$/.test(e.target.value)) {
      setForm2State({
        ...Form2,
        [e.target.name]: e.target.value,
      });
      (/^[1-9]{1}\d{1,10}$/.test(e.target.value) &&
        e.target.value.charAt(0) !== "0") ||
      e.target.value.length === 0
        ? setFormValidation({ ...formValidation, ExtensionValidate: true })
        : setFormValidation({ ...formValidation, ExtensionValidate: false });
    }
  };

  const updateBusinessPhoneField = (e) => {
    if (/^\d{0,10}$/.test(e.target.value)) {
      setForm2State({
        ...Form2,
        [e.target.name]: e.target.value,
      });
      /^[1-9]{1}[0-9]*$/.test(e.target.value) || e.target.value.length === 0
        ? setFormValidation({ ...formValidation, BusinessPhoneValidate: true })
        : setFormValidation({
            ...formValidation,
            BusinessPhoneValidate: false,
          });
    }
  };

  const selectSearch = (value) => {
    setForm2State({
      ...Form2,
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
    await setForm2State({
      ...Form2,
      DateOfEstablishment: month + "/" + date + "/" + year,
    });
    dateInputRef.current.focus();
  };

  const popupHandler = () => {
    setPopupState(!popupState);
  };

  const Next = async () => {
    let allFormFieldsValidated = false;

    if (
      formValidation.CorporateNameValidate &&
      Form2.CorporateName.length > 0 &&
      // formValidation.SicCodeValidate &&
      // Form2.SicCode.length > 0 &&
      formValidation.DateOfEstablishmentValidate &&
      // Form2.DateOfEstablishment.length > 0 &&
      formValidation.TypeofOwnershipValidate &&
      // Form2.TypeofOwnership.length > 0 &&
      formValidation.DUNSValidate &&
      // Form2.DUNS.length > 0 &&
      formValidation.BusinessPhoneValidate
      // Form2.BusinessPhone.length > 0
    )
      allFormFieldsValidated = true;

    setWholeFormValidated(allFormFieldsValidated);
    if (allFormFieldsValidated) {
      popupHandler();
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
                  <div className="registration-header__line active"></div>
                  <div className="registration-header__step"></div>
                  <div className="registration-header__line"></div>
                  <div className="registration-header__step"></div>
                  <div className="registration-header__line"></div>
                  <div className="registration-header__step"></div>
                  <div className="registration-header__line"></div>
                  <div className="registration-header__step"></div>
                </div>
              </div>
              {!wholeFormValidated && (
                <div className="alert alert--error">
                  <p>
                    Please Fill the whole form correctly! Company name is
                    required!
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
                  <h1>Business Information</h1>
                  <div className="row">
                    <FormInput
                      id="reg-legal"
                      title="Legal/Corporate name"
                      type="text"
                      name="CorporateName"
                      onchange={updateFormField}
                      onblur={updateFormField}
                      validate={formValidation.CorporateNameValidate}
                      message="*Required. Alphabets only"
                      value={Form2.CorporateName}
                    />
                    <FormInput
                      id="reg-doing-business-as"
                      title="DBA"
                      type="text"
                      name="BusinessAs"
                      onchange={updateFormField}
                      onblur={updateFormField}
                      validate={formValidation.BusinessAsValidate}
                      message="*Alphabets only"
                      value={Form2.BusinessAs}
                    />
                    {/* <div className="col-12">
                      <div className="form-group-faq">
                        <FormInput
                          id="reg-sic-code"
                          title="Business category (SIC Code)"
                          type="number"
                          name="SicCode"
                          onchange={updateFormField}
                          onblur={updateFormField}
                          validate={formValidation.SicCodeValidate}
                          message="*Requied (Atleast 3 digits)"
                          value={Form2.SicCode}
                          class="null"
                          customStyle={{ width: "100%" }}
                        />
                        <a href="/" className="faq-link">
                          <i className="icon-faq"></i>
                        </a>
                      </div>
                      <Suggestions results={results} onclick={chooseSicCode}/>
                    </div> */}
                    <div className="col-12 col-sm-6">
                      <div className="form-group form-group--with-icon">
                        <div
                          className="form-group__icon"
                          onClick={() => setCalendarState(!calendarState)}
                        >
                          <i className="icon-calender"></i>
                        </div>
                        <FormInput
                          id="reg-date"
                          title="Date of establishment"
                          type="text"
                          name="DateOfEstablishment"
                          onchange={updateFormField}
                          onblur={updateFormField}
                          onfocus={updateFormField}
                          validate={formValidation.DateOfEstablishmentValidate}
                          message="Date Format (MM/DD/YYYY)"
                          value={Form2.DateOfEstablishment}
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
                    <div className="col-12 col-sm-6">
                      <div className="form-group-faq">
                        <div className="form-group">
                          <select
                            name="TypeofOwnership"
                            id="type-ownership"
                            onChange={updateFormField}
                            value={Form2.TypeofOwnership}
                            className={
                              formValidation.TypeofOwnershipValidate
                                ? ""
                                : "error"
                            }
                          >
                            <option value="0">Type of ownership</option>
                            <option value="Individual/sole proprietor or single-member LLC">
                              Individual/sole proprietor or single-member LLC
                            </option>
                            <option value="C Corporation S Corporation Partnership Trust/estate Limited liability company">
                              C Corporation S Corporation Partnership
                              Trust/estate Limited liability company
                            </option>
                            <option value="S Corporation">S Corporation</option>
                            <option value="Partnership">Partnership</option>
                            <option value="LLC">LLC</option>
                          </select>
                          {!formValidation.TypeofOwnershipValidate && (
                            <span className="has-error">* Required</span>
                          )}
                        </div>
                        {/* <a href="/" className="faq-link">
                          <i className="icon-faq"></i>
                        </a> */}
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                        <FormInput
                          id="reg-ein-number"
                          title="EIN number"
                          type="text"
                          name="EIN"
                          onchange={updateEINField}
                          onblur={updateEINField}
                          validate={formValidation.EINValidation}
                          message="xx-xxxxxxx"
                          value={Form2.EIN}
                          class="null"
                          customStyle={{ width: "100%" }}
                        />
                        {/* <a href="/" className="faq-link">
=======
                      <FormInput
                        id="reg-ein-number"
                        title="EIN number"
                        type="text"
                        name="EIN"
                        onchange={updateEINField}
                        onblur={updateEINField}
                        validate={formValidation.EINValidation}
                        message="xx-xxxxxxx"
                        value={Form2.EIN}
                        class="null"
                        customStyle={{ width: "100%" }}
                      />
                      {/* <a href="/" className="faq-link">
>>>>>>> development-0.1
                          <i className="icon-faq"></i>
                        </a> */}
                    </div>
                    <FormInput
                      id="reg-duns-number"
                      title="DUNS number"
                      type="text"
                      name="DUNS"
                      onchange={updateDunsField}
                      onblur={updateDunsField}
                      validate={formValidation.DUNSValidate}
                      message="All digits cannot be zero"
                      value={Form2.DUNS}
                    />
                    <div className="col-12">
                      <FormInput
                        id="reg-physical-address"
                        title="Physical Address"
                        type="text"
                        name="BusinessPhysicalAddress"
                        onchange={updateFormField}
                        onblur={updateFormField}
                        validate={
                          formValidation.BusinessPhysicalAddressValidate
                        }
                        message="Physical address format invalid"
                        value={Form2.BusinessPhysicalAddress}
                        class="null"
                        customStyle={{ width: "100%" }}
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <FormInput
                          id="City"
                          title="City"
                          type="text"
                          name="City"
                          onchange={updateCityField}
                          onblur={updateCityField}
                          validate={formValidation.CityValidate}
                          message="Alphabets only"
                          value={Form2.City}
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
                          value={Form2.State}
                          filterOptions={fuzzySearch}
                          onChange={selectSearch}
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
                          validate={formValidation.ZipValidate}
                          message="Must contain 5 digits and cannot be all zero"
                          value={Form2.Zip}
                          class="null"
                        />
                      </div>
                    </div>
                    <FormInput
                      id="reg-phone-number"
                      title="Business telephone number"
                      type="text"
                      name="BusinessPhone"
                      onchange={updateBusinessPhoneField}
                      onblur={updateBusinessPhoneField}
                      validate={formValidation.BusinessPhoneValidate}
                      message="*Required. Phone Number not valid. It must contain 10 numbers. Number should not start with zero"
                      value={Form2.BusinessPhone}
                    />
                    <div className="col-12 col-sm-6">
                      <FormInput
                        id="reg-extension"
                        title="Extension"
                        type="text"
                        name="Extension"
                        onchange={updateExtensionField}
                        onblur={updateExtensionField}
                        validate={formValidation.ExtensionValidate}
                        message="Extension number not valid. It must contain atleast 2 numbers. Number should not start with zero"
                        value={Form2.Extension}
                        class="null"
                      />
                      {/* <div className="none-extension">
                        Don't Have One - <a href="/">Click Here</a>
                      </div> */}
                    </div>
                  </div>
                </div>
                <div style={{display: "flex"}}>
                <BackButton step={2} />
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
                </div>
              </form>
            </div>
            <SideBar
              heading1="Let's build"
              heading2="your company profile"
              description="The more information we have about your company the higher your investability score."
            />
          </div>
        </div>
      </section>
      <CompanyPopup
        onClose={popupHandler}
        popupState={popupState}
        states={states}
        setApiErrorState={setApiErrorState}
        setApiErrorMessage={setApiErrorMessage}
      />
    </div>
  );
};

export default Form2;
