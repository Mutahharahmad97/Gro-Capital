import axios from 'axios';

import { apiVars } from 'config/env';

export function doLogin(username, password, social) {
  return new Promise((resolve, reject) => {
    if (social) return resolve(social);

    axios
      .post(apiVars.url + '/auth/login', {
        email: username,
        password
      })
      .then(function (resp) {
        if (resp.data.status == 'success') {
          resolve(resp.data);
        }
        if (resp.data.status_code != 200) {
          reject(resp);
          return;
        }
        resolve(resp);
      })
      .catch(error => {
        reject(error.response);
      });
  });
}

export function doRegister({
  firstName,
  lastName,
  email,
  birthDate,
  password
}) {
  return new Promise((resolve, reject) => {
    axios
      .post(apiVars.url + '/auth/register', {
        status: 'registered',
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        company: 1,
        admin: false,
        birthday: birthDate
      })
      .then(
        r => resolve(r.data),
        e => reject(e.response)
      )
      .catch(e => reject(e.response));
  });
}

export function uploadDL(image, isBack = false) {
  const uid = localStorage.getItem('userId');
  const savedProfile = JSON.parse(localStorage.getItem('profile'));
  const payload = isBack
    ? { dl_back: image }
    : { dl_front: image };
  return axios
    .put(apiVars.url + '/auth/dl_upload/' + uid, payload)
    .then(function (resp) {
      if (resp.data.status == 'success') {
        const profile = {
          ...savedProfile,
          [isBack ? 'dl_back' : 'dl_front']: image,
        };
        setTimeout(() => {
          localStorage.setItem('profile', JSON.stringify(profile));
        }, 0);
        return resp.data;
      }
      if (resp.data.status_code != 200) {
        return new Error(resp);
      }
    })
    .catch(error => {
      return new Error(error.response);
    });
}
