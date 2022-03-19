import { baseUrl } from "../util/baseUrl";
import { LINKEDIN_REGISTER_URL } from "../util/urls";

const linkedinUserRegister = async (code, redirectUri) => {
  try {
    const response = await fetch(baseUrl() + LINKEDIN_REGISTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: code,
        redirect_uri: redirectUri,
      }),
    });

    if (response.ok) {
      const res = await response.json();
      localStorage.setItem("token", res.token);
      return { success: true, message: "success" };
    } else {
      const error = await response.json();
      return { success: false, message: error.username[0], userExists: true };
    }
  } catch (e) {
    console.log(e);
    return { success: false, message: "API Error" };
  }
};

export default linkedinUserRegister;
