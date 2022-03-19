import { apiVars } from 'config/env';
import axios from 'axios';

export const getAccounts = () => {
  const uid = localStorage.getItem('userId');
  return axios.get(apiVars.url + `/banking/accounts/${uid}`);
};

export const deleteAccount = (id) => {
  return axios.delete(apiVars.url + `/banking/accounts/${id}`);
};

/* BELOW ARE NOT USED AT THE MOMENT */

export const removeBankInfo = info => {
  const uid = localStorage.getItem('userId');

  return axios.delete(apiVars.url + `/applicants/bankingInfo/${uid}`, {
    data: {
      name: info.name,
      account_type: info.account_type,
      account_number: info.account_number,
      routing_number: info.routing_number
    }
  });
};

export const addBankInfo = info => {
  const uid = localStorage.getItem('userId');

  return axios.post(apiVars.url + `/applicants/bankingInfo/${uid}`, {
    name: info.account_name,
    account_type: info.account_type,
    account_number: info.account_number,
    routing_number: info.routing_number
  });
};

export const getBankInfo = () => {
  const uid = localStorage.getItem('userId');

  return axios.get(apiVars.url + `/applicants/bankingInfo/${uid}`);
};
