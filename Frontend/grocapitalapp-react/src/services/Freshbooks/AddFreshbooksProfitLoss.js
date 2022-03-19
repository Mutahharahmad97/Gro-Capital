import { freshbooksBaseUrl } from "../util/baseUrl";
import { PROFIT_LOSS_URL } from "../util/urls";

const addFreshbooksProfitLoss = async (data) => {
  try {
    const response = await fetch(
      freshbooksBaseUrl() + PROFIT_LOSS_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          company_name: data.company_name,
          currency_code: data.currency_code,
          end_date: data.end_date,
          total_expenses: data.total_expenses,
          total_assets: data.total_assets,
          total_income: data.total_income,

          net_profit_ytd: data.net_profit_ytd,

          net_profit_1: data.net_profit_1,
          net_profit_2: data.net_profit_2,
          net_profit_3: data.net_profit_3,

          gross_profit_ytd: data.gross_profit_ytd,

          gross_profit_1: data.gross_profit_1,
          gross_profit_2: data.gross_profit_2,
          gross_profit_3: data.gross_profit_3,
          
          cogs_py_1: data.cogs_py_1,
          cogs_py_2: data.cogs_py_2,
          cogs_py_3: data.cogs_py_3,
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

export default addFreshbooksProfitLoss;
