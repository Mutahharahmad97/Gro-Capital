import { baseUrl } from "../util/baseUrl";
import { LINKEDIN_LOGIN_URL } from '../util/urls'

const linkedinUserLogin = async (code, redirectUri) => {
  try {
    const response = await fetch(baseUrl() + LINKEDIN_LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: code,
        redirect_uri: redirectUri
      }),
    });

    if (response.ok) {
      const res = await response.json();
      localStorage.setItem("token", res.token);
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

export default linkedinUserLogin