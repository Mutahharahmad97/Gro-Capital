import { baseUrl } from "../util/baseUrl";
import { AUTHORIZE_USER_TOKEN_URL } from '../util/urls'

const authorizeUserToken = async () => {
  if (localStorage.hasOwnProperty("token")) {
    try {
      const response = await fetch(baseUrl() + AUTHORIZE_USER_TOKEN_URL, {
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) return true;
      else return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  } else {
    return false;
  }
};

export default authorizeUserToken



