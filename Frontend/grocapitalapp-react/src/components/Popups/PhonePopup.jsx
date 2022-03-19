import { useState, useRef, useContext, useEffect } from "react";
import { AppControlContext } from "../../context/AppControlContext";
import { sendSms } from "../../services/sendSms";
import { useHistory } from "react-router-dom";
import register from "../../services/Auth/userRegister";
import createUserProfile from "../../services/Forms/createUserProfile";
import patchFormStep from "../../services/Forms/patchFormStep";

const PhonePopup = (props) => {
  const history = useHistory();
  const { Form, setLoginPopupState, setGlobalErrorMessage } =
    useContext(AppControlContext);
  const { setFormStep } = useContext(AppControlContext);
  const { pinGenerated, setPinGenerated } = useContext(AppControlContext);
  const [passCode, setPassCode] = useState({
    pin1: "",
    pin2: "",
    pin3: "",
    pin4: "",
  });
  const pin1 = useRef();
  const pin2 = useRef();
  const pin3 = useRef();
  const pin4 = useRef();
  const [errorMessage, setErrorMessage] = useState("");

  const popupState = props.popupState ? "popup active" : "popup";
  const phone = props.phone;

  useEffect(() => {
    pin1.current.focus();
  }, [])

  useEffect(() => {
    if(passCode.pin4 !== "") {
      if(passCode.pin1.length > 0 && passCode.pin2.length > 0 && passCode.pin3.length > 0) {
        onConfirm();
      }
      else {
        setErrorMessage("Please enter 4 digits code!")
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passCode.pin4])

  const onConfirm = async () => {
    const pinEntered =
      passCode.pin1 + passCode.pin2 + passCode.pin3 + passCode.pin4;
    if (pinEntered === pinGenerated + "") {
      const userRegister = await register(Form);

      if (!userRegister.success) {
        if (userRegister.userExists) {
          setLoginPopupState(true);
          setGlobalErrorMessage("User Already exists! Please login.");
          history.push("/");
        } else {
          props.setApiErrorMessage(userRegister.message);
          props.setApiErrorState(true);
          props.onClose();
        }
      } else {
        const createUser = await createUserProfile(Form);
        if (!createUser.success) {
          props.setApiErrorMessage(createUser.message);
          props.setApiErrorState(true);
          props.onClose();
        } else {
          const patchFormStep_ = await patchFormStep(1);
          if (!patchFormStep_.success) {
            props.setApiErrorMessage(patchFormStep_.message);
            props.setApiErrorState(true);
            props.onClose();
          } else {
            setFormStep(1);
            history.push("/registration");
          }
        }
      }
    } else alert("Wrong Pin Entered");
  };

  const onResend = async () => {
    const randomPinGenerator = Math.floor(Math.random() * (9726 - 1368)) + 1368;
    setPinGenerated(randomPinGenerator);
    await sendSms(Form.Phone, randomPinGenerator);
  };

  const pinEntered = async (e) => {
    /^[0-9]+$/.test(e.target.value) || e.target.value.length === 0
      ? setPassCode({
          ...passCode,
          [e.target.name]: e.target.value,
        })
      : await setPassCode({ ...passCode });

    switch (e.target.name) {
      case "pin1":
        e.target.value === "" ? pin1.current.focus() : pin2.current.focus();
        break;

      case "pin2":
        e.target.value === "" ? pin2.current.focus() : pin3.current.focus();
        break;

      case "pin3":
        e.target.value === "" ? pin3.current.focus() : pin4.current.focus();
        break;

      default:
      //Do Nothing
    }
  };

  return (
    <div id="popup-number" className={popupState}>
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
          <div className="popup__title popup__title--center">
            Confirm your
            <br />
            phone number
          </div>
          
          {errorMessage.length > 1 && (
            <div className="popup__txt" style={{ color: "red" }}>
              {errorMessage}
            </div>
          )}

          <div className="popup__txt">
            We send a 4-digit pass code to ******
            {phone.substring(phone.length - 3, phone.length)}.
            <br /> Please enter this code below.
          </div>
          <div className="row">
            <div className="col-3">
              <div className="form-group">
                <input
                  type="text"
                  name="pin1"
                  onChange={pinEntered}
                  ref={pin1}
                  maxLength="1"
                  value={passCode.pin1}
                />
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <input
                  type="text"
                  name="pin2"
                  onChange={pinEntered}
                  ref={pin2}
                  maxLength="1"
                  value={passCode.pin2}
                />
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <input
                  type="text"
                  name="pin3"
                  onChange={pinEntered}
                  ref={pin3}
                  maxLength="1"
                  value={passCode.pin3}
                />
              </div>
            </div>
            <div className="col-3">
              <div className="form-group">
                <input
                  type="text"
                  name="pin4"
                  onChange={pinEntered}
                  ref={pin4}
                  maxLength="1"
                  value={passCode.pin4}
                />
              </div>
            </div>
          </div>
          <div className="popup__txt" style={{ fontSize: "11px" }}>
            Use one time for verification purposes only.
          </div>
          <div
            onClick={onResend}
            className="btn btn--green-thin btn--full btn--mb"
          >
            Resend
          </div>
          {/* <div onClick={onConfirm} className="btn btn--green btn--full">
            Confirm
          </div> */}
        </div>
        <div className="popup__bg"></div>
      </div>
    </div>
  );
};

export default PhonePopup;
