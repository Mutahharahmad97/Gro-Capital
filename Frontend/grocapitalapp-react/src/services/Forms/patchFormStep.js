import { baseUrl } from "../util/baseUrl";
import { USER_PROFILE_URL } from "../util/urls";

const patchFormStep = async (formStep) => {
  try {
    const response = await fetch(baseUrl() + USER_PROFILE_URL + `${localStorage.getItem("userProfileId")}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        form_step: formStep
      }),
    });

    if (response.ok) {
      return { success: true, message: "success" };
    } else {
      const error = await response.json();
      return { success: false, message: error.detail };
    }
  } catch (e) {
    console.log(e);
    return { success: false, message: "API Error" };
  }
};

export default patchFormStep;
