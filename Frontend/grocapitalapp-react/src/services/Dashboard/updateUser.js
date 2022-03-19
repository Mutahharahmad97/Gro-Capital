import { baseUrl } from "../util/baseUrl";
import { AUTHORIZE_USER_TOKEN_URL } from "../util/urls";

const updateUser = async (data) => {
  try {
    const response = await fetch(baseUrl() + AUTHORIZE_USER_TOKEN_URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        first_name: data.FName || '',
        last_name: data.LName || '',
        email: data.Email || ''
      }),
    });

    if (response.ok) {
      return { success: true, message: "success" };
    } else if (response.status === 401) {
      const error = await response.json();
      return { success: false, message: error.detail };
    } else {
      const error = await response.json();
      return {
        success: false,
        message:
          '"' + Object.keys(error)[0] + '": ' + error[Object.keys(error)[0]],
      };
    }
  } catch (e) {
    console.log(e);
    return { success: false, message: "API Error" };
  }
};

export default updateUser;
