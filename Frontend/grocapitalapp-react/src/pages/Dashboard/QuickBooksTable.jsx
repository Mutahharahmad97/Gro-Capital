const QuickBooksTable = (props) => {
  const quickBooksData = props.quickBooksData;
  return (
    <div className="row">
      <div className="col-12">
        <div className="table-box">
          <h3 style={{ color: "#016d53" }}>QuickBooks Data</h3>
          <table className="loan-wrapper">
            <thead>
              <tr>
                <th>ATTRIBUTE</th>
                <th>AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>TOTAL BANK ACCOUNTS</td>
                <td>${quickBooksData.total_bank_accounts}</td>
              </tr>
              <tr>
                <td>TOTAL OTHER CURRENT ASSETS</td>
                <td>${quickBooksData.total_other_current_assets}</td>
              </tr>
              <tr>
                <td>TOTAL CURRENT ASSETS</td>
                <td>${quickBooksData.total_current_assets}</td>
              </tr>
              <tr>
                <td>TOTAL FIXED ASSETS</td>
                <td>${quickBooksData.total_fixed_assets}</td>
              </tr>
              <tr>
                <td>TOTAL ASSETS</td>
                <td>${quickBooksData.total_assets}</td>
              </tr>
              <tr>
                <td>ACCOUNTS PAYABLE</td>
                <td>${quickBooksData.accounts_payable}</td>
              </tr>
              <tr>
                <td>TOTAL ACCOUNTS PAYABLE</td>
                <td>${quickBooksData.total_accounts_payable}</td>
              </tr>
              <tr>
                <td>TOTAL OTHER CURRENT LIABILITIES</td>
                <td>${quickBooksData.total_other_current_liabilities}</td>
              </tr>
              <tr>
                <td>TOTAL CURRENT LIABILITIES</td>
                <td>${quickBooksData.total_current_liabilities}</td>
              </tr>
              <tr>
                <td>TOTAL LONG TERM LIABILITIES</td>
                <td>${quickBooksData.total_long_term_liabilities}</td>
              </tr>
              <tr>
                <td>TOTAL LIABILITIES</td>
                <td>${quickBooksData.total_liabilities}</td>
              </tr>
              <tr>
                <td>TOTAL EQUITY</td>
                <td>${quickBooksData.total_equity}</td>
              </tr>
              <tr>
                <td>TOTAL LIABILITIES AND EQUITY</td>
                <td>${quickBooksData.total_liabilities_and_equity}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QuickBooksTable;
