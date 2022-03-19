import FormInput from "../Form/FormInput";
import { useContext } from "react";
import { AppControlContext } from "../../context/AppControlContext";


const StakeHolderPopup = (props) => {
  const { stakeHolderName, setstakeHolderName ,stakeHolderOwnerShip, setstakeHolderOwnerShip } = useContext(AppControlContext)
  return (
    <div id="popup-stakeholder" className={`popup ${props.activeState ? 'active' : ''}`}>
      <div className="popup__box">
        <div className="popup__item popup__item--sm">
          <div className="popup__title">Add New Stakeholder</div>
          <form action="#">
            <div className="form-group">
              {/* <input type="text" id="stakeholder-name" />
              <label htmlFor="stakeholder-name">Name</label> */}
              <FormInput
                id="stake-name"
                title="Name"
                type="text"
                name="StakeholderName"
                onchange={(e) => setstakeHolderName(e.target.value)}
                // onblur={updateFormField}
                validate={true}
                message="*Required. Alphabets only"
                class={"col-12 has-value"}
                customStyle={{padding:"0px"}}
                value={stakeHolderName}
              />
            </div>
            <div className="form-group">
              {/* <input type="text" id="stakeholder-owned" />
              <label htmlFor="stakeholder-owned">% Owned</label> */}
              <FormInput
                id="own-perc"
                title="% Owned"
                type="number"
                name="CorporateName"
                onchange={(e) => setstakeHolderOwnerShip(e.target.value)}
                // onblur={nameHandler}
                validate={true}
                message="*Required. Alphabets only"
                class={"col-12"}
                customStyle={{padding:"0px"}}
                value={stakeHolderOwnerShip}
              />
            </div>
            <div onClick={props.onclick} className="btn btn--green-thin btn--full btn--mb">
              Cancel
            </div>
            <div onClick={props.onclick} className="btn btn--green btn--full">
              Add
            </div>
          </form>
        </div>
        <div className="popup__bg"></div>
      </div>
    </div>
  );
};

export default StakeHolderPopup;
