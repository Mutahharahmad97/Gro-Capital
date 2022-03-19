import { baseUrl } from "../util/baseUrl";
import { CODE_VERIFICATION_URL } from '../util/urls'

const resetCodeVerification = async (data) => {
  try {
    const response = await fetch(baseUrl() + CODE_VERIFICATION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        code: data.recoveryCode,
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

export default resetCodeVerification