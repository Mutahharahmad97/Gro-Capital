import { baseUrl } from "../util/baseUrl";
import { ADD_BUSINESS_INFORMATION_URL } from "../util/urls";

const updateBusinessInformation = async (data) => {
  try {
    const response = await fetch(baseUrl() + ADD_BUSINESS_INFORMATION_URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        corporate_name: data.CorporateName || '',
        business_physical_address: data.BusinessPhysicalAddress || '',
        business_as: data.BusinessAs || '',
        city: data.City || '',
        duns: data.DUNS || '',
        sic_code: data.SicCode || '',
        state: data.State || '',
        zip: data.Zip || '',
        date_of_establishment: data.DateOfEstablishment || '',
        business_phone: data.BusinessPhone || '',
        extenstion: data.Extenstion || '',
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

export default updateBusinessInformation;
