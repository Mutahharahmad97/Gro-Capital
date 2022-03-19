const FreshBooksTable = (props) => {
  const freshBooksData = props.freshBooksData;
  return (
    <div className="row">
      <div className="col-12">
        <div className="table-box">
          <h3 style={{ color: "#016d53" }}>FreshBooks Data</h3>
          <table className="loan-wrapper">
            <thead>
              <tr>
                <th>ATTRIBUTE</th>
                <th>VALUE</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>COMPANY NAME</td>
                <td>{freshBooksData.company_name}</td>
              </tr>
              <tr>
                <td>CURRENCY CODE</td>
                <td>{freshBooksData.currency_code}</td>
              </tr>
              <tr>
                <td>END DATE</td>
                <td>{freshBooksData.end_date}</td>
              </tr>
              <tr>
                <td>TOTAL EXPENSES</td>
                <td>${freshBooksData.total_expenses}</td>
              </tr>
              <tr>
                <td>TOTAL INCOME</td>
                <td>${freshBooksData.total_income}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FreshBooksTable;
