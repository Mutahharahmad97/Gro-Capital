import { baseUrl } from "../util/baseUrl";
import { LOGOUT_URL } from "../util/urls";

const logout = async (data) => {
  try {
    await fetch(baseUrl() + LOGOUT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export default logout;
