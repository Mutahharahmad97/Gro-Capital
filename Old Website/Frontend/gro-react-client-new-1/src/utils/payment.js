import { apiVars, localSource } from 'config/env';
import axios from 'axios';
import { payments } from 'store/dummyData';

const all = () => {
  if (localSource) {
    return new Promise((res) => {
      res(payments);
    });
  }

  return axios.get(apiVars.url + '/payment');
};

export const payment = {
  all
};