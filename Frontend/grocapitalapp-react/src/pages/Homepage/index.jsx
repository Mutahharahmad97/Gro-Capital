import { AppControlContext } from "../../context/AppControlContext";
import { useContext, useEffect } from "react";
import HeroSection from "../../components/HeroSection/HeroSection";
import HeroBottom from "../../components/HeroBottom/HeroBottom";
import CTA from "../../components/CTA/CTA";
import BiLatertal from "../../components/BiLatertal/BiLateral";
import LogoCTA from "../../components/CTA/LogoCTA";
import HeroSectionData from "./util/HeroSection";
import FundingWays from "./util/FundingWays";
import Benefits from "./util/Benefits";
import LogoCTAdata from "./util/LogoCTA";
import LoginPopup from "../../components/Popups/LoginPopup";
import Investibility from "../../static/uploads/1.jpg";
import ObjectiveLogic from "../../static/uploads/2.jpg";
import Guidance from "../../static/uploads/3.jpg";

const Homepage = () => {
  const { loginPopupState, setLoginPopupState } = useContext(AppControlContext);
  const {
    setFormStep,
    setFormState,
    setForm2State,
    setForm3State,
    setForm4State,
    setForm5State,
  } = useContext(AppControlContext);

  useEffect(() => {
    setFormStep(0);
    setFormState({
      Title: "",
      FName: "",
      LName: "",
      Email: "",
      Phone: "",
      Password: "",
      RPassword: "",
    });
    setForm2State({
      CorporateName: "",
      BusinessAs: "",
      SicCode: "",
      DateOfEstablishment: "",
      TypeofOwnership: "",
      DUNS: "",
      BusinessPhysicalAddress: "",
      City: "",
      State: "",
      Zip: "",
      BusinessPhone: "",
      Extension: "",
      Experian: "",
    });
    setForm3State({
      SocialSecurityNumber: "",
      PersonalPhysicalAddress: "",
      TotalMonthlyIncome: "",
      TotalMonthlyExpenses: "",
    });
    setForm4State({
      FinancingType: "",
    });
    setForm5State({
      YTDRevenue: "",
      YTDProfit: "",
      CurrentAR: "",
      CurrentAP: "",
      CurrentBankBalance: "",
    });
    // setLoginPopupState(false);
  }, []);

  const changeLoginPopupState = () => {
    setLoginPopupState(!loginPopupState);
  };

  return (
    <div>
      <HeroSection data={HeroSectionData} />
      <CTA
        data={FundingWays}
        heading="Various Ways of Funding"
        subHeading="Choose the most convenient one"
        type="CTA1"
      />
      <BiLatertal
        title="Improve Your Investability"
        description={["As you improve your investability, your rate drops and your line of credit increases. The higher your investability score, the more likely we may invest!"]}
        img={Investibility}
        buttonText="Start Now"
        left
      />
      <CTA data={Benefits} type="CTA2" />
      <BiLatertal
        title="Objective Logic"
        description={['Gro.Capital is the first online company to provide capital "options" to businesses with proprietary machine logic tools and fundamental analysis providing the basis for the structure of the investment.']}
        img={ObjectiveLogic}
        buttonText="Start Now"
      />
      <LogoCTA data={LogoCTAdata} />
      <BiLatertal
        title="Guidance and Resources"
        description={["We give you suggested steps to become more investable, have a glossary for complex terms, and so much more."]}
        img={Guidance}
        buttonText="Register Company"
        left
      />
      <HeroBottom description="Ready to Fuel Up Your Business?" />
      <LoginPopup
        popupState={loginPopupState}
        onClose={changeLoginPopupState}
      />
    </div>
  );
};

export default Homepage;
