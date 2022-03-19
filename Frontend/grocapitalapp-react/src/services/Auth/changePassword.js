import { baseUrl } from "../util/baseUrl";
import { PASSWORD_CHANGE_URL } from '../util/urls'

const changePassword = async (data) => {
  try {
    const response = await fetch(baseUrl() + PASSWORD_CHANGE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        code: data.recoveryCode,
        password: data.password,
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

export default changePassword