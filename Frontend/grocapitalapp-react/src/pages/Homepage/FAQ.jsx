import { useContext } from "react";
import { AppControlContext } from "../../context/AppControlContext";
import LoginPopup from "../../components/Popups/LoginPopup";
import HeroBottom from "../../components/HeroBottom/HeroBottom";
import Accordion from "../../components/Accordion/Accordion";
import FaqData from "./util/FaqData";

const FAQ = () => {
  const { loginPopupState, setLoginPopupState } = useContext(AppControlContext);
  const changeLoginPopupState = () => {
    setLoginPopupState(!loginPopupState);
  };

  return (
    <div id="dashboard-page" className="white-page">
      <section className="dashboard">
        <div className="container">
          <div className="dashboard__content dashboard__content--sm">
            <div className="sub-menu">
              <article className="text">
                <h1>Privacy Policy</h1>
              </article>
              <Accordion data={FaqData} />
            </div>
          </div>
        </div>
      </section>
      <HeroBottom description="Ready to Fuel Up Your Business?" />
      <LoginPopup
        popupState={loginPopupState}
        onClose={changeLoginPopupState}
      />
    </div>
  );
};

export default FAQ;
