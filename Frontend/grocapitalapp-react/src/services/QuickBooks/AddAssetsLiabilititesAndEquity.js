import { intuitBaseUrl } from "../util/baseUrl";
import { ASSET_LIABILITIES_AND_EQUITY_URL } from "../util/urls";

const addAssetLiabilitiesAndEquity = async (data) => {
  try {
    const response = await fetch(
      intuitBaseUrl() + ASSET_LIABILITIES_AND_EQUITY_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          total_bank_accounts: data.total_bank_accounts,
          total_other_current_assets: data.total_other_current_assets,
          total_current_assets: data.total_current_assets,
          total_fixed_assets: data.total_fixed_assets,
          total_assets: data.total_assets,
          accounts_payable: data.accounts_payable,
          total_accounts_payable: data.total_accounts_payable,
          total_other_current_liabilities: data.total_other_current_liabilities,
          total_current_liabilities: data.total_current_liabilities,
          total_long_term_liabilities: data.total_long_term_liabilities,
          total_liabilities: data.total_liabilities,
          total_equity: data.total_equity,
          total_liabilities_and_equity: data.total_liabilities_and_equity,
          total_liabilities_and_equity: data.total_liabilities_and_equity,
          accounts_recieveable: data.accounts_recieveable,
        }),
      }
    );

    if (response.ok) {
      return { success: true, message: "success" };
    } else if (response.status === 401) {
      const error = await response.json();
      return { success: false, message: error.detail };
    } else {
      const error = await response.json();
      return {
        success: false,
        message:
          '"' + Object.keys(error)[0] + '": ' + error[Object.keys(error)[0]],
      };
    }
  } catch (e) {
    console.log(e);
    return { success: false, message: "API Error" };
  }
};

export default addAssetLiabilitiesAndEquity;
