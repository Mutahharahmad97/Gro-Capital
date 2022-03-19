import { useContext } from "react";
import { AppControlContext } from "../../context/AppControlContext";
import { useHistory } from "react-router-dom";
import addBusinessInformation from "../../services/Forms/addBusinessInformation";
import patchFormStep from "../../services/Forms/patchFormStep";
import updateBusinessInformation from "../../services/Dashboard/updateBusinessInformation";

const CompanyPopup = (props) => {
  const history = useHistory();
  const popupState = props.popupState ? "popup active" : "popup";
  const { Form2 } = useContext(AppControlContext);
  const { setFormStep, setFormBackSteps, formBackSteps } = useContext(AppControlContext);

  const onConfirm = async () => {
    let businessInformation = {success:false}
    if (formBackSteps <= 0){
      businessInformation = await addBusinessInformation({...Form2, stateCode: Form2.State !== "" ? props.states[props.states.findIndex((state) => state.name === Form2.State)].code : ""});
    } else{
      setFormBackSteps(formBackSteps - 1)
      businessInformation = await updateBusinessInformation(Form2);
    }

    if (!businessInformation.success) {
      props.setApiErrorMessage(businessInformation.message);
      props.setApiErrorState(true);
      props.onClose();
    } else {
      const patchFormStep_ = await patchFormStep(2);
      if (!patchFormStep_.success) {
        props.setApiErrorMessage(patchFormStep_.message);
        props.setApiErrorState(true);
        props.onClose();
      } else {
        setFormStep(2);
        history.push("/registration");
      }
    }
  };

  return (
    <div id="popup-company" className={popupState}>
      <div className="popup__box">
        <div className="popup__item popup__item--sm">
          <div className="popup__close" onClick={props.onClose}>
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
          <div className="popup__txt">Is this your company?</div>
          <div className="popup__title popup__title--center">
            {Form2.CorporateName}
          </div>
          <div>
            <div
              onClick={props.onClose}
              className="btn btn--green-thin btn--full btn--mb"
            >
              No
            </div>
            <div onClick={onConfirm} className="btn btn--green btn--full">
              Yes
            </div>
          </div>
        </div>
        <div className="popup__bg"></div>
      </div>
    </div>
  );
};

export default CompanyPopup;
