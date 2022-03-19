import { AppControlContext } from "../../context/AppControlContext";
import { useContext } from "react";
import HeroBottom from "../../components/HeroBottom/HeroBottom";
import { Link } from "react-router-dom";
import LoginPopup from "../../components/Popups/LoginPopup";

const Privacy = () => {
  const { loginPopupState, setLoginPopupState } = useContext(AppControlContext);
  const changeLoginPopupState = () => {
    setLoginPopupState(!loginPopupState);
  };
  window.scrollTo(0, 0);
  return (
    <div className="white-page">
      <section className="box">
        <div className="wrap">
          <div className="sub-menu sub-menu--center">
            <ul className="sub-menu__list">
              <li>
                <Link to="/terms">terms and conditions</Link>
              </li>
              <li>
                <Link to="/privacy" className="active">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <article className="text">
            <h1>Privacy Policy</h1>
            <p>
              Protecting your private information is our priority. This
              Statement of Privacy applies to www.gro.capital and Gro.Capital,
              LLC and governs data collection and usage. For the purposes of
              this Privacy Policy, unless otherwise noted, all references to Gro
              Capital include www.gro.capital and Gro Capital, LLC. The
              Gro.Capital website is a Small business growth platform site. By
              using the Gro.Capital website, you consent to the data practices
              described in this statement.
            </p>
            <h2>Collection of your Personal Information</h2>
            <p>
              In order to better provide you with products and services offered
              on our Site, Gro Capital may collect personally identifiable
              information, such as your:
            </p>
            <ul>
              <li>First and Last Name</li>
              <li>Mailing Address</li>
              <li>E-mail Address</li>
              <li>Phone Number</li>
              <li>Employer</li>
              <li>Job Title</li>
              <li>Banking information and financial reports</li>
            </ul>
            <p>
              If you purchase Gro Capital products and services, we collect
              billing and credit card information. This information is used to
              complete the purchase transaction.
            </p>
            <p>
              We do not collect any personal information about you unless you
              voluntarily provide it to us. However, you may be required to
              provide certain personal information to us when you elect to use
              certain products or services available on the Site. These may
              include: (a) registering for an account on our Site; (b) entering
              a sweepstakes or contest sponsored by us or one of our partners;
              (c) signing up for special offers from selected third parties; (d)
              sending us an email message; (e) submitting your credit card or
              other payment information when ordering and purchasing products
              and services on our Site. To wit, we will use your information
              for, but not limited to, communicating with you in relation to
              services and/or products you have requested from us. We also may
              gather additional personal or non-personal information in the
              future.
            </p>
            <h2>Use of your Personal Information</h2>
            <p>
              Gro Capital collects and uses your personal information to operate
              its website(s) and deliver the services you have requested.
            </p>
            <p>
              Gro Capital may also use your personally identifiable information
              to inform you of other products or services available from Gro
              Capital and its affiliates.
            </p>
          </article>
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

export default Privacy;
