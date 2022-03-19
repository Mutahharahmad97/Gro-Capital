import PlaidAuthDataAPI from "../../services/Plaid/PlaidAuthDataAPI";

const BankAuthTable = (props) => {
  const bankingAuthData = props.bankingAuthData;
  return (
    <div style={{ marginBottom: "2%" }}>
      <div className="row">
        <div className="col-12">
          <div className="table-box">
            <div className="white-box__title table-flex">
              <h2>Banking Information</h2>
              <PlaidAuthDataAPI>
                <button className="btn btn--green btn-table">
                  Add Banking Information
                </button>
              </PlaidAuthDataAPI>
            </div>
            <table className="loan-wrapper">
              <thead>
                <tr>
                  <th>Account Name</th>
                  {/* <th>Account ID</th> */}
                  <th>Account Number</th>
                  <th>Balance</th>
                  <th>Routing Number</th>
                </tr>
              </thead>
              <tbody>
                {bankingAuthData.map((data) => {
                  return (
                    <tr key={data.account_id}>
                      <td>{data.name}</td>
                      {/* <td>{data.account_id}</td> */}
                      <td>{data.account_number}</td>
                      <td>{data.balance}</td>
                      <td>{data.routing_number}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankAuthTable;
