import { apiVars } from "config/env";
import axios from "axios";

export function updateEInvestment(investment) {
  return new Promise((resolve, reject) => {
    // console.info({ investment });
    const uid = localStorage.getItem("userId");
    const data = {
      name: investment.name,
      email_address: investment.email,
      position: investment.position,
      experience: investment.experience,
      industry_understanding: investment.industry,
      external_works: investment.external_network,
      anuual_spand: investment.target_market,
      market_Structure: investment.market_structure,
      traction: investment.traction,
      partnership_status: investment.partnership_status,
      idea: investment.developed_idea,
      time_spent_business: investment.business,
      money_in_business: investment.money,
      competitive_advantage: investment.competitive,
      summary: investment.summary,
      management_team: investment.team,
      customer_problems: investment.problems,
      products_services: investment.products,
      target_market: investment.target,
      business_model: investment.businessmodel,
      customer_segments: investment.customer,
      strategy: investment.sales,
      competitors: investment.competitors,
      advantage: investment.competitive_advantages
    };

    const formData = new FormData();

    formData.append("profile_pitch_video", investment.profile_pitch_video);
    formData.append("timestamp", (Date.now() / 1000) | 0);

    formData.append("pitch_video", investment.upload_video);
    formData.append("timestamp", (Date.now() / 1000) | 0);

    Object.keys(data).forEach(field => {
      formData.append(field, data[field]);
    });

    axios
      .post(apiVars.url + "/equity/", formData, {
        type: { "Content-Type": "multipart/form-data" }
      })
      .then(resp => {
        console.info({ resp });
        resolve(resp.data.message);
      })
      .catch(error => {
        reject(error);
        return;
      });
  });
}
