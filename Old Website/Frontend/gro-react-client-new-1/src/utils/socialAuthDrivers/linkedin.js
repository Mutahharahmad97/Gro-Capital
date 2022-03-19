import axios from 'axios';
import { apiVars } from 'config/env';

export const linkedin = {

  login: function () {
    return new Promise((resolve, reject) => {
      const loginWindow = window.open("", "Connect to Linkedin", "status=1,width=600,height=650");
      axios.get(apiVars.url + '/social_media/linkedin/connect')
        .then(
          resp => {
            if (resp.data.status === 'success') {
              loginWindow.location = resp.data.data + '&scope=r_basicprofile';
              console.log('resp.data.data', resp.data.data);
              const interval = setInterval(() => {
                const token = localStorage.getItem('linkedinToken');
                if (token) {
                  clearInterval(interval);
                  loginWindow.close();
                  localStorage.removeItem('linkedinToken');
                  resolve({ token });
                }
              }, 800);
            }
            else {
              reject(resp.data.message);
            }
          }, { scope: 'email,public_profile' }
        );
    });


    // window.IN.User.authorize(() => {
    //   resolve(window.IN.ENV.auth.oauth_token);
    // });

  }
};
