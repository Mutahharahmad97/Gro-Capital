export const sendSms = async (phone, pin) => {
  // await console.log(btoa('mutahharahmad9:1C2BBD11-F42E-3E2F-A14E-EFC882582614'));
  try {
    const CLICKSEND_USERNAME = "Todd@Modocap.com"; //process.env.REACT_APP_CLICKSEND_USERNAME
    const CLICKSEND_API_KEY = "8DC4493D-A33C-718D-FD96-3D50E9B92B67"; //process.env.REACT_APP_CLICKSEND_API_KEY

    const response = await fetch("https://rest.clicksend.com/v3/sms/send", {
      credentials: "same-origin",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          `Basic ` + btoa(CLICKSEND_USERNAME + ":" + CLICKSEND_API_KEY),
      },
      body: JSON.stringify({
        messages: [
          {
            body: "Your pin for Gro. Capital register is " + pin,
            to: "+1" + phone,
            from: "Gro. Capital",
          },
        ],
      }),
    });
    console.log(response);
    if (!response.ok) return { success: false, message: response.response_msg };
  } catch (e) {
    console.log(e);
  }
  return { success: true, message: "" };
};
