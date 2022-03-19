import { baseUrl } from "../util/baseUrl";
import { RESET_PASSWORD_URL } from '../util/urls'

const resetPassword = async (data) => {
  try {
    const response = await fetch(baseUrl() + RESET_PASSWORD_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
      }),
    });

    const res = await response.json();

    if (response.ok) {
      return { success: true, message: res.message };
    } else {
      return { success: false, message: res.message };
    }
  } catch (e) {
    console.log(e);
    return { success: false, message: "API Error" };
  }
};

export default resetPassword