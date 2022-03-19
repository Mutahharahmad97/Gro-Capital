export const facebook = {
  appId: null,
  loaded: false,
  init: function ({ appId }) {
    this.appId = appId;
    return new Promise((res) => {
      if (this.loaded) {
        res();
      }
      else {
        this.loadSDK();
        this.setFbAsyncInit(() => {
          this.loaded = true;
          res();
        });
      }
    });
  },
  setFbAsyncInit: function (cb) {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: '588196775269796',
        autoLogAppEvents: true,
        xfbml: false,
        version: 'v5.0'
      });
      cb();
    };
  },

  loadSDK: () => {
    ((d, s, id) => {
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s);
      js.id = id;
      js.async = true;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  },
  login: function () {
    return new Promise((resolve, reject) => {
      window.FB.login(function (response) {
        console.log('FB response', response);
        window.FB.api('/me', { fields: 'id,name,email' }, function (user) {
          if (user) {
            console.log('user', user);
          }
        });
        if (response.authResponse) {
          resolve({
            token: response.authResponse.accessToken,
            uid: response.authResponse.userID
          });
        } else {
          reject('User cancelled login or did not fully authorize.');
        }
      }, { scope: 'email,public_profile' });
    });
  }
};
