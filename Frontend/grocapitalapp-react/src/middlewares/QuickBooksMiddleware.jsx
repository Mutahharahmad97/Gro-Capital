import { useEffect, useContext } from "react";
import { AppControlContext } from "../context/AppControlContext";
import { useHistory } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import addAssetLiabilitiesAndEquity from "../services/QuickBooks/AddAssetsLiabilititesAndEquity";
import getUserProfile from "../services/Forms/getUserProfile";

const QuickBooksMiddleware = () => {
  const history = useHistory();
  const { setFormStep } = useContext(AppControlContext);

  useEffect(() => {
    const queryParam = new URLSearchParams(window.location.search);
    const data = {
      total_bank_accounts: queryParam.get("total_bank_accounts")
        ? queryParam.get("total_bank_accounts")
        : "",
      total_other_current_assets: queryParam.get("total_other_current_assets")
        ? queryParam.get("total_other_current_assets")
        : "",
      total_current_assets: queryParam.get("total_current_assets")
        ? queryParam.get("total_current_assets")
        : "",
      total_fixed_assets: queryParam.get("total_fixed_assets")
        ? queryParam.get("total_fixed_assets")
        : "",
      total_assets: queryParam.get("total_assets")
        ? queryParam.get("total_assets")
        : "",
      accounts_payable: queryParam.get("accounts_payable")
        ? queryParam.get("accounts_payable")
        : "",
      total_accounts_payable: queryParam.get("total_accounts_payable")
        ? queryParam.get("total_accounts_payable")
        : "",
      total_other_current_liabilities: queryParam.get(
        "total_other_current_liabilities"
      )
        ? queryParam.get("total_other_current_liabilities")
        : "",
      total_current_liabilities: queryParam.get("total_current_liabilities"),
      total_long_term_liabilities: queryParam.get(
        "total_long_term_liabilities"
      ),
      total_liabilities: queryParam.get("total_liabilities"),
      total_equity: queryParam.get("total_equity"),
      total_liabilities_and_equity: queryParam.get(
        "total_liabilities_and_equity"
      ),
      accounts_recieveable: queryParam.get(
        "accounts_recieveable"
      )
        ? queryParam.get("accounts_recieveable")
        : "",
    };
    addAssetLiabilitiesAndEquity(data)
      .then(async () => {
        getUserProfile()
          .then((res) => {
            if (res.success) {
              if (res.response.form_step === 6) history.push("/dashboard");
              else {
                setFormStep(res.response.form_step);
                history.push("/registration");
              }
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <LoadingOverlay
      active={true}
      spinner
      text="Adding Quickbooks Data to database..."
    ></LoadingOverlay>
  );
};

export default QuickBooksMiddleware;

//     queryParam.get('total_bank_accounts')
//     queryParam.get('total_other_current_assets')
//     queryParam.get('total_current_assets')
//     queryParam.get('total_fixed_assets')
//     queryParam.get('total_assets')
//     queryParam.get('accounts_payable')
//     queryParam.get('total_accounts_payable')
//     queryParam.get('total_other_current_liabilities')
//     queryParam.get('total_current_liabilities')
//     queryParam.get('total_long_term_liabilities')
//     queryParam.get('total_liabilities')
//     queryParam.get('total_equity')
//     queryParam.get('total_liabilities_and_equity')
