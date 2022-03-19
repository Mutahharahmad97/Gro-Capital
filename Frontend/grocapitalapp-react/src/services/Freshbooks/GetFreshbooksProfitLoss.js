import { freshbooksBaseUrl } from "../util/baseUrl";
import { PROFIT_LOSS_URL } from "../util/urls";

const getFreshbooksProfitLoss = async () => {
  try {
    const response = await fetch(freshbooksBaseUrl() + PROFIT_LOSS_URL, {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
    if (response.ok) {
      const res = await response.json();
      return { success: true, payload: res };
    } else {
      return { success: false };
    }
  } catch (e) {
    console.log(e);
    return { success: false };
  }
};

export default getFreshbooksProfitLoss;
