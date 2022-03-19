import {
  authConst,
  notificationConst,
  profileConst,
  loadingConst
} from 'constants/index';
import { doLogin, doRegister } from 'utils/auth';
import { push } from 'react-router-redux';
import { getProfile, storeProfile } from 'utils/user';
import { sendEmail } from 'utils/email';
import { companyActions } from 'actions/companyActions';
import setAuthToken from 'utils/authAxios';

export const authActions = {
  login,
  logout,
  register
};

function login(username, pass, register = false, social = null) {
  return dispatch => {
    dispatch({ type: loadingConst.SHOW });
    doLogin(username, pass, social)
      .then(
        response => {
          dispatch({ type: loadingConst.HIDE });
          const token = response['auth_token'];
          const userId = response['userId'];
          localStorage.setItem('authToken', token);
          localStorage.setItem('userId', userId);
          setAuthToken();
          dispatch({ type: profileConst.RESET });

          const profile = getProfile(userId);

          profile.then(response => {
            const user = response.data.data;

            localStorage.setItem('is_grocapital_admin', user.admin);
            if (!register) {
              localStorage.setItem('companyId', user.company);
              dispatch(companyActions.loadCompany());
            }
            storeProfile(user);
            dispatch({ type: profileConst.LOAD, profile: user });

            if (register) {
              dispatch(push('/get-started'));
              dispatch(companyActions.newCompany());
              dispatch({ type: authConst.register });
              dispatch({
                type: notificationConst.SHOW,
                text: 'You are registered!'
              });
              sendEmail('gro_signup_email', {
                to_email: username,
                to_name: `${user.first_name} ${user.last_name}`,
                from_name: 'Gro Support',
                from_email: 'support@modocap.com',
                reply_to: 'support@modocap.com',
                bcc_email: 'todd@modocap.com',
              });
            } else {
              const message = response['message'] || 'You are logged in';
              // dispatch(push('/get-started'));
              dispatch({ type: authConst.login });
              dispatch({ type: notificationConst.SHOW, text: message });
            }
          });
        },
        error => {
          loginError(dispatch, error);
        }
      )
      .catch(error => {
        loginError(dispatch, error);
      });
  };
}

function loginError(dispatch, error) {
  dispatch({ type: loadingConst.HIDE });
  dispatch({
    type: notificationConst.SHOW,
    text: error.data.message || 'Something went wrong. Please try again',
    mode: 'error'
  });
}

function register(userInfo) {
  const { email, password } = userInfo;

  return dispatch => {
    dispatch({ type: loadingConst.SHOW });
    doRegister(userInfo)
      .then(response => {
        dispatch({ type: loadingConst.HIDE });
        if (response.status === 'success') {
          dispatch(login(email, password, true));
        }
      })
      .catch(error => {
        dispatch({ type: loadingConst.HIDE });
        dispatch({
          type: notificationConst.SHOW,
          text: error.data.message || 'Something went wrong. Please try again',
          mode: 'error'
        });
      });
  };
}

function logout() {
  return dispatch => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('profile');
    localStorage.removeItem('userId');
    localStorage.removeItem('companyId');
    localStorage.removeItem('accountingToken');
    localStorage.removeItem('accountingRealmId');
    dispatch({ type: authConst.logout });
    dispatch(push('/'));
  };
}
