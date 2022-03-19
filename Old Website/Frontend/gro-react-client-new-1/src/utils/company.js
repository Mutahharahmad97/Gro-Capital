import { apiVars } from 'config/env';
import axios from 'axios';

export const updateCompany = (company_name, address, room, city, state, zipcode, company_phone) => {
  const uid = localStorage.getItem("companyId");
  if (!company_name) {
    const userId = localStorage.getItem("userId");
    company_name = userId;
  }
  console.log("Saving company information...");
  axios.put(apiVars.url + `/companies/${uid}`, {
    company_name, address, room, city, state, zipcode: parseInt(zipcode), company_phone: parseInt(company_phone)
  })
    .then(() => {
    },
      () => {
      });
};

export const updateCompanyDetails = (ein, duns, structure, industry, industry_type_other, date, revenue) => {
  const uid = localStorage.getItem("companyId");
  console.log("Saving company details...");
  axios.put(apiVars.url + `/companies/${uid}`, {
    ein: ein, duns: parseInt(duns), structure: structure, industry: industry, industry_type_other: industry_type_other, established_date: date, annual_revenue: parseInt(revenue)
  })
    .then(() => {
    },
      () => {
      });
};

// export function updateCompanyDetails(ein, duns, structure, industry, date, revenue) {
//   const uid = localStorage.getItem("companyId");
//   axios.put(apiVars.url + `/companies/${uid}`, {
//     ein: ein, duns: parseInt(duns), structure:structure, industry: industry, established_date:date, annual_revenue: parseInt(revenue)
//   })
//   .then(() => {
//   },
//   () => {
//   });
// }

export const updateCompanyLoan = (loan_amount_applied, amount, loan_type, loan_reason) => {
  const uid = localStorage.getItem("companyId");
  axios.put(apiVars.url + `/companies/${uid}`, {
    loan_amount_applied: parseInt(loan_amount_applied),
    amount: amount,
    loan_type: loan_type,
    loan_reason: loan_reason
  })
    .then(() => {
    },
      () => {
      });
};

export const getCompany = (uid) => {
  return axios.get(apiVars.url + `/companies/${uid}`);
};

export const createNewCompany = () => {
  const uid = localStorage.getItem('userId');
  return axios.post(apiVars.url + '/companies/', {
    company_name: uid
  });
};

export function sendAccountingToken() {
  const uid = localStorage.getItem("userId");
  const access_token = localStorage.getItem("accountingToken");
  const realmId = localStorage.getItem("accountingRealmId");
  if (access_token) {
    axios.post(apiVars.url + '/accounting/apiCall/companyInfo', {
      uid, realmId, access_token
    })
      .then(() => {
      },
        () => {
        });
  }
}

/************* STAKEHOLDERS *****************/
export function getStakeholders() {
  const uid = localStorage.getItem('companyId');
  return axios.get(`${apiVars.url}/companies/stakeholders/${uid}`);
}

export function createStakeholder(payload, isUpdate = false) {
  const uid = localStorage.getItem('companyId');
  let create = isUpdate ? axios.put : axios.post;
  return create(`${apiVars.url}/companies/stakeholders/${uid}`, payload);
}

export function deleteStakeholder(payload) {
  const uid = localStorage.getItem('companyId');
  return axios.delete(`${apiVars.url}/companies/stakeholders/${uid}`, { data: payload });
}
