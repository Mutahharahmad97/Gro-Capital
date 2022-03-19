import { crsBaseUrl } from "../util/baseUrl";
import { CRS_CONSUMER_CREDIT_REPORT_AND_SCORE } from "../util/urls";

const ConsumerCreditScore = async () => {
  try {
    const response = await fetch(crsBaseUrl() + CRS_CONSUMER_CREDIT_REPORT_AND_SCORE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
    if (response.ok) {
      const res = await response.json();
      console.log(res.message)
      return { success: true, score: res.score, message: res.message };
    } else {
      const error = await response.json();
      console.log(error.message)
      return { success: false, message: error.message };
    }
  } catch (e) {
    console.log(e);
    return { success: false, message: "API Error" };
  }
};

export default ConsumerCreditScore;
