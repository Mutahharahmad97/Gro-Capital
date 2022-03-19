import { baseUrl } from "../util/baseUrl";
import { USER_PROFILE_URL } from "../util/urls";

const getUserProfile = async (data) => {
  try {
    const response = await fetch(baseUrl() + USER_PROFILE_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });

    if (response.ok) {
      const res = await response.json();
      localStorage.setItem("userProfileId", res[0].id);
      return { success: true, message: "success", response: res[0] };
    } else if (response.status === 401) {
      const error = await response.json();
      return { success: false, message: error.detail };
    } else {
      const error = await response.json();
      return { success: false, message: error.message[0] };
    }
  } catch (e) {
    console.log(e);
    return { success: false, message: "API Error" };
  }
};

export default getUserProfile;
