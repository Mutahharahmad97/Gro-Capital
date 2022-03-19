import { baseUrl } from "../util/baseUrl";
import { LOGIN_URL } from '../util/urls'

const login = async (data) => {
  const _username = (data.email).toLowerCase();
  try {
    const response = await fetch(baseUrl() + LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: _username,
        password: data.password,
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

export default login