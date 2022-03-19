import { AppControlContext } from "../../context/AppControlContext";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar1";
import NotificationPanel from "../../components/Asides/Notification/NotificationPanel";
import PageOverlay from "../../components/Overlay/PageOverlay";

const DashboardContactUs = () => {
  const { notificationPanelState } = useContext(AppControlContext);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(0);
  // const [validations, setValidations] = useState({
  //   messageValidator: true,
  //   messageTypeValidator: true
  // });
  const [messageValidator, setmessageValidator] = useState(true)
  const [messageTypeValidator, setmessageTypeValidator] = useState(true);
  const [messageSent, setMessageSent] = useState(false)

  const handleSentButton = () => {
    if (message.length < 10){
        setmessageValidator(false)
      } else if (message.length >= 10 && /^([a-z|A-Z])+.*/.test(message)) {
        setmessageValidator(true)
      };

    if (messageType === 0){
        setmessageTypeValidator(false)
      }else{
        setmessageTypeValidator(true)
      }
    if(message.length >= 10 && messageType !== 0 && /^[a-z|A-Z]+.*/.test(message)){
        setMessageSent(true)
        setmessageTypeValidator(true)
        setmessageValidator(true)
    }
  }
  return (
    <div id="dashboard-page" className="white-page">
      <section className="dashboard">
        <div className="wrap">
          <div className="dashboard__row">
            <div className="dashboard__content dashboard__content--sm">
              <div className="sub-menu">
                <ul className="sub-menu__list">
                  {/* <li>
                    <a href="/">support</a>
                  </li> */}
                  <li>
                    <Link to="/dashboard-terms">terms and conditions</Link>
                  </li>
                  <li>
                    <Link to="/dashboard-contact-us" className="active">
                      contact us
                    </Link>
                  </li>
                </ul>
                <article className="text">
                  <h1>Contact Us</h1>
                </article>
                <div className="row">
                  <div className="col-12 col-sm-8">
                    <div className="form-group">
                      <select name="message" id="message" onChange={(e) => setMessageType(e.target.value)}>
                        <option value="0" style={{ display: "none" }}>
                          Select Message type
                        </option>
                        <option value="Observation">Observation</option>
                        <option value="Issue">Issue</option>
                        <option value="Suggestion">Suggestion</option>
                        <option value="Payment">Payment</option>
                        <option value="Loans">Loans</option>
                      </select>
                      {!messageTypeValidator && <span className='has-error' style={{ fontSize: "x-small", fontStyle: "italic" }}>
                        *Required: no message type selected.
                      </span>}
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group form-group--textarea">
                      <textarea
                        name="msg"
                        id="msg"
                        className={message.length > 1 ? "has-value" : ""}
                        onChange={(e) => setMessage(e.target.value)}
                      ></textarea>
                      <label htmlFor="msg">Message text</label>
                      {!messageValidator && <span className='has-error' style={{ fontSize: "x-small", fontStyle: "italic" }}>
                        *Required: a message of atleast 10 letters is required and it cannot start with any special character.
                      </span>}
                    </div>
                  </div>
                </div>
                {messageSent ? (
                  <button className="btn btn--full alert--success">
                    <i
                      className={`icon-checked`}
                      style={{ marginRight: 10 }}
                    ></i>
                    Message Sent
                  </button>
                ) : (
                  <button
                    className="btn btn--green btn--full"
                    //onClick={() => setMessageSent(!messageSent)}
                    onClick = {handleSentButton}
                  >
                    Send
                  </button>
                )}
              </div>
            </div>
            <SideBar />
          </div>
        </div>
      </section>
      <PageOverlay activeState={notificationPanelState} />
      <NotificationPanel activeState={notificationPanelState} />
    </div>
  );
};

export default DashboardContactUs;
