import { baseUrl } from "../util/baseUrl";
import { EDIT_USER_PROFILE_URL } from "../util/urls";

const editUserProfile = async (data) => {
  try {
    const form_data = new FormData();
    data.avatar &&  form_data.append("avatar", data.avatar);
    form_data.append("email", data.email);
    data.password && form_data.append("password", data.password);
    form_data.append("social_security_number", data.social_security_number);
    // form_data.append("birthday", data.birthday)
    //     driver_license_number: data.driver_license_number,
    //     social_security_number: data.social_security_number,
    const response = await fetch(baseUrl() + EDIT_USER_PROFILE_URL, {
      method: "PUT",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
      body: form_data,
    });

    if (response.ok) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (e) {
    console.log(e);
    return { success: false, message: "API Error" };
  }
};

export default editUserProfile;
