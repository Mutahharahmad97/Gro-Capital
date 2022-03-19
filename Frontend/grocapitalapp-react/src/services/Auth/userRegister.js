import { baseUrl } from "../util/baseUrl";
import { REGISTER_URL } from '../util/urls'

const register = async (data) => {
  const _firstName = (data.FName).toLowerCase();
  const _lastName = (data.LName).toLowerCase();
  const _email = (data.Email).toLowerCase();
  try {
    const response = await fetch(baseUrl() + REGISTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: _firstName,
        last_name: _lastName,
        // username: data.Email.split("@")[0],
        username: _email,
        email: _email,
        password: data.RPassword,
      }),
    });

    if (response.ok) {
      const res = await response.json();
      localStorage.setItem("token", res.token);
      return { success: true, message: "success", userExists: false };
    } else {
      const error = await response.json();
      return { success: false, message: error.username[0], userExists: true };
    }
  } catch (e) {
    console.log(e);
    return { success: false, message: "API Error",  userExists: false };
  }
};

export default register