import { apiVars, localSource } from 'config/env';
import axios from 'axios';
import { notifications } from 'store/dummyData';

const all = () => {
  if (localSource) {
    return new Promise((res) => {
      res(notifications);
    });
  }

  return axios.get(apiVars.url + '/notification');
};

export const notification = {
  all
};