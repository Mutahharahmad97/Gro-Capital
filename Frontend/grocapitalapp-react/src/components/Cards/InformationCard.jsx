import { AppControlContext } from "../../context/AppControlContext";
import { useContext, useState, useEffect } from "react";
import { validations } from "./json/validations";
import "./InformationCard.scss";
import updateUser from "../../services/Dashboard/updateUser"
import updatePersonalInformation from "../../services/Dashboard/updatePersonalInformation";
import updateBusinessInformation from "../../services/Dashboard/updateBusinessInformation";
import ExperianScore from "../../services/Experian/Score";
import ExperianAuth from "../../services/Experian/Auth";
import updateUserProfile from "../../services/Dashboard/updateUserProfile"
import SelectSearch, { fuzzySearch } from "react-select-search";
import states from "../Form/json/states";

const InformationCard = (props) => {
  const { Form, Form2, Form3 } = useContext(AppControlContext);
  const [informationData, SetInformationData] = useState({
    ...Form,
    ...Form2,
    // ...Form3,
    Birthday: Form3.Birthday,
    SocialSecurityNumber: Form3.SocialSecurityNumber,
    DrivingLicense: "4741121003",
    // EIN: "123456789",
    // Experian: "475/800",
  });

  const [unvalidated, setUnvalidated] = useState([]);

  const [currentEditableId, setCurrentEditableId] = useState(0);
  const contextMapper = props.data;
  const [experianAuthToken, setExperianAuthToken] = useState("");

  // const selectSearch = (value) => {
  //   SetInformationData({
  //     ...informationData,
  //     State: value,
  //   });
  //   let businessInfoObj = {
  //     "CorporateName": informationData.CorporateName,
  //     "BusinessPhysicalAddress": informationData.BusinessPhysicalAddress,
  //     "BusinessAs": informationData.BusinessAs,
  //     "City": informationData.City,
  //     "DUNS": informationData.DUNS,
  //     "SicCode": informationData.SicCode,
  //     "State": value,
  //     "Zip": informationData.Zip
  //   }
  //   const comapany = updateBusinessInformation(Form2)
  // };

  // const handleInput = (e) => {
  //   SetInformationData({
  //     ...informationData,
  //     [e.target.name]: e.target.value,
  //   });

  //   const getValidation = validations.find(
  //     (validation) => e.target.name === validation.name
  //   );
  //   if (getValidation.validationRule.test(e.target.value)) {
  //     if (unvalidated.includes(e.target.name)) {
  //       const removeIndex = unvalidated.findIndex(
  //         (current) => current === e.target.name
  //       );
  //       let unvalidatedTemp = [...unvalidated];
  //       unvalidatedTemp.splice(removeIndex, 1);
  //       setUnvalidated(unvalidatedTemp);
  //     }
  //     if (props.title === "Personal Information") {
  //       let personalInfoObj = {
  //         "FName":informationData.FName,
  //         "LName":informationData.LName,
  //         "Email":informationData.Email
  //       };
  //     personalInfoObj[e.target.name] = e.target.value
  //     const user = updateUser(personalInfoObj);
  //     let personalData = {...Form3};
  //     personalData[e.target.name] = e.target.value
  //     const personalInfo = updatePersonalInformation(personalData);
  //     let userProfileObj = {
  //       "DOB":informationData.DOB,
  //       "DrivingLicense":informationData.DrivingLicense
  //     };
  //     const userProfle = updateUserProfile(userProfileObj)
  //     } 
  //     else if(props.title === "Company Information"){
  //       let businessInfoObj = {
  //           "CorporateName": informationData.CorporateName,
  //           "BusinessPhysicalAddress": informationData.BusinessPhysicalAddress,
  //           "BusinessAs": informationData.BusinessAs,
  //           "City": informationData.City,
  //           "DUNS": informationData.DUNS,
  //           "SicCode": informationData.SicCode,
  //           "State": informationData.State,
  //           "Zip": informationData.Zip
  //         }
  //       businessInfoObj[e.target.name] = e.target.value
  //       const comapany = updateBusinessInformation(businessInfoObj)
  //       if (e.target.name === 'DUNS'){
  //         ExperianAuth()
  //           .then((response) => response.payload.access_token)
  //           .then((authToken) => setExperianAuthToken(authToken))
  //           .catch((err) => console.log(err));
  //         ExperianScore(e.target.value, experianAuthToken)
  //           .then((response) =>
  //           SetInformationData({
  //               ...informationData,
  //               [e.target.name]: e.target.value,
  //               Experian: response.payload
  //                 ? response.payload.results.commercialScore.score + "/800"
  //                 : "",
  //             },
  //             props.callback(response.payload
  //                 ? response.payload.results.commercialScore.score + "/800"
  //                 : ""))
  //           )
  //           .catch((err) => console.error(err));
  //       }
  //     }
  //   } else {
  //     if (!unvalidated.includes(e.target.name))
  //       setUnvalidated([...unvalidated, e.target.name]);
  //   }
  // };
  

  return (
    <div className="white-box white-box--mb">
      <div className="white-box__title">
        <h2>{props.title}</h2>
      </div>
      <div className="row row--mb">
        {contextMapper.map((currentData, index) => {
          let getMessage;
          if (unvalidated.includes(currentData.name)) {
            getMessage = validations.find(
              (validation) => currentData.name === validation.name
            );
            getMessage = getMessage.message;
          } else getMessage = false;

          return (
            <div
              className={`${
                contextMapper.length % 6 === 0 && currentData.id % 3 === 0
                  ? "col-12 col-sm-6 col-mb"
                  : "col-12 col-sm-3 col-mb"
              }`}
              key={currentData.id}
            >
              <div className="white-box__info">
                <h3>{currentData.title}</h3>
                <div className="white-box__info-txt">
                  {/* {currentEditableId === currentData.id ? 
                  (
                    <input
                      value={informationData[currentData.name]}
                      name={currentData.name}
                      // onChange={handleInput}
                      // onKeyDown={(e) => {
                      //   if (e.key === "Enter") {
                      //     handleInput(e);
                      //     setCurrentEditableId(!currentEditableId);
                      //   }
                      // }}
                      className="custom-amount"
                      style={{ color: "black" }}
                    />
                  ) :( */}
                  {
                    <p>{informationData[currentData.name]}</p>
                  }
                  {/* { currentData.name !== "State" && currentData.name !== "Experian" ?
                    (<span
                      onClick={() => {
                        currentData.id === currentEditableId
                          ? setCurrentEditableId(0)
                          : setCurrentEditableId(currentData.id);
                      }}
                    >
                      <i
                        className={
                          currentData.id === currentEditableId
                            ? `icon-checked`
                            : `icon-edit`
                        }
                      ></i>
                    </span>
                    ) : false} */}
                </div>
              </div>
              {getMessage && <span className="has-error">{getMessage}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InformationCard;
