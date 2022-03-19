import { EXPERIAN_AUTH_URL } from "../util/urls";

const ExperianAuth = async () => {
  try {
    const username = process.env.REACT_APP_EXPERIAN_USERNAME;
    const password = process.env.REACT_APP_EXPERIAN_PASSWORD;
    const client_id = process.env.REACT_APP_EXPERIAN_CLIENT_ID;
    const client_secret = process.env.REACT_APP_EXPERIAN_CLIENT_SECRET;
    const response = await fetch(EXPERIAN_AUTH_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Grant_type: "password",
      },
      body: JSON.stringify({
        username,
        password,
        client_id,
        client_secret,
      }),
    });
    if (response.ok) {
      const res = await response.json();
      return { success: true, payload: res };
    } else {
      return { success: false };
    }
  } catch (e) {
    console.log(e);
    return { success: false };
  }
};

export default ExperianAuth;
