import { apiVars } from 'config/env';
import axios from 'axios';

export const getDocuments = () => {
  const uid = localStorage.getItem("userId");
  return axios.get(apiVars.url + `/accounting/documents/${uid}`);
};

export const deleteDocument = (id) => {
  return axios.delete(apiVars.url + `/accounting/documents/${id}`);
};

export const getReports = () => {
  const uid = localStorage.getItem("userId");
  return axios.post(apiVars.url + `/accounting/accountingReport`, {
    user_id: uid,
  });
};

export const getBalanceSheetReport = () => {
  const uid = localStorage.getItem('userId');
  const access_token = localStorage.getItem('accountingToken');
  const realmId = localStorage.getItem('accountingRealmId');
  return axios.post(apiVars.url + '/accounting/apiCall/BalanceSheet', {
    uid,
    access_token,
    realmId,
  });
};
