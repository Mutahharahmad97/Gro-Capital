import { baseUrl } from "../util/baseUrl";
import { GET_TRANSACTIONS_DATA_URL } from "../util/urls";

const GetTransactions = async () => {
  try {
    const response = await fetch(baseUrl() + GET_TRANSACTIONS_DATA_URL, {
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

export default GetTransactions;
