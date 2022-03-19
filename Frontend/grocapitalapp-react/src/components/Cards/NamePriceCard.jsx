import { validations } from "./json/validations";
import { useState, useContext } from "react";
import { AppControlContext } from "../../context/AppControlContext";
import updateKpiMetrics from "../../services/Dashboard/updateKpiMetrics";


const NamePriceCard = (props) => {
  const fullWidth = props.fullWidth ? 'col-12 col-sm-custom col-mb' : 'col-6 col-sm-custom col-mb'
  const { Form5 } = useContext(AppControlContext);
  const [unvalidated, setUnvalidated] = useState(false);
  const [cardData, setCardData] =  useState(Form5);
  const [currentEditableId, setCurrentEditableId] = useState(0);
  const [errorMessage, seterrorMessage] = useState(false);

  const handleInput = (e) => {
    setCardData({
      ...Form5,
      [e.target.name]: e.target.value
    });

    const getValidation = validations.find(
      (validation) => "Monetary Value" === validation.name
    );
    if (!getValidation.validationRule.test(e.target.value)) {
        setUnvalidated(true);
        seterrorMessage(getValidation.message)
    } else {
      setUnvalidated(false);
      Form5[e.target.name] = e.target.value
      const kpi = updateKpiMetrics(Form5);
    }
  };
  return (
    <div className={fullWidth}>
      <div className="white-box white-box--center">
        <div className="white-box__title">
          <h2>{props.title}</h2>
        </div>
        {currentEditableId === props.key ? (
          <div className="white-box__numbers">
            <input
              value={isNaN(Form5[props.name]) ? 0 : Form5[props.name]}
              name={props.name}
              onChange={handleInput}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleInput(e);
                  setCurrentEditableId(!currentEditableId);
                }
              }}
              className="custom-amount"
              style={{ color: "black" }}
            />
          </div>
        ):(
          // <div className="white-box__numbers">
          //   ${Form5[props.name]}
          // </div>
          <div className="white-box__numbers">${isNaN(Form5[props.name]) || Form5[props.name] === '' ? 0 : Form5[props.name]}</div>
        )}
        <span
            className="edit_hover_class"
            onClick={() => {
              props.key === currentEditableId
                ? setCurrentEditableId(0)
                : setCurrentEditableId(props.key);
            }}
          >
            <i
              className={
                props.key === currentEditableId
                  ? `icon-checked edit_hover_class`
                  : `icon-edit edit_hover_class`
              }
            ></i>
          </span>
        {unvalidated ? (<span className="has-error">{errorMessage}</span>):false}
      </div>
    </div>
  );
};

export default NamePriceCard;
