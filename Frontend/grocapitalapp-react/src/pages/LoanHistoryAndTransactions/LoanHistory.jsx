import { AppControlContext } from "../../context/AppControlContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NotificationPanel from "../../components/Asides/Notification/NotificationPanel";
import PageOverlay from "../../components/Overlay/PageOverlay";
// import loanHistoryData from "./util/LoanHistoryData";
import GetLoanHistory from "../../services/Dashboard/GetLoanHistory";
import LoadingOverlay from "react-loading-overlay";

const LoanHistory = () => {
  const { notificationPanelState } = useContext(AppControlContext);
  const [loanHistoryData, setLoanHistoryData] = useState([]);

  useEffect(() => {
    GetLoanHistory().then((response) => {
      if (response.success) setLoanHistoryData(response.payload);
    });
    return () => setLoanHistoryData([]);
  }, []);

  return (
    <LoadingOverlay
      // active={loanHistoryData.length === 0}
      spinner
      text="Fetching Data..."
    >
      <div id="dashboard-page">
        <section className="dashboard">
          <div className="wrap">
            <div className="dashboard__row">
              <div className="dashboard__content dashboard__content--xl">
                <div className="sub-menu loan-tabs">
                  <ul className="sub-menu__list">
                    <li>
                      <Link to="/loan-history" className="active">
                        Loan History
                      </Link>
                    </li>
                    <li>
                      <Link to="/transactions">Transactions</Link>
                    </li>
                  </ul>
                  <div className="row">
                    <div className="col-12">
                      <div className="table-box">
                        <table className="loan-wrapper">
                          <thead>
                            <tr>
                              <th>DATE</th>
                              <th>ORIGINAL LOAN AMOUNT</th>
                              <th>DESCRIPTION</th>
                              <th>OUTSTANDING BALANCE</th>
                              <th>LOAN AGREEMENT</th>
                            </tr>
                          </thead>
                          <tbody>
                            {loanHistoryData.map((data) => {
                              return (
                                <tr key={data.id}>
                                  <td>{data.date}</td>
                                  <td>
                                    $
                                    {parseInt(data.loanAmount).toLocaleString(
                                      "en-US",
                                      {
                                        minimumFractionDigits: 2,
                                      }
                                    )}
                                  </td>
                                  <td>{data.description}</td>
                                  {data.paid ? (
                                    <td className="loan-status">
                                      {"Paid in Full"}
                                    </td>
                                  ) : (
                                    <td>
                                      {parseInt(
                                        data.outstandingBalance
                                      ).toLocaleString("en-US", {
                                        minimumFractionDigits: 2,
                                      })}
                                    </td>
                                  )}
                                  <td>
                                    <span
                                      className="view-btn"
                                      onClick={() =>
                                        alert(
                                          `Out-Standing Balance: ${
                                            data.paid
                                              ? "paid"
                                              : data.outstandingBalance
                                          }`
                                        )
                                      }
                                    >
                                      View
                                    </span>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <PageOverlay activeState={notificationPanelState} />
        <NotificationPanel activeState={notificationPanelState} />
      </div>
    </LoadingOverlay>
  );
};

export default LoanHistory;
