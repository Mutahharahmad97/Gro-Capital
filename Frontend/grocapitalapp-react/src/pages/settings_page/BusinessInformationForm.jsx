import FormInput from "../../components/Form/FormInput";
import { fuzzySearch } from "react-select-search";
import SelectSearch from "react-select-search";
import states from "../../components/Form/json/states";
import { useContext, useState, useEffect } from "react";
import { AppControlContext } from "../../context/AppControlContext";
import { baseUrl } from "../../services/util/baseUrl";
import updateBusinessInformation from "../../services/Dashboard/updateBusinessInformation";

const BusinessInformationForm = () => {
  const [formValidation, setFormValidation] = useState({
    BusinessNameValidate: true,
    BusinessPhysicalAddressValidate: true,
    ZipValidate: true,
    CityValidate: true,
    EINValidation: true,
    dataFetched: false
  });
  const { Form2, setForm2State } = useContext(AppControlContext);
  const [updateSuccessState, setupdateSuccessState] = useState(false);
  const [wholeFormValidated, setWholeFormValidated] = useState(true);
  const [apiErrorState, setApiErrorState] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState('');

  const updateZipField = (e) => {
    if (/^\d{0,5}$/.test(e.target.value)){
      setForm2State({
        ...Form2,
        [e.target.name]: e.target.value
      });
      /^\d{5}$/.test(e.target.value) || e.target.value.length === 0
        ? setFormValidation({ ...formValidation, ZipValidate: true })
        : setFormValidation({ ...formValidation, ZipValidate: false });
      
    };
  };

  const updateFormField = (e) => {
    setForm2State({
      ...Form2,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "CorporateName") {
        e.target.value.length > 0
          ? setFormValidation({
              ...formValidation,
              BusinessNameValidate: true,
            })
        :setFormValidation({
          ...formValidation,
          BusinessNameValidate: false,
      });
    }
  };
  useEffect(() => {
    const mapAllUserDataToContext = async (data) => {
      setForm2State({
        ...Form2,
        CorporateName: data[0].corporate_name,
        BusinessPhysicalAddress: data[0].business_physical_address,
        City: data[0].city,
        State: data[0].state,
        Zip: data[0].zip,
        BusinessAs : data[0].business_as,
        SicCode: data[0].sic_code,
        DateOfEstablishment: data[0].date_of_establishment,
        TypeofOwnership: data[0].type_of_ownership,
        DUNS: data[0].duns,
        BusinessPhone: data[0].business_phone,
        Extension: data[0].extension,
        Experian: data[0].exprerian,
        EIN: data[0].ein
      });
    };

    if (!formValidation.dataFetched) {
      fetch(baseUrl() + 'business-information', {
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
    Form2,
    setForm2State,
    formValidation
  ]);
  const updateBusinessInfo = async () => {
    console.log(formValidation)
    if (formValidation.BusinessNameValidate) {
      const businessInformation = await updateBusinessInformation(Form2);

      if (businessInformation){
        setupdateSuccessState(true)
      } else {
        setupdateSuccessState(false)
      }
    } else {
      setWholeFormValidated(false)
      setupdateSuccessState(false)
    }
  };
  const selectSearch = (value) => {
    setForm2State({
      ...Form2,
      State: value,
    });
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
                    Business Information
                </h1>
        <section className="account_info_form" style={{marginBottom:"20px"}}>
          <div className="account_info_form__fields">
                <form action="#" className="registration">
                    <div className="row">
                      <FormInput
                        id="set-corp-name"
                        title="Business name"
                        type="text"
                        name="CorporateName"
                        onchange={updateFormField}
                        // onkeyup={updateFormFieldOnKeyUp}
                        //   onblur={updateSsnField}
                        validate={formValidation.BusinessNameValidate}
                        //   message="The format should be xxx-xx-xxxx"
                        // value={`${Form.FName} ${Form.LName}`}
                        value={Form2.CorporateName}
                      />
                      <FormInput
                        id="set-street-address"
                        title="Street address"
                        type="text"
                        name="BusinessPhysicalAddress"
                        onchange={updateFormField}
                        //   onblur={updateFormField}
                        validate={true}
                        message="Email format invalid"
                        value={Form2.BusinessPhysicalAddress}
                      />
                      <FormInput
                        id="set-city"
                        title="City"
                        type="text"
                        name="City"
                        onchange={updateFormField}
                        //   onblur={updateTotalMonthlyExpensesField}
                        validate={true}
                        //   message="1200.00 / Numeric value only"
                        value={Form2.City}
                      />
                      <div className="col-12 col-sm-3">
                    <div className="form-group">
                        <SelectSearch
                          options={states}
                          search
                          autoComplete="null"
                          value={Form2.State}
                          filterOptions={fuzzySearch}
                          onChange={selectSearch}
                          //   placeholder={Form3.State}
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
                        value={Form2.Zip}
                      />
                    </div>
                  <div style={{display:"flex",justifyContent:"center"}}>
                    <div
                      onClick={updateBusinessInfo}
                      className="btn btn--green account_info_form__btn"
                    >
                      Update
                    </div>
                  </div>    
                </form>
            </div>
        </section>
        <div>
          <h1>
              Business Credit Reports
          </h1>
          <div className="account_info_form" style={{display:"block"}}>
            <div className="account_info_form__fields" style={{display:"flex",flexDirection:"column",backgroundColor:"#D7EAE6"}}>
              <div style={{display:"flex"}}>
                <a href="/" className="faq-link" style={{alignSelf:"center",paddingRight:"45px"}}>
                    <i className="icon-faq" style={{fontSize:"20px",color:"#FFA200"}}></i>
                  </a>
                <h2 style={{fontSize:"12px"}}>
                CHANGING YOUR BUSINESS WILL REMOVE THE FOLLOWING ITEMS:
                </h2>
              </div>
              <ul style={{fontSize:"16px",fontWeight:"500",lineHeight:"30px"}}>
                <li>
                Business credit Reports for the selected business credit bureau.
                </li>
                <li>
                Cash flow connection
                </li>
              </ul>
            </div>
          </div>
          </div>
        </div>
        </div>
    );
}
export default BusinessInformationForm