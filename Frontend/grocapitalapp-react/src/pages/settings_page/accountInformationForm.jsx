import { useContext, useState, useEffect } from "react";
import { AppControlContext } from "../../context/AppControlContext";
import FormInput from "../../components/Form/FormInput";
import { baseUrl } from "../../services/util/baseUrl";
import { GET_ALL_DATA_USER_URL } from "../../services/util/urls";
import updateUser from "../../services/Dashboard/updateUser";
import updateProfile from "../../services/Dashboard/updateProfile";
import SelectSearch, { fuzzySearch } from "react-select-search";
import states from "../../components/Form/json/states";
import updatePersonalInformation from "../../services/Dashboard/updatePersonalInformation";

const AccountInformationForm = (props) => {
  const { Form, setFormState, Form3, setForm3State } = useContext(AppControlContext);
  const [updateSuccessState, setupdateSuccessState] = useState(false);
  const [formValidation, setFormValidation] = useState({
    PersonalPhoneValidate: true,
    EmailValidate: true,
    dataFetched: false
  });
  const [wholeFormValidated, setWholeFormValidated] = useState(true);
  const [apiErrorState, setApiErrorState] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState('');

  const updateFieldValue = (e) =>{
    setFormState({
      ...Form,
      [e.target.name]: e.target.value
    })
    setForm3State({
      ...Form3,
      [e.target.name]: e.target.value
    })

    switch (e.target.name) {
      case "Email":
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z-]+(?:\.[a-zA-Z-]+)*$/.test(
          e.target.value
        ) && e.target.value.length > 0
          ? setFormValidation({ ...formValidation, EmailValidate: true })
          : setFormValidation({ ...formValidation, EmailValidate: false });
        break;
  }
}; 

  const selectSearch = (value) => {
    setForm3State({
      ...Form3,
      State: value,
    });
  };

  const updatePhoneField = (e) => {
    if (/^\d{0,10}$/.test(e.target.value)){
      setFormState({
        ...Form,
        [e.target.name]: e.target.value
      });
      /^[1-9]{1}[0-9]*$/.test(e.target.value) || e.target.value.length === 0
        ? setFormValidation({ ...formValidation, PersonalPhoneValidate: true })
        : setFormValidation({ ...formValidation, PersonalPhoneValidate: false });
      
    };
  };

  const updateZipField = (e) => {
    if (/^\d{0,5}$/.test(e.target.value)){
      setForm3State({
        ...Form3,
        [e.target.name]: e.target.value
      });
      /^\d{5}$/.test(e.target.value) || e.target.value.length === 0
        ? setFormValidation({ ...formValidation, ZipValidate: true })
        : setFormValidation({ ...formValidation, ZipValidate: false });
      
    };
  };
  
  useEffect(() => {
    const mapAllUserDataToContext = async (data) => {
      setFormState({
        ...Form,
        FName: data.first_name,
        LName: data.last_name,
        Email: data.email,
        Phone: data.phone
      });
      setForm3State({
        ...Form3,
        SocialSecurityNumber : data.social_security_number,
        PersonalPhysicalAddress: data.personal_physical_address,
        HomeAddress1: data.home_address_1,
        HomeAddress2: data.home_address_2,
        City: data.personal_info_city,
        State: data.personal_info_state,
        Zip: data.personal_info_zip,
        TotalMonthlyExpenses: data.total_monthly_expenses,
        TotalMonthlyIncome: data.total_monthly_income,
        Birthday: data.birthday
      });
    };

    if (!formValidation.dataFetched) {
      fetch(baseUrl() + GET_ALL_DATA_USER_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((response) => {
          setFormValidation({...formValidation ,dataFetched:true})
          mapAllUserDataToContext(response);
        })
        .catch((err) => console.log(err));
    }
  }, [
    Form,
    setFormState,
    formValidation,
    setForm3State,
    Form3
  ]);

  const updateAccountInfo = async () => {
    if (formValidation.PersonalPhoneValidate && formValidation.EmailValidate) {
      const accountInformation = await updateUser(Form);
      const phoneInfo = await updateProfile(Form.Phone);
      const personalInfo = await updatePersonalInformation(Form3)

      if (accountInformation && phoneInfo && personalInfo){
        setupdateSuccessState(true)
      }
    } else{
      setWholeFormValidated(false);
    }
  };

  return (
    <div id="settings-pages">
      {apiErrorState ? (
                  <div className="alert alert--error">
                    <p>{apiErrorMessage}</p>
                  </div>
                ): updateSuccessState ? (
                  <div className="alert alert--success">
                    <p>Successfully Updated</p>
                  </div>):
                  !wholeFormValidated &&(
                    <div className="alert alert--error">
                      <p>Please Fill the whole form correctly!</p>
                    </div>
                  )}
      <div className="account_info_heading">
          <h1>
              Account Details
          </h1>
        <section className="account_info_form">
          <div className="account_info_form__fields">
                <form action="#" className="registration">
                    <div className="row">
                      <FormInput
                        id="set-name"
                        title="Name"
                        type="text"
                        name="FName"
                        onchange={updateFieldValue}
                        // onkeyup={updateFormFieldOnKeyUp}
                        //   onblur={updateSsnField}
                        validate={true}
                        //   message="The format should be xxx-xx-xxxx"
                        // value={`${Form.FName} ${Form.LName}`}
                        value={Form.FName}
                      />
                      <FormInput
                        id="set-email"
                        title="Email"
                        type="text"
                        name="Email"
                        onchange={updateFieldValue}
                        //   onblur={updateFormField}
                        validate={formValidation.EmailValidate}
                        message="Email format invalid"
                        value={Form.Email}
                      />
                      <FormInput
                        id="set-st1"
                        title="Street 1"
                        type="text"
                        name="HomeAddress1"
                        onchange={updateFieldValue}
                        //   onblur={updateTotalMonthlyIncomeField}
                        validate={true}
                        //   message="1200.00 / Numeric value only"
                        value={Form3.HomeAddress1}
                      />
                      <FormInput
                        id="reg-tme"
                        title="Street 2"
                        type="text"
                        name="HomeAddress2"
                        //   onblur={updateTotalMonthlyExpensesField}
                        onchange={updateFieldValue}
                        validate={true}
                        //   message="1200.00 / Numeric value only"
                        value={Form3.HomeAddress2}
                      />
                      <FormInput
                        id="set-city"
                        title="City"
                        type="text"
                        name="City"
                        onchange={updateFieldValue}
                        //   onblur={updateTotalMonthlyExpensesField}
                        validate={true}
                        //   message="1200.00 / Numeric value only"
                        value={Form3.City}
                      />
                      <div className="col-12 col-sm-3">
                    <div className="form-group">
                        <SelectSearch
                          options={states}
                          search
                          autoComplete="null"
                          value={Form3.State}
                          filterOptions={fuzzySearch}
                          onChange={selectSearch}
                          placeholder={Form3.State}
                        />
                      </div>
                    </div>
                      <FormInput
                        id="set-zip"
                        title="Zip"
                        type="number"
                        name="Zip"
                        onchange={updateZipField}
                        //   onblur={updateTotalMonthlyExpensesField}
                        validate={true}
                        class="col-sm-3"
                        //   message="1200.00 / Numeric value only"
                        value={Form3.Zip}
                      />
                      <FormInput
                            id="set-phone-number"
                            title="Phone"
                            type="number"
                            name="Phone"
                            onchange={updatePhoneField}
                            //   onblur={updateFormField}
                            validate={formValidation.PersonalPhoneValidate}
                            message="Phone Number not valid. It must contain 10 numbers. Number should not start with zero"
                            value={Form.Phone}
                            class="col-12"
                            customStyle={{ width: "100%" }}
                          />
                    </div>
                  <div style={{display:"flex",justifyContent:"center"}}>
                    <div
                      onClick={updateAccountInfo}
                      className="btn btn--green account_info_form__btn"
                    >
                      Update Details
                    </div>
                  </div>    
                </form>
            </div>
        </section>
      </div>
    </div>
  )
}
export default AccountInformationForm