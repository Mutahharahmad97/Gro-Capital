import { AppControlContext } from "../../context/AppControlContext";
import { useContext, useState, useEffect } from "react";
import LoadingOverlay from "react-loading-overlay";
import NamePriceCard from "../../components/Cards/NamePriceCard";
import InformationCard from "../../components/Cards/InformationCard";
import AccountinginformationCard from "../../components/Cards/AccountinginformationCard";
import SideBar from "../../components/SideBar/SideBar1";
import NotificationPanel from "../../components/Asides/Notification/NotificationPanel";
import EditProfile from "../../components/Asides/EditProfile/EditProfile";
import PageOverlay from "../../components/Overlay/PageOverlay";
import StakeHolderPopup from "../../components/Popups/StakeHolderPopup";
import QuickBooksTable from "./QuickBooksTable";
import FreshBooksTable from "./FreshBooksTable";
import BankAuthTable from "./BankAuthTable";
import CompanyPopup from '../../components/Popups/CompanyPopup';
// import AccountingButton from "../../components/Buttons/AccountingButton";
import {
  CompanyinformationData,
  PersonalinformationData,
  NamePriceCardData,
} from "./util/InformationCardData";
import { baseUrl } from "../../services/util/baseUrl";
import { GET_ALL_DATA_USER_URL } from "../../services/util/urls";
import ExperianScore from "../../services/Experian/Score";
import ExperianAuth from "../../services/Experian/Auth";
import ConsumerCreditScore from '../../services/CRS/consumerCreditScore';
import getAssetsLiabilititesAndEquity from "../../services/QuickBooks/GetAssetsLiabilititesAndEquity";
import getFreshbooksProfitLoss from "../../services/Freshbooks/GetFreshbooksProfitLoss";
import { plaidBaseUrl } from "../../services/util/baseUrl.js";
import "./Dashboard.scss";

const Dashboard = () => {
  // document.body.style.overflowY = "hidden";
  const { notificationPanelState, editProfileAsideState } =
    useContext(AppControlContext);
  const {
    Form5,
    setForm5State,
    Form4,
    setForm4State,
    Form,
    setFormState,
    Form3,
    setForm3State,
    Form2,
    setForm2State,
    setFormStep,
    setAvatar,
  } = useContext(AppControlContext);
  const [stakeHolderPopupState, setStakeHolderPopupState] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [dataMapped, setDataMapped] = useState(false);
  const [experianAuthToken, setExperianAuthToken] = useState("");
  const [hasQuickBooksData, setHasQuickBooksData] = useState(false);
  const [quickBooksData, setQuickBooksData] = useState({});
  const [hasFreshBooksData, setHasFreshBooksData] = useState(false);
  const [freshBooksData, setFreshBooksData] = useState({});
  const [bankingAuthData, setBankingAuthData] = useState([]);

  setFormStep(0);

  // const QuickBooksPopup = () => {
  //   let parameters = "location=1,width=800,height=650";
  //   parameters +=
  //     ",left=" +
  //     (window.screen.width - 800) / 2 +
  //     ",top=" +
  //     (window.screen.height - 650) / 2;
  //   window.open(
  //     process.env.NODE_ENV === "development"
  //       ? "http://localhost:8000/intuit/oauth"
  //       : "https://backend.grocapitalapp.com/intuit/oauth",
  //     "connectPopupQuickbooks",
  //     parameters
  //   );
  // };

  // const FreshbooksPopup = () => {
  //   let parameters = "location=1,width=800,height=650";
  //   parameters +=
  //     ",left=" +
  //     (window.screen.width - 800) / 2 +
  //     ",top=" +
  //     (window.screen.height - 650) / 2;
  //   window.open(
  //     process.env.NODE_ENV === "development"
  //       ? "http://localhost:8000/freshbooks_app/oauth"
  //       : "https://backend.grocapitalapp.com/freshbooks_app/oauth",
  //     "connectPopupFreshbooks",
  //     parameters
  //   );
  // };

  const StakeHolderPopupHandler = () => {
    setStakeHolderPopupState(!stakeHolderPopupState);
  };

  const handleDunsChange = (ExpersianScore) => {
    setForm2State({
      ...Form2,
      Experian:ExpersianScore
    });
  };

  useEffect(() => {
    if (notificationPanelState || editProfileAsideState) {
      document.body.classList.add("sidebar-visible");
    } else document.body.classList.remove("sidebar-visible");
  }, [notificationPanelState, editProfileAsideState]);

  useEffect(() => {

    const mapAllUserDataToContext = async (data) => {
      try {
        var clean_balance = data.balance.replace(/\$|,/g, '',);
      } catch (error) {
        var clean_balance = "0";;
      }
      
      setForm5State({
        ...Form5,
        YTDRevenue: parseInt(data.total_income) + "",
        YTDProfit: parseInt(data.gross_profit_ytd) + "",
        CurrentAR: parseInt(data.accounts_recieveable) + "",
        CurrentAP: parseInt(data.total_accounts_payable) + "",
        CurrentBankBalance: parseInt(clean_balance) + "",
      });

      setFormState({
        ...Form,
        FName: data.first_name,
        LName: data.last_name,
        Email: data.email,
      });

      setForm3State({
        ...Form3,
        SocialSecurityNumber: data.social_security_number,
        Birthday: data.birthday,
      });

      await setForm2State({
        ...Form2,
        DUNS: data.duns,
        BusinessPhysicalAddress: data.business_physical_address,
        City: data.city,
        State: data.state,
        Zip: data.zip,
        CorporateName: data.corporate_name,
        EIN: data.ein
      });

      setAvatar(data.avatar);

      setForm4State({
        ...Form4,
      });
    };

    if (!dataFetched) {
      fetch(baseUrl() + GET_ALL_DATA_USER_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((response) => {
          setDataFetched(true);
          mapAllUserDataToContext(response);
          // setDataMapped(true);
        })
        .then(() => setExperianAuthToken("True"))
        .catch((err) => {
          console.log(err);
          setDataMapped(true)
        });
    }
  }, [
    dataFetched,
    Form,
    Form2,
    Form3,
    Form5,
    Form4,
    setForm4State,
    setFormState,
    setForm2State,
    setForm3State,
    setForm5State,
    setAvatar
  ]);

  useEffect(() => {
    if (experianAuthToken !== "" && !dataMapped) {
      ConsumerCreditScore()
        .then((response) =>
          setForm2State({
            ...Form2,
            Experian: response.score
              ? response.score + "/800"
              : "",
          })
        )
        .then(() => setDataMapped(true))
        .catch((err) => {
          console.log(err);
          setDataMapped(true)
        });
    }
  }, [experianAuthToken, Form2, setForm2State, dataMapped]);

  useEffect(() => {
    getAssetsLiabilititesAndEquity()
      .then((res) => {
        if (res.success) {
          if (res.payload[0]) {
            setHasQuickBooksData(true);
            setQuickBooksData(res.payload[0]);
          }
        }
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    getFreshbooksProfitLoss()
      .then((res) => {
        if (res.success) {
          if (res.payload[0]) {
            setHasFreshBooksData(true);
            setFreshBooksData(res.payload[0]);
          }
        }
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const getBankingAutData = async () => {
      const bankingAuthData_ = await fetch(plaidBaseUrl() + "banking-auth/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });

      const response = await bankingAuthData_.json();
      setBankingAuthData(response);
    };

    getBankingAutData();
  }, []);

  return (
    <LoadingOverlay active={!dataMapped} spinner text="Fetching Data...">
      <div id="dashboard-page">
        <section className="dashboard">
          <div className="wrap">
            <div className="dashboard__row">
              <div className="dashboard__content dashboard__content--sm">
                <div className="row">
                  {NamePriceCardData.map((data, index) => {
                    return (
                      <NamePriceCard
                        name={data.name}
                        title={data.title}
                        price={Form5[data.name]}
                        key={data.id}
                        fullWidth={index + 1 === NamePriceCardData.length}
                      />
                    );
                  })}
                </div>

                {[
                  {
                    title: "Personal Information",
                    data: PersonalinformationData,
                  },
                  {
                    title: "Company Information",
                    data: CompanyinformationData,
                  },
                ].map((card, index) => {
                  return (
                    <InformationCard
                      title={card.title}
                      data={card.data}
                      key={dataMapped + card.title}
                      callback={handleDunsChange}
                      authToken={experianAuthToken}
                    />
                  );
                })}

                <BankAuthTable bankingAuthData={bankingAuthData} />

                <div className="white-box--mb">
                  <AccountinginformationCard
                    onclick={StakeHolderPopupHandler}
                  />
                </div>

                {/* <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "50%",
                    paddingRight: "10px",
                  }}
                >
                  {!hasQuickBooksData && (
                    <AccountingButton
                      onClick={QuickBooksPopup}
                      name="QuickBooks"
                    />
                  )}
                  {!hasFreshBooksData && (
                    <AccountingButton
                      onClick={FreshbooksPopup}
                      name="Freshbooks"
                    />
                  )}
                </div> */}

                {hasQuickBooksData && (
                  <QuickBooksTable quickBooksData={quickBooksData} />
                )}
                {hasFreshBooksData && (
                  <FreshBooksTable freshBooksData={freshBooksData} />
                )}
              </div>
              <SideBar />
            </div>
          </div>
        </section>
        <PageOverlay
          activeState={notificationPanelState || editProfileAsideState}
        />
        <NotificationPanel activeState={notificationPanelState} />
        <EditProfile activeState={editProfileAsideState} />
        <StakeHolderPopup
          activeState={stakeHolderPopupState}
          onclick={StakeHolderPopupHandler}
        />
      </div>
    </LoadingOverlay>
  );
};

export default Dashboard;
