import { AppControlContext } from "../../../context/AppControlContext";
import { useContext } from "react";
import { baseUrl } from "../../../services/util/baseUrl";
import { GET_ALL_DATA_USER_URL } from "../../../services/util/urls";

const StateMaintainer = (props) => {
    const {
        Form4,
        setForm4State,
        Form3,
        setForm3State,
        Form2,
        setForm2State,
        setFormStep,
      } = useContext(AppControlContext);
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
            City: response.personal_city,
            State: response.personal_info_state,
            Zip: response.zip,
            TotalMonthlyExpenses: response.total_monthly_expenses,
            Birthday: response.birthday
          })
          setForm4State({
            FinancingType: response.finance,
          })
        })
      .catch((err) => console.log(err));
      return
}

export default StateMaintainer