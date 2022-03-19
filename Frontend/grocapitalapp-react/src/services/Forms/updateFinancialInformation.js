import { baseUrl } from "../util/baseUrl";
import { ADD_FINANCIAL_INFORMATION_URL } from "../util/urls";

const updateFinancialInformation = async (
  FinancingType,
  chosenAmount,
  chosenFinance
) => {
  chosenAmount =
    chosenAmount.charAt(chosenAmount.length-1) === "k"
      ? chosenAmount.replace("k", "000")
      : chosenAmount;

  try {
    const response = await fetch(baseUrl() + ADD_FINANCIAL_INFORMATION_URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        financing_type: FinancingType === "0" ? "" : FinancingType,
        amount: chosenAmount,
        finance: chosenFinance,
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

export default updateFinancialInformation;
