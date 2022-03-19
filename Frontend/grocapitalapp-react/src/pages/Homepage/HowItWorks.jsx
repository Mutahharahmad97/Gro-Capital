import BiLatertal from "../../components/BiLatertal/BiLateral";
import CTA from "../../components/CTA/CTA";
import HiwContent from "./util/HiwContent";
import HiwContentIns from "./util/HiwContentIns";
import Investibility from "../../static/uploads/hiw1.png";
import LoginPopup from "../../components/Popups/LoginPopup";
import few from "../../static/uploads/few.png";
import HeroBottom from "../../components/HeroBottom/HeroBottom";
import { useContext } from "react";
import { AppControlContext } from "../../context/AppControlContext";

const HowItWorks = () => {
    const { loginPopupState, setLoginPopupState } = useContext(AppControlContext);
    const changeLoginPopupState = () => {
        setLoginPopupState(!loginPopupState);
    };
    return(
        <div>
        <BiLatertal
            title="How it works"
            title2="The Investability Score"
            description={["Gro.Capital evaluates your company using the information you provide and comes up with your Investability Score.","The Score allows potential investors, business owners, and the team at Gro to determine the type of investment and interest rate your company qualifies for, Gro.Captial utilizes several thousands of data points derived from your application along with the latest advances in machine learning and credit analytics to assess your business' ability to repay an investor.","As you improve your Score, your interest rate drops and your line of credit increases The higher your Investability Score, the more attractive your company will be to potential investors!"]}
            img={Investibility}
            ovpimg={few}
            // buttonText="Start Now"
            left
        />
        <CTA data={HiwContent} type="CTA2" />
        <CTA heading="The Investability Score Explained" data={HiwContentIns} type="CTA2" />
        <HeroBottom 
        bullets={["A Guide with Information on Building and Establishing your Business","A Business Line of Credit Based on your Investability Score","Links to Important Resources, All In One Place!","Blogs and Articles with Advice and Relevant","News Networking Tools and Contact with Angel Investors and Equity Loans"]}
        description="What Gro Provides Your Business"
         />
        <LoginPopup
            popupState={loginPopupState}
            onClose={changeLoginPopupState}
        />
      </div>
    )
}
export default HowItWorks