import { apiVars } from 'config/env';
import axios from 'axios';
// import { create } from 'utils/score';

import setAuthToken from 'utils/authAxios';

export const getProfile = (userId) => {
  return axios.get(apiVars.url + `/users/${userId}`);
};

export const storeProfile = (user) => {
  const savedProfile = JSON.parse(localStorage.getItem('profile')) || {};
  const profile = {
    first_name: user.first_name || '',
    last_name: user.last_name || '',
    profile: user.profile || '',
    email: user.email || '',
    birthday: user.birthday || '',
    driverLicense: user.driverLicense || '',
    ssn: user.ssn || '',
    status: user.status || savedProfile.status,
    last_step: user.last_step || 0,
    dl_front: user.dl_front || savedProfile.dl_front,
    dl_back: user.dl_back || savedProfile.dl_back,
  };

  localStorage.setItem('profile', JSON.stringify(profile));
};

export const updateServerProfile = (user) => {
  const userId = localStorage.getItem("userId");
  if (!user.birthday) {
    delete user.birthday;
  }
  user['username'] = user.email;
  delete user.password;
  axios.put(apiVars.url + `/users/${userId}`, user);
};

export const addCompanyUid = (cuid) => {
  const userId = localStorage.getItem("userId");
  axios.put(apiVars.url + `/users/${userId}`, { company: cuid });
  // .then( () => {
  //   create();
  // });
};

export const updateUserStatus = (status) => {
  const userId = localStorage.getItem("userId");
  axios.put(apiVars.url + `/users/${userId}`, { status });
};

export const updateUser = (firstName, lastname, email, birthdate, driverLicense, ssn) => {
  console.log('updateUser=>', firstName, lastname, email, birthdate, driverLicense, ssn);
  // const userId = localStorage.getItem("userId");
  // axios.put(apiVars.url + `/users/${userId}`, { user });
};

export const updateUserQBInfo = (id, accessToken) => {
  const userId = localStorage.getItem("userId");
  setAuthToken();
  axios.put(apiVars.url + `/users/${userId}`, {
    quickbook_id: id,
    quickbook_access_token: accessToken,
  });
};
