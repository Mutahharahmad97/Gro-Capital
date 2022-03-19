import { baseUrl } from "../util/baseUrl";
import { ADD_KPI_METRICS_URL } from "../util/urls";

const updateKpiMetrics = async (data) => {
  try {
    const response = await fetch(baseUrl() + ADD_KPI_METRICS_URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        ytd_revenue: data.YTDRevenue,
        ytd_profit: data.YTDProfit,
        current_ar: data.CurrentAR,
        current_ap: data.CurrentAP,
        current_bank_balance: data.CurrentBankBalance,
      }),
    });

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

export default updateKpiMetrics;
