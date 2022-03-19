import { useHistory } from "react-router-dom";
import { AppControlContext } from "../context/AppControlContext";
import { useContext } from "react";
import { baseUrl } from "../services/util/baseUrl";
import { GET_ALL_DATA_USER_URL } from "../services/util/urls";

const BackButton = (props) => {
    const history = useHistory();
    const { setFormStep, formBackSteps, setFormBackSteps } = useContext(AppControlContext)
    const Back = () => {
      console.log(props.step)
      if (props.step === 2 && props.form2.CorporateName === ""){
        fetch(baseUrl() + GET_ALL_DATA_USER_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        })
          .then((res) => res.json())
          .then((response) => {
            props.setForm2({
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
          })
        .catch((err) => console.log(err));
      }
      // if (props.step !== 2)
      setFormBackSteps(formBackSteps+1);
      setFormStep(props.step - 1);
      history.push("/registration");
    };
    return (
    <div
        style={{marginRight:"1%"}}
        onClick={Back}
        className="btn btn--full btn--green open-popup"
    >
        Back
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="21"
          viewBox="0 0 12 21"
        >
          <path
            d="M-0.293106781,-0.293106781 C0.0673771804,-0.653590743 0.634608236,-0.681320278 1.02689944,-0.376295388 L1.12110678,-0.293106781 L10.9652136,9.551 L1.12110678,19.3951068 C0.730582489,19.7856311 0.0974175106,19.7856311 -0.293106781,19.3951068 C-0.653590743,19.0346228 -0.681320278,18.4673918 -0.376295388,18.0751006 L-0.293106781,17.9808932 L8.136,9.551 L-0.293106781,1.12110678 C-0.653590743,0.76062282 -0.681320278,0.193391764 -0.376295388,-0.198899443 L-0.293106781,-0.293106781 Z"
            transform="translate(1 1)"
          />
        </svg> */}
      </div>
    );
};

export default BackButton;