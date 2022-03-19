import { baseUrl } from "../util/baseUrl";
import { USER_DOCUMENTATION } from "../util/urls";

const addUserDocs = async (data) => {
    try {
        var userId= localStorage.getItem("userProfileId")
        const form_data = new FormData();
        form_data.append("doc_type", data.ImageType)
        form_data.append("path", data.Image)
        console.log(form_data);
        const response = await fetch(baseUrl() + USER_DOCUMENTATION, {
        method: "POST",
        headers: {
            // "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
        },
        body: form_data,
        });

        if (response.ok) {
            return { success: true };
        } else {
            return { success: false };
        }
    } catch (e) {
        console.log(e);
        return { success: false, message: "API Error" };
    }
};

export default addUserDocs;