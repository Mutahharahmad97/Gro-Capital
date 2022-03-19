export const google = {
  appId: null,
  loaded: false,
  init: function({appId}) {
    this.appId = appId;
    if (this.loaded) return new Promise(res => res());
    return this.loadSDK(this);
  },

  loadSDK: (that) => new Promise((res, rej) => {
    ((d, s, id, cb) => {
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.async = true;
      js.defer = true;
      js.src = '//apis.google.com/js/platform.js';
      fjs.parentNode.insertBefore(js, fjs);
      js.onload = cb;
    })(document, 'script', 'gapi_client', function() {
      const params = {
        clientId: that.appId,
        scope: 'profile email'
      };
      window.gapi.load('auth2', () => {
        if (!window.gapi.auth2.getAuthInstance()) {
          window.gapi.auth2.init(params)
            .then(
              () => { that.loaded = true; res(); },
              (err) => rej({
                  provider: 'google',
                  type: 'load',
                  description: 'Failed to load SDK',
                  error: err
                }
              )
            );
        } else {
          that.loaded = true;
          res();
        }
      });
    });
  }),

  login: function() {
    return new Promise((resolve, reject) => {
      const auth2 = window.gapi.auth2.getAuthInstance();
      auth2.signIn()
        .then(
          res => resolve({
            token: res.getAuthResponse().access_token,
            uid: null
          }),
          err => reject(err)
        );
    });
  }
};
