import { baseUrl } from "../util/baseUrl";
import { ADD_PERSONAL_INFORMATION_URL } from "../util/urls";

const updatePersonalInformation = async (data) => {
  try {
    const response = await fetch(baseUrl() + ADD_PERSONAL_INFORMATION_URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        social_security_number: data.SocialSecurityNumber || '',
        personal_physical_address: data.PersonalPhysicalAddress || '',
        total_monthly_income: data.TotalMonthlyIncome || '',
        total_monthly_expenses: data.TotalMonthlyExpenses || '',
        birthday: data.Birthday || '',
        home_address_1: data.HomeAddress1,
        home_address_2: data.HomeAddress2,
        city: data.City,
        state: data.State,
        zip: data.Zip,
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

export default updatePersonalInformation;
