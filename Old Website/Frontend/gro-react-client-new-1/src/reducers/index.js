// Set up your root reducer here...
import { combineReducers } from 'redux';
import { navigation } from './navReducer';
import { menuLoggedIn } from './menuReducer';
import { loan } from './loanReducer';
import { slider } from './sliderReducer';
import { auth } from './authReducer';
import { notification } from "./notificationReducer";
import { profile } from './profileReducer';
import { loading } from './loadingReducer';
import { company } from './companyReducer';
import { score } from './scoreReducer';
import { investment } from './investmentReducer';
import initialState from 'store/initialState';

const appReducer = combineReducers({
  navigation,
  menuLoggedIn,
  loan,
  slider,
  auth,
  notification,
  profile,
  loading,
  company,
  score,
  investment
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = initialState();
  }

  return appReducer(state, action);
};

export default rootReducer;
