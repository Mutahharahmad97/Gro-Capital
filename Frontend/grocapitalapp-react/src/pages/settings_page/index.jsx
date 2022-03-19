import 'font-awesome/css/font-awesome.min.css';
import SettingOptions from './util/SettingOptions';
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom"

const SettingsPage = () => {
    const history = useHistory();
    const handleSettingCard = (e) =>{
      if (e.target.innerText === "ACCOUNT DETAILS")
        history.push('/account-details')
      else if(e.target.innerText === "SECURITY")
        history.push('/security')
      else if(e.target.innerText === "BUSINESS INFORMATION")
        history.push('/business-information')
      else if(e.target.innerText === "BILLING")
        history.push('/billing')
      else if(e.target.innerText === "AUTHORIZATION")
        history.push('/authorization')
      else if(e.target.innerText === "NOTIFICATIONS")
        history.push('/notifications')
      else if(e.target.innerText === "PLAN DETAILS")
        history.push('/plan-details')
    }
    
    return (
    <div id="settings-pages">
      <div>
        <h1 className="setting-heading">
        Settings
        </h1>
        <div className="registration">
            <div className="registration__box">
              <div className="settings-list">
                {SettingOptions.map((option) => {
                  return (
                  <Link to={option.route} className="setting-element">
                        <i className={option.src} style={{fontSize:"45px", color:"#80B6A9"}}></i>
                        <h3>{option.title}</h3>
                  </Link>
                  );
                })}
              </div>
              <input type="hidden" name="money" value="" />
            </div>
          </div>
      </div>
    </div>
    // <AccountInformationForm />
    );
};
export default SettingsPage