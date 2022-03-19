import React, { createContext } from "react";

export const AppControlContext = createContext("");

export const AppControlProvider = (props) => {
  const [formBackSteps, setFormBackSteps] = React.useState(0);
  const [formStep, setFormStep] = React.useState(0);
  const [notificationPanelState, setNotificationPanelState] =
    React.useState(false);
  const [editProfileAsideState, setEditProfileAsideState] =
    React.useState(false);
  const [loginPopupState, setLoginPopupState] = React.useState(false);
  const [chosenAmount, setChosenAmount] = React.useState("25k");
  const [chosenFinance, setChosenFinance] = React.useState("Working Capital");
  const [currentAmountIndex, setCurrentAmountIndex] = React.useState(1);
  const [currentFinanceIndex, setCurrentFinanceIndex] = React.useState(1);
  const [chosenCustomAmount, setChosenCustomAmount] = React.useState("");
  const [pinGenerated, setPinGenerated] = React.useState("");
  const [avatar, setAvatar] = React.useState(null);
  const [globalErrorMessage, setGlobalErrorMessage] = React.useState(null);
  const [stakeHolderName, setstakeHolderName] = React.useState("");
  const [stakeHolderOwnerShip, setstakeHolderOwnerShip] = React.useState("");
  const [Form, setFormState] = React.useState({
    Title: "",
    FName: "",
    LName: "",
    Email: "",
    Phone: "",
    Password: "",
    RPassword: "",
  });
  const [Form2, setForm2State] = React.useState({
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
    EIN: "",
  });
  const [Form3, setForm3State] = React.useState({
    SocialSecurityNumber: "",
    PersonalPhysicalAddress: "",
    HomeAddress1: "",
    HomeAddress2: "",
    City: "",
    State: "",
    Zip: "",
    TotalMonthlyExpenses: "",
    Birthday: "",
  });
  const [Form4, setForm4State] = React.useState({
    FinancingType: "",
  });
  const [Form5, setForm5State] = React.useState({
    YTDRevenue: "",
    YTDProfit: "",
    CurrentAR: "",
    CurrentAP: "",
    CurrentBankBalance: "",
  });
  const [docsForm, setDocsForm] = React.useState([]);

  const { children } = props;
  return (
    <AppControlContext.Provider
      value={{
        chosenAmount,
        setChosenAmount,
        currentAmountIndex,
        setCurrentAmountIndex,
        currentFinanceIndex,
        setCurrentFinanceIndex,
        chosenFinance,
        setChosenFinance,
        chosenCustomAmount,
        setChosenCustomAmount,
        Form,
        setFormState,
        formStep,
        setFormStep,
        pinGenerated,
        setPinGenerated,
        Form2,
        setForm2State,
        Form3,
        setForm3State,
        Form4,
        setForm4State,
        Form5,
        setForm5State,
        notificationPanelState,
        setNotificationPanelState,
        editProfileAsideState,
        setEditProfileAsideState,
        loginPopupState,
        setLoginPopupState,
        avatar,
        setAvatar,
        formBackSteps,
        setFormBackSteps,
        globalErrorMessage,
        setGlobalErrorMessage,
        stakeHolderName, 
        setstakeHolderName,
        stakeHolderOwnerShip,
        setstakeHolderOwnerShip,
        docsForm,
        setDocsForm
      }}
    >
      {children}
    </AppControlContext.Provider>
  );
};
