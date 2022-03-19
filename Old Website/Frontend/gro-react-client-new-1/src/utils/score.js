import { apiVars } from 'config/env';
import axios from 'axios';

export const getScore = () => {
  const cuid = localStorage.getItem("companyId");
  if (cuid) {
    return axios.get(apiVars.url + `/gro_score/${cuid}`);
  }
  return new Promise((res) => res());
};

export const update = (score) => {
  const cuid = localStorage.getItem("companyId");
  axios.put(apiVars.url + `/gro_score/${cuid}`, { data_score: score });
};

export const create = () => {
  const cuid = localStorage.getItem("companyId");
  axios.post(apiVars.url + `/gro_score/${cuid}`, { data_score: 0 });
};