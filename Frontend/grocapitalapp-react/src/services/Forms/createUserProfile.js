import { baseUrl } from "../util/baseUrl";
import { USER_PROFILE_URL } from "../util/urls";

const createUserProfile = async (data) => {
  try {
    const response = await fetch(baseUrl() + USER_PROFILE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        title: data.Title ? data.Title === "0" ? "" : data.Title : "",
        phone: data.Phone ? data.Phone : "",
      }),
    });

    if (response.ok) {
      const res = await response.json();
      localStorage.setItem("userProfileId", res.id);
      return { success: true, message: "success" };
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

export default createUserProfile;
