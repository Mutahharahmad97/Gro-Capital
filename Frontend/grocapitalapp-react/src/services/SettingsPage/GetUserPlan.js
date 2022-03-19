import { baseUrl } from "../util/baseUrl";
import { USER_PLAN_URL } from "../util/urls";

const GetUserPlan = async () => {
  try {
    const response = await fetch(baseUrl() + USER_PLAN_URL, {
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

export default GetUserPlan;
