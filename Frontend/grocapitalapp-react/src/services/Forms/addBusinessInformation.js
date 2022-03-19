import { baseUrl } from "../util/baseUrl";
import { ADD_BUSINESS_INFORMATION_URL } from "../util/urls";

const addBusinessInformation = async (data) => {
  try {
    const response = await fetch(baseUrl() + ADD_BUSINESS_INFORMATION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        corporate_name: data.CorporateName,
        business_as: data.BusinessAs,
        sic_code: data.SicCode,
        date_of_establishment: data.DateOfEstablishment,
        type_of_ownership: data.TypeofOwnership,
        duns: data.DUNS,
        business_physical_address: data.BusinessPhysicalAddress,
        city: data.City,
        state: data.State,
        state_code: data.stateCode,
        zip: data.Zip,
        business_phone: data.BusinessPhone,
        extenstion: data.Extension,
        ein: data.EIN
      }),
    });

    if (response.ok) {
      return { success: true, message: "success" };
    } else if (response.status === 401) {
      const error = await response.json();
      return { success: false, message: error.detail };
    } else {
      const error = await response.json();
      return { success: false, message: '"' + Object.keys(error)[0] + '": ' + error[Object.keys(error)[0]]};
    }
  } catch (e) {
    console.log(e);
    return { success: false, message: "API Error" };
  }
};

export default addBusinessInformation;
