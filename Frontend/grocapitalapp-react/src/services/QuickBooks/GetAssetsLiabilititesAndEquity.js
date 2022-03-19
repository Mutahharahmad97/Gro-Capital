import { intuitBaseUrl } from "../util/baseUrl";
import { ASSET_LIABILITIES_AND_EQUITY_URL } from "../util/urls";

const getAssetsLiabilititesAndEquity = async () => {
  try {
    const response = await fetch(intuitBaseUrl() + ASSET_LIABILITIES_AND_EQUITY_URL, {
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

export default getAssetsLiabilititesAndEquity;
