import { facebook } from './socialAuthDrivers/facebook';
import { google } from './socialAuthDrivers/google';
import { linkedin } from './socialAuthDrivers/linkedin';

const drivers = {
  'facebook': facebook,
  'google': google,
  'linkedin': linkedin
};

export const socialAuth = {
  provider: null,
  data: {},
  init: function (provider, data, cb, noInit = false) {
    this.provider = provider;
    if (noInit) {
      cb();
      return;
    }
    this.data = data;
    drivers[this.provider].init(data)
      .then(() => {
        cb();
      });
    return this;
  },
  doLogin: function () {
    return drivers[this.provider].login();
  }
};
